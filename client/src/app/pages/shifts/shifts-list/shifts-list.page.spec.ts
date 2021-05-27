import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ShiftsService } from 'src/app/services/shifts.service';

import { ShiftsListPage } from './shifts-list.page';

describe('ShiftsListPage', () => {
  let component: ShiftsListPage;
  let fixture: ComponentFixture<ShiftsListPage>;
  let shifts;
  let mockShiftsService;

  beforeEach(waitForAsync(() => {
    shifts = [
      {id: 1, locationId: 1},
    ];
    // eslint-disable-next-line max-len
    mockShiftsService = jasmine.createSpyObj(['getShifts', 'getShift', 'getEmployers', 'getLocations', 'addShift', 'addEmployer', 'addLocation', 'deleteShift', 'deleteEmployer', 'deleteLocation', 'updateShift', ]);

    TestBed.configureTestingModule({
      declarations: [ ShiftsListPage ],
      imports: [IonicModule.forRoot(), RouterT],
      providers: [
        { provide: ShiftsService, useValue: mockShiftsService },
        UrlSerializer
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  );

  it ('should get shifts from service', () => {
    mockShiftsService.getShifts.and.returnValue(of(shifts));
    fixture.detectChanges();

    expect(component.shifts.length).toBeGreaterThan(0); // STATE TEST: test the state of the component
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


