import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../classes/models';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  urlBase: string = 'http://localhost:8080/pessoas/endereco'
  constructor(private _http: HttpClient) { }

  cadastrar(endereco: Endereco) {
    return this._http.post(`${this.urlBase}/cadastrar`, endereco, {observe: 'events', reportProgress: true})
  }
  
  deletar(id: any) {
    return this._http.delete(`${this.urlBase}/deletar/${id}`, {observe: 'events', reportProgress: true})
  }
  
  listarPorUsuario(id: any) {
    return this._http.get(`${this.urlBase}/listar-por-usuario/${id}`, {observe: 'events', reportProgress: true})
  }
  
  editar(endereco: Endereco) {
    return this._http.post(`${this.urlBase}/editar`, endereco, {observe: 'events', reportProgress: true})
  }

  
}
