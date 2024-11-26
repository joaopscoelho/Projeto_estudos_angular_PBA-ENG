import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { Pessoa } from '../../../classes/models';
import { FormService } from '../../../utils/form-service';

@Component({
  selector: 'cadastro-endereco',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    KeyFilterModule,
    InputTextModule
  ],
  templateUrl: './cadastro-endereco.component.html',
  styleUrl: './cadastro-endereco.component.scss'
})

export class CadastroEnderecoComponent {

  @Output() emitDadosEndereco = new EventEmitter() 
  formEndereco: UntypedFormGroup

  constructor(private _formService: FormService){
    this.formEndereco = this._formService.criarFormEndereco()
  }

  emitirEndereco() {
    this.emitDadosEndereco.emit(this.formEndereco.value)
  }

  limparFormEndereco() {
    this.formEndereco.reset()
  }

  

  



}
