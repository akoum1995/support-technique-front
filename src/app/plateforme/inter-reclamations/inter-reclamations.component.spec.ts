import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterReclamationsComponent } from './inter-reclamations.component';

describe('InterReclamationsComponent', () => {
  let component: InterReclamationsComponent;
  let fixture: ComponentFixture<InterReclamationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterReclamationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
