import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAFormAtntComponent } from './qa-form-atnt.component';

describe('QAFormAtntComponent', () => {
  let component: QAFormAtntComponent;
  let fixture: ComponentFixture<QAFormAtntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QAFormAtntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QAFormAtntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
