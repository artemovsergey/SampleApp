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