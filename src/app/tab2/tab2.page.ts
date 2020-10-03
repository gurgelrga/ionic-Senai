import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComidaPage } from "../modal-comida/modal-comida.page";
import { ComidaService } from "../services/comida.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  public comidas = [];
  constructor(public modal: ModalController, public comida: ComidaService) {}

  ngOnInit() {
    this.getComidas();
  }
  async abrirModalCadastroComida() {
    const modal = await this.modal.create({
      component: ModalComidaPage,
    });
    return await modal.present();
  }
  public async getComidas() {
    this.comidas = await this.comida.getAll();
    console.log(this.comidas);
  }
  public async remover(key: number) {
    await this.getComidas();
    await this.comida.remove(key);
  }
  public async removerAll() {
    await this.getComidas();
    await this.comida.removeAll();
  }
}
