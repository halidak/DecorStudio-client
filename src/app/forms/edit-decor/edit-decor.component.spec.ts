import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDecorComponent } from './edit-decor.component';

describe('EditDecorComponent', () => {
  let component: EditDecorComponent;
  let fixture: ComponentFixture<EditDecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDecorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
