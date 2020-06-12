import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProgramComponent } from './post-program.component';

describe('PostProgramComponent', () => {
  let component: PostProgramComponent;
  let fixture: ComponentFixture<PostProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
