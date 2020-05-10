# Criando Repositórios
## Repositório é como uma conexão entre a persistência( dos dados ) e a Rota

- No Repositório irei buscar informações que estão em um banco ou array,
fazendo o uso de métodos(funções da entidade/model), como por exemplo: find, create...<b>Ou seja,
fará as operações do banco de dados</b>
- Irá guardar as informações do que posso fazer com os meus dados:
find,
create,
delete...
- Sempre terá um <b>repositório</b> por <b>model/entidade</b>

## Aprendi
- Repositório será o detentor dos direitos para manipular as informações do
banco de dados de uma determinada entidade
- Quem se conecta com o banco de dados é o Repositório, não a rota
- Ou seja, desacoplar o código utilizando de conceitos de arquitetura de software,
que é: cada parte do código em seu devido lugar

# Iniciando Back-End do APP
# Banco de Dados
...
# Migrations
- Serve como a linha do tempo do Banco
- Similar ao Controle de Versionamento utilizado no Git
- Se eu executar uma Migration, eu tenho as informações de como o meu banco está,
de como ele está guardando os dados
```yarn typeorm migration:create -n CreateAppointments
```
- Em uma Migration, existem dois métodos:
 - up
		- tudo que nossa migration deve fazer
 - down
		- desfazer tudo que foi feito pela migration

- Corrigir os erros do arquivo Migration
- Adicionar no método UP o que a migration deve fazer:
await queryRunner.createTable(
	new Table({
		name: 'appointments',
		columns: [
			{
				name: 'id',
				type: 'uuid',
				isPrimary: true,
				generationStrategy: 'uuid',
				default: 'uuid_generate_v4()'
			},
			{
				name: 'provider',
				type: 'varchar',
				isNullable: false,
			},
			{
				name: 'date',
				type: 'timestamp',//se utilizar postgres será 'timestamp with time zone'
				isNullable: false,
			},
		]
	})
)

- Adicionar no método DOWN:
await queryRunner.dropTable('appointments');

> Para executar a Migration
	``` yarn typeorm migration:run
	```
> Exibir as migrations
	``` yarn typeorm migration:show
	```
> Reverter uma migration
	``` yarn typeorm migration:revert
	```
## Sempre verificar se o Docker está com a aplicação ligada, neste caso, o Banco
## Utilizar o DBeaver para verificar as tabelas do Banco

# Criando Model de Agendamento
## Acessar o Model de CreateAppointments
- Importar Entity, Column, PrimaryGeneratedColumn from typeorm
- Definer que a classe será a entidade (@Entity)
- Alterar no tsconfig.json as opções:
	"experimentalDecorators": true,          /* Enables experimental support for
	ES7 decorators. */
  "emitDecoratorMetadata": true,           /* Enables experimental support for
	emitting type metadata for decorators. */
	para conseguir utilizar o @Entity em cima da classe
