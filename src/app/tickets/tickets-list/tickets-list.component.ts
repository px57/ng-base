import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { PlayroomService } from 'src/app/services/playroom.service'; 
import { CapsuleTime } from 'src/app/services/playroom.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent {
  /**
   * @description:
   */
  public ticket_list: any = [ ];

  /**
   * @description:
   */
  public ticket_counter: number = 0;

  /**
   * @description: 
   */
  public caps: CapsuleTime = new CapsuleTime();

  /**
   * @description: 
   * @param playroomService 
   */
  constructor(public playroomService: PlayroomService) { }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.bindPlayroomStream();
    this.bindPlayroomWinningTicketPrintRun();
  }

  /**
   * @description:
   */
  private bindPlayroomStream(): void {
    this.playroomService.stream.subscribe((data: any) => {
      let event_key = 'recept__' + data.event;
      if ((this as any)[event_key] === undefined) {
        alert(event_key + ' is not defined in ticket-list.component.ts');
      }
      (this as any)[event_key](data.data);
    });
  }


  /**
   * @description: Sert de recepteur pour l'evenement de tirage de ticket gagnant
   */
  private bindPlayroomWinningTicketPrintRun(): void {
    this.playroomService.stream_winning_number.subscribe((data: any) => {
      for (let tiket of this.ticket_list) {
        let encountred = false;
        for (let num of tiket.number) {
          if (num.value === data.number && num.state !== 'gold') {
            encountred = true;
            num.state = 'gold';
            break;
          }
        }

        if (!encountred) {
          for (let num of tiket.number) {
            num.state = 'grey';
          }
          tiket.state = 'delete_line';
        }
      }
      this.updateTicketCounter();
    });
  }

  /**
   * @description: 
   */
  public recept__lottery_ticket_values(data: any): void { }

  /**
   * @description: 
   */
  public recept__account_balance(data: any): void { }

  /**
   * @description: 
   */
  public recept__party_time(data: any): void {
    this.caps = data.caps;
  }

  /**
   * @description:
   */
  public recept__ticket_list(data: any): void {
    // TODO: remove this when is finished.

    // if (this.ticket_list.length !== 0) { return; }

    this.ticket_list = [];
    for (let number of data) {
      let is_winning_ticket = this.hasWinningTicket(number);
      number = this.getWinningTicket(is_winning_ticket, number);

      this.ticket_list.push({
        number: this.explodeTicket(number),
        state: 'none',
      });
    }
    this.updateTicketCounter();
  }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) { }

  /**
   * @description: the winning number have >>> before and <<< after
   */
  public hasWinningTicket(ticket: string): boolean {
    return ticket.indexOf('>>>') !== -1;
  }

  /**
   * @description: expurge the winning number
   */
  public getWinningTicket(
    is_winning_ticket: boolean, 
    ticket: string
    ): string {
    if (!is_winning_ticket) return ticket;
    return ticket.replace('>>>', '').replace('<<<', '');
  }

  /**
   * @description: the number has 21132133 format
   * @return Array<any>
   */
  public explodeTicket(ticket: string): Array<any> {
    let ticket_list: Array<any> = [];
    for (let i = 0; i < ticket.length; i++) {
      ticket_list.push({
        value: ticket[i],
        state: 'none',
      });
    }
    return ticket_list;
  }

  /**
   * @description:
   */
  public updateTicketCounter(): void {
    this.ticket_counter = this.ticket_list.length;
    for (let ticket of this.ticket_list) {
      if (ticket.state === 'delete_line') {
        this.ticket_counter--;
      }
    }

    // -> end party
    if (this.ticket_counter === 0) {
      this.playroomService.endpartynext('gameover');
    }
  }

  /**
   * @description: 
   */
  public showTicketPart(): boolean {
    return this.caps.generate_tickets();
  }

  /**
   * @description:
   */
  public showWinnerListPart(): boolean {
    return !this.showTicketPart();
  }

}
