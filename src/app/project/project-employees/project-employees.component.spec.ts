import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmployeesComponent } from './project-employees.component';

describe('ProjectEmployeesComponent', () => {
  let component: ProjectEmployeesComponent;
  let fixture: ComponentFixture<ProjectEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEmployeesComponent]
    });
    fixture = TestBed.createComponent(ProjectEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
