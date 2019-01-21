import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTPService } from './http.service';
import { Products } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(
    private httpService: HTTPService) {
  }

  getProductsList(): Observable<Products> {
    return this.httpService.getTest('../assets/data/product-list.json')
    .pipe(map( (res: Products) => {
      return res;
    }));
  }
}
