import { Injectable } from '@angular/core';
import { Carrusel } from '../home/carrusel';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {

  constructor() { }

  private carrusel:Carrusel[]=[
    {
      id : '1',
      img: './assets/imgs/estudiante2.jpg',
      desc: 'Infórmate con nosotros. Tu futuro está a la vuelta de la esquina. Y en Duoc UC, estamos para orientarte.'
    },
    {
      id : '2',
      img : './assets/imgs/estudiante1.jpg',
      desc: 'Conoce todas las posibilidades para tu futuro. Contáctanos hoy en micarrera@duoc.cl y agenda una visita a tu colegio o empresa'
    },
    {
      id : '3',
      img : './assets/imgs/BelénAlmonacid_4-scaled.jpg',
      desc: 'Duocana se prepara a vivir desafiante competencia en Alemania'
    },
    {
      id : '4',
      img : './assets/imgs/header-conferencia.png',
      desc: 'Abiertas las inscripciones al taller Rutas formativo-laborales de mujeres en STEM'
    },
    {
      id : '5',
      img : './assets/imgs/header-bg-tp.png',
      desc: 'Conversatorio TP “Por una educación en tecnología sin estereotipos'
    },
  ]

  obtenerCarrusel() {
    return [...this.carrusel]
  }

}
