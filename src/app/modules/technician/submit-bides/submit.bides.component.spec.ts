import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBidesComponent } from './submit.bides.component';

describe('SubmitBidesComponent', () => {
  let component: SubmitBidesComponent;
  let fixture: ComponentFixture<SubmitBidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitBidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitBidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
