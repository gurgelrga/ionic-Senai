import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Partido } from '../models/partido';
import { ApiService } from '../services/api.service';
import { LoadingController } from "@ionic/angular";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public partidos: Array<Partido> = [];
  public page: number = 1;
  public links: Array<any> = [];
  public carregando: any;

  constructor(public apiService: ApiService, public loading: LoadingController
  ) { }


  ngOnInit() {
    this.listarPartido(this.page);
  }

  async listarPartido(page: number) {
    await this.showCarregando();
    this.apiService.getPartidos(page).subscribe(response => {
      this.partidos = response.dados;
      this.links = response.links;
      this.fecharCarregando();
      //console.log(response.dados);
    })
  }
  proximaPagina(): void {
    this.listarPartido(++this.page);
  }
  anteriorPagina(): void {
    this.listarPartido(--this.page);
  }
  verificarSeTemProximaPagina(): boolean {
    const verificacao = this.links.filter((link) => {
      return link.rel === 'next';
    });
    return verificacao.length > 0;
  }
  async showCarregando() {
    this.carregando = await this.loading.create({
      message: "Aguarde...",
    });
    await this.carregando.present();
  }

  async fecharCarregando() {
    await this.carregando.dismiss();
  }

}

