import { Component, OnInit } from '@angular/core';
import { MostarapiService } from '../services/mostararpi.service';

@Component({
  selector: 'app-strapip',
  templateUrl: './strapip.page.html',
  styleUrls: ['./strapip.page.scss'],
})
export class StrapipPage implements OnInit {

  personaje: any = []
  constructor(private servicio: MostarapiService) { }

  ngOnInit(){
    this.cargardata();
  }

  ionViewWillEnter(){
    this.cargardata();
  }

  cargardata(){
    this.servicio.obtenerpersonaje().subscribe(
      (res) => {
          console.log(res)
          this.personaje = res
      },
      (err) => {

      }
    )
  }
  eliminar(id : string){
    this.servicio.eliminarpersonaje(id).subscribe(
     (res) => {
        console.log(res)
        this.cargardata();
     },
     (err) => {

     }
    )
  }
  
}

