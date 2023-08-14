import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { fakeAsync, tick } from '@angular/core/testing';
import { markAsFinished } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch markAsFinished action', fakeAsync(() => {
    const item = {
      bookId: 'p1v6DwAAQBAJ',
      title: 'JavaScript',
      authors: [''],
      description: '',
    };
  
    const dispatchSpy = spyOn(store, 'dispatch').and.returnValue(of());
  
    component.markAsFinished(item);
    tick();
  
    expect(dispatchSpy).toHaveBeenCalledWith(markAsFinished({ item }));
  }));
});