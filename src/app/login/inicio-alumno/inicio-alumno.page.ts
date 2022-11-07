import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Clase } from 'src/app/interfaces/clase';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getAuth } from "firebase/auth";
import { Tempuser } from 'src/app/interfaces/tempuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {


  constructor(private alerta: AlertController, private fire: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.validacion();
    this.obtenerClases();
  }
  
  ionViewWillEnter() {
    this.validacion();
    this.obtenerClases();
  }

  todolist = []
  usuarioid : any;
  usuariolog : any;
  
  
  validacion() {
    this.fire.obtenerUsuario().then(
      (resp)=>{
        if (resp.emailVerified){
          this.usuariolog= resp.email;
          this.usuarioid= resp.displayName;
        } else {
          this.mensajeError();
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  async mensajeError(){
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Para poder usar la app, debe validar el correo',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
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
