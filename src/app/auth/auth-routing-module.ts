import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { Login } from "./login/login";
import { Signup } from "./signup/signup"
import { AuthComponent } from "./auth-component/auth-component"

const routes:Routes = [
    
    {
      path:'',
      component:AuthComponent,
      children:[
        {
          path:'login',
          component:Login
        },
        {
          path:'signup',
          component:Signup
        }
      ]
    }
    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule{

}