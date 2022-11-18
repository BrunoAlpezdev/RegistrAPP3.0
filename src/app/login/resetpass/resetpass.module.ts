import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpassPageRoutingModule } from './resetpass-routing.module';

import { ResetpassPage } from './resetpass.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpassPageRoutingModule,
    TranslateModule
  ],
  declarations: [ResetpassPage]
})
export class ResetpassPageModule {}
