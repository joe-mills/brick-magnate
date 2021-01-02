import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { CollectionPageComponent } from './collection-page.component';
import { CollectionsModule } from '../collections.module';
import { StoreModule, MemoizedSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from '../state/collection.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import * as fromCollection from '../state/collection.reducer';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Collection } from '../collection';
import { setupCollections } from 'src/test/setup-test-data';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCollectionById } from '../state/collection.selectors';
import { CollectionFormComponent } from '../collection-form/collection-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({ selector: 'app-collection-form', template: '' })
class CollectionFormStubComponent {
  @Input() collection;
}
describe('CollectionPageComponent', () => {
  let component: CollectionPageComponent;
  let fixture: ComponentFixture<CollectionPageComponent>;
  let cd: ChangeDetectorRef;
  let testCollection: Collection = setupCollections().find((x) => x.id === 1);
  let mockStore: MockStore;
  let mockCollectionSelector: MemoizedSelector<
    fromCollection.CollectionState,
    Collection
  >;
  const initialState = {
    collection: {
      ids: [],
      entities: {},
      lastLoaded: '',
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionPageComponent, CollectionFormStubComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,

        FontAwesomeTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    mockCollectionSelector = mockStore.overrideSelector(
      selectCollectionById(0),
      testCollection
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // mockCollectionSelector.setResult(testCollection);
    // mockStore.refreshState();

    expect(component).toBeTruthy();
  });
});
