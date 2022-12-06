import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";

import { ProductResolved } from "./product";
import { ProductService } from "./product.service";




@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productservice: ProductService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) : Observable<ProductResolved> {
    const id = route.paramMap.get('id');

    if (isNaN(Number(id))) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});
    }

    return this.productservice.getProduct(Number(id))
      .pipe(
        map((product: any) => ({product: product})),
        catchError( error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({product: null, error: message});
        })
      )
  }

}
