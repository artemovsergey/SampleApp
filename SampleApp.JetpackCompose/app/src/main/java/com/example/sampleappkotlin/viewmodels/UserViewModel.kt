package com.example.sampleappkotlin.viewmodels

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.sampleappkotlin.models.User
import com.example.sampleappkotlin.services.RetrofitClient
import kotlinx.coroutines.launch
import androidx.compose.runtime.State

class UserViewModel : ViewModel() {
    private val _users = mutableStateListOf<User>()
    val users: List<User> = _users

    private val _isLoading = mutableStateOf(false)
    val isLoading: State<Boolean> = _isLoading

    private val _error = mutableStateOf<String?>(null)
    val error: State<String?> = _error

    init {
        loadUsers()
    }

    fun loadUsers() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                _users.clear()
                _users.addAll(RetrofitClient.instance.getUsers())
            } catch (e: Exception) {
                _error.value = "Failed to load users: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
}