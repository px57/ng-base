import { Injectable } from '@angular/core';
import { HttpService } from 'src/modules/tools/services/http.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  /**
   * @description:
   */
  public load_basic_data__is_loaded: boolean = false;

  /**
   * @description:
   */
  public jobs: any = [];

  /**
   * @description: 
   */
  public job_categories: any = [];

  /**
   * @description:
   */
  public company_types: any = [];

  /**
   * @description:
   */
  public company_sizes: any = [];

  /**
   * @description:
   */
  constructor(
    private httpService: HttpService,
  ) { }

  /**
   * @description:
   */
  public load_basic_data() {
    this.httpService.get(`/v1/profiles/load_basic_data/`).subscribe(
      (data: any) => {
        this.jobs = data.jobs;
        this.job_categories = data.job_categories;
        this.company_types = data.company_types;
        this.company_sizes = data.company_sizes;
        this.load_basic_data__is_loaded = true;
      }
    );
  }

  /**
   * @description: Retourne promise when data is not loaded
   */
  public waitLoadBasicData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.setTimeoutAfterWaitLoadBasicData(resolve, reject);
    });
  }

  /**
   * @description:
   */
  public setTimeoutAfterWaitLoadBasicData(resolve: any, reject: any) {
    setTimeout(() => {
      if (this.load_basic_data__is_loaded) {
        resolve('ok');
      } else {
        this.setTimeoutAfterWaitLoadBasicData(resolve, reject); 
      } 
    }, 100);
  }
}