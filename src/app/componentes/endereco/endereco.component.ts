import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CadastroEnderecoComponent } from "./cadastro-endereco/cadastro-endereco.component";

@Component({
  selector: 'enderecos',
  standalone: true,
  imports: [
    FormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    CommonModule,
    TableModule,
    CadastroEnderecoComponent
],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.scss'
})
export class EnderecoComponent {
  colunas: any= []
  enderecos: any= []
  @Input() pessoa: any
  constructor() {
  }

  ngOnInit(): void {
    this.colunas = [
      {header: 'ID', field: 'id', style: 'width: 50px'},
      {header: 'Rua', field: 'rua', style: 'width: 100px'},
      {header: 'Cidade', field: 'cidade', style: 'width: 80px'},
      {header: 'Estado', field: 'estado', style: 'width: 80px'},
      {header: 'CEP', field: 'cep', style: 'width: 50px'},
    ]
  }

  receberEnderecos(event: any) {

  }


  cadastrarEndereco() {
    
  }
  

}
