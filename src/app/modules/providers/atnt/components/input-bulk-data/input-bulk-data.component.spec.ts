import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBulkDataComponent } from './input-bulk-data.component';

describe('InputBulkDataComponent', () => {
  let component: InputBulkDataComponent;
  let fixture: ComponentFixture<InputBulkDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBulkDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBulkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
