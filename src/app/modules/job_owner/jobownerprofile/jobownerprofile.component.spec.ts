import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobownerprofileComponent } from './jobownerprofile.component';

describe('JobownerprofileComponent', () => {
  let component: JobownerprofileComponent;
  let fixture: ComponentFixture<JobownerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobownerprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobownerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
