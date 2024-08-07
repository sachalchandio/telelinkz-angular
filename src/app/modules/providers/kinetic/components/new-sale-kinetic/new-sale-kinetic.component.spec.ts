import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleKineticComponent } from './new-sale-kinetic.component';

describe('NewSaleAtntComponent', () => {
  let component: NewSaleKineticComponent;
  let fixture: ComponentFixture<NewSaleKineticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSaleKineticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSaleKineticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
