import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {of} from "rxjs";
import {ReservationRequestComponent} from "../../reservations/reservation-request/reservation-request.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModule} from "../../../infrastructure/material/material.module";
import {SharedModule} from "../../../shared/shared.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthModule} from "../../../infrastructure/auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "../../layout.module";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, MatSlideToggleModule, HttpClientModule, AuthModule, LayoutModule, NoopAnimationsModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups correctly', () => {
    expect(component.registerPersonalForm).toBeDefined();
    expect(component.registerContactForm).toBeDefined();
    expect(component.registerPasswordForm).toBeDefined();
  });

  it('should have required form controls in registerPersonalForm', () => {
    const form = component.registerPersonalForm;
    expect(form.get('toggleHost')).toBeTruthy();
    expect(form.get('firstName')).toBeTruthy();
    expect(form.get('lastName')).toBeTruthy();
    expect(form.get('address')).toBeTruthy();
  });

  it('should have required form controls in registerContactForm', () => {
    const form = component.registerContactForm;
    expect(form.get('email')).toBeTruthy();
    expect(form.get('phone')).toBeTruthy();
  });

  it('should have required form controls in registerPasswordForm', () => {
    const form = component.registerPasswordForm;
    expect(form.get('password')).toBeTruthy();
    expect(form.get('passwordConfirmation')).toBeTruthy();
  });

  it('should have default values in form controls in registerPersonalForm', () => {
    const form = component.registerPersonalForm;
    expect(form.get('toggleHost')?.value).toEqual('');
    expect(form.get('firstName')?.value).toEqual('');
    expect(form.get('lastName')?.value).toEqual('');
    expect(form.get('address')?.value).toEqual('');
  });

  it('should have default values in form controls in registerContactForm', () => {
    const form = component.registerContactForm;
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('phone')?.value).toEqual('');
  });

  it('should have default values in form controls in registerPasswordForm', () => {
    const form = component.registerPasswordForm;
    expect(form.get('password')?.value).toEqual('');
    expect(form.get('passwordConfirmation')?.value).toEqual('');
  });

  it('should have a matchValidator function', () => {
    expect(component.matchValidator).toBeTruthy();
  });

  it('should have a register function', () => {
    expect(component.register).toBeTruthy();
  });

  it('should set isEditable to false in register function', () => {
    component.register();
    expect(component.isEditable).toBeFalsy();
  });

  it('should form control be valid in registerPersonalForm', () => {
    const firstName: string = "Test";
    const lastName: string = "Testic";
    const address: string = "Testova 25";

    component.registerPersonalForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      address: address
    });

    fixture.detectChanges();

    expect(component.registerPersonalForm.valid).toBeTruthy();
  });

  it('should form control be invalid in registerPersonalForm', () => {
    const firstName: string = "Test";
    const lastName: string = "Testic";

    component.registerPersonalForm.patchValue({
      firstName: firstName,
      lastName: lastName
    });

    fixture.detectChanges();

    expect(component.registerPersonalForm.valid).toBeFalsy();
  });

  it('should form control be valid in registerContactForm', () => {
    const email: string = "test@test.com";
    const phone: string = "+38111111";

    component.registerContactForm.patchValue({
      email: email,
      phone: phone,
    });

    fixture.detectChanges();

    expect(component.registerContactForm.valid).toBeTruthy();
  });

  it('should phone form control be invalid in registerContactForm', () => {
    const email: string = "test@test.com";
    const phone: string = "38111111";

    component.registerContactForm.patchValue({
      email: email,
      phone: phone,
    });

    fixture.detectChanges();

    expect(component.registerContactForm.valid).toBeFalsy();
  });

  it('should email form control be invalid in registerContactForm', () => {
    const email: string = "test";
    const phone: string = "38111111";

    component.registerContactForm.patchValue({
      email: email,
      phone: phone,
    });

    fixture.detectChanges();

    expect(component.registerContactForm.valid).toBeFalsy();
  });

  it('should form control be valid in registerPasswordForm', () => {
    const pass: string = "pass";
    const confirmPass: string = "pass";

    component.registerPasswordForm.patchValue({
      password: pass,
      passwordConfirmation: confirmPass,
    });

    fixture.detectChanges();

    expect(component.registerPasswordForm.valid).toBeTruthy();
    expect(component.passwordMatch).toBeTruthy();
  });

  it('should form control be invalid in registerPasswordForm', () => {
    const pass: string = "pass";
    const confirmPass: string = "pass1";

    component.registerPasswordForm.patchValue({
      password: pass,
      passwordConfirmation: confirmPass,
    });

    fixture.detectChanges();

    expect(component.registerPasswordForm.valid).toBeFalsy();
    expect(component.passwordMatch).toBeFalsy();
  });

});
