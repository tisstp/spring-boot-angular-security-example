import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableTableComponent } from './datatable-table.component';

describe('DatatableTableComponent', () => {
  let component: DatatableTableComponent;
  let fixture: ComponentFixture<DatatableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
