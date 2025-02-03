import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RegisterUserUsecase } from '../../../../application/auth/register-user.usecase';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IAuth } from '../../../../domain/model/auth.model';
import { RegisterComponent } from '../../forms/register/register.component';
import { Router } from '@angular/router';
import { SuccessModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-create-users',
  imports: [RegisterComponent, SuccessModalComponent],
  templateUrl: './create-users.component.html'
})
export class CreateUsersComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
/*   errorMessage: string | null = null;*/
  isVisible = false; 
  title = 'Register Successful!';
  private readonly _useCase = inject(RegisterUserUsecase);
  public user$: Observable<IAuth>;

  readonly error$ = this._useCase.error$();

  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;


  constructor(private router: Router,
  ) {
  }

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.user$ = this._useCase.user$();
 /*    this.user$ = this._useCase.user$().pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.isVisible=true;
        this.registerComponent?.registerForm.reset();
      })
    ); */
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._useCase.destroySubscriptions();
  }

 createUser(formValue: IAuth): void {
    this._useCase.execute(formValue);
    this.isVisible = true;
    this.registerComponent.registerForm.reset();
  }
 /* 
  handleCloseModal() {
    this.isVisible = false;
  } */

/*    createUser(formValue: IAuth): void {
      this._useCase.execute(formValue);
    }  */
  
    handleCloseModal(): void {
      this.isVisible=false;
    }

}
