import { Component, input, computed, signal, output } from '@angular/core';
import { BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {

  bookItem = input.required<BookResponse>();
  _manage = input<boolean>(false);
  details = output<BookResponse>();
  borrow = output<BookResponse>();
  addToWaitList = output<BookResponse>();
  edit = output<BookResponse>();
  share = output<BookResponse>();
  archive = output<BookResponse>();

  bookCover = computed(() => {
    const coverData = this.bookItem().cover;

    if (coverData) {
      return 'data:image/jpg;base64, ' + coverData;
    }

    return '/images/default.png';
  });

  onShowDetails() {
    this.details.emit(this.bookItem());
  }

  onBorrowBook() {
    this.borrow.emit(this.bookItem());
  }

  onAddToWaitingList() {
    this.addToWaitList.emit(this.bookItem());
  }

  onEditBook() {
    this.edit.emit(this.bookItem());
  }

  onShareBook() {
    this.share.emit(this.bookItem());
  }

  onArchiveBook() {
    this.archive.emit(this.bookItem());
  }
}