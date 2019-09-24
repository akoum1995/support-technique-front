import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonnelsComponent } from './all-personnels.component';

describe('AllPersonnelsComponent', () => {
  let component: AllPersonnelsComponent;
  let fixture: ComponentFixture<AllPersonnelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPersonnelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPersonnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
