import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit,OnDestroy {
  books: ReadingListBook[];
  private booksSubscription: Subscription = new Subscription();

  searchForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      term: ''
    });

    this.booksSubscription = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }


  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    const readingListItem: ReadingListItem = {
      ...book,
      bookId: book.id,
    };
  
    const undoAction = () => {
      this.store.dispatch(removeFromReadingList({ item: readingListItem }));
    };
  
    this.openSnackBar(book.title + ' Added', 'Undo', undoAction);
    this.store.dispatch(addToReadingList({ book }));
  }
  
  

  openSnackBar(message: string, action: string, undoAction: () => void) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      undoAction();
      snackBarRef.dismiss();
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
