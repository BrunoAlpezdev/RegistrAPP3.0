import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCursosPage } from './detalle-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCursosPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCursosPageRoutingModule {}
