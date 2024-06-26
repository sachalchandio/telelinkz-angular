import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { NavbarTopComponent } from './navbarTop/navbarTop.component'; // Import the NavbarTopComponent


describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppLayoutComponent],
    });
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
