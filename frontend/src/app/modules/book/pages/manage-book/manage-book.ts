import { ChangeDetectorRef, Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { BookService } from '../../../../services/services';


@Component({
  selector: 'app-manage-book',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss',
})
export class ManageBook {

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    shareable: false,
    synopsis: '',
    title: ''
  };
  errorMessage: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: File | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private bookService: BookService,
    private router: Router
  ) { }

  onFileSelected(event: Event) {
    this.selectedBookCover = (event.target as HTMLInputElement).files?.[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedPicture = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  async saveBook() {
    try {
      const bookId = await this.bookService.saveBook({
        body: this.bookRequest
      });

      if (this.selectedBookCover) {
        await this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: { file: this.selectedBookCover }
        });
      }

      this.router.navigate(['/books/my-books']);

    } catch (err: any) {
      this.errorMessage =
        err?.error?.validationErrors || ['Error saving book. Please try again later.'];
    }
  }

}