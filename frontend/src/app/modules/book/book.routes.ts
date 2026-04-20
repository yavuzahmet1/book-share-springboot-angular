import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { BookList } from './pages/book-list/book-list';
import { MyBooks } from './pages/my-books/my-books';

export const bookRoutes: Routes = [
    {
        path: '',
        component: Main,
        children: [
            {
                path: '',
                redirectTo: 'books',
                pathMatch: 'full'
            },
            {
                path: 'books',
                component: BookList
            },
            {
                path: 'my-books',
                component: MyBooks,
            }
        ]
    }
];