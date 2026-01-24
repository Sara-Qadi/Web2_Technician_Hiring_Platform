import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideprofileComponent } from './outsideprofile.component';

describe('OutsideprofileComponent', () => {
  let component: OutsideprofileComponent;
  let fixture: ComponentFixture<OutsideprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutsideprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsideprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
