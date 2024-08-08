import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthlinkDashboardComponent } from './dashboard-earthlink.component';

describe('EarthlinkDashboardComponent', () => {
  let component: EarthlinkDashboardComponent;
  let fixture: ComponentFixture<EarthlinkDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarthlinkDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarthlinkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
