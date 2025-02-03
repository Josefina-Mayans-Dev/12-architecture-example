import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show validation errors when form is submitted with empty fields', () => {
        expect(component.registerForm.valid).toBeFalsy();

        Object.keys(component.registerForm.controls).forEach(key => {
          const control = component.registerForm.get(key);
          control?.markAsTouched();
          control?.markAsDirty();
        });
    
        fixture.detectChanges();
    
        const errorElements = fixture.debugElement.queryAll(By.css('.auth-form__error'));
        
        expect(errorElements.length).toBeGreaterThan(0);
    
        const errorMessages = errorElements.map(el => el.nativeElement.textContent.trim());
        expect(errorMessages).toContain('Username is required.');
        expect(errorMessages).toContain('Password is required.');
        expect(errorMessages).toContain('Role is required.');

        const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
        expect(submitButton.nativeElement.disabled).toBeTruthy();
      });

  it('should enable submit button and call submit method when form is valid', () => {
    spyOn(component, 'submit');

    component.registerForm.patchValue({
      username: 'testuser',
      password: 'testpass123',
      roles: 'USER'
    });
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeTruthy();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalsy();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.submit).toHaveBeenCalled();
  });
});
