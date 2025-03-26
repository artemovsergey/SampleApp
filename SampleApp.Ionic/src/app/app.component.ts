import { Component } from '@angular/core';
import { IonApp, IonContent, IonRouterOutlet, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
