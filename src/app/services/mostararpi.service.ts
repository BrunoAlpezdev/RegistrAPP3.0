import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MostarapiService {

  
  API = "https://radiant-crag-33232.herokuapp.com/api/personajes"

  constructor(private cliente: HttpClient) { }

  obtenerpersonaje(){
    return this.cliente.get("https://radiant-crag-33232.herokuapp.com/api/personajes?populate=imagen")
  }

  eliminarpersonaje(id : string){
    return this.cliente.delete(`${this.API}/${id}`)
  }

}
