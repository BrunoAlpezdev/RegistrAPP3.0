import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Asistencias } from 'src/app/interfaces/asistencias';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detalle-cursos',
  templateUrl: './detalle-cursos.page.html',
  styleUrls: ['./detalle-cursos.page.scss'],
})
export class DetalleCursosPage implements OnInit {

  asistencias : any;

  constructor(private activateRoute: ActivatedRoute, private fire: FirebaseService, private translateService: TranslateService) { 
    this.langs = this.translateService.getLangs();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  ngOnInit() {
    ///this.activateRoute.paramMap.subscribe( paramMap => {
    ///  this.curso = this.servicio.obtenercurso(paramMap.get('id'))
    ///  console.log(paramMap.get('id'))
    ///})
    this.asistencias = this.obtenerAsistencias();
  }

  obtenerAsistencias() {
    this.fire.getCollection<Asistencias>('asistencias').subscribe(
      (res) => {
        console.log(res)
        this.asistencias=(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
