import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage
  },
  {
    path: 'detalle-cursos',
    loadChildren: () => import('./detalle-cursos/detalle-cursos.module').then( m => m.DetalleCursosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosPageRoutingModule {}
