import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Tempuser } from 'src/app/interfaces/tempuser';
import { GuardadoService } from 'src/app/services/guardado.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private fire: FirebaseService, private router: Router, private alertController: AlertController, private guard: GuardadoService, private translateService: TranslateService) { 
    this.langs = this.translateService.getLangs();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  ngOnInit() {
    this.obtenerPalabras();
    this.obtenerPalabrasPA();
  }

  correoPH : string;
  passPH : string;
  nombrePH : string;
  

  async obtenerPalabras() {
    this.translateService.get('alumno@duocuc.cl').subscribe(
      (res: string) => {
        this.correoPH = res
      }
    )
    this.translateService.get('Nombre').subscribe(
      (res: string) => {
        this.nombrePH = res
      }
    )
    this.translateService.get('Contraseña').subscribe(
      (res: string) => {
        this.passPH = res
      }
    )
  }

  msgPA : string
  creacionPA : string
  suxPA : string

  async obtenerPalabrasPA() {
    this.translateService.get('Cuenta Registrada en la base de datos').subscribe(
      (res: string) => {
        this.msgPA = res
      }
    )
    this.translateService.get('Creación de cuenta').subscribe(
      (res: string) => {
        this.creacionPA = res
      }
    )
    this.translateService.get('Se ha creado su cuenta').subscribe(
      (res: string) => {
        this.suxPA = res
      }
    )
  }

  async registrar(nombre, email, pass, docente) {
    try{
      const user = this.fire.registrar(email.value,pass.value)
      if (user) {
        console.log('User->',user)
        this.presentAlert();
        this.guard.GuardarFire(nombre.value,email.value,pass.value,docente.value)
        this.fire.mensaje(this.msgPA)
        console.log('value->',docente.value)
      } 
    }catch (error){
      console.log('Error->',error)
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.creacionPA,
      subHeader: '',
      message: this.suxPA,
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/login'])
  }


}
