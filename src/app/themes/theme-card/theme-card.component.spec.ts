import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeCardComponent } from './theme-card.component';

describe('ThemeCardComponent', () => {
  let component: ThemeCardComponent;
  let fixture: ComponentFixture<ThemeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
