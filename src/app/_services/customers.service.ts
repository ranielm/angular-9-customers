import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Customer } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CustomersService {
    private userSubject: BehaviorSubject<Customer>;
    public customer: Observable<Customer>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('user')));
        this.customer = this.userSubject.asObservable();
    }

    public get userValue(): Customer {
        return this.userSubject.value;
    }

    logout() {
        // remove customer from local storage and set current customer to null
        localStorage.removeItem('customer');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(customer: Customer) {
        return this.http.post(`${environment.apiUrl}/customers`, customer);
    }

    getAll() {
        return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
    }

    getById(id: string) {
        return this.http.get<Customer>(`${environment.apiUrl}/customers/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/customers/${id}`, params)
            .pipe(map(x => {
                // update stored customer if the logged in customer updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const customer = { ...this.userValue, ...params };
                    localStorage.setItem('customer', JSON.stringify(customer));

                    // publish updated customer to subscribers
                    this.userSubject.next(customer);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/customers/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in customer deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}