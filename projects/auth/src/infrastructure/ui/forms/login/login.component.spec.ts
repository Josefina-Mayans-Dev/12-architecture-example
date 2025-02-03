import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show validation errors when fields are touched and empty', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    const initialErrors = fixture.debugElement.queryAll(By.css('.login__error'));
    expect(initialErrors.length).toBe(0);

    usernameControl?.markAsTouched();
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.login__error'));
    
    expect(errorElements.length).toBe(2);

    const errorMessages = errorElements.map(el => el.nativeElement.textContent.trim());
    expect(errorMessages).toContain('Username is required.');
    expect(errorMessages).toContain('Password is required.');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call submit method with correct values when form is submitted', () => {
    spyOn(component, 'submit');

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'testpass'
    });
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTruthy();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.submit).toHaveBeenCalled();

    expect(component.loginForm.value).toEqual({
      username: 'testuser',
      password: 'testpass'
    });
  });
});
