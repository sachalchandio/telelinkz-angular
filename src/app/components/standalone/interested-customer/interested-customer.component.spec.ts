import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedCustomerComponent } from './interested-customer.component';

describe('InterestedCustomerComponent', () => {
  let component: InterestedCustomerComponent;
  let fixture: ComponentFixture<InterestedCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestedCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
