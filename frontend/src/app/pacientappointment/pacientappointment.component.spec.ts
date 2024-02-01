import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientappointmentComponent } from './pacientappointment.component';

describe('PacientappointmentComponent', () => {
  let component: PacientappointmentComponent;
  let fixture: ComponentFixture<PacientappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
