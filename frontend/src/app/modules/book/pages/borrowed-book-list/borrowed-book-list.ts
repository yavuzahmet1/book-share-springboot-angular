import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedBackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Rating } from "../../components/rating/rating";

@Component({
  selector: 'app-borrowed-book-list',
  imports: [FormsModule, RouterLink, Rating],
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.scss',
})
export class BorrowedBookList implements OnInit {


  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedBackRequest = {
    bookId: 0,
    comment: '',
    note: 0,
  };
  page = 0;
  size = 5;
  selectedBook: BorrowedBookResponse = {};

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size,
    }).then((response) => {
      this.borrowedBooks = response;
    });
  }

  goToPage(pageIndex: number) {
    const total = this.borrowedBooks?.totalPages ?? 0;

    if (pageIndex < 0 || pageIndex >= total || this.page === pageIndex) {
      return;
    }

    this.page = pageIndex;
    this.findAllBorrowedBooks();
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
    this.goToPage((this.borrowedBooks.totalPages ?? 1) - 1);
  }

  get isLastPage(): boolean {
    return (this.borrowedBooks?.totalPages ?? 0) <= this.page + 1;
  }

  get pageNumbers(): number[] {
    const totalPages = this.borrowedBooks?.totalPages ?? 0;
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  returnBook(withFeedback: boolean) {
    throw new Error('Method not implemented.');
  }
}