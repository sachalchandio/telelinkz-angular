import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFunctionalityComponent } from './login-functionality.component';

describe('LoginFunctionalityComponent', () => {
  let component: LoginFunctionalityComponent;
  let fixture: ComponentFixture<LoginFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFunctionalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
