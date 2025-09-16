import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username:FormControl = new FormControl('',Validators.required)
  password:FormControl = new FormControl('',[Validators.required])


  isEmail(value: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
  }

  formSubmit(){
    if(this.username.valid && this.password.valid) console.log("logged in succssful")
    else console.log("invalid form")
  }

}
