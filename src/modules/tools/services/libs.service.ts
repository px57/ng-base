import { Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LibsService {
  /*
   * @description:
   */
  constructor(
    // private cookieService: CookieService,
    public router: Router,
    public h: HttpService
  ) {}

  /*
   * @description: Veuillez à prendre en charge la complexité de cette applications au travers d'un usages
   * Particulier.
   */
  public connect_before_use(): boolean {
    let password = 'htopwget';
    // if (this.cookieService.get('password').length === 0) {
    //   while (true) {
    //     let entered_password = prompt("Entrer mot de passe");
    //     if (entered_password==password) {
    //       this.cookieService.set('password', entered_password);
    //       return true;
    //     }
    //   }
    // }
    return true;
  }

  /*
   * @description: Renvoit true sur le media sur lequel je me trouve est bien un téléphones mobiles.
   */
  public is_mobile(): boolean {
    return window.innerWidth < 812;
  }

  /*
   * @description:
   */
  public is_desktop(): boolean {
    return !this.is_mobile();
  }

  /*
   * @description: Il s'agit ici d'un helper qui permet de réduire le temps de récupérations des images et de leur intégrations.
   */
  public responsive_picture(
    fields: any,
    for_mobile = `for_mobile`,
    for_pc = `for_pc`,
    for_background_image = true
  ) {
    let path = '';
    if (this.is_mobile()) {
      path = fields[for_mobile];
    } else {
      path = fields[for_pc];
    }
    if (for_background_image) {
      return `url("${path}")`;
    }
    return path;
  }

  /*
   * @description:
   */
  public generateUuid(): string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  /*
   * @description:
   */
  public add_00_in_end(number: any): string {
    number = Math.round(number * 100) / 100;
    let stringNumber = number.toString();
    const length0 = stringNumber.split('.');
    if (length0.length === 1) {
      stringNumber = stringNumber + '.00';
    } else if (length0[1].length === 1) {
      stringNumber = stringNumber + '0';
    }
    return stringNumber.replace('.', ',');
  }

  /*
   * @description: Transformer cette éléments
   */
  public convert_video_data(ico: any): any {
    return {
      extension: ico.split('.').splice(-1)[0],
      video: ico,
    };
  }

  /*
   * @description:
   */
  public convert_phone_number_to_string(phone_number: any): string {
    if (typeof phone_number === `object`) {
      if (
        phone_number['country_code'] === null &&
        phone_number['number'] === null
      ) {
        return '';
      }
      return `+${phone_number['country_code']} ${phone_number['number']}`;
    }
    return '';
  }

  /*
   * @description:
   */
  public timelaps_with_now(time: any): void {}

  /*
   * @description:
   */
  public timelaps_show(time: any): void {}

  timezone_list = [
    { key: 'US/Hawaii', value: '(UTC−10) Hawaii' },
    { key: 'US/Alaska', value: '(UTC−9) Alaska' },
    { key: 'Canada/Pacific', value: '(UTC−8) Pacific U.S & Canada' },
    { key: 'US/Arizona', value: '(UTC−7) Arizona' },
    { key: 'Canada/Central', value: '(UTC−6) Central America' },
    { key: 'America/Mexico_City', value: '(UTC−6) Mexico' },
    { key: 'America/Bogota', value: '(UTC−5) Bogota' },
    { key: 'America/Havana', value: '(UTC−5) Havana' },
    { key: 'US/Eastern', value: '(UTC−5) Eastern' },
    { key: 'Canada/Atlantic', value: '(UTC−4) Atlantic' },
    { key: 'America/Sao_Paulo', value: '(UTC−3) Brasilia' },
    { key: 'America/Argentina/Buenos_Aires', value: '(UTC−3) Buenos_Aires' },
    { key: 'America/El_Salvador', value: '(UTC−3) El Salvador' },
    { key: 'Africa/Cairo', value: '(UTC−2) Cairo' },
    { key: 'Atlantic/Cape_Verde', value: '(UTC−1) Cape_Verde' },
    { key: 'Europe/Dublin', value: '(UTC+0) Dublin, Lisbon, London' },
    { key: 'Africa/Casablanca', value: '(UTC+1) Casablanca' },
    {
      key: 'Europe/Amsterdam',
      value: '(UTC+1) Amsterdam, Berlin, Rome, Stockholm, Vienna',
    },
    {
      key: 'Europe/Berlin',
      value: '(UTC+1) Belgrade, Budapest, Ljubljana, Prague',
    },
    {
      key: 'Europe/Madrid',
      value: '(UTC+1) Brussels, Copenhagen, Madrid, Paris',
    },
    {
      key: 'Europe/Sarajevo',
      value: '(UTC+1) Sarajevo, Skopje, Warsaw, Zagreb',
    },
    { key: 'Europe/Athens', value: '(UTC+2) Athens, Bucharest' },
    { key: 'Europe/Chisinau', value: '(UTC+2) Chisinau' },
    { key: 'Asia/Damascus', value: '(UTC+2) Damascus' },
    { key: 'Asia/Gaza', value: '(UTC+2) Gaza' },
    {
      key: 'Europe/Helsinki',
      value: '(UTC+2) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',
    },
    { key: 'Asia/Jerusalem', value: '(UTC+2) Jerusalem' },
    { key: 'Africa/Tripoli', value: '(UTC+2) Tripoli' },
    { key: 'Europe/Istanbul', value: '(UTC+3) Istanbul' },
    { key: 'Asia/Kuwait', value: '(UTC+3) Kuwait' },
    { key: 'Europe/Minsk', value: '(UTC+3) Minsk' },
    { key: 'Europe/Moscow', value: '(UTC+3) Moscow' },
    { key: 'Asia/Muscat', value: '(UTC+4) Muscat' },
    { key: 'Asia/Dubai', value: '(UTC+4) Dubai' },
    { key: 'Europe/Saratov', value: '(UTC+4) Saratov' },
    { key: 'Asia/Omsk', value: '(UTC+6) Omsk' },
    { key: 'Asia/Bangkok', value: '(UTC+7) Bangkok' },
    { key: 'Asia/Tomsk', value: '(UTC+7) Tomsk' },
    { key: 'Asia/Hong_Kong', value: '(UTC+8) Hong_Kong' },
    { key: 'Asia/Singapore', value: '(UTC+8) Singapore' },
    { key: 'Asia/Tokyo', value: '(UTC+9) Tokyo' },
    { key: 'Asia/Pyongyang', value: '(UTC+9) Pyongyang' },
    { key: 'Asia/Seoul', value: '(UTC+9) Seoul' },
    { key: 'Australia/Brisbane', value: '(UTC+10) Brisbane' },
    { key: 'Australia/Sydney', value: '(UTC+10) Sydney' },
    { key: 'Pacific/Bougainville', value: '(UTC+11) Bougainville' },
    { key: 'Pacific/Auckland', value: '(UTC+12) Auckland' },
  ];

  /*
   * @description:
   */
  public countryList: any = [
    { code: `AF`, name: `Afghanistan` },
    { code: `AX`, name: `Åland Islands` },
    { code: `AL`, name: `Albania` },
    { code: `DZ`, name: `Algeria` },
    { code: `AS`, name: `American Samoa` },
    { code: `AD`, name: `Andorra` },
    { code: `AO`, name: `Angola` },
    { code: `AI`, name: `Anguilla` },
    { code: `AQ`, name: `Antarctica` },
    { code: `AG`, name: `Antigua and Barbuda` },
    { code: `AR`, name: `Argentina` },
    { code: `AM`, name: `Armenia` },
    { code: `AW`, name: `Aruba` },
    { code: `AU`, name: `Australia` },
    { code: `AT`, name: `Austria` },
    { code: `AZ`, name: `Azerbaijan` },
    { code: `BS`, name: `Bahamas` },
    { code: `BH`, name: `Bahrain` },
    { code: `BD`, name: `Bangladesh` },
    { code: `BB`, name: `Barbados` },
    { code: `BY`, name: `Belarus` },
    { code: `BE`, name: `Belgium` },
    { code: `BZ`, name: `Belize` },
    { code: `BJ`, name: `Benin` },
    { code: `BM`, name: `Bermuda` },
    { code: `BT`, name: `Bhutan` },
    { code: `BO`, name: `Bolivia` },
    { code: `BQ`, name: `Bonaire, Sint Eustatius and Saba` },
    { code: `BA`, name: `Bosnia and Herzegovina` },
    { code: `BW`, name: `Botswana` },
    { code: `BV`, name: `Bouvet Island` },
    { code: `BR`, name: `Brazil` },
    { code: `IO`, name: `British Indian Ocean Territory` },
    { code: `BN`, name: `Brunei` },
    { code: `BG`, name: `Bulgaria` },
    { code: `BF`, name: `Burkina Faso` },
    { code: `BI`, name: `Burundi` },
    { code: `CV`, name: `Cabo Verde` },
    { code: `KH`, name: `Cambodia` },
    { code: `CM`, name: `Cameroon` },
    { code: `CA`, name: `Canada` },
    { code: `KY`, name: `Cayman Islands` },
    { code: `CF`, name: `Central African Republic` },
    { code: `TD`, name: `Chad` },
    { code: `CL`, name: `Chile` },
    { code: `CN`, name: `China` },
    { code: `CX`, name: `Christmas Island` },
    { code: `CC`, name: `Cocos (Keeling) Islands` },
    { code: `CO`, name: `Colombia` },
    { code: `KM`, name: `Comoros` },
    { code: `CG`, name: `Congo` },
    { code: `CD`, name: `Congo (the Democratic Republic of the)` },
    { code: `CK`, name: `Cook Islands` },
    { code: `CR`, name: `Costa Rica` },
    { code: `CI`, name: "Côte d'Ivoire" },
    { code: `HR`, name: `Croatia` },
    { code: `CU`, name: `Cuba` },
    { code: `CW`, name: `Curaçao` },
    { code: `CY`, name: `Cyprus` },
    { code: `CZ`, name: `Czechia` },
    { code: `DK`, name: `Denmark` },
    { code: `DJ`, name: `Djibouti` },
    { code: `DM`, name: `Dominica` },
    { code: `DO`, name: `Dominican Republic` },
    { code: `EC`, name: `Ecuador` },
    { code: `EG`, name: `Egypt` },
    { code: `SV`, name: `El Salvador` },
    { code: `GQ`, name: `Equatorial Guinea` },
    { code: `ER`, name: `Eritrea` },
    { code: `EE`, name: `Estonia` },
    { code: `SZ`, name: `Eswatini` },
    { code: `ET`, name: `Ethiopia` },
    { code: `FK`, name: `Falkland Islands  [Malvinas]` },
    { code: `FO`, name: `Faroe Islands` },
    { code: `FJ`, name: `Fiji` },
    { code: `FI`, name: `Finland` },
    { code: `FR`, name: `France` },
    { code: `GF`, name: `French Guiana` },
    { code: `PF`, name: `French Polynesia` },
    { code: `TF`, name: `French Southern Territories` },
    { code: `GA`, name: `Gabon` },
    { code: `GM`, name: `Gambia` },
    { code: `GE`, name: `Georgia` },
    { code: `DE`, name: `Germany` },
    { code: `GH`, name: `Ghana` },
    { code: `GI`, name: `Gibraltar` },
    { code: `GR`, name: `Greece` },
    { code: `GL`, name: `Greenland` },
    { code: `GD`, name: `Grenada` },
    { code: `GP`, name: `Guadeloupe` },
    { code: `GU`, name: `Guam` },
    { code: `GT`, name: `Guatemala` },
    { code: `GG`, name: `Guernsey` },
    { code: `GN`, name: `Guinea` },
    { code: `GW`, name: `Guinea-Bissau` },
    { code: `GY`, name: `Guyana` },
    { code: `HT`, name: `Haiti` },
    { code: `HM`, name: `Heard Island and McDonald Islands` },
    { code: `VA`, name: `Holy See` },
    { code: `HN`, name: `Honduras` },
    { code: `HK`, name: `Hong Kong` },
    { code: `HU`, name: `Hungary` },
    { code: `IS`, name: `Iceland` },
    { code: `IN`, name: `India` },
    { code: `ID`, name: `Indonesia` },
    { code: `IR`, name: `Iran` },
    { code: `IQ`, name: `Iraq` },
    { code: `IE`, name: `Ireland` },
    { code: `IM`, name: `Isle of Man` },
    { code: `IL`, name: `Israel` },
    { code: `IT`, name: `Italy` },
    { code: `JM`, name: `Jamaica` },
    { code: `JP`, name: `Japan` },
    { code: `JE`, name: `Jersey` },
    { code: `JO`, name: `Jordan` },
    { code: `KZ`, name: `Kazakhstan` },
    { code: `KE`, name: `Kenya` },
    { code: `KI`, name: `Kiribati` },
    { code: `KW`, name: `Kuwait` },
    { code: `KG`, name: `Kyrgyzstan` },
    { code: `LA`, name: `Laos` },
    { code: `LV`, name: `Latvia` },
    { code: `LB`, name: `Lebanon` },
    { code: `LS`, name: `Lesotho` },
    { code: `LR`, name: `Liberia` },
    { code: `LY`, name: `Libya` },
    { code: `LI`, name: `Liechtenstein` },
    { code: `LT`, name: `Lithuania` },
    { code: `LU`, name: `Luxembourg` },
    { code: `MO`, name: `Macao` },
    { code: `MG`, name: `Madagascar` },
    { code: `MW`, name: `Malawi` },
    { code: `MY`, name: `Malaysia` },
    { code: `MV`, name: `Maldives` },
    { code: `ML`, name: `Mali` },
    { code: `MT`, name: `Malta` },
    { code: `MH`, name: `Marshall Islands` },
    { code: `MQ`, name: `Martinique` },
    { code: `MR`, name: `Mauritania` },
    { code: `MU`, name: `Mauritius` },
    { code: `YT`, name: `Mayotte` },
    { code: `MX`, name: `Mexico` },
    { code: `FM`, name: `Micronesia (Federated States of)` },
    { code: `MD`, name: `Moldova` },
    { code: `MC`, name: `Monaco` },
    { code: `MN`, name: `Mongolia` },
    { code: `ME`, name: `Montenegro` },
    { code: `MS`, name: `Montserrat` },
    { code: `MA`, name: `Morocco` },
    { code: `MZ`, name: `Mozambique` },
    { code: `MM`, name: `Myanmar` },
    { code: `NA`, name: `Namibia` },
    { code: `NR`, name: `Nauru` },
    { code: `NP`, name: `Nepal` },
    { code: `NL`, name: `Netherlands` },
    { code: `NC`, name: `New Caledonia` },
    { code: `NZ`, name: `New Zealand` },
    { code: `NI`, name: `Nicaragua` },
    { code: `NE`, name: `Niger` },
    { code: `NG`, name: `Nigeria` },
    { code: `NU`, name: `Niue` },
    { code: `NF`, name: `Norfolk Island` },
    { code: `KP`, name: `North Korea` },
    { code: `MK`, name: `North Macedonia` },
    { code: `MP`, name: `Northern Mariana Islands` },
    { code: `NO`, name: `Norway` },
    { code: `OM`, name: `Oman` },
    { code: `PK`, name: `Pakistan` },
    { code: `PW`, name: `Palau` },
    { code: `PS`, name: `Palestine, State of` },
    { code: `PA`, name: `Panama` },
    { code: `PG`, name: `Papua New Guinea` },
    { code: `PY`, name: `Paraguay` },
    { code: `PE`, name: `Peru` },
    { code: `PH`, name: `Philippines` },
    { code: `PN`, name: `Pitcairn` },
    { code: `PL`, name: `Poland` },
    { code: `PT`, name: `Portugal` },
    { code: `PR`, name: `Puerto Rico` },
    { code: `QA`, name: `Qatar` },
    { code: `RE`, name: `Réunion` },
    { code: `RO`, name: `Romania` },
    { code: `RU`, name: `Russia` },
    { code: `RW`, name: `Rwanda` },
    { code: `BL`, name: `Saint Barthélemy` },
    { code: `SH`, name: `Saint Helena, Ascension and Tristan da Cunha` },
    { code: `KN`, name: `Saint Kitts and Nevis` },
    { code: `LC`, name: `Saint Lucia` },
    { code: `MF`, name: `Saint Martin (French part)` },
    { code: `PM`, name: `Saint Pierre and Miquelon` },
    { code: `VC`, name: `Saint Vincent and the Grenadines` },
    { code: `WS`, name: `Samoa` },
    { code: `SM`, name: `San Marino` },
    { code: `ST`, name: `Sao Tome and Principe` },
    { code: `SA`, name: `Saudi Arabia` },
    { code: `SN`, name: `Senegal` },
    { code: `RS`, name: `Serbia` },
    { code: `SC`, name: `Seychelles` },
    { code: `SL`, name: `Sierra Leone` },
    { code: `SG`, name: `Singapore` },
    { code: `SX`, name: `Sint Maarten (Dutch part)` },
    { code: `SK`, name: `Slovakia` },
    { code: `SI`, name: `Slovenia` },
    { code: `SB`, name: `Solomon Islands` },
    { code: `SO`, name: `Somalia` },
    { code: `ZA`, name: `South Africa` },
    { code: `GS`, name: `South Georgia and the South Sandwich Islands` },
    { code: `KR`, name: `South Korea` },
    { code: `SS`, name: `South Sudan` },
    { code: `ES`, name: `Spain` },
    { code: `LK`, name: `Sri Lanka` },
    { code: `SD`, name: `Sudan` },
    { code: `SR`, name: `Suriname` },
    { code: `SJ`, name: `Svalbard and Jan Mayen` },
    { code: `SE`, name: `Sweden` },
    { code: `CH`, name: `Switzerland` },
    { code: `SY`, name: `Syria` },
    { code: `TW`, name: `Taiwan` },
    { code: `TJ`, name: `Tajikistan` },
    { code: `TZ`, name: `Tanzania` },
    { code: `TH`, name: `Thailand` },
    { code: `TL`, name: `Timor-Leste` },
    { code: `TG`, name: `Togo` },
    { code: `TK`, name: `Tokelau` },
    { code: `TO`, name: `Tonga` },
    { code: `TT`, name: `Trinidad and Tobago` },
    { code: `TN`, name: `Tunisia` },
    { code: `TR`, name: `Turkey` },
    { code: `TM`, name: `Turkmenistan` },
    { code: `TC`, name: `Turks and Caicos Islands` },
    { code: `TV`, name: `Tuvalu` },
    { code: `UG`, name: `Uganda` },
    { code: `UA`, name: `Ukraine` },
    { code: `AE`, name: `United Arab Emirates` },
    { code: `GB`, name: `United Kingdom` },
    { code: `UM`, name: `United States Minor Outlying Islands` },
    { code: `US`, name: `United States of America` },
    { code: `UY`, name: `Uruguay` },
    { code: `UZ`, name: `Uzbekistan` },
    { code: `VU`, name: `Vanuatu` },
    { code: `VE`, name: `Venezuela` },
    { code: `VN`, name: `Vietnam` },
    { code: `VG`, name: `Virgin Islands (British)` },
    { code: `VI`, name: `Virgin Islands (U.S.)` },
    { code: `WF`, name: `Wallis and Futuna` },
    { code: `EH`, name: `Western Sahara` },
    { code: `YE`, name: `Yemen` },
    { code: `ZM`, name: `Zambia` },
    { code: `ZW`, name: `Zimbabw` },
  ];

  /*
   * Afficher distinctements l'espace disque occupée par
   * @params:
   * size (int) -> Permet d'indiquer la taille de l'éléments.
   * base_format(string) -> Indique le format de la size par défaut
   * oc -> Octet
   * ko -> kilooctet.
   * mo -> Megaoctet
   */
  public display_readable_size(size: any, base_format: any = 'oc'): any {
    // DOC: Part des octet et convertir l'éléments sur cette base.
    if (base_format == 'oc') {
      if (size < 1024 * 1024) {
        return `${Math.round((size / 1024) * 100) / 100}Ko`;
      } else {
        return `${Math.round((size / (1024 * 1024)) * 100) / 100}Mo`;
      }
    }

    // -> ko
    // -> mo
  }

  /*
   * In Always display pages scroll to  top;
   */
  public scrollToTop(): void {
    document.body.scrollTop = 0;
  }

  /*
   * @description:
   */
  public scrollMovingSweet(scrollTop: number, contain: ElementRef): void {
    let diff = scrollTop - contain.nativeElement.scrollTop;
    if (diff > 0) {
      this.scrollToScrollTop(+50, scrollTop, contain);
    } else {
      this.scrollToScrollTop(-50, scrollTop, contain);
    }
  }

  /*
   * @description:
   */
  private hold_scrolltop: number | undefined = undefined;
  private scrollToScrollTop(
    scroll: number,
    scrollTop: number,
    contain: ElementRef
  ): void {
    setTimeout(() => {
      contain.nativeElement.scrollTop += scroll;

      // -> Quitter la boucle si l'ont ne peut pas atteindre la zone de la page indiquer
      if (
        this.hold_scrolltop !== undefined &&
        this.hold_scrolltop === contain.nativeElement.scrollTop
      ) {
        return;
      }

      this.hold_scrolltop = contain.nativeElement.scrollTop;
      this.scrollToScrollTop(scroll, scrollTop, contain);
    }, 20);
  }

  /*
   * @description: Autorize scroll
   */
  public autorizeScroll(): void {
    document.getElementsByTagName('body')[0].style.overflowY = `auto`;
  }

  /*
   * @description: Bloque scroll;
   */
  public blockScroll(): void {
    document.getElementsByTagName('body')[0].style.overflowY = `hidden`;
  }

  /*
   * @description:
   */
  public stringIsEmpty(string: string): boolean {
    if (string === undefined || string === null) {
      return true;
    }
    string = (string as any).replaceAll(/\s/g, '');
    if (string.length === 0) {
      return true;
    }
    return false;
  }

  /*
   * @description:
   */
  public navigateLink(link: any): any {
    if (typeof link === 'string') {
      alert('link width url');
    } else if (typeof link === 'object') {
      alert('object');
    }
  }

  /*
   * @description:
   */
  public navigateByAnchorLink(anchorId: string): void {
    const anchor: any = document.querySelector(`${anchorId}`);
    if (anchor === null) {
      return;
    }

    const app_container: any = document.getElementById('app_container');
    if (app_container === null) {
      return;
    }

    app_container.scroll(0, anchor.offsetTop);
  }

  /*
   * @description:
   */
  public calculateRatio(coords: any): string {
    /* euclidean GCD (feel free to use any other) */
    function gcd(a: any, b: any): any {
      if (b > a) {
        let temp: any = a;
        a = b;
        b = temp;
      }
      while (b !== 0) {
        let m: any = a % b;
        a = b;
        b = m;
      }
      return a;
    }

    /* ratio is to get the gcd and divide each component by the gcd, then return a string with the typical colon-separated value */
    function ratio(x: any, y: any): any {
      let c: any = gcd(x, y);
      return '' + x / c + ':' + y / c;
    }

    return ratio(coords.x, coords.y);
  }

  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{RANDOM}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  /*
   * @description:
   */
  public randomList(
    sizeResponse: number = 12,
    listChoices: string = '0123456789abcdefghijklmnopqrstuvwxyz'
  ): string {
    let response = '';
    for (let i = 0; i < sizeResponse; i++) {
      const index = Math.floor(Math.random() * listChoices.length - 1 + 1);
      response += listChoices[index];
    }
    return response;
  }

  /*
   * Générer un random de chiffre hexadecimal.
   * Peut servir par exemple à générer des couleurs hexadecimal aléatoire.
   */
  public randomHexa(sizeResponse: number = 6): string {
    const listChoices: string = '0987654321ABCDEF';
    return this.randomList(sizeResponse, listChoices);
  }

  /*
   *
   */
  public navigateByUrl(pathname: any): any {
    this.router.navigateByUrl(pathname);
  }

  /*
   * @description: Changer l'extension de l'url ou du fichier obtenue
   */
  public changeExtensionFileOrUrl(fileOrUrl: any, newExtension: any): string {
    let splittedUrl = fileOrUrl.split('.');
    splittedUrl[splittedUrl.length - 1] = newExtension;
    return splittedUrl.join('.');
  }

  /*
   * @description: Je renvoit ici le nom de mon browser
   */
  public getBrowserName(): string {
    let name = `Unknown`;
    if (navigator.userAgent.indexOf(`MSIE`) !== -1) {
      name = `MSIE`;
    } else if (navigator.userAgent.indexOf(`Firefox`) !== -1) {
      name = `Firefox`;
    } else if (navigator.userAgent.indexOf(`Opera`) !== -1) {
      name = `Opera`;
    } else if (navigator.userAgent.indexOf(`Chrome`) !== -1) {
      name = `Chrome`;
    } else if (navigator.userAgent.indexOf(`Safari`) !== -1) {
      name = `Safari`;
    }
    return name;
  }

  /*
   * @description:
   */
  public isSafari(): boolean {
    return this.getBrowserName() === `Safari`;
  }

  /*
   * Convertir la date reçut en date envoyers.
   * @description: Adapter cette éléments pour chaque navigateur.
   */
  public convertIso861__to_date(iso8601: any): Date {
    if (this.getBrowserName() === `Safari`) {
      return new Date(iso8601.replace(/-/g, `/`));
    }
    return new Date(iso8601);
  }

  /*
   * Faire le travail inverse;
   */
  public convertDate__toIso8601(date: any): string {
    return date.toISOString();
  }

  /*
   * @description: Modifier
   */
  public templateFunction(messageText: string, ctx: any): string {
    for (let key of Object.keys(ctx)) {
      messageText = messageText.replace(`{{${key}}}`, ctx[key]);
    }
    return messageText;
  }

  /*
   * @description:
   */
  public isIosDevice(): boolean {
    return (
      [
        `iPad Simulator`,
        `iPhone Simulator`,
        `iPod Simulator`,
        `iPad`,
        `iPhone`,
        `iPod`,
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes(`Mac`) && `ontouchend` in document)
    );
  }

  /*
   * @description: Il s'agit de savoir s'il s'agit de chrome dans iphones.
   */
  public isChromeInIos(): boolean {
    if (this.isIosDevice()) {
      return !this.isSafari();
    }
    return false;
  }

  /*
   * @description: est un chiffre pair.
   */
  public isPair(n: any): boolean {
    return n & 1 ? false : true;
  }

  /*
   * @description: Il s'agit ici d'un petit languages de template destiner à la générations des éléments restant
   */
  public localizeFormat(message: any, params: any): void {}

  /*
   * @description: Permet d'indiquer fonctionnellement que la donnée reçut est incorrect.
   */
  public isUrl(textMatch: string): any {
    let pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(textMatch);
  }

  /*
   * @description:
   */
  public addStyle(styleString: any) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }

  /*
   * @description: Calculer la distance qui existe entre l'element au sein de la page est le reste.
   */
  public screenBottom(nativeElement: any): number {
    const coords = nativeElement.getBoundingClientRect();
    const screenBottom = coords.y - window.innerHeight;
    return screenBottom;
  }

  /*
   * @description: Me renvoyer la bonne valeur en width et en height.
   */
  public aspect_ratio(nativeElement: any, ratio: any): void {
    const spitRatio = ratio.split(`/`);

    (window as any).aspect_ratio = nativeElement;

    // nativeElement.offsetHeight = nativeElement.offsetWidth;
    nativeElement.style.height = `${nativeElement.offsetWidth}px`;
  }

  /*
   * @description:
   */
  public alert(text: any): void {
    alert(text);
  }

  /*
   * @description:
   */
  public console_log(text: any): void {
    console.error(text);
  }

  /*
   * @
   */
  public ready(fn: any) {
    document.addEventListener('DOMContentLoaded', fn);
  }

  /*
   * @description: Attendre que la class ait ete creer pour ensuite realiser toute les action inimaginable.
   */
  public wait_class_create(cll: string, callback: Function): void {
    setTimeout(() => {
      const anchor: HTMLElement | null = document.getElementById(cll);
      if (anchor === null) {
        return this.wait_class_create(cll, callback);
      }
      callback();
    }, 10);
  }

  /*
   * @description: Verifier si les deux element sont parfaitement egal.
   */
  public checkObjEqual(obj1: any, obj2: any): boolean {
    for (let key in obj1) {
      if (!(key in obj2)) {
        return false;
      }

      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  /**
   * @description: Permet de savoir si l'element est dans le viewport.
   */
  public isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * @description: Overflow scroll is activated on the element.
   */
  public isOverflowScroll(element: any): boolean {
    // let 
    return element.scrollWidth > element.clientWidth || 
      element.scrollHeight > element.clientHeight;
  }

  /**
   * @description: 
   */
  public convertNumberToLetterVersion(number: number): string {
    let number_list = [
      `zero`,
      `one`,
      `two`,
      `three`,
      `four`,
      `five`,
      `six`,
      `seven`,
      `eight`,
      `nine`,
      `ten`,
    ];
    return number_list[number];
  }

  
  /**
   * @description:
   */
  public toTowerCase(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  /**
   * @description:
   */
  public get_host(): string {
    let host = window.location.host;
    return host.split(':')[0];
  }

  /**
   * @description: 
   */
  public isDev(): boolean {
    return this.get_host() === `localhost` || this.get_host() === `127.0.0.1`;
  }
}
