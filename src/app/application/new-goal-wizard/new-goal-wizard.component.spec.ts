import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGoalWizardComponent } from './new-goal-wizard.component';

describe('NewGoalWizardComponent', () => {
  let component: NewGoalWizardComponent;
  let fixture: ComponentFixture<NewGoalWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGoalWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGoalWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
