import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CadastroEnderecoComponent } from "./cadastro-endereco/cadastro-endereco.component";
import { Endereco, Pessoa } from '../../classes/models';
import { EnderecoService } from '../../servicos/endereco.service';
import { HttpEventType } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

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
    CadastroEnderecoComponent,
],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.scss'
})
export class EnderecoComponent {
  colunas: any= []
  @Input() pessoa: Pessoa = new Pessoa()
  @ViewChild('cp_enderero') cp_endereco!: CadastroEnderecoComponent
  endereco: Endereco = new Endereco()
  enderecos: Endereco [] = []
  constructor(private _enderecoService: EnderecoService,
    private _msg: MessageService,
    private _confirm: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.colunas = [
      {header: 'ID', field: 'id', style: 'width: 200px'},
      {header: 'Rua', field: 'rua', style: 'width: 500px'},
      {header: 'Cidade', field: 'cidade', style: 'width: 300px'},
      {header: 'Estado', field: 'estado', style: 'width: 200px'},
      {header: 'CEP', field: 'cep', style: 'width: 100px'},
    ]

   
  }
  
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      console.log(this.pessoa);
      // if (this.pessoa.id) {
        this.listarEnderecoUsuario(this.pessoa.id)
      // }
    }, 1000) 
  }

  receberEnderecos(event: any) {
    console.log(event);
    this.endereco = event
  }

  limparForm() {
    this.cp_endereco?.limparFormEndereco()
  }

  listarEnderecoUsuario(id: any) {
    this._enderecoService.listarPorUsuario(id).subscribe({
      next: (res) => {
        if (res.type == HttpEventType.Response)
          this.enderecos = <Endereco[]>res.body
      }
    })
  }


  salvarcadastrarEndereco() {
    if (this.endereco.id) {
      this.endereco.id = this.pessoa?.id
      this._enderecoService.editar(this.endereco).subscribe({
        next: (res) => {
          if (res.type === HttpEventType.Sent)
            this._msg.add({severity: 'info', summary: 'Atualizando endereco...', sticky: true})
          if (res.type === HttpEventType.Sent) {
            this._msg.clear()
            this._msg.add({severity: 'success', summary: 'Endereço atualizado com sucesso!'})
          }
        },
        error: (error) => {
          this._msg.clear()
          this._msg.add({severity: 'error', summary: 'Falha na atualização do endereço', detail: error})
        }
      })
    } else {
      this.endereco.id = this.pessoa?.id
      this._enderecoService.cadastrar(this.endereco).subscribe({
        next: (res) => {
          if (res.type === HttpEventType.Sent)
            this._msg.add({severity: 'info', summary: 'Cadastrando endereco...', sticky: true})
          if (res.type === HttpEventType.Sent) {
            this._msg.clear()
            this._msg.add({severity: 'success', summary: 'Endereço cadastrado com sucesso!'})
          }
        },
        error: (error) => {
          this._msg.clear()
          this._msg.add({severity: 'error', summary: 'Falha no cadastro de endereço', detail: error})
        }
      })
    }
  }

  // deletar() {
  //   this._confirm.confirm({
  //     header: 'Exclução de endereços',
  //     message: 'Deseja excluir o endereço?',
  //     accept:
  //   })
  // }


  
  
  

}
