import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  formPessoa!: FormGroup;
  formEndereco!: FormGroup;
  enderecos: any [] = [];

  constructor(
    private FormBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.criarFormPessoa()
    this.criarFormEndereco()
  }

  criarFormPessoa() {
    this.formPessoa = this.FormBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      senha: [this.gerarSenha(), Validators.required],
      endereco: [],
      id: []
    });
  }

  criarFormEndereco() {
    this.formEndereco = this.FormBuilder.group({
      cep: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      complemento: [null],
      rua: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      pessoa: [],
      id: []
      })
    }

    atribuirEndereco() {
      this.enderecos.push(this.formEndereco.value)
      this.formPessoa.patchValue({endereco: this.enderecos})
      this.criarFormEndereco()
    }

    criarPessoaEndereco(pessoa: any): {}{
      return {
        id: pessoa?.id,
        nome: pessoa?.nome
      }
    }



    onSubmit() {
      // Marca todos os campos como "touched" para exibir erros de validação
      this.formPessoa.markAllAsTouched();
      // this.formEndereco.markAllAsTouched();

      // Verifica se ambos os formulários são válidos
      if (this.formPessoa.invalid || this.formPessoa?.controls['endereco']?.value?.lenght > 0) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        return; // Interrompe o envio se algum dos formulários for inválido
      }

      this.formPessoa.controls['endereco'].value?.forEach((x: any) => {
        x.pessoa = this.criarPessoaEndereco(this.formPessoa.value)
      })


      console.log('formularioValue', this.formPessoa.value);  // Exibe todos os dados do formulário, incluindo o endereço

      const valor = this.formPessoa.value

      // Envia os dados para o servidor
      this.enviarPessoa(valor).subscribe({
        next: (res) => {
          if (HttpEventType.Response === res.type)
              alert('Pessoa cadastrada com sucesso')
        }
      })
    }

  resetar() {
    this.formPessoa.reset(); // Corrigido
  }

  enviarPessoa(pessoa: any) {
    return this.http.post(`http://localhost:8080/pessoas/cadastrar-pessoa`, pessoa, {observe: 'events', reportProgress: true})
    // pipe(
    //   map(response => {
    //     console.log('Resposta do servidor:', response);
    //     return response;
    //   }),
    //   catchError(error => {
    //     alert('Erro ao enviar os dados');
    //     console.error('Erro ao enviar os dados:', error);
    //     return of(null);
    //   })
    // ).subscribe(response => {
    //   if (response) {
    //     this.formPessoa.reset();  // Reseta o formulário após envio bem-sucedido
    //     this.formEndereco.reset();  // Reseta o formulário de endereço também
    //   }
    // });
  }

  verificaValidTouched(campo: string) {
    const formGroup = this.formPessoa.get(campo) ? this.formPessoa : this.formEndereco;
    return !formGroup.get(campo)?.valid && formGroup.get(campo)?.touched;
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  gerarSenha(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let senha = '';
    for (let i = 0; i < 8; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return senha;
  }
  gerarNovaSenha(): void {
    const novaSenha = this.gerarSenha();
    this.formPessoa.get('senha')?.setValue(novaSenha); // Atualiza o campo de senha
  }
  navegarParaLogin() {
    this.router.navigate(['/login']); // ajuste a rota conforme necessário
  }
}

