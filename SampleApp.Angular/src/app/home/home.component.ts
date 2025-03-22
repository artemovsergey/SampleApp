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
export class HomeComponent implements OnInit {

  title: String = "Пользователи"
  users: User[] = []
  userService = inject(UsersService)
  displayedColumns = ["id", "name"]

  ngOnInit() {
    this.userService.getAll().pipe(
      tap((r) => console.log(r))
    ).subscribe({ next: (r) => this.users = r})
  }

}
