
import {
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { ComponentRef } from '@angular/core';


@Component({
  selector: 'component-injector',
  templateUrl: './component-injector.component.html',
  styleUrls: ['./component-injector.component.scss']
})
export class ComponentInjectorComponent implements OnInit, AfterViewInit, OnChanges {


  @ViewChild("container123", { read: ViewContainerRef }) container123!: ViewContainerRef;

  public componentRef!: ComponentRef<any>

  @Input()
  public component: any;

  /**
   * @description:
   */
  constructor(
    private resolver: ComponentFactoryResolver,
  ) { 
    
  }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.container123.createComponent<any>(this.component);
  }

  /**
   * @description: 
   */
  public ngAfterViewInit(): void {
    // this.loadComponent();
  }

  /**
   * @description:
   */
  public ngOnChanges(): void {
    // this.loadComponent();
  }
}

