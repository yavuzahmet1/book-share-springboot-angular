import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from "../../components/book-card/book-card";

@Component({
  selector: 'app-my-books',
  imports: [BookCard, RouterLink],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss',
})
export class MyBooks implements OnInit {
  bookResponse: PageResponseBookResponse = {
    content: [],
    totalPages: 0,
    number: 0
  };
  size: number = 5;
  page: number = 0;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findAllBooksOwner({ size: this.size, page: this.page })
      .then((response) => {
        this.bookResponse = response;
      }).catch((error) => {
        console.log(error);
      });
  }

  get pageNumbers(): number[] {
    const total = this.bookResponse?.totalPages ?? 0;
    return Array.from({ length: total }, (_, i) => i);
  }

  goToPage(pageIndex: number) {
    const total = this.bookResponse?.totalPages ?? 0;

    if (pageIndex < 0 || pageIndex >= total || this.page === pageIndex) {
      return;
    }

    this.page = pageIndex;
    this.findAllBooks();
  }

  goToFirstPage() { this.goToPage(0); }
  goToPreviousPage() { this.goToPage(this.page - 1); }
  goToNextPage() { this.goToPage(this.page + 1); }
  goToLastPage() { this.goToPage((this.bookResponse?.totalPages ?? 1) - 1); }

  get isLastPage(): boolean {
    return (this.bookResponse?.totalPages ?? 0) <= this.page + 1;
  }

  editBook(book: BookResponse): void {
    this.router.navigate(['books', 'manage', book.id]);
  }
  shareBook(book: BookResponse) { console.log('Share:', book); }
  archiveBook(book: BookResponse) { console.log('Archive:', book); }

}
