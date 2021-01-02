import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupSettingComponent } from './group-setting.component';

describe('GroupSettingComponent', () => {
  let component: GroupSettingComponent;
  let fixture: ComponentFixture<GroupSettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
