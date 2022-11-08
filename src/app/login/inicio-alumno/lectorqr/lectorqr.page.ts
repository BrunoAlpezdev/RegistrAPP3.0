import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage implements OnDestroy {

  qrCodeString = 'codigo de qr'
  resultadoEscaneo: any;
  visibilidad : string;

  constructor() { }

  

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
      }
    } catch (err) {
      console.log(err);
      this.stopScan();
    }
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
