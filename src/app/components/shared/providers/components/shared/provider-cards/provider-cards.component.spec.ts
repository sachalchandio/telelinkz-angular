import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCardsComponent } from './provider-cards.component';

describe('ProviderCardsComponent', () => {
  let component: ProviderCardsComponent;
  let fixture: ComponentFixture<ProviderCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
