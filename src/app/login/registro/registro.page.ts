import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Tempuser } from 'src/app/interfaces/tempuser';
import { GuardadoService } from 'src/app/services/guardado.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private fire: FirebaseService, private router: Router, private alertController: AlertController, private guard: GuardadoService) { }

  ngOnInit() {
  }

  async registrar(nombre, email, pass, docente) {
    try{
      const user = this.fire.registrar(email.value,pass.value)
      if (user) {
        console.log('User->',user)
        this.presentAlert();
        this.guard.GuardarFire(nombre.value,email.value,pass.value,docente.value)
        this.fire.mensaje('Cuenta Registrada en la base de datos')
        console.log('value->',docente.value)
      } 
    }catch (error){
      console.log('Error->',error)
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Creación de cuenta',
      subHeader: '',
      message: 'Se ha creado su cuenta',
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/login'])
  }


}
