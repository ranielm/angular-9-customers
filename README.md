# angular-9-customers

* Usar bootstrap direto no package.json (conforme sites vistos anteriormente)
* Usar json server ao invés do fake-backend
* Salvar id automaticamente
* Não deixar salvar usuário com mesmo CPF
Pré-requisitos

    •Node.js (v8.11.3)
    •Angular 9 (v9.0.2)
    •Bootstrap ( v4.1.2)
    •JSON Server (v0.14.0)
Node.js version v8.11.4 detected.
The Angular CLI requires a minimum Node.js version of either v10.13 or v12.0.

Install NodeJS and NPM from https://nodejs.org.
Download or clone the Angular project source code from https://github.com/cornflourblue/angular-9-registration-login-example
Install all required npm packages by running npm install or npm i from the command line in the project root folder (where the package.json is located).
Start the app by running npm start from the command line in the project root folder, this will compile the Angular app and automatically launch it in the browser on the URL http://localhost:4200.
NOTE: You can also start the app with the Angular CLI command ng serve --open. To do this first install the Angular CLI globally on your system with the command npm install -g @angular/cli.

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

{

id: string;

nome: string;

cpf: string;

cep: string;

logradouro: string;

bairro: string;

localidade: string;

uf: string;

}

Não será necessário utilizar nenhuma linguagem de Backend, nem persistir os dados em um banco, tudo será salvo no LocalStorage do navegador.

Pré-requisitos

• Node.js (v8.11.3)

• Angular 9 (v9.0.2)

• Bootstrap ( v4.1.2)

• JSON Server (v0.14.0)