
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute } from '@angular/router';
import { HttpService } from './../services/http.service';

interface offers {
    success: boolean,
    offers: any,
}

@Injectable()
export class UrlResolver implements Resolve<offers> {
  public route: any;
  public state: any;

    constructor(
        private router: Router,
        private _h: HttpService,
        private activatedRoute: ActivatedRoute,
    ) { }

    set_response: any;

    getModel(route: any) {
      let model: string;
      if (typeof(route.data.U) === 'string') {
        return route.data.U;
      } else {
        return route.data.U.model;
      }
    }

    redirect_error(redirect_error: any, content: any): any {
        if (!redirect_error) {
          return null;
        }

        if (!content.success) {
          this.router.navigate(['/']);
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<offers> {
        return new Promise((resolve) => {
          this.set_response = resolve;
          let model = this.getModel(route);
          // let redirect_error = route.data.redirect_error || false;
          let redirect_error = false;
          if (route.data.hasOwnProperty('post')) {
            let params:any = {};
            
            // -> Chargée aussi les données configurer.

            params.params = JSON.stringify(route.params);
            params.queryParams = JSON.stringify(route.queryParams);
            // conso
            this._h.post(model, params).subscribe((response: any) => {
              let content = response;
              this.redirect_error(redirect_error, content);
              return this.set_response(content);
            }, (error: any) => this.catchError(redirect_error));
          }
        });
    }

    public catchError(redirect_error: boolean) {
      const resp = {'success': false};
      this.redirect_error(redirect_error, resp);
      return this.set_response(resp);
    }
}
