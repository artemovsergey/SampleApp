package com.example.kotlinapi.controllers

import com.example.kotlinapi.models.User
import org.springframework.web.bind.annotation.*
import com.example.kotlinapi.repositories.UserRepositoryImpl
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

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
    fun createUser(@Valid @RequestBody user: User): ResponseEntity<User> {
        val savedUser = userRepository.save(user)
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(savedUser)
    }

//    @PostMapping
//    fun createUser(@Valid @RequestBody user: User): ResponseEntity<User> {
//        return ResponseEntity.ok(userRepository.save(user))
//    }

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