import { Routes } from '@angular/router';
import { authGuard } from './services/guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register)
    },
    {
        path: 'activate-account',
        loadComponent: () => import('./pages/activate-account/activate-account').then(m => m.ActivateAccount)
    },
    {
        path: 'books',
        loadChildren: () => import('./modules/book/book.routes').then(m => m.bookRoutes),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'books'
    }
];