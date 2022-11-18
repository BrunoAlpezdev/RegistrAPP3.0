import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioDocentePageRoutingModule } from './inicio-docente-routing.module';

import { InicioDocentePage } from './inicio-docente.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioDocentePageRoutingModule,
    TranslateModule
  ],
  declarations: [InicioDocentePage]
})
export class InicioDocentePageModule {}
