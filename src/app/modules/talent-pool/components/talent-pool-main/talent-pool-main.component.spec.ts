import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPoolMain } from './talent-pool-main.component';

describe('TalentPoolMain', () => {
  let component: TalentPoolMain;
  let fixture: ComponentFixture<TalentPoolMain>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalentPoolMain]
    });
    fixture = TestBed.createComponent(TalentPoolMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
