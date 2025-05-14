import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteJobsComponent } from './complete-jobs.component';

describe('CompleteJobsComponent', () => {
  let component: CompleteJobsComponent;
  let fixture: ComponentFixture<CompleteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
