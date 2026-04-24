import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-borrowed-book-list',
  imports: [],
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.scss',
})
export class BorrowedBookList implements OnInit {

  borrowedBooks: PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 5;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    throw new Error('Method not implemented.');
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size,
    }).then((response) => {
      this.borrowedBooks = response;
    });
  }

}
