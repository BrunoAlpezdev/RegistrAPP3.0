import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioAlumnoPage } from './inicio-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: InicioAlumnoPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioAlumnoPageRoutingModule {}
