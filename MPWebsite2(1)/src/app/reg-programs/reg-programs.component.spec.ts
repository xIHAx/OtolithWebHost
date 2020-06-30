import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProgramsComponent } from './reg-programs.component';

describe('RegProgramsComponent', () => {
  let component: RegProgramsComponent;
  let fixture: ComponentFixture<RegProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
