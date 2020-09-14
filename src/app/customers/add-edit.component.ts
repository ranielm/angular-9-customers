import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CustomersService, AlertService, StateService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    states: any = []

    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    mask:string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private customersService: CustomersService,
        private alertService: AlertService,        
        private stateService: StateService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        this.stateService.getAll()
            .pipe(first())
            .subscribe(states => this.states = states);

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            // docId: ['', [Validators.required, Validators.cpf]],
            docId: ['', Validators.required],
            zipCode: ['', Validators.required],
            address: ['', Validators.required],
            district: ['', Validators.required],
            locality: ['', Validators.required],
            state: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.customersService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.name.setValue(x.name);
                    this.f.docId.setValue(x.docId);
                    this.f.zipCode.setValue(x.zipCode);
                    this.f.address.setValue(x.address);
                    this.f.district.setValue(x.district);
                    this.f.locality.setValue(x.locality);
                    this.f.state.setValue(x.state);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createCustomer();
        } else {
            this.updateCustomer();
        }
    }

    private createCustomer() {
        this.customersService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Cliente cadastrado com sucesso', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateCustomer() {
        this.customersService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Atualizado com sucesso', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}