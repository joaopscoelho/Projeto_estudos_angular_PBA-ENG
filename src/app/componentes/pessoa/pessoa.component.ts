import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FilterPessoa } from '../../classes/filters';
import { Pessoa } from '../../classes/models';
import { PessoaService } from '../../servicos/pessoa.service';
import { GuidedTourModule } from 'ngx-guided-tour';


@Component({
  selector: 'pessoa',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    GuidedTourModule,
  ],
  providers: [],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.scss'
})

export class PessoaComponent {
  filtro: FilterPessoa = new FilterPessoa()
  maxDate: Date = new Date()

  cols: any [] = []
  pessoas: Pessoa [] = []
  constructor(private _pessoaService: PessoaService,
    private _router: Router,
    private _confirm: ConfirmationService,
    private _msg: MessageService) {
    this.criarColunas()
  }

  ngOnInit(): void {
    this.carregarLista()
  }

  pesquisarPessoa() {
    this._pessoaService.pesquisar(this.filtro).subscribe({
      next: (res) => {
        if (res.type === HttpEventType.Sent) {
          this._msg.add({severity: 'info', summary: 'Pesquisando pessoa...', sticky: true})
        }
        if (res.type === HttpEventType.Response) {
          setTimeout(() => {
            this._msg.clear()
            this._msg.add({severity: 'success', summary: 'A pesquisa foi um sucesso', sticky: true})
          }, 1000)
        }
      },
      error:(error) => {
        this._msg.add({severity: 'error', summary: 'Falha na pesquisa de pessoa', detail: error})
      }
    })
  }

  carregarLista() {
    this._pessoaService.pesquisar().subscribe({
      next: (res) => {
        if (res.type === HttpEventType.Response){
          console.log('Pessoas: ', res.body);
          
          this.pessoas = <Pessoa[]> res.body
        }
      }
    })
  }

  criarColunas() {
    this.cols = [
      {header: 'ID', field: 'id', style: 'width: 50px'},
      {header: 'Nome', field: 'nome', style: 'width: 500px'},
      {header: 'CPF', field: 'cpf', style: 'width: 150px'},
      {header: 'Data nascimento', field: 'dataNascimento', style: 'width: 150px'},
      {header: 'Email', field: 'email', style: 'width: 400px'}
    ]
  }

  cadastrarPessoa() {
    this._router.navigate(['pessoa/cadastrar'])
  }

  editarPessoa(event: any) {
    this._router.navigate(['pessoa/editar', event?.id])
  }

  deletarPessoa(event: any) {
    this._confirm.confirm({
      header: 'Exclução de pesssoa',
      message: `Deseja excluir a pessoa ${event?.nome}?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      key: 'key_delete_pessoa',
      accept: () => {
          this._pessoaService.deletar(event?.id).subscribe({
            next: (res) => {
              if (res.type === HttpEventType.Sent) {
                this._msg.add({severity: 'info', summary: 'Excluindo pesssoa, aguarde...', sticky: true})
              }
              if (res.type === HttpEventType.Response) {
                this._msg.clear()
                this._msg.add({severity: 'success', summary: 'Pessoa excluída com sucesso!'})
                this.carregarLista()
              }
            },
            error: (error) => {
              this._msg.clear()
              this._msg.add({severity: 'error', summary: 'Falha na exclusão da pessoa'})
            }
          })
      }
    })
  }

}
