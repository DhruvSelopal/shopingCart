import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Loader } from './loader/loader';



@NgModule({
  declarations: [
    Navbar,
    Loader
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Navbar
  ]
})
export class SharedModule { }
