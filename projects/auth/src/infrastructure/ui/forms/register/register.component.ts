import { Component, input, output } from '@angular/core';
import { IAuth } from '../../../../domain/model/auth.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  onSubmit = output<IAuth>();
  errorMessage = input<String|null>(null);

  constructor() {
    this.registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        roles: new FormControl('', [Validators.required])/* ,
        street: new FormControl("", [Validators.required]),
        number: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required]) */
    });
}

get nameControl() {
  return this.registerForm.get('username');
}

get passwordControl() {
  return this.registerForm.get('password');
}

get roleControl() {
  return this.registerForm.get('roles');
}

/* get streetControl(){
  return this.registerForm.get("street");
}

get numberControl(){
  return this.registerForm.get("number");
}

get zipCodeControl(){
  return this.registerForm.get("zipCode");
} */

  submit(): void {
    if(this.registerForm.valid){
    this.onSubmit.emit(this.registerForm.value);
    }
  }

}
