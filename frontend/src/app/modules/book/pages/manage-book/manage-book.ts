import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-manage-book',
  imports: [],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss',
})
export class ManageBook {

  errorMessage: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: File | undefined;
  constructor(private cdr: ChangeDetectorRef) { }
  onFileSelected(event: Event) {
    this.selectedBookCover = (event.target as HTMLInputElement).files?.[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedPicture = e.target?.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

}
