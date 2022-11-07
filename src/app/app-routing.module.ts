import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./login/resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./login/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./login/inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule)
  },
  {
    path: 'inicio-docente',
    loadChildren: () => import('./login/inicio-docente/inicio-docente.module').then( m => m.InicioDocentePageModule)
  },
  {
    path: 'cursos',
    //loadChildren: () => import('./personajes/personajes.module').then( m => m.PersonajesPageModule)
    children: [
      {
        path: '',
        loadChildren: () => import('./login/inicio-docente/cursos/cursos.module').then( m => m.CursosPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./login/inicio-docente/cursos/detalle-cursos/detalle-cursos.module').then( m => m.DetalleCursosPageModule)
      }
    ]
  },
  {
    path: 'qr',
    loadChildren: () => import('./login/inicio-docente/cursos/detalle-cursos/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./login/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfil-alumno',
    loadChildren: () => import('./login/perfil-alumno/perfil-alumno.module').then( m => m.PerfilAlumnoPageModule)
  },
  {
    path: 'lectorqr',
    loadChildren: () => import('./login/inicio-alumno/lectorqr/lectorqr.module').then( m => m.LectorqrPageModule)
  },
  {
    path: 'strapip',
    loadChildren: () => import('./strapip/strapip.module').then( m => m.StrapipPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
