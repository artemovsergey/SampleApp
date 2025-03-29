import { Component, inject, OnInit } from '@angular/core';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title: String = "Добро пожаловать"

}
