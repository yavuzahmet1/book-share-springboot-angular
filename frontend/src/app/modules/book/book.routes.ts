import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { BookList } from './pages/book-list/book-list';
import { MyBooks } from './pages/my-books/my-books';
import { ManageBook } from './pages/manage-book/manage-book';
import { BorrowedBookList } from './pages/borrowed-book-list/borrowed-book-list';
import { authGuard } from '../../services/guard/auth-guard';
import { ReturnBooks } from './pages/return-books/return-books';

export const bookRoutes: Routes = [
    {
        path: '',
        component: Main,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'books',
                pathMatch: 'full'
            },
            {
                path: 'books',
                component: BookList,
                canActivate: [authGuard]
            },
            {
                path: 'my-books',
                component: MyBooks,
                canActivate: [authGuard]
            },
            {
                path: 'my-borrowed-books',
                component: BorrowedBookList,
                canActivate: [authGuard]
            },
            {
                path: 'my-returned-books',
                component: ReturnBooks,
                canActivate: [authGuard]
            },
            {
                path: "manage",
                component: ManageBook,
                canActivate: [authGuard]
            },
            {
                path: "manage/:bookId",
                component: ManageBook,
                canActivate: [authGuard]
            }
        ]
    }
];