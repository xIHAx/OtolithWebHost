import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProjectListComponent } from './staff-project-list.component';

describe('StaffProjectListComponent', () => {
  let component: StaffProjectListComponent;
  let fixture: ComponentFixture<StaffProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
