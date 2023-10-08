import { Component } from '@angular/core';
import { PlayroomService } from '../services/playroom.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent {

  /**
   * @description:
   * @param playroomService 
   */
  public opened: boolean = false;

  constructor(
    private playroomService: PlayroomService,
  ) {

  }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.playroomService.endpartystream.subscribe((event) => {
      console.log('oeau', this.playroomService.caps);
      let caps = this.playroomService.caps;
      if (caps.timelaps_is_empty() || caps.moment_to_play()) { return; }
      if (event === 'gameover') {
        this.opened = true;
      }

      if (event === 'reset') {
        this.opened = false;
      }
    });
  }
}
