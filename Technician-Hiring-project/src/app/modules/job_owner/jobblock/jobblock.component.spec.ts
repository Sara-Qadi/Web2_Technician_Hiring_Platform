import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobblockComponent } from './jobblock.component';

describe('CardblockComponent', () => {
  let component: JobblockComponent;
  let fixture: ComponentFixture<JobblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobblockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
