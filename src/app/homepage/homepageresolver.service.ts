import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../shared/Types';
import { MockDataBase } from '../shared/mockDataBase';
import { ResolveFn } from '@angular/router';
import { of,Observable,delay } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class HomepageresolverService implements Resolve<Product[]> {
//   constructor(private mockdb: MockDataBase) {}
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Product[] | RedirectCommand> {
//     return this.mockdb.getAllProducts()
//   }
// }

@Injectable({ providedIn: 'root' })
export class HomepageresolverService implements Resolve<Product[]> {
  resolve(): Observable<Product[]> {
    console.log("resolver is running ..........###################")
    return of([
      { id: 1, name: 'Test', price: 1, description: '', imageUrl: '', category: '', inStock: true }
    ]).pipe(delay(1000));
  }
}

// export const HomePageResolverFn : ResolveFn<Product[]> = (route:ActivatedRouteSnapshot) =>{
//   const db = inject(MockDataBase)
//   return db.getAllProducts()
// }
