import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { LoginComponent } from '../../forms/login/login.component';
import { LoginUserUsecase } from "../../../../application/auth/login-user.usecase";
import { IAuth } from "../../../../domain/model/auth.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'lib-auth-users',
    imports: [LoginComponent],
    templateUrl: './auth.component.html',
  })
  export class AuthComponent implements OnInit, OnDestroy{
    errorMessage: string | null = null;
    private readonly _useCase = inject(LoginUserUsecase);
    public user$: Observable<IAuth>;

    constructor(private router: Router, 
    ) {
    }
  
    
    ngOnInit(): void {
      this._useCase.initSubscriptions();
      this.user$ = this._useCase.user$();
    }
  
    ngOnDestroy(): void {
      this._useCase.destroySubscriptions();
    }
  
  
  
    login(formValue: IAuth) {
      this._useCase.execute(formValue)
    }
  
  }