import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-component',
  standalone: false,
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css'
})
export class AuthComponent {
  activeTab: 'login' | 'signup' = 'login';

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
  }
}
