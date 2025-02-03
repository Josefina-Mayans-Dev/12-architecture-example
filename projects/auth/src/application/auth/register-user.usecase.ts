import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../infrastructure/services/auth.service";
import { State } from "../../domain/state";
import { IAuth } from "../../domain/model/auth.model";
import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterUserUsecase {
  private readonly _service = inject(AuthService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  //#region Observables
  user$(): Observable<IAuth> {
    return this._state.users.auth.$();
  }

  error$(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
    this.errorSubject.complete();
  }

  execute(userData: IAuth): void {
    this.errorSubject.next(null);

    this.subscriptions.add(
      this._service.register(userData)
        .pipe(
          tap({
            next: (result) => {
              this._state.users.auth.set(result);
            },
            error: (error) => {
              this.errorSubject.next(error.message || 'Registration failed');
            }
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}