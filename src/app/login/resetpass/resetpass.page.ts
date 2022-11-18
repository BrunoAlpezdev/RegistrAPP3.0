import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  constructor(private alertController: AlertController, private fire: FirebaseService, private router: Router, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
  }

   
   ngOnInit() {
  }

  langs: string[] = [];

  
  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reestablecimiento',
      subHeader: '',
      message: 'Se ha enviado un codigo de reestablecimiento a su correo',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async olvidopass(email) {
    if ((email.value).length === 0) {

    }else {

      this.fire.recuperar(email.value)
      await this.presentAlert();
      await this.router.navigate(['home'])
    }
  }

}
