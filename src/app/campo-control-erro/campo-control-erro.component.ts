import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css'],
  host: { 'id': 'campo-control-erro-unique' } // adicione um ID único
})
export class CampoControlErroComponent implements OnInit {

  @Input() msgErro!: string;
  @Input() mostrarErro!: boolean;

  constructor() { }

  ngOnInit() {
  }

}
