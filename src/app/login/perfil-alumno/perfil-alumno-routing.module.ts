import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAlumnoPage } from './perfil-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAlumnoPageRoutingModule {}
