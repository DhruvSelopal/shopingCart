import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers:[LoginService]
})
export class Login {
  
  loginForm = new FormGroup({
    user :  new FormControl('',Validators.required),
    password : new FormControl('',[Validators.required])
  })

  constructor(private loginservice:LoginService,private router:Router){}


  formSubmit(){
    if(this.loginForm.valid){
      let user:string | undefined | null = this.loginForm.get('user')?.value
      let password:string | undefined | null = this.loginForm.get('password')?.value
      if(user && password){
        this.loginservice.checkCredentials(user,password).subscribe((data) =>{
          if(data){
            localStorage.setItem('username',data)
            this.router.navigate(['/homepage'])
          }
          else alert("invalid credentials")
        })
      }
      else alert("fail to fetch details from temaplate")
    }
    else alert("form is invalid")
  }

}
