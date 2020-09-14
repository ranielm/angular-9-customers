import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CustomersService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
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
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        // $("#cpfcnpj").keydown(function(){
        //     try {
        //         $("#cpfcnpj").unmask();
        //     } catch (e) {}
        
        //     var tamanho = $("#cpfcnpj").val().length;
        
        //     if(tamanho < 11){
        //         $("#cpfcnpj").mask("999.999.999-99");
        //     } else {
        //         $("#cpfcnpj").mask("99.999.999/9999-99");
        //     }
        
        //     // ajustando foco
        //     var elem = this;
        //     setTimeout(function(){
        //         // mudo a posição do seletor
        //         elem.selectionStart = elem.selectionEnd = 10000;
        //     }, 0);
        //     // reaplico o valor para mudar o foco
        //     var currentValue = $(this).val();
        //     $(this).val('');
        //     $(this).val(currentValue);
        // });

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
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
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

    private updateUser() {
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