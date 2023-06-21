import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogDialogComponent } from './add-catalog-dialog.component';

describe('AddCatalogDialogComponent', () => {
  let component: AddCatalogDialogComponent;
  let fixture: ComponentFixture<AddCatalogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatalogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatalogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
