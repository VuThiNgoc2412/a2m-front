import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGivedComponent } from './user-gived.component';

describe('UserGivedComponent', () => {
  let component: UserGivedComponent;
  let fixture: ComponentFixture<UserGivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
