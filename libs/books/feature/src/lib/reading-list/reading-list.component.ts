import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, ReadingListItem } from '@tmo/shared/models';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$: Observable<any>;
  private subscription: Subscription = new Subscription();

  constructor(private readonly store: Store, private readonly snackBar: MatSnackBar) {
    this.readingList$ = this.store.select(getReadingList);
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(item.title + ' Removed', 'Undo', item);
  }
  
  openSnackBar(message: string, action: string, book) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });
  
    this.subscription.add(
      snackBarRef.onAction().subscribe(() => {
        this.addBookToReadingList(book);
        snackBarRef.dismiss();
      })
    );
  }
  
  addBookToReadingList = (book: Book) => {
    this.store.dispatch(addToReadingList({ book }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}