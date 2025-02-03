import { Component, EventEmitter, HostListener, Output, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMenu = false;
  @Output() logoutClicked = new EventEmitter<void>();
 // logoutClicked = output<void>();

  constructor(private router: Router){}

  toggleMenu(event:Event){
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  hideMenu() {
    this.showMenu = false;
  }

  logout(){
    debugger
    this.logoutClicked.emit();
  }

}
