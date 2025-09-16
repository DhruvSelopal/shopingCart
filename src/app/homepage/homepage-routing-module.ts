import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './homepage-component/homepage'
import { ProductsComponent } from './homepage-component/products-component/products-component';
import { HomepageresolverService } from './homepageresolver.service';

const routes:Routes = [{
  path:'',component:Homepage,
  resolve: {products:HomepageresolverService},
  children:[
    {path:'products',component:ProductsComponent},
    {path:'',redirectTo:'products',pathMatch:'full'}
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }