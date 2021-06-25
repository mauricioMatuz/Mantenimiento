import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatospComponent } from './datosp.component';

describe('DatospComponent', () => {
  let component: DatospComponent;
  let fixture: ComponentFixture<DatospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
