import { inject, Injectable } from "@angular/core";
import { StateFactory } from "./state.factory";
import { BehaviorSubject } from "rxjs";
import { IAuth } from "../model/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly user$ = new BehaviorSubject<IAuth>(null);
  //#endregion

  store() {
    return {
      auth: this._factory.state(this.user$)
    }
  }
}