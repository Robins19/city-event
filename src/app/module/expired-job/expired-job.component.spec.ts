import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredJobComponent } from './expired-job.component';

describe('ExpiredJobComponent', () => {
  let component: ExpiredJobComponent;
  let fixture: ComponentFixture<ExpiredJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
