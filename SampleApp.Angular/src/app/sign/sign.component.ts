import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
    
  ],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss',
})
export class SignComponent implements OnInit {
  model: any = {};
  signForm!: FormGroup;
  snackBar: MatSnackBar = inject(MatSnackBar)

  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastrService);

  ngOnInit(): void {
    this.signForm = new FormGroup(
      {
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.maxLength(8)]),
      },
      { validators: [this.checkLoginValidator] }
    );
  }

  sign() {

    console.log(this.signForm.value)
    this.openSnackBar("Пользователь успешно зарегистрирован!")
    this.toastService.success("Пользователь зарегистрирован")
    // this.authService.register(this.model).subscribe({
    //   next: () => this.router.navigate(['auth']),
    //   error: (e) => console.log(e.error),
    // });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000});
  }

  private checkLoginValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const login = control.get('login');
    if (login?.value == 'admin') {
      console.log('логин: ', login!.value);
      return { checkConfirmLogin: 'Недопустимый логин пользователя!' };
    }
    return null;
  };
}
