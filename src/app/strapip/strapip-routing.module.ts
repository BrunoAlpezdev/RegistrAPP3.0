import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrapipPage } from './strapip.page';

const routes: Routes = [
  {
    path: '',
    component: StrapipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrapipPageRoutingModule {}
