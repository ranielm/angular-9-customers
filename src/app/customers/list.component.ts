import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CustomersService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    customers = null;

    constructor(private customersService: CustomersService) {}

    ngOnInit() {
        this.customersService.getAll()
            .pipe(first())
            .subscribe(customers => this.customers = customers);
    }

    deleteCustomer(id: string) {
        const customer = this.customers.find(x => x.id === id);
        customer.isDeleting = true;
        this.customersService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.customers = this.customers.filter(x => x.id !== id) 
            });
    }
}