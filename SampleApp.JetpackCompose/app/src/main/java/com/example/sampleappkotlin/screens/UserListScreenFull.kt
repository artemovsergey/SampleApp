package com.example.sampleappkotlin.screens

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

// 1. Модель данных
data class User(val id: Int, val name: String)

// 2. API интерфейс
interface ApiService {
    @GET("users")
    suspend fun getUsers(): List<User>
}

// https://jsonplaceholder.typicode.com/
// 3. Создаем Retrofit клиент
private val retrofit = Retrofit.Builder()
    .baseUrl("http://192.168.4.90:8080/users/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

private val apiService = retrofit.create(ApiService::class.java)

// 4. Основной экран
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserListScreenFull() {
    var users by remember { mutableStateOf(emptyList<User>()) }
    var isLoading by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    fun loadData() {
        scope.launch {
            isLoading = true
            error = null
            try {
                users = apiService.getUsers()
            } catch (e: Exception) {
                error = e.message ?: "Unknown error"
            } finally {
                isLoading = false
            }
        }
    }

    // Загрузка данных при первом отображении
    LaunchedEffect(Unit) {
        loadData()
    }



    // UI
    Scaffold(
        topBar = { TopAppBar(title = { Text("User List") }) }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when {
                isLoading -> LoadingIndicator()
                error != null -> ErrorView(error!!, ::loadData)
                else -> UserList(users)
            }
        }
    }
}

// 5. Компоненты UI
@Composable
fun LoadingIndicator() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
    }
}

@Composable
fun ErrorView(error: String, onRetry: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(error, color = Color.Red)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = onRetry) {
            Text("Try Again")
        }
    }
}

@Composable
fun UserList(users: List<User>) {
    LazyColumn(modifier = Modifier.fillMaxSize()) {
        items(users) { user ->
            UserCard(user)
        }
    }
}

@Composable
fun UserCard(user: User) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(user.name, style = MaterialTheme.typography.headlineSmall)
            Text("ID: ${user.id}", style = MaterialTheme.typography.bodyMedium)
        }
    }
}
