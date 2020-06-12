import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrammesComponent } from './add-programmes.component';

describe('AddProgrammesComponent', () => {
  let component: AddProgrammesComponent;
  let fixture: ComponentFixture<AddProgrammesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgrammesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
