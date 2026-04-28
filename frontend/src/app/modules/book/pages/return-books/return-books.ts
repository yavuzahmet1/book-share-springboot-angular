import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-return-books',
  imports: [],
  templateUrl: './return-books.html',
  styleUrl: './return-books.scss',
})
export class ReturnBooks implements OnInit {
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 5;
  message: string | null = null;
  level: 'success' | 'error' | null = null;
  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size,
    }).then((response) => {
      this.returnedBooks = response;
    }).catch((err) => {
      console.error('Error fetching returned books:', err);
    });
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    console.log('Book to be returned:', book);
  }

  get pageNumbers(): number[] {
    const totalPages = this.returnedBooks.totalPages || 0;
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllReturnedBooks();
  }

  goToFirstPage() {
    this.goToPage(0);
  }

  goToPreviousPage() {
    this.goToPage(this.page - 1);
  }

  goToNextPage() {
    this.goToPage(this.page + 1);
  }

  goToLastPage() {
    this.goToPage((this.returnedBooks.totalPages ?? 1) - 1);
  }

  get isLastPage(): boolean {
    return (this.returnedBooks?.totalPages ?? 0) <= this.page + 1;
  }

  approveBookReturn(book: BorrowedBookResponse): void {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'Cannot approve return for a book that has not been returned yet.';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number,
    }).then(() => {
      this.level = 'success';
      this.message = 'Book return approved successfully.';
      this.findAllReturnedBooks();
    }).catch((err) => {
      console.error('Book return approval error:', err);
      this.level = 'error';
      this.message = 'An error occurred while approving the book return.';
    });
  }
}