import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableDemoComponent } from 'src/app/modules/example/components/datatable/datatable-demo.component';

describe('DatatableDemoComponent', () => {
  let component: DatatableDemoComponent;
  let fixture: ComponentFixture<DatatableDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableDemoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
