import { Injectable } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"

@Injectable({
  providedIn: 'root'
})

export class FormService {

    constructor(private _formBuilder: FormBuilder) { }
  
    public criarFormEndereco() {
      return this._formBuilder.group({
        id: [null],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.email],
        cep: [null],
        pessoa: [null]
      }) 
    }
  
    public criarFormPessoa() {
      return this._formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        email: [null, Validators.email],
        cpf: [null, Validators.required],
        senha: [null, Validators.required],
        dataNascimento: [null],
        enderecos: [null] 
      }) 
    }
  }