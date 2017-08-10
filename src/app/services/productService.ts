import { Injectable } from '@angular/core';

import {RequestOptions, RequestMethod, RequestOptionsArgs, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductService {
  constructor(private _http:Http){

  }

  getProductsData():Observable<any[]> {

        return this._http.get('get/products')
            .map((res) => {
              let body = res.json();
              return body || [];
            })
            .catch(this.handleError);
    }


    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }


    // this._http.get("get/products").then();
  
   
  getProducts(): Promise<any[]> {

    let allProducts = window["all_products"];

    if(typeof(allProducts) === "undefined"){
      allProducts = [];
    }

     return Promise.resolve(allProducts);
  }

  getProduct(id): Promise<any> {    
    let allProducts = window["all_products"];
    var availableProds = allProducts.filter(itm => {
      return itm.info.ProductID == id
    });

    if(availableProds.lenght > 0){
      return Promise.resolve(availableProds[0]);
    }else{
      return Promise.resolve(null);
    }
  }
}