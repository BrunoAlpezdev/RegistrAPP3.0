///<reference path="D:/pgy/3/RegistrAPP3.0/node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;


  longitudvar : any;
  latitudvar : any;

  longitudpos : any;
  latitudpos : any;

  latitudDuocMin: any = 33.5979;
  longitudDuocMin : any = 70.5769;

  latitudDuocMax: any = 33.5996;
  longitudDuocMax : any = 70.5819;

  mensajeCoordenadas : any;

  visibilidad : string;
  
  visibilidad2 : string = 'hidden';

  constructor(private renderer: Renderer2, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
    this.markers = [];
  }

  langs: string[] = [];

  changeLang(event) {
    this.translateService.use(event.detail.value);
    console.log(event.detail.value)
  }

  ngOnInit(): void {
    this.obtenerPalabrasPA();
  }
 
  msgPA : string
  suxPA : string

  async obtenerPalabrasPA() {
    this.translateService.get('Te encuentras dentro del rango de tu sede.').subscribe(
      (res: string) => {
        this.msgPA = res
      }
    )
    this.translateService.get('No se encuentra en su sede de DuocUC').subscribe(
      (res: string) => {
        this.suxPA = res
      }
    )
  }

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }



    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {
        
        this.longitudvar = position.coords.longitude;
        this.latitudvar = position.coords.latitude;
        console.log('longitude =>',position.coords.longitude)
        console.log('latitude =>',position.coords.latitude)

        this.latitudpos = this.latitudvar * -1
        this.longitudpos = this.longitudvar * -1
        await this.cargarMapa(position);
        if (this.latitudpos > this.latitudDuocMin && this.latitudpos < this.latitudDuocMax && this.longitudpos > this.longitudDuocMin && this.longitudpos < this.longitudDuocMax) {
          this.mensajeCoordenadas = this.msgPA
          this.visibilidad = 'visible';
        } else {
          this.mensajeCoordenadas = this.suxPA
          console.log(this.mensajeCoordenadas)
          this.visibilidad = 'hidden';
          this.visibilidad2 = 'visible';
        }

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };



  cargarMapa(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "Mi Ubicación",
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  };


}