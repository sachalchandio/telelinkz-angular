import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleJourneyAtntComponent } from './sale-journey-atnt.component';

describe('SaleJourneyAtntComponent', () => {
  let component: SaleJourneyAtntComponent;
  let fixture: ComponentFixture<SaleJourneyAtntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleJourneyAtntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleJourneyAtntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
