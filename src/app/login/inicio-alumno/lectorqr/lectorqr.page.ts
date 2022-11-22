import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TranslateService } from '@ngx-translate/core';
import { Tempuser } from 'src/app/interfaces/tempuser';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthProvider, getAuth } from 'firebase/auth'; 
import * as firebase from "firebase/auth"
import { Asistencias } from 'src/app/interfaces/asistencias';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage implements OnDestroy {

  qrCodeString = 'codigo de qr'
  resultadoEscaneo: any;
  visibilidad : string;
  usuarios = [] ;

  constructor(private translateService: TranslateService, private fire : FirebaseService, private alertController: AlertController) { 
    this.langs = this.translateService.getLangs();
    this.verificarLogin();
    
  }

  ionViewWillEnter() {
    this.verificarLogin();
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }
  
  async checkPermission(){
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err)
    }
  }

  async startScan(){ 
    try {
      const permiso = await this.checkPermission();
      if (!permiso) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.visibilidad = 'hidden';
      const resultado = await BarcodeScanner.startScan();
      console.log(resultado);
      if (resultado?.hasContent) {
        this.resultadoEscaneo = resultado.content;
        BarcodeScanner.showBackground();
        document.querySelector('body').classList.remove('scanner-active');
        this.visibilidad = 'visible';
        console.log(this.resultadoEscaneo);
        this.presentAlert();
        this.actAsis();
      }
    } catch (err) {
      console.log(err);
      this.stopScan();
    }
  }

  data : Asistencias
  asispath : string;

  async actAsis() {
    this.data ={
      id : this.usuarioid,
      nombre :this.usuarioname,
      nuas : 1,
      porcentaje : 1
    }
    this.asispath = 'Clase/' + this.resultadoEscaneo + '/Asistencias'
    this.fire.createDoc(this.data,this.asispath,this.usuarioid)
  }

  usuarioname : string;
  usuarioid : any;
  
  async verificarLogin(){
    const auth = getAuth()
    this.usuarioname = auth.currentUser.email;
    this.usuarioid = auth.currentUser.uid;
    console.log(this.usuarioid,' - ',this.usuarioname);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'asistencia registrada',
      buttons: ['OK'],
    });

    await alert.present();
  }

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.visibilidad = 'visible';
  }

  ngOnDestroy() {
    this.stopScan();
  }

}
