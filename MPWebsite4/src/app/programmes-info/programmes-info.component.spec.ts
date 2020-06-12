import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesInfoComponent } from './programmes-info.component';

describe('ProgrammesInfoComponent', () => {
  let component: ProgrammesInfoComponent;
  let fixture: ComponentFixture<ProgrammesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
