import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Homepage } from './homepage-component/homepage';
import { HomePageRoutingModule } from './homepage-routing-module';
import { SharedModule } from '../shared/shared-module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './homepage-component/products-component/products-component'



@NgModule({
  declarations: [
    Homepage,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class HomepageModule { }
