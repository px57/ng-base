import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  /**
   * @description:
   */
  public stream: Subject<number> = new Subject<number>();

  /**
   * @description: 
   */
  public balance: number = 0;

  constructor(
    public switchModalService: SwitchModalService,
  ) { 
    setInterval(() => {
      this.getBalance();
    }, 500);
  }

  /**
   * @description:
   * @savein.service -> balance
   * @savein.stream -> balance
   * @savein.localStorage -> balance
   */
  public setBalance(balance: number) {
    this.balance = balance;
    localStorage.setItem('balance', balance.toString());
    this.stream.next(balance);
  }

  /**
   * @description:
   */
  public getBalance() {
    let balance = localStorage.getItem('balance');
    if (balance === null) {
      return this.balance;
    }
    if (this.balance !== parseInt(balance)) {
      this.setBalance(parseInt(balance));
    }
    return this.balance;
  }

  /**
   * @description:
   */
  public hasSuffisantMoney(amount: number): boolean {
    let balance = this.getBalance();
    if (balance < amount) {
      return false;
    }
    return true;
  }

  /**
   * @description:
   */
  public open_balance_modal(): void {
    this.switchModalService.open_modal('balance');
  }
}
