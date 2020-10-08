import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ComidaService } from "../services/comida.service";
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-modal-comida",
  templateUrl: "./modal-comida.page.html",
  styleUrls: ["./modal-comida.page.scss"],
})
export class ModalComidaPage implements OnInit {
  @Input() id: number;
  public isEdit: boolean = false;
  public form: FormGroup;
  public carregando: any;
  constructor(
    public modal: ModalController,
    public formBuilder: FormBuilder,
    public comida: ComidaService,
    public loading: LoadingController,
    public toastControl: ToastController
  ) {
    this.form = this.formBuilder.group({
      nome: [""],
      tipo: [""],
      avaliacao: [""],
      horaEntrega: [""],
      dataEntrega: [""],
      isPimenta: [""],
    });
  }

  async ngOnInit() {
    if (this.id || this.id === 0) {
      await this.editarComida();
      this.isEdit = true;
    }
    // console.log(this.id);
  }
  async showMensagem() {
    let mensage: string = "Comida Cadastrada com Sucesso";
    if (this.isEdit) {
      mensage = "Comida Atualizada com Sucesso";
    }
    const toast = await this.toastControl.create({
      message: mensage,
      duration: 2000,
      color: "success",
    });

    toast.present();
  }
  public fecharModal(): void {
    this.modal.dismiss();
  }
  public async submitForm() {
    await this.showCarregando();
    //console.log(this.form.value);
    this.comida.salvarComida(this.form.value, this.id);
    await this.fecharCarregando();
    this.fecharModal();
    this.showMensagem();
  }
  public async editarComida() {
    await this.showCarregando();
    const edComida = await this.comida.getComida(this.id);
    // console.log(edComida);
    this.form.patchValue(edComida);
    await this.fecharCarregando();
    //this.fecharModal();
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
