import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  @Input() rating: number = 0;
  get starList(): string[] {
    const stars: string[] = [];

    for (let i = 1; i <= 5; i++) {
      if (this.rating >= i) {
        stars.push('fas fa-star');
      } else if (this.rating >= i - 0.5) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }

    return stars;
  }
}