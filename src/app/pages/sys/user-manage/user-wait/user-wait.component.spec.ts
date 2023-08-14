import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWaitComponent } from './user-wait.component';

describe('UserWaitComponent', () => {
  let component: UserWaitComponent;
  let fixture: ComponentFixture<UserWaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWaitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
