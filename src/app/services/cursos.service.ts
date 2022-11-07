import { Injectable } from '@angular/core';
import { Cursos } from '../login/inicio-docente/cursos';



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }
  private cursos:Cursos[]=[
    {
      id : '1',
      nombre: 'PGY04D',
    },
    {
      id : '2',
      nombre : 'PGY009D',
    },
    {
      id : '3',
      nombre: 'MDY005D',
    },
    {
      id : '4',
      nombre: 'PGY001D',
    },
  ]

  obtenercursos() {
    return [...this.cursos]
  }

  obtenercurso(id: string) {
    return {
      ...this.cursos.find(aux => {
        return aux.id === id
      })
    }
  }

}
