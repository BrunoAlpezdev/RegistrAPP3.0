import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(private servicio:CursosService, private fire: FirebaseService, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
   }
  

  ngOnInit() {
    this.obtenerClases();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  obtenerClases() {
    this.fire.getCollection<Clase>('Clase').subscribe(
      (res) => {
        console.log(res)
        this.cursos= []

        res.forEach( ( x )  => {

          this.cursos.push( x )
        })

      },
      (err) => {
        console.log(err)
      }
    )
  }

}
