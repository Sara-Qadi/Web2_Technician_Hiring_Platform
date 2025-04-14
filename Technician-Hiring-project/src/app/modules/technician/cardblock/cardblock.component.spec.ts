import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardblockComponent } from './cardblock.component';

describe('CardblockComponent', () => {
  let component: CardblockComponent;
  let fixture: ComponentFixture<CardblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardblockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
