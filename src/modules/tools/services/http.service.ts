
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { FormGroup, FormControl } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

// import { SnackbarService } from './snackbar.service';
// import { UserService } from './user.service';

const localhost = ['127.0.0.1:4200', 'localhost:4200'];

/**
 * @description: Django position.
 */
const domain = function() {
  return window.location.protocol + '//' + window.location.host + '/v1' ;
}();

/**
 * @description: Strapi domain.
 */
const strapi_domain = function() {
  return window.location.protocol + '//' + window.location.host + '/api' ;
}();

 

@Injectable()
export class HttpService {
  public domain = domain;
  public strapi_domain = strapi_domain;
  public userService: any = undefined;

  /*
  * @description:
  */
  constructor(
    private http: HttpClient,
    // private snackbar: SnackbarService,
  ) {
    (window as any).h = this;
  }

  /**
   * @description: Generer a partir d'un dict, un query params correct
   * @returns 
   */
  private generateQueryParams(params: any): string {
    let resp = '?';
    for (let key of Object.keys(params)) {
      let value = params[key];
      resp += `${key}=${value}&`;
    }
    return resp;
  }

  /*
  * @description:
  */
  public addBaseUrl(domain: string, path: string): string {
    let resp_url = domain;

    if (path[0] !== '/') {
        resp_url += '/';
    }
    resp_url += path;

    if (path[path.length - 1] !== '/') {
        resp_url += '/';
    }

    return resp_url;
  }

  /*
  * @description:
  */
  private __map_url(url: any): any {
    return this.addBaseUrl(this.domain, url);
  }

  /*
  * @description:
  */
  private __defaultOptions() {
    return {
        'headers': new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${this.userService.getJwtToken()}`,
         }),
        'withCredentials': true,
    };
  }

  /*
  * @description:
  */
  private __jsonOptions() {
    return {
        'headers': new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
         }),
        'withCredentials': true,
    };
  }

  /*
  * @description:
  */
  private __map_response(response: any, request__type='post'): any {
    // if (response === null || response === undefined) { return; }
    // this.snackbar.httpResponseTraitment(response);
    if (response.success) {

    } else {

    }
    return response;
  }


  /*
  * @description:
  */
  private __encodeObjectParams(key: string, encode_object: any): Array<string> {
    let resp: Array<string>  = [];

    for (let into_key of Object.keys(encode_object)) {
      let value = encode_object[into_key];
      let add_into_key = `${key}[${into_key}]`;

      if (typeof(value) === `object`) {
        resp.push.apply(resp, this.__encodeObjectParams(add_into_key, value));
        continue;
      } else if(typeof(value) === 'function') {
        continue;
      }

      resp.push(`${add_into_key}=${value}`);
    }
    return resp;
  }

  /*
  * @description:
  */
  private __encodeParams(raw_params: any) {
      let body: URLSearchParams = new URLSearchParams();
      let encode_object: any = {};
      for(let key in raw_params) {
        if (typeof(raw_params[key]) === `object`) {
          encode_object[key] = raw_params[key];
          continue;
        } else if(typeof(raw_params[key]) === 'function') {
          continue;
        }

        body.set(key, raw_params[key]);
      }

      // -> Gerer l'encodage des liste, et des dict.
      let resp: Array<string> = [];
      for (let key of Object.keys(encode_object)) {
          resp.push.apply(resp, this.__encodeObjectParams(key, encode_object[key]));
      }

      return `${body.toString()}&${resp.join('&')}`;
  }

  /*
  * @description:
  */
  public post(url:string, params:any, header:any=undefined): any {
    url = this.addBaseUrl(this.domain, url);
    return this.http.post(url, this.__encodeParams(params), this.__defaultOptions()).pipe(
      map(response => {
        return this.__map_response(response, 'post');
      })
    );
  }

  /*
  * @description:
  */
  public get(url:string, header:any=undefined): any {
    return this.http.get(url, this.__defaultOptions()).pipe(
      map(response => {
          return this.__map_response(response, 'get');
      })
    );
  }

  /*
  * @description:
  */
  rawGet(url: string) {
    return this.http.get(url, this.__defaultOptions()).pipe(
      map(response => {
        return response
      })
    );
  }

  /*
  * @description:
  */
  public put() {

  }

  /*
  * @description:
  */
  public delete() {

  }

  /*
  * @description:
  */
  redirectTo(path: string) {
    window.location.href = this.__map_url(path);
  }
}
