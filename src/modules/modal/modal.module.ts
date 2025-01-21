import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchModalComponent } from './components/switch-modal/switch-modal.component';
import { SwitchModalService } from './services/switch-modal.service';
import { ToolsModule } from 'src/modules/tools/tools.module';

@NgModule({
  declarations: [
    SwitchModalComponent
  ],
  imports: [
    CommonModule,
    ToolsModule,
  ],
  providers: [
    SwitchModalService,
  ],
  exports: [
    SwitchModalComponent
  ]
})
export class ModalModule { }
