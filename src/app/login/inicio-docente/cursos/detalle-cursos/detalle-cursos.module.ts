import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCursosPageRoutingModule } from './detalle-cursos-routing.module';

import { DetalleCursosPage } from './detalle-cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCursosPageRoutingModule
  ],
  declarations: [DetalleCursosPage]
})
export class DetalleCursosPageModule {}
