import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ComidaService } from "../services/comida.service";
@Component({
  selector: "app-modal-comida",
  templateUrl: "./modal-comida.page.html",
  styleUrls: ["./modal-comida.page.scss"],
})
export class ModalComidaPage implements OnInit {
  @Input() id: number;
  public isEdit: boolean = false;
  public form: FormGroup;
  constructor(
    public modal: ModalController,
    public formBuilder: FormBuilder,
    public comida: ComidaService
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
  public fecharModal(): void {
    this.modal.dismiss();
  }
  public submitForm() {
    //console.log(this.form.value);
    this.comida.salvarComida(this.form.value, this.id);
  }
  public async editarComida() {
    const edComida = await this.comida.getComida(this.id);
    console.log(edComida);
    this.form.patchValue(edComida);
  }
}
