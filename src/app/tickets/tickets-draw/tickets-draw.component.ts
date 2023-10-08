import { Component, AfterViewInit } from '@angular/core';
import { PlayroomService } from 'src/app/services/playroom.service';

/**
 * https://medium.com/@victortoschi/how-to-create-a-slot-machine-animation-with-css-and-javascript-9073ab9db9ea 
 * https://codepen.io/AdrianSandu/pen/MyBQYz
 * Number animation
 * https://codepen.io/konstantindenerz/pen/zYJzvEQ
 * Frosted glass
 * https://frosted-glass.shud.in/
 */
@Component({
  selector: 'app-tickets-draw',
  templateUrl: './tickets-draw.component.html',
  styleUrls: ['./tickets-draw.component.scss']
})
export class TicketsDrawComponent implements AfterViewInit {
  /**
   * @description:
   */
  public items: Array<any> = [
    // '?', 
    1, 
    2, 
    3, 
    4, 
    5, 
    6, 
    7, 
    8, 
    9, 
    0
  ];

  /**
   * @description:
   */
  public animation_velocity: Array<string> = [
    'after1second', 
    'after2second', 
    'after3second',
    'after4second',
    'after5second',
    'after6second',
    'after7second',
  ];

  /**
   * @description: 
   */
  public bobine_list: any = []

  /**
   * @description: 
   */
  constructor(
    private playroom_service: PlayroomService,
  ) {
  }

  /**
   * @description:  
   */
  public ngOnInit(): void {
    this.generatebobine_list();
    this.bindPlayroomWinningTicketPrintRun();
  } 

  /**
   * @description: Sert de recepteur pour l'evenement de tirage de ticket gagnant
   */
  private bindPlayroomWinningTicketPrintRun(): void {
    this.playroom_service.stream_winning_number.subscribe((data: any) => {
      this.stop_bobine(data);
    });
  }


  /**
   * @description:
   */
  private generatebobine_list(): void { 
    this.bobine_list = [];
    for (let i = 0; i < 7; i++) {
      this.bobine_list.push({
        number: this.items[Math.floor(Math.random() * this.items.length)],
        stopped: false,
      });
    }
  }

  /**
   * @description: 
   */
  private alternate_bobine(): void {
    for (let bobine of this.bobine_list) {
      if (bobine.stopped) { continue; }
      bobine.number = this.items[Math.floor(Math.random() * this.items.length)];
    }
    setTimeout(() => {
      this.alternate_bobine();
    }, 50);
  }

  /**
   * @description:
   */
  public ngAfterViewInit(): void {
    this.alternate_bobine();
  }

  /**
   * @description:
   */
  public stop_bobine(bobine_stop_event: any): void {
    let bobine = this.bobine_list[bobine_stop_event.bobine];
    bobine.stopped = true;
    bobine.number = bobine_stop_event.number;
  }


}
