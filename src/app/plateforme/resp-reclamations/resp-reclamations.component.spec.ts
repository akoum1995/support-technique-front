import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespReclamationsComponent } from './resp-reclamations.component';

describe('RespReclamationsComponent', () => {
  let component: RespReclamationsComponent;
  let fixture: ComponentFixture<RespReclamationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespReclamationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
