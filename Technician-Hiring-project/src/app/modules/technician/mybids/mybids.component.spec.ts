import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybidsComponent } from './mybids.component';

describe('MybidsComponent', () => {
  let component: MybidsComponent;
  let fixture: ComponentFixture<MybidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
