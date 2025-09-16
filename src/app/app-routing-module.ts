import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authServices/auth-guard';
import { HomepageresolverService } from './homepage/homepageresolver.service';

const routes: Routes = [
  {
    path:'homepage',
    loadChildren: () => import('./homepage/homepage-module').then(m => m.HomepageModule),
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo: 'homepage',
    pathMatch:'full'
  },
  {
    path:'cart',
    loadChildren: () => import('./cart/cart-module').then(m => m.CartModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
