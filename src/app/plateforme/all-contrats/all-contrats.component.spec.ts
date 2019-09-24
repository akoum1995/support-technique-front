import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContratsComponent } from './all-contrats.component';

describe('AllContratsComponent', () => {
  let component: AllContratsComponent;
  let fixture: ComponentFixture<AllContratsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContratsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
