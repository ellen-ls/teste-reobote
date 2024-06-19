# Projeto de Registro e Login
Este projeto implementa uma aplicação React com funcionalidades de registro e login de usuários, utilizando uma API para autenticação e gerenciamento de usuários.

### Link Vercel: https://login-register-system-tau.vercel.app/

## Tecnologias Utilizadas
- React
- TypeScript
- Axios
- Zod

## Funcionalidades

#### Registro de Usuário:

- Formulário para registrar um novo usuário com nome, email, senha e confirmação de senha.
- Validação de campos usando a biblioteca Zod.
- Exibe mensagens de erro específicas em caso de falha no registro.

#### Login de Usuário:

- Formulário para login de usuário com email e senha.
- Validação de campos usando a biblioteca Zod.
- Exibe mensagens de erro específicas em caso de falha no login.
- Armazena token de autenticação no localStorage após login bem-sucedido.

### Logout de Usuário:

- Função para realizar logout, removendo os tokens de autenticação do localStorage.

#### Dashboard:

- Exibe informações básicas do usuário logado e a lista de todos os usuários.
- Protege a rota para que somente usuários autenticados possam acessá-la.

## Estrutura do Projeto
### Componentes
- Dashboard.tsx: Componente que exibe a dashboard do usuário.
- Register.tsx: Componente que exibe o formulário de registro.
- Login.tsx: Componente que exibe o formulário de login.

### Ações
- register.ts: Função para registrar um novo usuário.
- login.ts: Função para realizar o login de um usuário.
- logout.ts: Função para realizar o logout de um usuário.

### Configuração do Axios
- axiosConfig.ts: Configurações predefinidas do axios para facilitar as requisições HTTP.

### Instalação
Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   
 ``` git clone https://github.com/seu-usuario/nome-do-repositorio.git```

2.  Entre no diretório do projeto:

```cd nome-do-repositorio```

3. Instale as dependências:

```npm install```

5. Configure as variáveis de ambiente conforme necessário.

6. Inicie o servidor de desenvolvimento:

```npm run dev```

## Uso

### Registro

Para registrar um novo usuário, navegue até a página de registro e preencha o formulário com os seguintes campos:

- Nome
- Email
- Senha
- Confirmação de Senha

Clique em "Register" para enviar o formulário. Se os dados estiverem corretos, você verá uma mensagem de sucesso.

### Login
Para fazer login, navegue até a página de login e preencha o formulário com os seguintes campos:

- Email
- Senha

Clique em "Entrar" para enviar o formulário. Se os dados estiverem corretos, você será redirecionado para a dashboard.

### Logout

Para fazer logout, clique no botão de logout na navbar. Isso removerá os tokens de autenticação do localStorage e redirecionará você para a página de login.

### Dashboard

A dashboard exibe:

- O número total de usuários.
- A lista de todos os usuários registrados.
- O email do usuário logado.

## Estrutura de Código

### Dashboard.tsx

Componente que exibe a dashboard do usuário. Faz uma requisição para a API para obter os dados necessários e os exibe em uma tabela.

### Register.tsx

Componente que exibe o formulário de registro. Usa a função register para enviar os dados do usuário para a API e exibe mensagens de erro ou sucesso com base na resposta da API.

### Login.tsx

Componente que exibe o formulário de login. Usa a função login para autenticar o usuário e armazena os tokens de autenticação no localStorage. Em caso de erro, exibe uma mensagem apropriada.

### login.ts

Função para realizar o login de um usuário. Valida os campos de entrada usando Zod, faz uma requisição para a API e lida com respostas e erros.

### register.ts

Função para registrar um novo usuário. Valida os campos de entrada usando Zod, faz uma requisição para a API e lida com respostas e erros.

### logout.ts

Função para realizar o logout de um usuário. Remove os tokens de autenticação do localStorage.
