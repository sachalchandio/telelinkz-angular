import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegComponent } from './userReg.component';

describe('UserRegComponent', () => {
  let component: UserRegComponent;
  let fixture: ComponentFixture<UserRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegComponent],
    });
    fixture = TestBed.createComponent(UserRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
