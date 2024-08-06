import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontierDashboardComponent } from './dashboard-frontier.component';

describe('FrontierDashboardComponent', () => {
  let component: FrontierDashboardComponent;
  let fixture: ComponentFixture<FrontierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontierDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
