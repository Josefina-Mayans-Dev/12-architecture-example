import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../infrastructure/services/auth.service";
import { State } from "../../domain/state";
import { Observable, Subject, Subscription, tap } from "rxjs";
import { IAuth } from "../../domain/model/auth.model";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class LoginUserUsecase {
    private readonly _service = inject(AuthService);
    private readonly _tokenService = inject(AuthService);
    private readonly _state = inject(State);
    private readonly _router = inject(Router);
    private subscriptions: Subscription;
    private loginError$ = new Subject<string>();

    //#region Observables
    user$(): Observable<IAuth> {
        return this._state.users.auth.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(userData: IAuth): void {
        this.subscriptions.add(
            this._service.login(userData)
                .pipe(
                    tap(data => {
                        this._state.users.auth.set(data);
                        this._tokenService.setToken(data.token);
                        const username = this._tokenService.decodeTokenAndGetUsername(data.token);
                        if (username) {
                            this._service.setUsername(username);
                        }
                        this._router.navigate(['/dashboard/register']);

                    })
                )
                .subscribe({error: (error) => {
                    this.loginError$.next("Incorrect credentials");
                }})
        );
    }
    //#endregion

    //#region Private Methods
    //#endregion


}