import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-task-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-delete-task-dialog.component.html',
  styleUrl: './confirm-delete-task-dialog.component.scss'
})
export class ConfirmDeleteTaskDialogComponent {
  
  private dialogRef = inject(MatDialogRef<ConfirmDeleteTaskDialogComponent>)
  readonly data = inject<any>(MAT_DIALOG_DATA)

  confirm() {
    this.dialogRef.close(true)
  }

  no() {
    this.dialogRef.close()
  }

}
