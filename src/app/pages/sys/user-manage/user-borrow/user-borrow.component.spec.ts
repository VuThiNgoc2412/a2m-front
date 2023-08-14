import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBorrowComponent } from './user-borrow.component';

describe('UserBorrowComponent', () => {
  let component: UserBorrowComponent;
  let fixture: ComponentFixture<UserBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBorrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