- Alterar:
	"strictPropertyInitialization": false,     /* Enable strict checking of
	property initialization in classes. *
	para que não reporte de erros quando eu inicializar uma variável em classe
	onde eu não atribuo nenhum valor a ela

# Repositório do TypeORM
 - O TypeORM, por padrão, já tem repositórios padrões para listar(find),
 deletar(delete), criar/update(save)

# Recap Aula do Nível02 - Banco de dados - Repositório TypeORM
- Criado Repositório custom com o TypeORM
- Services CreateAppoimentService foi atualizado para utilizar o appointmentsRepository do TypeORM
- O metódo create utilizado no service não salva, apenas cria uma instância que será salvado utilizando o metódo save do próprio TypeORM
 # Sempre que trabalhar com algum metódo do Banco de Dados, utilizar async/await
 # Pois ele trabalha na grande maioria com Promises

 # Erros
 - Metadata Not Found
	- Instalar o reflect-metadata e importar antes de tudo no primeiro arquivo
	(server.ts)
 - Colocar no ormconfig.json
	```
	"entities": [
		'./src/models/*ts'
	]
	```

# Model e Migration de Users
- Criar uma migration para a criação de Usuários(CreateUsers)
- No metódo UP e DOWN colocar semelhante ao CreateAppointments:
	UP{
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns:[
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generatedStrategy: 'uuid'
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'password',
						type: 'varchar'
					},
					// created_at saber a data de criação do usuário
					// inserir também no appointment
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					// updated_at saber a última data de alteração do usuário
					// inserir também no appointment
					{
						name: 'update_at',
						type: 'timestamp',
						default: 'now()',
					},
				]
			})
		)
	}
## Criar Model User
- import {
		Entity,
		PrimaryGeneratedColumn,
		Column,
		CreateDateColumn,
		UpdateDateColumn
	} from 'typeorm';

	@Entity('users')
	class User{
		@PrimaryGeneratedColumn('uuid')
		id: string;

		@Column()
		user:string;

		@Column()
		email: string;

		@Column()
		password: string;

		@CreateDateColumn()
		created_at: Date;

		@UpdateDateColumn()
		updated_at: Date;
	}

	export default User;

## Reverter a migration do Appointment, já que foram inseridos as colunas:
## created_at, updated_at

# Criação do relacionamento dentre models
- Criar a chave estrangeira no appointments para ter provider_id, para que eu
consiga pegar as informações de um provider pela tabela de agendamentos
(um provider pode ter vários agendamentos OneToMany)
(vários agendamentos pertecem ao um mesmo provider ManytoOne)

- Aprendi também nessa aula que, caso eu já tenha colocado minhas migrations
em um controle de versionamento as minhas migrations e tenha que altera-lás,
eu devo utilizar outra migration para atualizar a tabela que eu quero no banco

- No metódo UP da migration para atualização do do campo provider_id
	UP{
		await queryRunner.dropColumn('appointments', 'provider');

		await queryRunner.addColumn('appoinments', new TableColumn({
			name: 'provider_id',
			type: 'uuid', //postgres
			isNullable: true,
			// isNullable true pois, se um provider vinher a sair da plataforma, eu
			continuarei mantendo os registros para que o usuário ainda tenha o log
			dos appointments realizados com aquele provider que saiu
		}))

		await queryRunner.createForeignKey('appoinments', new TableForeignKey({
			name: 'AppoinmentProvider',
			columnNames: ['provider_id'], //irá armazenar a chave estrangeria que faz
			comunicação com a tabela provider, coluna id, ou seja, sera o mesmo id da
			coluna id da tabela user
			// qual coluna da tabela 'appointments' irá receber a chave estrangeira

			referencedColumnNames: ['id'],
			// nome da coluna na tabela de users que vai representar a chave estran-
			geira

			referencedTableName: 'users',
			// tabela que terá a coluna que será referenciada em outra tabela
			(appointments)

			onDelete: 'SET NULL',
			// o que vai acontecer com os agendamentos daquele provider caso ele venha
			a sair da plataforma(seja delatado); Dessa forma, manterei os registro dos
			appointments daquele provider mesmo que ele saia
			(existe RESTRICT, SET NULL e CASCADE
				RESTRICT não pode ser deletado,
				SET NULL irá setar null ao ser deletado,
				CASCADE vai deletar em cascata os appointments que tem aquele provider,
			)

			onUpdate: 'CASCADE',
			// irá atualizar todos os appointments daquele provider que foi atualizado
			// a atualização irá refletir nos seus relacionamentos
		}))
	}

	DOWN//desfazer item por item, na ordem contrária do metódo UP{
		await queryRunner.dropForeignKey('appointments', 'AppoinmentProvider');

		await queryRunner.dropColumn('appointments', 'provider_id');

		await queryRunner.addColumn('appointments', new TableColumn({
			name: 'provider',
			type: 'varchar', //postgres
			isNullable: false,
		}))
	}

	- Devo criar especificar nos models os tipos de relacionamentos que foram
	inseridos, nesse caso do User e Appoinments

	import User from '../model/User';
	@ManyToOne(() => User) //função que retorna qual o model que deve utilizar
	quando essa variável for chamada
	@JoinColumn({ name: 'provider_id' }) //qual coluna irá identificar o provider
	do appointment
	provider: User; //informação do Objeto que está relacionado com essa tabela
	// dessa forma, consigo acessar os dados do provider à partir DAS INFORMAÇÕES
	de um appointment ou invés de acessar apenas o id que é recebido como chave
	estrangeira na coluna provider_id

	- Devo colocar no model de Users também o relacionamento com o model
	Appoinments, pois futuramente, caso eu queira buscar todos os Appoinments de um
	user, eu consigo facilmente dessa maneira

# Inserir código de acordo com a necessidade que tenho na minha aplicação
# Lembrar do conceito KISS - Keep It Simple & Stupid - Mantenha Simples e Estupido

# Criação de Registro de usuário
- Criar a rota para users
- Utilizar o metódo post para fazer a criação
- Receber name, email e password
- Haverá regra de negócio? Sim, então deve ser criado o service CreateUserService
- A condição que existirá nesse service é que não pode criar um usuário com um
email já existente no banco

import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

userRouter.post('/', async (request, response) => {
	try{
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({ name, email, password });

		delete user.password;

		return response.json(user);
	} catch(err){
		return response.status(400).json({ error: err.message });
	}
})

- Para isso, devo utilizar o metódo find do repositório de User, mas não é necessário
criar um repositório, já que o metódo pode ser utilizar do próprio typeorm (getRepository), onde recebe como paramêtro a entidade/model
- Utilizar no biblioteca bcryptjs para guardar a senha no meu banco de dados
criptografada
- Não exibir essa hashPassword no response; Por isso deletar na rota.

- No CreateUserService.ts

	import { getRepository } from 'typeorm';
	import User from '../models/User';
	import { hash } from 'bcryptjs';

	interface Request {
		name: string;
		email: string;
		password: string;
	}

	class CreateUserService {

		public async execute({ name, email, password }: Request): Promise<User>{
			const usersRepository = getRepository(User);

			const checkUserExists = await usersRepository.findOne( { where: { email: email } });

			if (checkUserExists) {
				throw Error('Email already used!');
			}

			const hashedPassword = hash(password, 8);

			const user = usersRepository.create({ name, email, password: hashedPassword });

			await usersRepository.save(user);

			return user;
		}
	}

	export default CreateUserService;

	# Validando Credenciais
	- Criar rotas para as sessões do usuário:
	> sessions.routes.ts
		```
		import { Router } from 'express';
		import AuthenticateUserService from '../services/AuthenticateUserService';

		const sessionsRouter = Router();

		sessionsRouter.post('/', async (request, response) => {
			try{
				const { email, password } = request.body;

				const authenticateUser = new AuthenticateUserService();

				const user = await authenticateUser.execute({ email, password });

				return response.json(user);
			}catch(err){
				return response.status(400).json({ error: err.message });
			}
		});

		export default sessionsRouter;
		```
	> ./routes/index.ts
	- Adicionar:

	```
		import sessionsRouter from './sessions.routes';
		routes.use('/sessions', sessionsRouter);
	```

	> ./services/AuthenticateUserService.ts
	```
	import { getRepository } from 'typeorm';
	import { compare } from 'bcryptjs';
	import User from '../models/User';

	interface Request {
		email: string;
		password: string;
	}

	interface Response{
		user: User;
	}

	class AuthenticateUserService {
		public async execute({ email, password }: Request)> Promise<Response>{
			const usersRepository = getRepository(User);

			const user = await usersRepository.findOne({ where: { email: email }});

			if (!user){
				throw new Error('Incorrect email/password combination.')'
			}

			const passwordMatched = await compare(password, user.password);

			if (!passwordMatched){
				throw new Error('Incorrect email/password combination.')'
			}

			return { user };
		}
	}

	export default AuthenticateUserService;
	```

