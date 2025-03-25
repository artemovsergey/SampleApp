package com.example.kotlinapi.validations

import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [CapitalizedValidator::class])
annotation class Capitalized(
    val message: String = "Name must start with capital letter",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)

class CapitalizedValidator : ConstraintValidator<Capitalized, String> {

    override fun isValid(value: String?, context: ConstraintValidatorContext): Boolean {

        // Проверяем что первый символ - заглавная буква (поддержка Unicode)
        if (!value!!.first().isUpperCase()) {
            return false
        }

        return true
    }
}