import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KineticDashboardComponent } from './dashboard-kinetic.component';

describe('KineticDashboardComponent', () => {
  let component: KineticDashboardComponent;
  let fixture: ComponentFixture<KineticDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KineticDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KineticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
