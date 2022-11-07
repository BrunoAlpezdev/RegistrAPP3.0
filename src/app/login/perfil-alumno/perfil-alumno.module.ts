import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAlumnoPageRoutingModule } from './perfil-alumno-routing.module';

import { PerfilAlumnoPage } from './perfil-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAlumnoPageRoutingModule
  ],
  declarations: [PerfilAlumnoPage]
})
export class PerfilAlumnoPageModule {}
