import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosendoctorComponent } from './chosendoctor.component';

describe('ChosendoctorComponent', () => {
  let component: ChosendoctorComponent;
  let fixture: ComponentFixture<ChosendoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosendoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosendoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
