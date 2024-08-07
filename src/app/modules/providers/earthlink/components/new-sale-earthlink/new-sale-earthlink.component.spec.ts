import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleEarthlinkComponent } from './new-sale-earthlink.component';

describe('NewSaleAtntComponent', () => {
  let component: NewSaleEarthlinkComponent;
  let fixture: ComponentFixture<NewSaleEarthlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSaleEarthlinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSaleEarthlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
