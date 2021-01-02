import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ProductCardCompactComponent } from './product-card-compact.component';
import { ProductsModule } from '../products.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, MemoizedSelector } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../state/product.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { Product } from '../product';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  setupProducts,
  setupCollectionItemIds,
} from '../../../test/setup-test-data';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromCollectionItem from '../../collections/state/collection-item.reducer';
import {
  selectCollectionQuantity,
  selectCollectionItems,
  selectTest,
} from 'src/app/collections/state/collection-item.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagePipe } from '../../shared/image.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { COLLECTIONITEMS } from '../../../test/test-data';

describe('ProductCardCompactComponent', () => {
  let component: ProductCardCompactComponent;
  let fixture: ComponentFixture<ProductCardCompactComponent>;
  let cd: ChangeDetectorRef;
  let policeStation: Product = setupProducts().find((x) => x.id === 1);
  let mockStore: MockStore;

  const initialState = {
    collectionItem: {
      ids: setupCollectionItemIds(),
      entities: COLLECTIONITEMS,
      lastLoaded: '',
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImagePipe,
        ProductCardCompactComponent,
        TestHostComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatCardModule,
        MatBadgeModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cd = fixture.componentRef.injector.get(ChangeDetectorRef);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show product title', () => {
    component.product = policeStation;

    cd.detectChanges();

    const titleDe = fixture.debugElement.query(By.css('.product-title a'));

    expect(titleDe.nativeElement.innerText).toBe(policeStation.name);
  });

  it('should show badge with total quantity for all collections', () => {
    component.product = policeStation;
    component.loadData();

    cd.detectChanges();

    const badgeDe = fixture.debugElement.query(By.css('.mat-badge-content'));

    expect(badgeDe.nativeElement.innerText).toBe('4');
  });

  it('should show badge with total quantity for selected collection', () => {
    component.product = policeStation;
    component.collectionId = 1;
    component.loadData();

    cd.detectChanges();

    const badgeDe = fixture.debugElement.query(By.css('.mat-badge-content'));

    expect(badgeDe.nativeElement.innerText).toBe('3');
  });
});

@Component({
  template: `<app-product-card-compact
    [product]="product"
    [collections]="collections"
    [collectionId]="collectionId"
  ></app-product-card-compact>`,
})
class TestHostComponent {
  product = setupProducts().find((x) => x.id === 1);
  collections = [];
  collectionId: number = undefined;
  @ViewChild(ProductCardCompactComponent)
  public componentUnderTestComponent: ProductCardCompactComponent;
}
