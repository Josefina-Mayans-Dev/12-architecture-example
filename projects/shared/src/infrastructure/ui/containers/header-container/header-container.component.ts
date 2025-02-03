import { Component, inject } from '@angular/core';
import { LogOutUsecase } from 'auth';
import { HeaderComponent } from 'shared';

@Component({
  selector: 'lib-header-container',
  imports: [HeaderComponent],
  templateUrl: './header-container.component.html',
})
export class NavContainerComponent {
 private readonly _useCase = inject(LogOutUsecase);
  handleLogout() {
    debugger
    this._useCase.execute();
  }
}