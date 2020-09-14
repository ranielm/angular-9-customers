import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CustomersService } from '@app/_services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    customers = null;
    modalDelete: boolean;
    modalEdit: boolean;

    constructor(private customersService: CustomersService, private modalService: NgbModal) { }

    closeResult: string;

    ngOnInit() {
        this.customersService.getAll()
            .pipe(first())
            .subscribe(customers => this.customers = customers);
    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
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