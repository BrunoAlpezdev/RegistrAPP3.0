import { Component, OnInit } from '@angular/core';
import { Clase } from 'src/app/interfaces/clase';
import { CursosService } from 'src/app/services/cursos.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos =[]
  titulo = "CURSOS"
  constructor(private servicio:CursosService, private fire: FirebaseService) { }
  

  ngOnInit() {
    this.obtenerClases();
  }

  obtenerClases() {
    this.fire.getCollection<Clase>('Clase').subscribe(
      (res) => {
        console.log(res)
        this.cursos=(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
