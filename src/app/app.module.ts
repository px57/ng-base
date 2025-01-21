import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// ------------------------------ [module] ------------------------------
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ------------------------------ [component] ------------------------------

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// [SERVICES]
import { DatetimeService } from 'src/app/services/datetime.service';
import { GlobalsService } from 'src/app/services/globals.service';

import { BalanceService } from './services/balance.service';
import { FileService } from './services/file.service';

// import { SwitchModalComponent } from './tools/switch-modal/switch-modal.component';

import { GlobalResolver } from 'src/resolvers/global-resolver';

import { UploadmanagerModule } from './../modules/uploadmanager/uploadmanager.module';
import { FormModule } from 'src/modules/form/form.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { ToolsModule } from 'src/modules/tools/tools.module';
import { ChatRoomModule } from 'src/modules/chatroom/chatroom.module'; 
import { ModalModule } from 'src/modules/modal/modal.module';

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        UploadmanagerModule,
        FormModule,
        ProfileModule,
        ToolsModule,
        ChatRoomModule,
        ModalModule], providers: [
        DatetimeService,
        GlobalsService,
        BalanceService,
        FileService,
        GlobalResolver,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
