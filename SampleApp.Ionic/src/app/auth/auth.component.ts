import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonContent } from "@ionic/angular/standalone";
import { AuthService } from 'src/services/auth.services';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [FormsModule, CommonModule, IonicModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  model: any = {};

  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.authService.login(this.model).subscribe({
      next: (v) => this.router.navigate(['home']),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

}
