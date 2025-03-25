package com.example.kotlinapi.repositories

import com.example.kotlinapi.models.User

interface UserRepository {
    fun save(user: User): User
    fun findById(id: Long): User?
    fun findAll(): List<User>
    fun deleteById(id: Long)
    fun update(user: User): User
}