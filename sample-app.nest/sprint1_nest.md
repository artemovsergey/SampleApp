# Начало работы

- откройте командную строку,
- создайте папку SampleApp: mkdir SampleApp
- перейдите в нее: cd SampleApp
- выполните команду `code .` для открытия проекта SampleApp в Visual Code

# Подготовка редактора Visual Code

- File - Autosave

# Использование nest cli для построения архитектуры приложения

- проверьте версию node командой: `node --v`.

# Установка инструментов конмандой строки для работы с Nest

- npm i -g @nestjs/cli
- создайте проект `nest new SampleApp.Nest`
- удалите папку .git внутри проекта nest

Для проверки работоспособности приложения запустите API: `nest start`.

**Замечание**: для горячей перезагрузки сервера примените команду `nest start --watch`.

У вас по конечной точке http://localhost:3000/hello должен выводится результат в формате json.

**Примечание**: номер порта может быть другим.

- добавьте в решение файл `readme.md`
- фиксация изменений в git с сообщением: "Создание начального проекта API на Nest"

## Разработка домена приложения. Модель пользователя

Создайте в проекте в папке src папку `models`, в которой создайте класс **user.entity.ts**

```ts
export class User {
  id: number;
  name: string;
}
```

# Интерфейсы

Создайте папку `interfaces` и поместите следующий интерфейс IUserRepository

```ts
import { User } from 'src/models/user';

export interface IUserRepository {
  create(user: User): User;
  findOne(arg0: number): unknown;
  update(arg0: number, updateUserDto: UpdateUserDto): unknown;
  remove(arg0: number): unknown;
  findAll(): User[];
}
```

## Реализация CRUD в UserRepository

Создайте папку `repositories` и поместите там следующий класс `usermemory.repository.ts`, который будет имплементировать (реализовывать) интерфейс `IUserRepository`.

```ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { IUserRepository } from 'src/interfaces/IUserRepository';

import { User } from 'src/models/user';

@Injectable()
export class UserMemoryRepository implements IUserRepository {
  getall(): User[] {
    throw new Error('Method not implemented.');
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): User[] {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
```

# Создание UsersController для управления пользователями

- создайте папку controllers. В папке создайте файл `users.controller.ts`:

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserMemoryRepository } from 'src/repositories/usermemory.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UserMemoryRepository) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersRepository.remove(+id);
  }
}
```

### Подключение Swagger

- перейдите в проект nest и выполните `npm install @nestjs/swagger swagger-ui-express`

### Настройка Swagger в основном файле приложения

main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Пример API')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addTag('пример')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

Теперь вы можете использовать декораторы из `@nestjs/swagger` для описания ваших контроллеров и методов. Например:

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('пример')
@Controller('example')
export class ExampleController {
  @Get()
  @ApiResponse({ status: 200, description: 'Успешный ответ' })
  findAll(): string {
    return 'Это пример GET-запроса';
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Успешное создание' })
  create(@Body() createExampleDto: any): string {
    return 'Это пример POST-запроса';
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Успешный ответ' })
  findOne(@Param('id') id: number): string {
    return `Это пример GET-запроса с параметром ${id}`;
  }
}
```

> Замечание: Обратите внимание, что имена ваших файлов должны иметь один из следующих суффиксов: ['.dto.ts', '.entity.ts'] (например, create-user.dto.ts), чтобы плагин мог их проанализировать.

Теперь откройте браузер и перейдите по адресу http://localhost:3000/api (или по тому адресу, который вы указали в SwaggerModule.setup). Вы увидите автоматически сгенерированную документацию API.

- запустите API: `nest start --watch` и в средстве Swagger по адресу `http://localhost:[port]/swagger/index.html` попробуйте выполнить конечную точку для получения всех пользователей.

На текущем моменте вы должны получить ошибку:

```
Nest can't resolve dependencies of the AppController (?). Please make sure that the argument UserMemoryRepository at index [0] is available in the AppModule context.
```

Эта ошибка говорит о том, что контроллеру AppController в конcтруктор требуется реализация интерфейса `IUserRepository`, которую мы будем получать из контейнера внедрения зависимостей (DI).

# Контейнер внедрения зависимостей (Dependency Injection)

Контроллер `UsersController` запрашивает в своем конструкторе

```ts
  constructor(
    private readonly usersRepository: IUserRepository
  ) {}
```

реализацию интерфейса `IUserRepository`, который ему должен предоставить DI (Dependency Injection) - контейнер внедрения зависимости. Для этого надо зарегистрировать репозиторий в коллекции сервиcов в проекте API.

```ts
@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: USER_REPOSITORY, // Используем строковый токен
      useClass: UserMemoryRepository, // Указываем реализацию
    },
  ],
})
export class AppModule {}
```

для этого надо изменить интерфейс и добавить токен:

```ts
export const USER_REPOSITORY = 'USER_REPOSITORY'; // Создаем строковый токен

export interface IUserRepository {
  create(createUserDto: CreateUserDto): unknown;
  findOne(arg0: number): unknown;
  update(arg0: number, updateUserDto: UpdateUserDto): unknown;
  remove(arg0: number): unknown;
  findAll(): User[];
}
```

- запустите проект и проверьте все конечные точки по пути `http://localhost:[port]/swagger/index.html`

# Валидация модели

Установка валидаторов

- `npm install class-validator class-transformer`

При отравке пост запросов надо проверять модель данных на соответствие валидности.

Атрибут для проверки минимального длины имени

```ts
import { IsNumber, IsString, Length } from 'class-validator';

export class User {
  @IsNumber()
  id: number;

  @IsString()
  @Length(3, 5, { message: 'Минимальная длина имени 3, максимальная 5' })
  name: string;
}
```

