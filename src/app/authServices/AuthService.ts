
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId : Object) {}
  IsLoggedIn():boolean{
    if( isPlatformBrowser(this.platformId) && localStorage.getItem("username")) return true;
    else return false;
  }
}
