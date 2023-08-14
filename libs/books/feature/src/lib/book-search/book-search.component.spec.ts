import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { StoreModule, Store } from '@ngrx/store';
import { searchBooks } from '../../../../data-access/src/lib/+state/books.actions';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch searchBooks action when the search term is provided', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    component.searchForm.patchValue({
      term: 'sample search term',
    });
    component.searchBookInput();
    expect(store.dispatch).toHaveBeenCalledWith(
      searchBooks({ term: 'sample search term' })
    );
  }); 
});
