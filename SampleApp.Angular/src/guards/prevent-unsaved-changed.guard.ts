import { CanDeactivateFn } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<HomeComponent> = (component:HomeComponent) => {

//   if(component.editForm.dirty){
//     return confirm("Вы хотите продолжить?")
//   }

    return true;
};