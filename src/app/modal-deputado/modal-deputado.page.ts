import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deputado',
  templateUrl: './modal-deputado.page.html',
  styleUrls: ['./modal-deputado.page.scss'],
})
export class ModalDeputadoPage implements OnInit {

  @Input() idDeputado: number;

  constructor(public modal: ModalController) { }

  ngOnInit() {
    console.log(this.idDeputado);

    //setTimeout(() => {
    //  this.modal.dismiss();
    //  }, 3000);

  }

  public fecharModal(): void {
    this.modal.dismiss();
  }

}
