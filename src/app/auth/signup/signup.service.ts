import { Injectable } from '@angular/core';
import { SignUp } from '../../shared/Types';
import { MockDataBase } from '../../shared/mockDataBase';
import { Observable } from 'rxjs';

@Injectable()
export class SignupService {
  constructor(private db:MockDataBase){}

  signup(user:SignUp):Observable<boolean | string>{
    return this.db.registerUser(user)
  }
}
