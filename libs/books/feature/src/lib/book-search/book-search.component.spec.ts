import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { StoreModule, Store } from '@ngrx/store';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;
  const dispatchSpy = jest.spyOn(Store.prototype, 'dispatch');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [Store],
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
    component.ngOnInit();
    component.searchForm.patchValue({
      term: 'sample search term',
    });
    component.searchBookInput();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Books Search Bar] Search',
        term: 'sample search term',
      })
    );
  }); 
});
