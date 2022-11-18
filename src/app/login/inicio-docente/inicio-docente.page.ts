import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Clase } from 'src/app/interfaces/clase';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-inicio-docente',
  templateUrl: './inicio-docente.page.html',
  styleUrls: ['./inicio-docente.page.scss'],
})
export class InicioDocentePage implements OnInit {

  constructor(private alerta: AlertController, private fire: FirebaseService, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }
  
  ngOnInit() {
    this.obtenerClases();
    this.validacion();
  }

  todolist = []
  usuarioid : any;
  usuariolog : any;


  validacion() {
    this.fire.obtenerUsuario().then(
      (resp)=>{
        this.usuariolog= resp.email;
        this.usuarioid= resp.displayName
      },
      (err) => {
        console.log(err);
      }
    )
  }


  obtenerClases() {
    this.fire.getCollection<Clase>('Clase').subscribe(
      (res) => {
        console.log(res)
        this.todolist=(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  
}
