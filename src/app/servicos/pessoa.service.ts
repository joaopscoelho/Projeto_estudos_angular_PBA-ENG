import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../classes/models';
import { FilterPessoa } from '../classes/filters';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  // Criar um arquivo para trabalhar com modo de dev ou produção
  url = `http://localhost:8080/pessoas`
  
  constructor(private _http: HttpClient) {}

  cadastrar(pessoa: Pessoa) {
    return this._http.post(`${this.url}/cadastrar-pessoa`, pessoa, {observe: 'events', reportProgress: true})
  }

  pesquisar(pessoa: FilterPessoa) {
    return this._http.post(`${this.url}/pesquisar-pessoas`, pessoa, {observe: 'events', reportProgress: true})
  }

  editar(pessoa: Pessoa) {
    return this._http.put(`${this.url}/editar-pessoa`, pessoa, {observe: 'events', reportProgress: true})
  }

  deletar(id: any) {
    return this._http.delete(`${this.url}/deletar/${id}`, {observe: 'events', reportProgress: true})
  }
  
  carregarPessoa(id: any) {
    return this._http.get(`${this.url}/carregar-pessoa/${id}`, {observe: 'events', reportProgress: true})
  }

}
