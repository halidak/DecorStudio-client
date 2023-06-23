import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfReservationsComponent } from './list-of-reservations.component';

describe('ListOfReservationsComponent', () => {
  let component: ListOfReservationsComponent;
  let fixture: ComponentFixture<ListOfReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
