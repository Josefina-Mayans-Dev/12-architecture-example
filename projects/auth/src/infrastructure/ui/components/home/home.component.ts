import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) {
    }

  login() {
    this.router.navigate(['/login']);
  }
}

