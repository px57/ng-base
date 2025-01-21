import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LibsService } from 'src/modules/tools/services/libs.service';
import { ComponentInjectorComponent } from 'src/modules/tools/components/component-injector/component-injector.component';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    ComponentInjectorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
  ],
  providers: [
    HttpService,
    LibsService,
    WebsocketService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    ComponentInjectorComponent,
  ],
})
export class ToolsModule { }
