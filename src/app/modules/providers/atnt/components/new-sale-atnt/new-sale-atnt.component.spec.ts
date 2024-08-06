import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleAtntComponent } from './new-sale-atnt.component';

describe('NewSaleAtntComponent', () => {
  let component: NewSaleAtntComponent;
  let fixture: ComponentFixture<NewSaleAtntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSaleAtntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSaleAtntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
