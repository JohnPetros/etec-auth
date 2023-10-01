<h1 align="center">
  Etec Auth 🔒
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
      <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/etec-auth">
   <a href="https://github.com/JohnPetros/etec-auth/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/etec-auth">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/etec-auth/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/etec-auth">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/etec-auth?style=social">
</div>
<br>

## 🖥️ Sobre o Projeto

Esse é um projeto trata-se um aplicativo de autenticação de perfil, em que usuário se registrar e autenticar para ter acesso ao sistema, que no caso lista os cursos e suas respectivas disciplinas ofertados pela [Etec](https://www.vestibulinhoetec.com.br/unidades-cursos/) 

O objetivo para a construção desse projeto foi estudar e aplicar os conceitos de autenticação de usuário utilizando [JWT](https://auth0.com/resources/ebooks/jwt-handbook?utm_content=latamengbrazilgenericauthentication-jwthandbook-jwthandbook&utm_source=google&utm_campaign=latam_mult_bra_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_id=aNK4z0000004IQEGA2&utm_term=jwt-c&gclid=Cj0KCQjwjt-oBhDKARIsABVRB0wAWL3gyy2OMBYU4p6ZT84o9rTtpxs70-Oc4cuU78njJjKSznC8I4kaAk4lEALw_wcB)(Json Web Token), refresh token e [verificação OTP](https://www.incognia.com/pt/dicionario-da-autenticacao-mobile/o-que-e-otp-senha-de-uso-unico) 

### ⏹️ Demonstração

<table align="center">
  <tr>
    <td align="center" width="700">
    <span>Página da Urna funcionando<br/></span>
    <img alt="Home page" src=".github/etec-auth-funcionando.gif" alt="Demonstração da urna funcionando" />
    </td>
  </tr>
</table>

---

## ✨ Funcionalidades

### Autenticação de usuário
- [x] Deve ser possível	autenticar um usuário por e-mail e senha
- [x] Não deve ser possível	autenticar um usuário que não existe
- [x] Deve ser possível gerar token no padrão JWT para servir requisito para autenticar e autorizar o usuário a acessar recursos privados do sistema 
- [x] O token gerado deve ter até 30 minutos até expirar
- [x] Deve ser gerado e salvado um refresh token para permitir gerar um novo token para o usuário
- [x] O refresh token deve ter até 7 dias para expirar
- [x] Deve ser retornado os dados do usuário, execeto as informações sensíveis, como senha
- [x] Caso o usuário falhe em se autenticar por mais de 5 vezes, esse usuário é bloqueado a fazer mais requisições ao sistema 
- [x] O usuário deve ser desbloqueado após 1 hora de bloqueio

### Cadastro de usuário
- [x] Deve ser possível cadastrar um usuário
- [x] Não deve ser possível	cadastrar um usuário que já existe
- [x] A senha inserida pelo usuário deve ser hasheada
- [x] Deve ser enviado um e-mail de confirmação para o e-mail cadastrado pelo usuário
- [x] O e-mail enviado para o usuário deve conter um token que servirá para confimar o seu cadastro
- [x] O usuário deve ser redirecionado ao aplicativo ao aceitar o e-mail de confirmação e depois redirecionado para tela Home
- [x] O token de confirmação de e-mail deve expirar em até 5 minutos

### Listagem de cursos e disciplinas
- [x] Deve ser possível listar cursos
- [x] Deve ser possível listar disciplinas por curso
- [x] Deve ser possível exibir detalhes de uma disciplina específica
- [x] Deve ser possível aplicar uma ou mais filtragens ao mesmo tempo
  
### Redefinição de senha
- [x] Deve ser possível redefinir a senha de um usuário
- [x] Deve ser enviado um e-mail contendo um token de autenticação para o usuário que solicitou a redefinição de senha
- [x] Caso o token de redefinição de senha esteja correto, o usuário deve cadastrar uma nova senha

### Refresh Token
- [x] Deve ser possível gerar um novo token com base em um refresh token
- [x] O processo de refresh token só pode ocorrer quando um token de autorização é expirado
- [x] O processo de refresh token deve ocorrer de forma transparente, isto é, sem que o usuário perceba
- [x] Caso o processo de refresh token falhe, o usuário deve ser deslogado imediatamente

### Log out de usuário
- [x] Deve ser possível deslogar um usuário
- [x] Não deve ser possível deslogar um usuário que não existe
- [x] Só deve ser possível deslogar um usuário que esteja autenticado
- [x] O refresh token associado ao usuário deve ser destruído ao deslogá-lo

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido usando as seguintes tecnologias:

### 📟 Backend

✔️ **[NodeJs](https://nodejs.org/en)** Para executar JS no lado do servidor e prover os recursos e as funcionalidades principais da aplicação

✔️ **[Express](https://expressjs.com/pt-br/)** - framework minimalista para lidar e responder requisições HTTP

✔️ **[NodeMailer](https://nodemailer.com/)** - módulo de NodeJs para envio de e-mails

✔️ **[MongoDb](https://www.mongodb.com/pt-br)** - banco de dados da aplicação

✔️ **[Mongoose](https://mongoosejs.com/)** - biblioteca de modelagem de dados para MongoDb e NodeJs

### 📱 Mobile

✔️ **[React Native](https://reactnative.dev/)** - para desenvolver as telas do aplicativo de forma nativa

✔️ **[Expo](https://expo.dev/?utm_source=google&utm_medium=cpc&utm_content=performancemax&gclid=Cj0KCQjwjt-oBhDKARIsABVRB0xATpW5ntMoQ3KO_pAh64habJknUu1gNBU6pERGPhxMwIjDE_pSh80aAka6EALw_wcB)** - conjunto de ferramentas que visa facilitar o desenvolvimento utilizando React Native

✔️ **[Axios](https://ui.gluestack.io/)** - biblioteca de para realizar requisições HTTP

✔️ **[Gluestack Ui](https://ui.gluestack.io/)** - biblioteca de componentes visuais prontos e tokens de cores

✔️ **[Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)** - Biblioteca de ícones para aplicações React Native

> Para mais detalhes acerca das dependências do projeto veja o arquivo [package.json](https://github.com/JohnPetros/etec-auth/blob/main/package.json)

---

## 🚀 Como rodar a aplicação?

### 🔧 Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en)
- [Expo](https://expo.dev/?utm_source=google&utm_medium=cpc&utm_content=performancemax&gclid=Cj0KCQjwjt-oBhDKARIsABVRB0xATpW5ntMoQ3KO_pAh64habJknUu1gNBU6pERGPhxMwIjDE_pSh80aAka6EALw_wcB)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

> Além disto é bom ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/)

#### 📦 Instalando as dependências do backend

```bash

# Clone este repositório
$ git clone https://github.com/JohnPetros/etec-auth.git

# Acesse a pasta da aplicação backend
$ cd ./etec-auth/server

# Instale as dependências
$ npm install 
# ou
$ yarn add

```

#### 🔐 Definindo as variáveis de ambiente do backend

``` bash

DATABASE_USER= # Nome de usuário do banco de dados
DATABASE_PASSWORD= # Senha do banco de dados
PORT= # Porta em que estará rodando a aplicação
SECRET_TOKEN= # Hash para gerar token de autorizacao
EMAIL_SECRET_TOKEN= # Hash para gerar token de confirmação de e-mail
PASSWORD_SECRET_TOKEN= # Hash para gerar token de redefinição de senha
REFRESH_SECRET_TOKEN= # Hash para gerar refresh token
BASE_URL= # Url base para fazer conexão com o banco de dados
EMAIL_CONFIRMATION_URL= # Url base para redirecionar o usuário ao aplicativo para confirmar e-mail
PASSWORD_RESET_URL= # Url base para redirecionar o usuário ao aplicativo para redefinir sua senha

```

### 📟 Rodando a aplicação backend

```bash

# Execute a aplicação em modo de desenvolvimenro
$ npm run dev 
# ou
$ yarn dev

```

> Provavelmente, a aplicação estará rodando na porta 33333

#### 📦 Instalando as dependências do mobile

```bash

# Acesse a pasta da aplicação backend
$ cd ../mobile

# Instale as dependências
$ npm install 
# ou
$ yarn add

```

#### 🔐 Definindo as variáveis de ambiente do mobile

``` bash

API_URL= # Url base da aplicação backend
EMAIL_CONFIRMATION_SLUG= # Identificador do deep link para confimação de e-mail
RESET_PASSWORD_SLUG= # Identificador do deep link para redefinição de senha

```

> Se estiver rodando localmente, o nome do host deve ser o endereço IP da sua máquina em vez de simplesmente localhost


### 📱 Rodando a aplicação mobile

```bash

# Execute a aplicação em modo de desenvolvimenro
$ npx expo start
# ou
$ yarn expo start

```

> Abra a aplicação em um emulador de celular ou use o aplicativo expo go para rodar a aplicação mobile

---

 ## 🧪 Rodando os testes

### 👁️‍🗨️ Testando no Insomnia
Clique no botão abaixo para baixar importar o arquivo contendo os testes de requisição da API para o seu Insomnia

[![Executar no Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Etec%20Auth&uri=https%3A%2F%2Fraw.githubusercontent.com%2FJohnPetros%2Fetec-auth%2Fmain%2FInsomnia_data.json)

> Lembrando que você precisa ter o [Insomnia](https://insomnia.rest/) instalado na sua máquina

---

## ⚙️ Deploy

O deploy da API da aplicação foi realizada usando a plataforma da **[Render](https://dashboard.render.com/)**, o que implica dizer que você pode acessar a API usando a URL base **[link](https://etec-auth.onrender.com/)**.

---

## 💪 Como contribuir

```bash

# Fork este repositório
$ git clone https://github.com/JohnPetros/etec-auth.git

# Cria uma branch com a sua feature
$ git checkout -b minha-feature

# Commit suas mudanças:
$ git commit -m 'feat: Minha feature'

# Push sua branch:
$ git push origin minha-feature

```

> Você deve substituir 'minha-feature' pelo nome da feature que você está adicionando

> Você também pode abrir um [nova issue](https://github.com/JohnPetros/etec-auth/issues) a respeito de algum problema, dúvida ou sugestão para o projeto. Ficarei feliz em poder ajudar, assim como melhorar este projeto

---

## 📝 Licença

Esta aplicação está sob licença do MIT. Consulte o [Arquivo de licença](LICENSE) para obter mais detalhes sobre.

---

<p align="center">
   Feito 💜 by John Petros 👋🏻
</p>
