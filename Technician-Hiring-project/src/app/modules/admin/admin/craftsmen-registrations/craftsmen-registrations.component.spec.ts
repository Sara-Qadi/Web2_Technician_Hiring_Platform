import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftsmenRegistrationsComponent } from './craftsmen-registrations.component';

describe('CraftsmenRegistrationsComponent', () => {
  let component: CraftsmenRegistrationsComponent;
  let fixture: ComponentFixture<CraftsmenRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftsmenRegistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraftsmenRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
