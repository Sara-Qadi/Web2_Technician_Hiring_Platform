import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalspageComponent } from './proposalspage.component';

describe('ProposalspageComponent', () => {
  let component: ProposalspageComponent;
  let fixture: ComponentFixture<ProposalspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
