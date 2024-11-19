import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { EnderecoComponent } from "../../endereco/endereco.component";
import { Pessoa } from '../../../classes/models';
import { FormService } from '../../../utils/form-service';
import { PessoaService } from '../../../servicos/pessoa.service';
import { GuidedTour, GuidedTourModule, GuidedTourService, Orientation } from 'ngx-guided-tour';

@Component({
  selector: 'app-cadastro-pessoa',
  standalone: true,
  imports: [
    TabViewModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PanelModule,
    KeyFilterModule,
    ReactiveFormsModule,
    InputMaskModule,
    CalendarModule,
    EnderecoComponent,
    GuidedTourModule
],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrl: './cadastro-pessoa.component.scss'
})
export class CadastroPessoaComponent {
  // formPessoa: UntypedFormGroup = 
  loading = false
  index = 0
  id: any = null
  formPessoa: UntypedFormGroup 
  maxDate: Date = new Date()
  pessoa: Pessoa = new Pessoa()
  constructor(private _formService: FormService,
    private _pessoaService: PessoaService,
    private _msg: MessageService,
    private _activeRouter: ActivatedRoute,
    private _tour: GuidedTourService
  ) {
    this.formPessoa = this._formService.criarFormPessoa()
  }

  public tour: GuidedTour = {
    tourId: 'app-tour',
    useOrb: false,
    steps: [
      {
        title: 'Navegação',
        content: 'Use as guias para navegar no cadastro.',
        selector: '.p-tabview-nav',
        orientation: Orientation.Bottom
      },
      {
        title: 'Formulário',
        content: 'Preencha o formulário com os dados da pessoa',
        selector: 'form',
        orientation: Orientation.Bottom
      },
    ]
  };

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this._tour.startTour(this.tour);
    // }, 1000) 
  }
  
  ngOnInit(): void {
    this._activeRouter.paramMap.subscribe(param => {
      this.id = param.get('id')
    }) 
    if (this.id) {
      this._pessoaService.carregarPessoa(this.id).subscribe({
        next: (res) => {
          if (res.type === HttpEventType.Response)
            this.popularForm(<Pessoa>res.body)
        },
        error: (error) => {
          this._msg.add({severity: 'error', summary: 'Falha no carregamento da pessoa', detail: error})
        }
      })
    }

  }

  popularForm(pessoa: Pessoa) {
    this.pessoa = pessoa
    this.formPessoa.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      cpf:  pessoa.cpf,
      dataNascimento: pessoa.dataNascimento ? new Date(pessoa.dataNascimento) : null,
      enderecos: pessoa.enderecos
    })
  }
  
  previousTab() {
    if (this.index !== 0) {
      this.index--
    }
  }

  nextTab() {
    this.pessoa = <Pessoa>this.formPessoa.value
    if (this.id) {
      this._pessoaService.editar(this.pessoa).subscribe({
        next: (res) => {
          if (HttpEventType.Sent === res.type){
            this._msg.add({severity: 'info', summary: 'Atualizando dados de pessoa', sticky: true})
          } 
          if (HttpEventType.Response === res.type) {
            this._msg.clear()
            this._msg.add({severity: 'success', summary: 'Pessoa atualizada com sucesso!'})
            setTimeout(() => { // Delay para avançar para aproxima guia
              this.index++
            }, 500)
          }
        }, error: (error) => {
            this._msg.clear()
            this._msg.add({severity: 'error', summary: `Falha na atualização da pessoa ${this.pessoa?.nome}`, detail: error})
        } 
      })
    } else {
      this._pessoaService.cadastrar(this.pessoa).subscribe({
        next: (res) => {
          if (HttpEventType.Sent === res.type){
            this._msg.add({severity: 'info', summary: 'Cadastrando de pessoa', sticky: true})
          } 
          if (HttpEventType.Response === res.type) {
            this._msg.clear()
            this._msg.add({severity: 'success', summary: 'Pessoa cadastrada com sucesso!'})
            setTimeout(() => { // Delay para avançar para aproxima guia
              this.index++
            }, 500)
          }
        }, error: (error) => {
            this._msg.clear()
            this._msg.add({severity: 'error', summary: `Falha na atualização da pessoa ${this.pessoa?.nome}`, detail: error})
        } 
      })
    }
  }
}
