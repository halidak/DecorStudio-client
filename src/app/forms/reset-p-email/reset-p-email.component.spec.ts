import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPEmailComponent } from './reset-p-email.component';

describe('ResetPEmailComponent', () => {
  let component: ResetPEmailComponent;
  let fixture: ComponentFixture<ResetPEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
