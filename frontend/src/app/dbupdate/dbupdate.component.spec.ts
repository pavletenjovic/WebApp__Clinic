import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbupdateComponent } from './dbupdate.component';

describe('DbupdateComponent', () => {
  let component: DbupdateComponent;
  let fixture: ComponentFixture<DbupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
