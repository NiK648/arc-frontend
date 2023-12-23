import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEmployeesComponent } from './vendor-employees.component';

describe('VendorEmployeesComponent', () => {
  let component: VendorEmployeesComponent;
  let fixture: ComponentFixture<VendorEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorEmployeesComponent]
    });
    fixture = TestBed.createComponent(VendorEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
