import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignComponent } from './sign/sign.component';
import { preventUnsavedChangesGuard } from '../guards/prevent-unsaved-changed.guard';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [

    {
        path:'',
        runGuardsAndResolvers: "always",
        canActivate:[authGuard],
        children:[
            { path: 'profile', component: HomeComponent},
            { path: 'user/edit', component: HomeComponent, canDeactivate:[preventUnsavedChangesGuard]},
            { path: 'users', component: UsersComponent },
            // { path: 'users/:id', component: UserComponent },
        ]
    },

    { path: 'header', component: HeaderComponent },

    { path: 'home', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'sign', component: SignComponent },
    { path: '', component: HomeComponent },
];
