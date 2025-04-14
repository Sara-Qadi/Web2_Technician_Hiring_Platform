import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JopListingComponent } from './jop-listing.component';

describe('JopListingComponent', () => {
  let component: JopListingComponent;
  let fixture: ComponentFixture<JopListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JopListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JopListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
