# Documentation/Documentação
- [English](#-Summary)
- [Português - Brasil](#-Sumário)

# Summary
- [About](#-About)
- [Challenges](#-Challenges)
- [Techs](#-Techs)
- [Code formatters](#-Code-formatters)
- [Clone the repository](#-Clone-the-repository)
- [Database](#-Database)
	- [Requeried programs](#-Required-programs)
	- [Installation](#-Installation)

## 📝 About
This is the Backend of GoBarber, where a user can make appointments that will be attended by a provider.

---

## 🏆 Challenges
- [x] Put in pratice what I learned in the Rockeseat's Bootcamp GoStack.

---

## 💻 Techs
- NodeJS
- ExpressJS
- Typescript
- ESLint
- Prettier
- TypeORM
- Docker
- Postgres
- JWT(JSON Web Token)

## 💅 Code formatters
- ESLint
- Prettier
- EditorConfig

---

## 👇 Clone the repository
- Open your terminal to write theses lines:
```bash
  ## clone repository
  $ git clone https://github.com/danilobandeira29/backend-GoBarber.git

  ## access project directory
  $ cd backend-GoBarber

  ## install all dependencies (or you can use 'npm install')
  $ yarn

```
## 📅 Database
### Required programs
- Docker
- DBeaver
### Installation
1. Install [Docker](https://www.docker.com/get-started) according to your Operating System and according to the [Docker documentation](https://docs.docker.com/get-started/).
2. Install the PostgreSQL Image for Docker using:

```bash
	$ docker run --name gostack_postgres  -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres
```
> - In the above command, port **5434** refers to your machine's port, so check that it is not in use. If so, you can use a port of your choice. **The second port 5432 is the default for Postgres, meaning you should NOT change it**.

> - If the port you used is different from **5434**, in the project **you must change the file ormconfig.json**, in the attribute **"port"** and insert **your new port**

```
{
	"type": "postgres",
	"host": "localhost",
	"port": #YOUR_PORT,
	"username": "postgres",
	"password": "docker",
	"database": "gostack_gobarber",
	"entities": [
		"./src/models/*ts"
	],
	"migrations":[
		"./src/database/migrations/*.ts"
	],
	"cli":{
		"migrationsDir": "./src/database/migrations"
	}
}

```
> - In Windows, to check if any ports on your machine are in use, just run in the terminal:
```
	netstat -ano | findStr "5434"
```
> - On Mac or Linux
```bash
	$ sudo lsof -i :5434
```
> - If there is no return, it means that the port is not in use and can be used to make use of the PostgreSQL Image.
3. Now run the following command to start the Postgres container using Docker
```bash
	$ docker start gostack_postgres
```
4. Install [DBeaver](https://dbeaver.io/download/)
5. Open DBeaver and click **new database connection**

<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-1_oCQkdt9IJ.png">
</p>

6. Select **PostgreSQL** and click **Next**.
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-2_s4b-cmEgCy.png">
</p>

7. Enter in the **Port** field the port of your machine that you chose in step 2.

8. Enter in the **Database** field: **gostack_gobarber**

9. Enter in the **Password** field: **docker**
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-3_6iQvzZb0gG.png">
</p>

10. Go to the **PostgreSQL** tab and enable the **Show all Database** option.
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-4_40MTqLgodvn.png">
</p>

---
## Initialize the Project
- Open your terminal on the project folder and execute
```bash
  ## initialize the project (or you can use 'npm dev:server')
  $ yarn dev:server
```
---
---

# Sumário
- [Sobre](#-Sobre)
- [Desafios](#-Desafios)
- [Tecnologias](#-Tecnologias)
- [Formatadores de Código](#-Formatadores-de-Código)
- [Clonar o Projeto](#-Clonar-o-Projeto)


## 📝 Sobre
Backend da aplicação GoBarber, onde um usuário pode marcar compromissos que serão atendidos por um provedor. Também inclui login para utilização dessas funcionalidades.

---

## 🏆 Desafios
- [x] Por em prática o que eu aprendi com o Bootcamp da Rockeseat

---

## 💻 Tecnologias
- NodeJS
- ExpressJS
- Typescript
- ESLint
- Prettier
- TypeORM
- Docker
- Postgres
- JWT(JSON Web Token)

## 💅 Formatadores de código
- ESLint
- Prettier
- EditorConfig

---

## 👇 Clonar o Projeto
- Abra o seu terminal para escrever essas linhas:
```bash
  ## clonar repositório
  $ git clone https://github.com/danilobandeira29/backend-GoBarber.git

  ## acessar o diretório do projeto
  $ cd backend-GoBarber

  ## instalar todas as dependências (ou você pode executar 'npm install')
  $ yarn
```

## 📅 Banco de Dados
### Programas necessários:

- Docker
- DBeaver

### Instalando

1. Instale o [Docker](https://www.docker.com/get-started) de acordo com o seu Sistema Operacional e faça o processo de instalação como segue na documentação do mesmo.
2. Instale a Imagem do PostgreSQL para Docker utilizando:
```bash
	$ docker run --name gostack_postgres  -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres
```
> - No comando acima, a porta **5434** faz referência a porta da sua máquina, então verifica se a mesma não está em uso. Se estiver, pode usar uma porta de sua preferência. **Já a segunda porta 5432 é a padrão do Postgres, ou seja, você NÃO deve alterá-la**.
> - Caso a porta que você utilizou seja diferente de **5434**, no projeto **você deve alterar o arquivo ormconfig.json**, no atributo **"port"** e inserir **sua nova porta**
```
{
	"type": "postgres",
	"host": "localhost",
	"port": #SUA_PORTA_AQUI,
	"username": "postgres",
	"password": "docker",
	"database": "gostack_gobarber",
	"entities": [
		"./src/models/*ts"
	],
	"migrations":[
		"./src/database/migrations/*.ts"
	],
	"cli":{
		"migrationsDir": "./src/database/migrations"
	}
}

```
> - No Windows, para verificar se alguma porta da sua máquina está em uso, basta executar no terminal:
```
	netstat -ano | findStr "5434"
```
> - No Mac ou Linux
```bash
	$ sudo lsof -i :5434
```
> - Se não houver nenhum retorno, significa que a porta não está em uso e pode ser utilizada para fazer uso da Imagem do PostgreSQL.
3. Agora execute o seguinte comando para iniciar o container do Postgres utilizando o Docker
```bash
	$ docker start gostack_postgres
```
4. Instale o [DBeaver](https://dbeaver.io/download/)
5. Abra o Dbeaver, clique em **new database connection**

<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-1_oCQkdt9IJ.png">
</p>

6. Selecione **PostgreSQL** e clique em **Next**
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-2_s4b-cmEgCy.png">
</p>

7.	Insira no campo **Port** a porta da sua máquina que você escolheu no passo 2.

8.	Insira no campo **Database**: gostack_gobarber.

9.	Insira no campo **Password**: docker
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-3_6iQvzZb0gG.png">
</p>

10. Vá para a aba **PostgreSQL** e habilite a opção **Show all Database**
<p align="center">
<img src="https://ik.imagekit.io/xfddek6eqk/database-gostack/backend-gostack-4_40MTqLgodvn.png">
</p>

---
## Inicializando o Projeto
- Abra o seu terminal na pasta do projeto e execute:
```bash
  ## inicializar o projeto (ou você pode executar 'npm dev:server')
  $ yarn dev:server
```
---
---

**Developed by/Desenvolvido por**👻
<a href="https://www.linkedin.com/in/danilo-bandeira-4411851a4/">**Danilo Bandeira</a>**
