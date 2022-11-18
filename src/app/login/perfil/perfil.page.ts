import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {

  nombre: string;
  correo: string;
  foto: string;
  perfill: any;

  constructor(private router: Router, private alerta: AlertController, private fire: FirebaseService, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  ngOnInit() {
    this.obtenerUsuarioAct();
    this.obtenerPalabras();
  }
  
  ionViewWillEnter() {
    this.obtenerUsuarioAct();
    this.obtenerPalabras();
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

  canVar : string;
  siVar : string;
  cerVar : string;
  msgVar : string;

  async obtenerPalabras() {
    this.translateService.get('Cancelar').subscribe(
      (res: string) => {
        console.log('nombre ->',res)
        this.canVar = res
      }
    )
    this.translateService.get('Si').subscribe(
      (res: string) => {
        console.log('si ->',res)
        this.siVar = res
      }
    )
    this.translateService.get('Cerrar Sesión').subscribe(
      (res: string) => {
        console.log('si ->',res)
        this.cerVar = res
      }
    )
    this.translateService.get('Está seguro/a de cerrar sesión?').subscribe(
      (res: string) => {
        console.log('si ->',res)
        this.msgVar = res
      }
    )
  }

  async mensajeLogout() {
    const alert = await this.alerta.create({
      header: this.cerVar,
      message: this.msgVar,
      buttons: [
        {
          text: this.canVar,
          role: 'cancel',
        },
        {
          text: this.siVar,
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
