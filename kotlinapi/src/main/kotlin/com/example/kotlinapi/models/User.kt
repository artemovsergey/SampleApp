package com.example.kotlinapi.models

import com.example.kotlinapi.validations.Capitalized
import jakarta.persistence.*
import jakarta.validation.constraints.Size

@Table(name = "\"Users\"")
@Entity
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @field:Capitalized
    @field:Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    val name: String = ""
)