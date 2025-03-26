package com.example.sampleappkotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.example.sampleappkotlin.screens.UserListScreen
import com.example.sampleappkotlin.screens.UserListScreenFull

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UserListScreenFull()
        }
    }
}

@Preview(showSystemUi = true)
@Composable
fun PreviewUsers(){
    UserListScreen()
}
