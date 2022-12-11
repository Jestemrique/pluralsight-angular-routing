import { Injectable } from "@angular/core";
import { Route, PreloadingStrategy, RouterOutlet } from '@angular/router';

import { Observable, observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
