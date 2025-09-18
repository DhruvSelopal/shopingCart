import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../shared/Types';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  constructor(private singupservice:SignupService,private router:Router){}

  signupForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  signup(){
    if(this.signupForm.valid){
      let firstname:string = this.signupForm.controls.firstname.value?this.signupForm.controls.firstname.value:'';
      let lastname:string = this.signupForm.controls.lastname.value?this.signupForm.controls.lastname.value:'';
      let fullname = firstname+lastname;

      if(firstname && lastname) fullname = lastname+firstname;

      let userdetails:SignUp = {
        username:this.signupForm.controls.username.value! ,
        email:this.signupForm.controls.email.value!,
        password:this.signupForm.controls.password.value!,
        fullName : fullname?fullname:undefined
      }

      this.singupservice.signup(userdetails).subscribe(
        (data: boolean | string) =>{
          if(data === "email already in use") alert("email already in user");
          else if(!data) alert("username already exists");
          else{
            this.router.navigate(['/auth']);
            alert("account created successfully")
          }
        }
      )
    }
    else alert("Fields missing")
  }
}
