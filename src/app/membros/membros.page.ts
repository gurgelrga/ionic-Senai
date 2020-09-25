import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Membros } from '../models/membros';
import { ApiService } from '../services/api.service';

import { ModalController } from '@ionic/angular';

import { ModalDeputadoPage } from '../modal-deputado/modal-deputado.page'

@Component({
  selector: 'app-membros',
  templateUrl: './membros.page.html',
  styleUrls: ['./membros.page.scss'],
})
export class MembrosPage implements OnInit {
  idPartido: number;
  membros: Array<Membros> = [];
  public load: boolean = false;


  constructor(public modal: ModalController, public router: ActivatedRoute, private apiserv: ApiService) { }

  ngOnInit() {
    this.load = true;
    //console.log(this.router.snapshot.params.id);
    this.idPartido = this.router.snapshot.params.id;
    this.buscarMembrosDoPartido(this.idPartido);


  }
  buscarMembrosDoPartido(idPartido: number): void {
    this.apiserv.getMembros(this.idPartido).subscribe(response => {
      console.log(response);
      this.membros = response.dados;
      this.load = false;
    });
  }
  async abrirModal(idDeputado: number) {
    const modal = await this.modal.create({
      component: ModalDeputadoPage,
      componentProps: { idDeputado },
    });
    return await modal.present();
  }
}
