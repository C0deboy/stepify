import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGoalsComponent } from './import-goals.component';

describe('ImportGoalsComponent', () => {
  let component: ImportGoalsComponent;
  let fixture: ComponentFixture<ImportGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
