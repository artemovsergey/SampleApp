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
