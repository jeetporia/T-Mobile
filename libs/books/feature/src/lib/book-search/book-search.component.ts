import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit,OnDestroy, AfterViewInit {
  books: ReadingListBook[];
  private booksSubscription: Subscription;
  
  @ViewChild('searchInput')
  searchInput:ElementRef;

  searchForm = this.fb.group({
    term: ''
  });

  searchSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
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
    this.store.dispatch(addToReadingList({ book }));
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
  searchBookInput() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngAfterViewInit(): void {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(
          () => this.searchBookInput()
        )
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}