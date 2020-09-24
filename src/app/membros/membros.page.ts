import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Membros } from '../models/membros';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {
  idPartido: number;
  membros: Array<Membros> = [];
  constructor(public router: ActivatedRoute, private apiserv: ApiService) { }

  ngOnInit() {
    //console.log(this.router.snapshot.params.id);
    this.idPartido = this.router.snapshot.params.id;
    this.buscarMembrosDoPartido(this.idPartido);
  }
  public buscarMembrosDoPartido(idPartido: number): void {
    this.apiserv.getMembros(this.idPartido).subscribe(response => {
      console.log(response);
      this.membros = response.dados;
    });
  }
}
