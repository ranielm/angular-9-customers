import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Customer } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CustomersService {
    private customerSubject: BehaviorSubject<Customer>;
    public customer: Observable<Customer>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.customerSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('customer')));
        this.customer = this.customerSubject.asObservable();
    }

    public get customerValue(): Customer {
        return this.customerSubject.value;
    }

    login(customername, password) {
        return this.http.post<Customer>(`${environment.apiUrl}/customers/authenticate`, { customername, password })
            .pipe(map(customer => {
                // store customer details and jwt token in local storage to keep customer logged in between page refreshes
                localStorage.setItem('customer', JSON.stringify(customer));
                this.customerSubject.next(customer);
                return customer;
            }));
    }

    logout() {
        // remove customer from local storage and set current customer to null
        localStorage.removeItem('customer');
        this.customerSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(customer: Customer) {
        return this.http.post(`${environment.apiUrl}/customers/register`, customer);
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
                if (id == this.customerValue.id) {
                    // update local storage
                    const customer = { ...this.customerValue, ...params };
                    localStorage.setItem('customer', JSON.stringify(customer));

                    // publish updated customer to subscribers
                    this.customerSubject.next(customer);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/customers/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in customer deleted their own record
                if (id == this.customerValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}