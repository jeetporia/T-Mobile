import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '@tmo/books/feature';
import { ReadingListComponent } from './reading-list.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a snackbar when a book is removed from the reading list', () => {
    const item = {
      title: 'Test Book',
    };
    spyOn(snackBar, 'open').and.callThrough();
    component.removeFromReadingList(item);
    expect(snackBar.open).toHaveBeenCalledWith('Test Book Removed', 'Undo', jasmine.any(Object));
  });
});
