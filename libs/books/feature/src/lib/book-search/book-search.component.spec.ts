import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule, MatSnackBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show a snackbar when a book is added to the reading list', () => {
    const book = {
      id: '1',
      title: 'Test Book',
      authors: ['Test Author'],
      description: 'This is a test book.',
      publisher: 'Test Publisher',
      publishedDate: '2023-08-05',
      coverUrl: 'test-cover-url'
    };

    spyOn(snackBar, 'open').and.callThrough();

    component.addBookToReadingList(book);

    expect(snackBar.open).toHaveBeenCalledWith('Test Book Added', 'Undo', jasmine.any(Object));
  });
});
