import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from "../../components/book-card/book-card";

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {
  message: string = "";
  borrowBook(bookItem: BookResponse) {
    this.message = "";
    this.bookService.borrowBook({ "book-id": bookItem.id as number }).then(() => {
      this.message = "Book borrowed successfully!";
      this.findAllBooks();
    }).catch((error) => {
      console.log(error);
      alert('Failed to borrow book. Please try again.');
    }
    );

  }

  bookResponse: PageResponseBookResponse = {};
  size: number = 5;
  page: number = 0;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findAllBooks({ size: this.size, page: this.page })
      .then((response) => {
        this.bookResponse = response;
      }).catch((error) => {
        console.log(error);
      });
  }

  get pageNumbers(): number[] {
    const total = this.bookResponse?.totalPages || 0;
    return Array.from({ length: total }, (_, i) => i);
  }

  goToPage(pageIndex: number) {
    if (this.page === pageIndex) return;

    this.page = pageIndex;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.goToPage(0);
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.goToPage(this.page - 1);
    }
  }

  goToNextPage() {
    const total = this.bookResponse?.totalPages || 1;
    if (this.page < total - 1) {
      this.goToPage(this.page + 1);
    }
  }

  goToLastPage() {
    const total = this.bookResponse?.totalPages || 1;
    this.goToPage(total - 1);
  }

  get isLastPage(): boolean {
    return this.bookResponse.totalPages === this.page + 1;
  }

}