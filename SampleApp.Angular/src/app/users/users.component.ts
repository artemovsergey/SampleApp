import { Component, inject } from '@angular/core';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';
import { tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
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


  deleteTask(task: any) {

    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    
  
    // открытие окна
    // const dialogRef = this.dialog.open(
    //   ConfirmDeleteTaskDialogComponent,
    //   {data: [task], autoFocus: true, width: '50%'}  // конфигурация
    // );

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('процедура удаления задачи...')
    //     this.taskService.del(task.id).subscribe(
    //       next => {
    //         console.log("Удаление завершено!")

    //         this.taskService.getAll().subscribe(r => {
    //           this.taskService.tasks$.next(r)
    //         })
            
    //         }
    //     )
    //   }
    // });

}

}
