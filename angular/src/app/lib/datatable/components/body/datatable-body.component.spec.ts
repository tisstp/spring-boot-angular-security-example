import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableBodyComponent } from './datatable-body.component';

describe('DatatableBodyComponent', () => {
  let component: DatatableBodyComponent;
  let fixture: ComponentFixture<DatatableBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableBodyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
