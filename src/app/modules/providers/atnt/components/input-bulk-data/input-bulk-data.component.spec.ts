import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtntInputBulkDataComponent } from './input-bulk-data.component';

describe('AtntInputBulkDataComponent', () => {
  let component: AtntInputBulkDataComponent;
  let fixture: ComponentFixture<AtntInputBulkDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtntInputBulkDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtntInputBulkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
