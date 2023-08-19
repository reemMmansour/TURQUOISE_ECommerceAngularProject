import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityDemandedDialogBoxComponent } from './quantity-demanded-dialog-box.component';

describe('QuantityDemandedDialogBoxComponent', () => {
  let component: QuantityDemandedDialogBoxComponent;
  let fixture: ComponentFixture<QuantityDemandedDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantityDemandedDialogBoxComponent]
    });
    fixture = TestBed.createComponent(QuantityDemandedDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
