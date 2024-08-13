import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamsListComponent } from './teams-list.component';

describe('TeamsListComponent', () => {
  let component: TeamsListComponent;
  let fixture: ComponentFixture<TeamsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TeamsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
