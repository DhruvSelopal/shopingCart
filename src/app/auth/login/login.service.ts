import { Injectable } from '@angular/core';
import { MockDataBase } from '../../shared/mockDataBase';
import { LoginCredentials } from '../../shared/Types';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private db:MockDataBase ){}

  isEmail(value: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
  }

  checkCredentials(user:string,password:string):Observable<string | null>{
    let login :LoginCredentials = {
      password:password
    }
    if(this.isEmail(user)){
      login.email = user
      return this.db.login(login)
    }
    else{
      login.username = user
      return this.db.login(login)
    }
  }
}
