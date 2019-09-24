import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateformeComponent } from './plateforme.component';

describe('PlateformeComponent', () => {
  let component: PlateformeComponent;
  let fixture: ComponentFixture<PlateformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
