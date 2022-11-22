import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getAuth } from 'firebase/auth';
import { Asistencias } from 'src/app/interfaces/asistencias';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detalle-cursos',
  templateUrl: './detalle-cursos.page.html',
  styleUrls: ['./detalle-cursos.page.scss'],
})
export class DetalleCursosPage implements OnInit {

  langs: string[] = [];
  clase : any;
  asistencias : any;
  asispath : string;
  constructor(private activateRoute: ActivatedRoute, private fire: FirebaseService, private translateService: TranslateService) { 
    this.langs = this.translateService.getLangs();
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( paramMap => {
      this.clase = paramMap.get('id')
      console.log(paramMap.get('id'))
    })

    this.obtenerAsis();
  }

  

  async obtenerAsis() {
    this.asispath = 'Clase/' + this.clase + '/Asistencias'
    console.log(this.asispath)
    this.fire.getCollection<Asistencias>(this.asispath).subscribe(
      (res) => {
        console.log(res)
        this.asistencias = []
        res.forEach( ( x ) => {

          this.asistencias.push( x );
      } );
      },
      (err) => {
        console.log(err)
      }
    )
  }




}
