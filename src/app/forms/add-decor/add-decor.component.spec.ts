import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecorComponent } from './add-decor.component';

describe('AddDecorComponent', () => {
  let component: AddDecorComponent;
  let fixture: ComponentFixture<AddDecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDecorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
