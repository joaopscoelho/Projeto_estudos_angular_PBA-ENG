export class Pessoa {
    constructor(){}
    id: any = null
    nome: any = null
    dataNascimento: any = null
    cpf: any = null
    senha: any = null
    email: any = null
    enderecos: any [] = []
}

export class Endereco {
    constructor(){}
    id: any = null
    rua: any = null
    bairro: any = null
    cep: any = null
    cidade: any = null
    estado: any = null
    numero: any = null
    pessoa: any = null
}



