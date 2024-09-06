import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {User} from "../../users/models/user.model";
import {Host} from "../../users/models/host.model";
import {Guest} from "../../users/models/guest.model";
import {Component} from "@angular/core";
import {NotificationType} from "../../users/models/NotificationType.module";
import {AuthService} from "../../../infrastructure/auth/auth.service";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerPersonalForm: FormGroup = this.formBuilder.group({
    toggleHost: new FormControl('',),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required])
  })
  registerContactForm: FormGroup = this.formBuilder.group({
    email: new FormControl('',[Validators.email, Validators.required]),
    phone: new FormControl('',[Validators.pattern("^\\+(?:[0-9]●?){6,14}[0-9]$"),Validators.required])
  })

  registerPasswordForm: FormGroup = this.formBuilder.group({
    password: new FormControl('',[Validators.required]),
    passwordConfirmation: new FormControl('',[Validators.required])
  },{validators: this.matchValidator('password','passwordConfirmation')})
  hide: boolean = true;
  passwordMatch: boolean = false;
  isEditable: boolean = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = {confirmedValidator: 'Passwords do not match.'};
        this.passwordMatch=false;
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        this.passwordMatch = true;
        return null;
      }
    }
  }

  register() {
    this.isEditable = false;
    if(this.registerPersonalForm.value.toggleHost){
      let user: Host = {
        address: this.registerPersonalForm.value.address,
        email: this.registerContactForm.value.email,
        firstName: this.registerPersonalForm.value.firstName,
        lastName: this.registerPersonalForm.value.lastName,
        password: this.registerPasswordForm.value.password,
        phoneNumber: this.registerContactForm.value.phone,
        role: 2
      };

      this.authService.registerHost(user).subscribe();
    }else{
      let user: Guest = {
        address: this.registerPersonalForm.value.address,
        email: this.registerContactForm.value.email,
        firstName: this.registerPersonalForm.value.firstName,
        lastName: this.registerPersonalForm.value.lastName,
        password: this.registerPasswordForm.value.password,
        phoneNumber: this.registerContactForm.value.phone,
        role: 1
      };

      console.log(user)
      this.authService.registerGuest(user).subscribe(data=>{
        next: console.log(data)
      });
    }
  }


}
