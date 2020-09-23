import { Component, OnInit, Input } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-button-go-to-link',
  templateUrl: './button-go-to-link.component.html',
  styleUrls: ['./button-go-to-link.component.scss'],
})
export class ButtonGoToLinkComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  @Input() idPartido: number;






  constructor() { }

  ngOnInit() { }

}