Для создания собственного атрибута валидации создайте папку `validations` и в ней создайте класс `customtext.validator.ts`:

```ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text === 'valid'; // Пример кастомной логики
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text is not valid!';
  }
}
```

Таким образом модель будет выглядеть следующим образом:

```ts
export class User {
  @IsNumber()
  id: number;

  @Validate(CustomTextValidator)
  @IsString()
  @Length(3, 5, { message: 'Минимальная длина имени 3, максимальная 5' })
  name: string;
}
```

# Инструменты для тестирования API

1. Протестируйте работу API и валидацию на примере управления пользователями с помощью встроенного средства Swagger по адресу http://localhost:[port]/swagger

2. Postman

3. Запросы посредством файлов с расширением .http. Создайте в корнейвой директории папку `requests` в которой создайте файл с расширением http. Например, `getusers.http`. Для работы этого способа проверьте наличие расширения в vscode: REST Client.

Пример файла get-запроса get.http

```
@api = http://localhost:5137
GET {{api}}/Users
```

Пример файла postuser.http

```
@api = http://localhost:5137
POST {{api}}/Users
Content-Type:  application/json

{
  "id": 0,
  "name": "String"
}
```

Проверка запросов осуществляется с помощью VS Code.

**Задание 1**: проверьте все методы валидации при отправке POST запроса на создания пользователя во всех средствах тестирования API

**Подсказка**: @HttpCode(HttpStatus.CREATED)

**Задание 2**: Создайте модель `Role`, а также интерфейс, репозиторий, контроллер, валидации.

Фиксация изменений в git: "Создание RolesController"

**Задание 3**: при запросе post на создание нового ресурса обычно принято отвечать кодом `201`. Примените метод `Created` для возврата ответа типа `ActionResult`

Фиксация изменений в git: Реализация статус-кода 201 в методе контроллера для создания пользователя

# Rebase sprint1 в master

- зафиксируйте sprint1 c сообщением "Выполнен sprint1"
- перейдите в master
- выполните команду git rebase sprint1

# Рефакторинг

- установите расширение Material Icons для удобства работы и включите с помощью команды `>material icon` по F1
- в настройках settings => exclude: внесите шаблоны для `bin` и `obj`
- добавьте горячие клавиши Ctrl+ Пробел для "лампочки".

# Возможные ошибки и их решения

## Ошибка скачивания пакетов с nuget.org

- dotnet nuget locals all --clear
- dotnet dev-certs https --check --trust

или удалить nuget.config и перезагрузить обязательно

# CORS

main.ts

```ts
app.enableCors();

// Или с кастомными настройками
app.enableCors({
  origin: 'https://example.com', // Разрешенный домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP-методы
  allowedHeaders: 'Content-Type, Accept', // Разрешенные заголовки
  credentials: true, // Разрешить передачу кук и заголовков авторизации
});
```

## Документация API через Swagger

- документация доступна по адресу swagger с добавлением `-json`, например
`http://localhost:3000/api-json`
- потом можно создать коллекцию в Postman

# Prisma

- установите и инициализируйте prisma

```
npm install prisma @prisma/client
npx prisma init
```

- настройте схему для prisma

```
// npx prisma migrate dev --name init
// npx prisma generate
// npx prisma studio 

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String?
  age Int
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)

  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

```

# Изменение модели данных в интерфейсе на модели Prisma

```ts
// import { User } from "src/models/user.entity";
import { User } from '@prisma/client';
export const USER_REPOSITORY = 'USER_REPOSITORY'; // Создаем строковый токен

export interface IUserRepository {
    getAll(): Promise<User[]>;
    create(user: Omit<User, 'id'>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
  }
```

- измените репозиторий UserRespository

```ts
// src/repositories/user.prisma.repository.ts
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';

import { User, Post } from '@prisma/client';
import { IUserRepository } from 'src/interfaces/user.repository.';
import { PrismaService } from 'src/services/prisma.service';


@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: {
          posts: true, // Включаем связанные посты
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async create(userData: User): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: userData.name,
          age: userData.age,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.getAll(); // Можно просто вызывать getAll
  }

  async findOne(id: number): Promise<User & { posts?: Post[] }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          posts: true, // Включаем посты пользователя
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, userData: { name?: string; age?: number }): Promise<User> {
    try {
      await this.findOne(id); // Проверяем существование пользователя

      return await this.prisma.user.update({
        where: { id },
        data: {
          name: userData.name,
          age: userData.age,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Удаляем сначала все посты пользователя
      await this.prisma.post.deleteMany({
        where: { authorId: id },
      });

      // Затем удаляем самого пользователя
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
   
    switch (error.code) {
      case 'P2002':
        throw new ConflictException('Unique constraint violation');
      case 'P2025':
        throw new NotFoundException('Record not found');
      default:
        throw new InternalServerErrorException('Something went wrong');
    }
  }

}
```


## Модель Role

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "Roles" })
export default class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string
}
```

## data-source.ts

```ts
import "reflect-metadata"
import { DataSource } from "typeorm"
import Role from "./models/role.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "SampleApp",
    synchronize: true,
    logging: false,
    entities: [Role],
    migrations: ["src/migrations/*.ts"],  // <- откуда загружать миграции
    migrationsTableName: "migrations",
})

```

- npm install -g typeorm
- npm install ts-node --save-dev (для моделей ts)


- настроить package.json секция script:

```json
"typeorm": "typeorm-ts-node-commonjs -d ./src/data-source.ts"
```

- генерация миграции
`npm run typeorm migration:generate ./src/migrations/Init`

- запуск миграции
`npm run typeorm migration:run`