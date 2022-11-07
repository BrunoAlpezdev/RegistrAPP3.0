import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrapipPageRoutingModule } from './strapip-routing.module';

import { StrapipPage } from './strapip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrapipPageRoutingModule
  ],
  declarations: [StrapipPage]
})
export class StrapipPageModule {}
