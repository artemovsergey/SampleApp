# Основные функции

- в Idea создайте новый проект `SampleApp.API`

**Замечание**: можно настраивавать начальный проект через сайт Spring Initializer

- добавьте зависимости для Spring:

build.gradle.kts
`
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
`

- в секцию plugins занесите настройки:

build.gradle.kts
```
plugins {
    kotlin("jvm") version "2.1.0"
    kotlin("plugin.spring") version "2.1.0"
    id("org.springframework.boot") version "3.4.4"
    id("io.spring.dependency-management") version "1.1.7"
}
```

- в папке `kotlin` создайте новый package с именем `com.kotlinapi` и внутри этого пакета создайте точку входа для приложения Spring:

```kt
package com.kotlinapi

@SpringBootApplication
class KotlinAPIApplication

fun main(args: Array<String>) {
    runApplication<KotlinAPIApplication>(*args)
}
```

- для проверки работоспособности приложения запустите API в Idea

- в пакете `com.koltnapi` создайте новый пакет `controllers` и создайте новый класс контроллера `HelloController.kt`:

```kt
package com.kotlinapi.controllers

@RestController
@RequestMapping("/api")
class HelloController {

    @GetMapping("/hello")
    fun sayHello(): String {
        return "Hello, Spring Boot!"
    }
}
```

- проверьте в браузере работу конечной точки: ```http://localhost:8080/api/hello```

- добавьте в решение файл `readme.md`
- фиксация изменений в git с сообщением: "Создание начального проекта API на Spring Kotlin"


# Подключение Swagger

- добавьте зависимость

`
//Swagger
implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")
`

- создайте в `kotlin.api` новый пакет `config` и создайте класс `SwaggerConfig`:

SwaggerConfig.kt
```kt
package com.example.kotlinapi.config

import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.OpenAPI
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("Title API")
                    .version("1.0.0")
                    .description("This is a demo API documented with Swagger and SpringDoc.")
            )
    }
}
```

- в application.yml добавьте секцию:

```
springdoc:
  api-docs:
    enabled: true
    path: /v3/api-docs
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
```

- перезапустите сервер и проверьте работу Swagger по адресу `http://localhost:8080/swagger-ui/index.html`


## Разработка домена приложения. Модель пользователя

- установите зависимость

`
	// PostgreSQL Driver
    runtimeOnly("org.postgresql:postgresql")
	// Spring Data JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
`

- добавьте в `application.yml` настройки для подключения к базе данных Postgres:

```yml
springdoc:
  api-docs:
    enabled: true
    path: /v3/api-docs
  swagger-ui:
    enabled: true
    path: /swagger-ui.html

spring:
  application:
    name: kotlinapi

  datasource:
    url: jdbc:postgresql://localhost:5432/SampleApp
    username: postgres
    password: root

  jpa:
    hibernate:
      ddl-auto: create
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

- создайте пакет `models`, в котором создайте класс `User.kt`


```kt
package com.example.kotlinapi.models

import jakarta.persistence.*

@Table(name = "\"Users\"")
@Entity
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = ""
)
```

# Репози## Реализация CRUD

- создайте пакет `repositories`  и в нем создайте интерфейс `UserRepository`:

```kt
package com.example.kotlinapi.repositories

import com.example.kotlinapi.models.User

interface UserRepository {
fun save(user: User): User
fun findById(id: Long): User?
fun findAll(): List<User>
fun deleteById(id: Long)
fun update(user: User): User
}
```

- далее в этой же папке создайте реализацию этого интерфейса в классе `UserRepositoryImpl`:


```kt
package com.example.kotlinapi.repositories

import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import com.example.kotlinapi.models.User
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
class UserRepositoryImpl : UserRepository {

    @PersistenceContext
    private lateinit var entityManager: EntityManager

    @Transactional
    override fun save(user: User): User {
        entityManager.persist(user)
        return user
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): User? {
        return entityManager.find(User::class.java, id)
    }

    @Transactional(readOnly = true)
    override fun findAll(): List<User> {
        val query = entityManager.createQuery("SELECT u FROM User u", User::class.java)
        return query.resultList
    }

    @Transactional
    override fun deleteById(id: Long) {
        val user = findById(id)
        if (user != null) {
            entityManager.remove(user)
        }
    }

    @Transactional
    override fun update(user: User): User {
        return entityManager.merge(user)
    }
}
```

# Создание UsersController для управления пользователями

- создайте пакет `controllers` и создайте новый класс UsersController:

```kt
package com.example.kotlinapi.controllers

import com.example.kotlinapi.models.User
import org.springframework.web.bind.annotation.*
import com.example.kotlinapi.repositories.UserRepositoryImpl

@RestController
@RequestMapping("/users")
class UsersController(private val userRepository: UserRepositoryImpl) {

    @GetMapping
    fun getAllUsers(): List<User> = userRepository.findAll()

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): User {
        return userRepository.findById(id) ?: throw Exception()
    }


    @PostMapping
    fun createUser(@RequestBody user: User): User = userRepository.save(user)

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody user: User): User {
        return if (userRepository.findById(id) != null) {
            userRepository.save(user.copy(id = id))
        } else {
            throw RuntimeException("User not found")
        }
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Long) {
        userRepository.deleteById(id)
    }
}
```

Теперь откройте браузер и перейдите по адресу http://localhost:8080/swagger-ui/index.html. Вы увидите автоматически сгенерированную документацию API.

- запустите проект и проверьте все конечные точки в `UsersController`

# Валидация модели

- установим зависимость

`
	// Валидация модели
	implementation("org.springframework.boot:spring-boot-starter-validation")
`

- добавьте валидацию на поле модели User:

```kt
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    val name: String = ""
```

- добавьте валидацию в метод @Post в контроллере:

```kt
    @PostMapping
    fun createUser(@Valid @RequestBody user: User): User = userRepository.save(user)
```


# Инструменты для тестирования API

1. Протестируйте работу API и валидацию на примере управления пользователями с помощью встроенного средства Swagger по адресу http://localhost:[port]/swagger

2. Postman

**Задание 1**: проверьте все методы валидации при отправке POST запроса на создания пользователя во всех средствах тестирования API


**Задание 2**: Создайте модель `Role`, а также интерфейс, репозиторий, контроллер, валидации.

Фиксация изменений в git: "Создание RolesController"

**Задание 3**: при запросе post на создание нового ресурса обычно принято отвечать кодом `201`. Примените метод `Created` для возврата ответа типа `ActionResult`
**Подсказка**: ```ResponseEntity.status(HttpStatus.CREATED).body(savedUser)```


Фиксация изменений в git: Реализация статус-кода 201 в методе контроллера для создания пользователя

# Rebase sprint1 в master

- зафиксируйте sprint1 c сообщением "Выполнен sprint1"
- перейдите в master
- выполните команду git rebase sprint1


# CORS

- создайте новую конфигурацию `CorsConfig`:

```kt
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig {

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000", "https://your-production-domain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600)
            }
        }
    }
}
```

## Документация API через Swagger

- документация доступна по адресу http://localhost:8080/v3/api-docs
- потом можно создать коллекцию в Postman
