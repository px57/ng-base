import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// ------------------------------ [module] ------------------------------
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ------------------------------ [component] ------------------------------

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './nav/header/header.component';
import { PlayMenuComponent } from './nav/play-menu/play-menu.component';
import { PlayButtonComponent } from './nav/play-menu/play-button/play-button.component';
import { PlayTokenComponent } from './nav/play-menu/play-token/play-token.component';
import { JackpotComponent } from './jackpot/jackpot.component';
import { TokenComponent } from './tools/token/token.component';
import { CentralButtonComponent } from './nav/central-button/central-button.component';
import { FirstLetterBoldTextComponent } from './tools/first-letter-bold-text/first-letter-bold-text.component';
import { ControllerComponent } from './tools/controller/controller.component';

// [SERVICES]
import { DatetimeService } from 'src/app/services/datetime.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { PlayroomService } from 'src/app/services/playroom.service';

import { BalanceService } from './services/balance.service';
import { FileService } from './services/file.service';

import { TicketsListComponent } from './tickets/tickets-list/tickets-list.component';
import { LuckLetterComponent } from './tools/luck-letter/luck-letter.component';
import { TicketsDrawComponent } from './tickets/tickets-draw/tickets-draw.component';
// import { SwitchModalComponent } from './tools/switch-modal/switch-modal.component';
import { HomeComponent } from './nav/home/home.component';
import { GlobalResolver } from 'src/resolvers/global-resolver';
import { HeaderProfileDropdownComponent } from './nav/header-profile-dropdown/header-profile-dropdown.component';
import { GoldNumberComponent } from './tools/gold-number/gold-number.component';
import { WinnerListComponent } from './nav/winner-list/winner-list.component';
import { HeaderDropdownGobackComponent } from './nav/header-profile-dropdown/header-dropdown-goback/header-dropdown-goback.component';
import { FaqComponent } from './profile/faq/faq.component';
import { TermsComponent } from './profile/terms/terms.component';
import { PrivacyComponent } from './profile/privacy/privacy.component';
import { AboutUsComponent } from './profile/about-us/about-us.component';

import { TicketsRotateLineComponent } from './tickets/tickets-rotate-line/tickets-rotate-line.component';
import { GameOverComponent } from './game-over/game-over.component';

import { UploadmanagerModule } from './../modules/uploadmanager/uploadmanager.module';
import { FormModule } from 'src/modules/form/form.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { ToolsModule } from 'src/modules/tools/tools.module';
import { ChatRoomModule } from 'src/modules/chatroom/chatroom.module'; 
import { ModalModule } from 'src/modules/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayMenuComponent,
    PlayButtonComponent,
    PlayTokenComponent,
    JackpotComponent,
    TokenComponent,
    CentralButtonComponent,
    FirstLetterBoldTextComponent,
    ControllerComponent,
    TicketsListComponent,
    LuckLetterComponent,
    TicketsDrawComponent,
    // SwitchModalComponent,
    HomeComponent,
    HeaderProfileDropdownComponent,
    GoldNumberComponent,
    WinnerListComponent,
    HeaderDropdownGobackComponent,
    FaqComponent,
    TermsComponent,
    PrivacyComponent,
    AboutUsComponent,
    TicketsRotateLineComponent,
    GameOverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    ModalModule,
  ],
  providers: [
    DatetimeService,
    GlobalsService,
    PlayroomService,
    WebsocketService,
    BalanceService,
    FileService,
    GlobalResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
