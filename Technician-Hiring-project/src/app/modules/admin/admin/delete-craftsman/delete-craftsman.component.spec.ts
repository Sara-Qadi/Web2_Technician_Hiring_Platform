import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCraftsmanComponent } from './delete-craftsman.component';

describe('DeleteCraftsmanComponent', () => {
  let component: DeleteCraftsmanComponent;
  let fixture: ComponentFixture<DeleteCraftsmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCraftsmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCraftsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
