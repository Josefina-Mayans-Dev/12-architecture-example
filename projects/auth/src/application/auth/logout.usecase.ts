import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "shared";

@Injectable({
    providedIn: 'root',
})
export class LogOutUsecase {
    private readonly _router = inject(Router);
    private readonly _tokenService = inject(AuthService);
    private readonly _service = inject(AuthService);
    execute(): void {
        debugger
        this._tokenService.removeToken();
        this._service.removeUsername();
        this._router.navigate(['/home']);
    }
}