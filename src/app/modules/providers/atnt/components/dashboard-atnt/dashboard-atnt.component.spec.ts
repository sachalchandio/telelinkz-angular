import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAtntComponent } from './dashboard-atnt.component';

describe('DashboardAtntComponent', () => {
  let component: DashboardAtntComponent;
  let fixture: ComponentFixture<DashboardAtntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAtntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAtntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
