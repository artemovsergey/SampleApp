plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.4.4"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

	// Spring Data JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// PostgreSQL Driver
	runtimeOnly("org.postgresql:postgresql")

	// Flyway
	implementation("org.flywaydb:flyway-core")

	// Дополнительно: Spring Boot DevTools для удобства разработки
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	//Swagger
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
