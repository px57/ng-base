import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  /**
   * @description:
   */
  @Input()
  public type: 'single' | 'with_cross' = 'single';

  /**
   * @description:
   */
  @Input()
  public color: 'grey' | 'violet' | 'green' = 'grey';

  /**
   * @description:
   */
  @Input()
  public title: string = '';

  /**
   * @description:
   */
  @Input()
  public multiple_select: boolean = true;

  /**
   * @description:
   */
  @Input()
  public options: any[] = [];

  /**
   * @description:
   */
  @Output()
  public selected: EventEmitter<any> = new EventEmitter();

  /**
   * @description:
   */
  public opened: boolean = false;

  /**
   * @description:
   */
  public opened_timestamp: number = 0;

  /**
   * @description:
   */
  public selected_counter = 0;

  /**
   * @description:
   */
  public object_uuid = '';

  /**
   * @description:
   */
  public clickOutside: any;

  constructor() {}

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.selected_counter = this.selectedCounter();
    this.object_uuid = `filter_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * @description:
   */
  public unselect_all_options($event: any): void {
    $event.stopPropagation();
    this.options.forEach((option: any) => {
      option.selected = false;
    });
    this.selected_counter = this.selectedCounter();
  }

  /**
   * @description:
   */
  public open_filter(): void {
    this.opened = true;
    this.opened_timestamp = Date.now();

    if (this.clickOutside !== undefined) {
      document.removeEventListener('click', this.clickOutside);
    }

    // -> Define clickoutside event
    this.clickOutside = (event: any) => {
      if (this.opened_timestamp + 50 > Date.now()) {
        return;
      }

      const parentNode = event.target.parentNode;
      const parentNodeOfParentNode = parentNode.parentNode;

      try {
        if (
          parentNode.classList.contains('option_container') ||
          parentNodeOfParentNode.classList.contains('option_container')
        ) {
          return;
        }
      } catch (e) {
        document.removeEventListener('click', this.clickOutside);
        this.opened = false;
      }

      document.removeEventListener('click', this.clickOutside);
      this.opened = false;
    };

    // -> Add clickoutside event
    document.addEventListener('click', this.clickOutside);
  }

  /**
   * @description:
   */
  public close_filter(): void {
    this.opened = false;
  }

  /***
   * @description:
   */
  public select_option(option: any): void {
    if (!this.multiple_select) {
      this.options.forEach((option: any) => {
        option.selected = false;
      });
    }
    option.selected = true;
    this.title = option.name;
    this.selected_counter = this.selectedCounter();
    this.selected.emit(option);
  }

  /**
   * @description:
   */
  public selectedCounter(): number {
    return this.options.filter((option: any) => option.selected).length;
  }

  /**
   * @description:
   */
  public ngOnDestroy(): void {
    if (this.clickOutside !== undefined) {
      document.removeEventListener('click', this.clickOutside);
    }
  }

  /**
   * @description:
   */
  public showFilterTitle(): string {

    return this.title;
  }
}
