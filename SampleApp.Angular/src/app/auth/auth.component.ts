import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  model: any = {};

  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.authService.loginwithtoken(this.model).subscribe({
      next: (v) => this.router.navigate(['home']),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
