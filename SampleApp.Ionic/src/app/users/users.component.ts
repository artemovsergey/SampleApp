import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table'
import { IonicModule } from '@ionic/angular';
import { tap } from 'rxjs';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.services';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [IonicModule, CommonModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  title: String = 'Пользователи';
  users: User[] = [];
  userService = inject(UsersService);
  displayedColumns = ['id', 'login'];

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(tap((r) => console.log(r)))
      .subscribe({ next: (r) => (this.users = r) });
  }

}
