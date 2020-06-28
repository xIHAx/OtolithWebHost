import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProjectsComponent } from './reg-projects.component';

describe('RegProjectsComponent', () => {
  let component: RegProjectsComponent;
  let fixture: ComponentFixture<RegProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
