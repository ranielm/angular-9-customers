# Gerenciador de Clientes

Pré-requisitos

    •Node.js (v8.11.3)
    •Angular 9 (v9.0.2)
    •Bootstrap ( v4.1.2)
    •JSON Server (v0.14.0)

1. Instalar o NodeJS e o NPM  (https://nodejs.org).
2. Instalar todos os pacotes npm necessários executando `npm install` ou `npm i` a partir da linha de comando na pasta raiz do projeto (onde o package.json está localizado).
3. Iniciar a aplicação executando `npm start` a partir da linha de comando na pasta raiz do projeto, isso irá compilar a aplicação Angular e lançá-la automaticamente no navegador na URL (http://localhost:4200).
* NOTA: Também é possível iniciar a aplicação com o comando Angular CLI `ng serve --open`. Para o fazer, instale primeiro a Angular CLI globalmente no seu sistema com o comando `npm install -g @angular/cli`.

Detalhes sobre o projeto

Crie um CRUD, com o fluxo natural features de um cadastro de clientes, com recursos como:

• Cadastro de clientes;

• Atualização do cadastro do cliente;

• Listagem dos clientes;

• Exclusão dos clientes;

Detalhes da Implementação projeto

• O formulário deverá ter validação antes de submeter a api;

• Todos os campos são obrigatórios;

• CEP e CPF deverá conter máscaras;

• Deverá seguir o style guid do Bootstrap;

• Alteração e Exclusão deverá ter um modal de confirmação;

• Deverá conter um select para selecionar a UF;

Contrato de Dados

```{

id: string;

nome: string;

cpf: string;

cep: string;

logradouro: string;

bairro: string;

localidade: string;

uf: string;

}
```

Não será necessário utilizar nenhuma linguagem de Backend, nem persistir os dados em um banco, tudo será salvo no LocalStorage do navegador.

Há autenticação com jwt, cadastro e login de usuários. 
Os estados federais e os clientes são gerenciados pelo json server.