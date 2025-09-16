import { Component } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { AppService } from './app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  constructor(private appservice:AppService){}
  protected title = 'ShoppingCart';
  isLoggedIn(){
    return this.appservice.checkUserName()
  }
}
