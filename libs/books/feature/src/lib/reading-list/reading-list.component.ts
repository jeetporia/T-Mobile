import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getReadingList, removeFromReadingList, markAsFinished } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$: Observable<any>;

  constructor(private readonly store: Store) {
    this.readingList$ = this.store.select(getReadingList);
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinished(item){
    this.store.dispatch(markAsFinished({ item }));
  }
}