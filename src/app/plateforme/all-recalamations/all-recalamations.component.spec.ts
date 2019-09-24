import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecalamationsComponent } from './all-recalamations.component';

describe('AllRecalamationsComponent', () => {
  let component: AllRecalamationsComponent;
  let fixture: ComponentFixture<AllRecalamationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRecalamationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecalamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
