import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSearchAtntComponent } from './record-search-atnt.component';

describe('RecordSearchAtntComponent', () => {
  let component: RecordSearchAtntComponent;
  let fixture: ComponentFixture<RecordSearchAtntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordSearchAtntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordSearchAtntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
