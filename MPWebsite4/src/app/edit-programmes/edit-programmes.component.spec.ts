import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgrammesComponent } from './edit-programmes.component';

describe('EditProgrammesComponent', () => {
  let component: EditProgrammesComponent;
  let fixture: ComponentFixture<EditProgrammesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgrammesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
