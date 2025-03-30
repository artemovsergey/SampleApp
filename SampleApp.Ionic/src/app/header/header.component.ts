import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/services/auth.services';
import { addIcons } from 'ionicons';
import { home, people, logIn, logOut } from 'ionicons/icons';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    addIcons({ home, people, logIn, logOut });
  }

  login() {
    this.router.navigate(["auth"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
