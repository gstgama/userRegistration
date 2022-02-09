import { AbstractType, Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, RequiredValidator, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userRegistration',
  templateUrl: './userRegistration.component.html',
  styleUrls: ['./userRegistration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  form!: FormGroup;
  modalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private modalService: BsModalService) {}

  ngOnInit() {
    this.form = this.fb.group ({
      nome: ['', Validators.required],
      email: ['',
      [
        Validators.required,
        Validators.pattern('^((?!-)[a-zA-Z0-9._%+-])+@([a-zA-Z0-9.-])+\\.com$')
      ]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repetirSenha: ['', Validators.required]
    }, {validator: this.MustMatch('senha', 'repetirSenha')},
    )
  }

  get nome(): any {
    return this.form.get('nome');
  }

  get email(): any {
    return this.form.get('email');
  }

  get senha(): any {
    return this.form.get('senha');
  }

  get repetirSenha(): any {
    return this.form.get('repetirSenha');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  formReset(form: FormGroup){
    setTimeout(() => {this.form.reset()}, 200);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}

