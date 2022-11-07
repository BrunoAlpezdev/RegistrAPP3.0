import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {

  nombre: string;
  correo: string;
  foto: string;
  perfill: any;
  constructor(private router: Router, private alerta: AlertController, private fire: FirebaseService) { }

  ngOnInit() {
    this.obtenerUsuarioAct();
  }
  
  ionViewWillEnter() {
    this.obtenerUsuarioAct();
  }

  async obtenerUsuarioAct(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.perfill = user  
      this.correo = this.perfill.email
    }
    
    if (this.perfill.displayName !== null){
      this.nombre = this.perfill.displayName
    } else {
      this.nombre = this.perfill.email
    }

    if (this.perfill.photoURL !== null) {
      this.foto = this.perfill.photoURL
    } else {
      this.foto = "./assets/person_box.png"
    }
  }


  async mensajeLogout() {
    const alert = await this.alerta.create({
      header: 'Cerrar Sesión',
      message: 'Esta Seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['/home']);
            this.fire.logout();
          },
        },
      ],
    });

    await alert.present();

  }

}
