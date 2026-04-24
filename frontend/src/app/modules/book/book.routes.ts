import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { BookList } from './pages/book-list/book-list';
import { MyBooks } from './pages/my-books/my-books';
import { ManageBook } from './pages/manage-book/manage-book';
import { BorrowedBookList } from './pages/borrowed-book-list/borrowed-book-list';

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
            ,
            {
                path: 'my-borrowed-books',
                component: BorrowedBookList,
            }
            , {
                path: "manage",
                component: ManageBook
            }
            , {
                path: "manage/:bookId",
                component: ManageBook
            }
        ]
    }
];