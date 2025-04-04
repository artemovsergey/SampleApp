import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  authService = inject(AuthService)

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    console.log('id: ', id); // Например: "1" для /users/1
  }

}
