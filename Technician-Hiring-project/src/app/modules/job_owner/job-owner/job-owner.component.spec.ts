import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOwnerComponent } from './job-owner.component';

describe('JobOwnerComponent', () => {
  let component: JobOwnerComponent;
  let fixture: ComponentFixture<JobOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
