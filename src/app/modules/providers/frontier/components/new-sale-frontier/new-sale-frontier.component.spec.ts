import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleFrontierComponent } from './new-sale-frontier.component';

describe('NewSaleAtntComponent', () => {
  let component: NewSaleFrontierComponent;
  let fixture: ComponentFixture<NewSaleFrontierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSaleFrontierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSaleFrontierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
