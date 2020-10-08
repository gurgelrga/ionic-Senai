import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComidaPage } from "../modal-comida/modal-comida.page";
import { ComidaService } from "../services/comida.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  public comidas = [];
  public carregando: any;

  constructor(
    public modal: ModalController,
    public comida: ComidaService,
    public loading: LoadingController
  ) {}

  async ngOnInit() {
    await this.getComidas();
  }

  async abrirModalCadastroComida() {
    await this.showCarregando();
    const modal = await this.modal.create({
      component: ModalComidaPage,
    });
    modal.onDidDismiss().then(async () => {
      await this.getComidas();
    });
    await this.fecharCarregando();
    return await modal.present();
  }
  // public async getComidas() {
  // await this.showCarregando();
  // this.comidas = await this.comida.getAll();
  //await this.fecharCarregando();
  //console.log(this.comidas);
  //}

  async getComidas(): Promise<void> {
    await this.showCarregando();
    setTimeout(async () => {
      this.comidas = await this.comida.getAll();
      await this.fecharCarregando();
    }, 2000);
  }

  public async remover(key: number) {
    await this.comida.remove(key);
    await this.getComidas();
  }
  public async editar(key: number) {
    await this.getComidas();
    await this.comida.getComida(key);
    const modal = await this.modal.create({
      component: ModalComidaPage,
      componentProps: {
        id: key,
      },
    });
    modal.onDidDismiss().then(async () => {
      await this.getComidas();
    });
    return await modal.present();
  }

  public async removerAll() {
    await this.getComidas();
    await this.comida.removeAll();
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
