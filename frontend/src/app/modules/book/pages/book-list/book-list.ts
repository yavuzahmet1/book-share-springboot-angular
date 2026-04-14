import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from "../../components/book-card/book-card";

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  size: number = 5;
  page: number = 0;


  constructor(
    private bookService: BookService,
    private router: Router
  ) {

  }
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

  goToFirstPage() {
    throw new Error('Method not implemented.');
  }

  goToPreviousPage() {
    throw new Error('Method not implemented.');
  }

  goToPage() {
    throw new Error('Method not implemented.');
  }

  goToNextPage() {
    throw new Error('Method not implemented.');
  }

  goToLastPage() {
    throw new Error('Method not implemented.');
  }

}
