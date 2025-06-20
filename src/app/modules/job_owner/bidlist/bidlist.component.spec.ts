import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidlistComponent } from './bidlist.component';

describe('BidlistComponent', () => {
  let component: BidlistComponent;
  let fixture: ComponentFixture<BidlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
