import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  username: string | null = null;
  usernameSubscription: Subscription;

  ngOnDestroy(): void {
    if(this.usernameSubscription) {
        this.usernameSubscription.unsubscribe()
    }
  }

}
