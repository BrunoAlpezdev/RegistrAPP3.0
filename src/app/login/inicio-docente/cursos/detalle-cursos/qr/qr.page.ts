import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  nombre:string;

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get("name")
  }

}
