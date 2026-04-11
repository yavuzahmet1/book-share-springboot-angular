import { Component, input, computed } from '@angular/core';
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

  bookCover = computed(() => {
    const coverData = this.bookItem().cover;

    if (coverData) {
      return 'data:image/jpg;base64, ' + coverData;
    }

    return '/images/default.png';
  });
}