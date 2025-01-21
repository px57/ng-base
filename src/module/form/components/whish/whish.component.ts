import {
  Component,
  OnInit,
  Input,
  Output } from '@angular/core';
import { UserService } from './../../services/user.service';
import { LibsService } from './../../services/libs.service';
import { OpenCloseElementService } from './../../services/open-close-element.service';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'tools-whish',
  templateUrl: './whish.component.html',
  styleUrls: ['./whish.component.css']
})
export class WhishComponent implements OnInit {
  @Input() public classList = ``;
  @Input() settings: any = {};
  @Input() profile: any = {};
  // @Output() callback: any;

  constructor(
    private user: UserService,
    private l: LibsService,
    private openCloseElementService: OpenCloseElementService,
    private _h: HttpService,
  ) { }
  public ngOnInit(): void {
  }

  public click_event_callback(): void  {
      alert('envoyer la requêtes peremetant denregistrer le nouveaux whish dans la base de donnée');
  }

  public click__event(): void {
    if (this.user.redirectToLogin__IfLogout()) {
      return;
    }

    const url = 'profile/whishlist/put_in_my_wishlist';
    const params = {
      'user__id': this.profile.user
    };

    this._h.post(url, params).subscribe((response) => {
      if (!response.success) { return; }
      this.profile.in_my_wishlist = response.in_my_wishlist;
    });
  }
}
