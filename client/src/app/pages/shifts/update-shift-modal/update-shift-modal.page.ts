import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Employer, Location, Shift, ShiftsService } from 'src/app/services/shifts.service';
import { ManageEmployersModalPage } from '../manage-employers-modal/manage-employers-modal.page';
import { ManageLocationsModalPage } from '../manage-locations-modal/manage-locations-modal.page';

@Component({
  selector: 'app-update-shift-modal',
  templateUrl: './update-shift-modal.page.html',
  styleUrls: ['./update-shift-modal.page.scss'],
})
export class UpdateShiftModalPage implements OnInit {
  @Input() shitId: number;

  employerPlaceholder = 'Select';
  locationPlaceholder = 'Select';

  isPenalty2 = false;
  isPenalty3 = false;

  minTime = '2019-12-19';
  minTime2 = '2019-12-19';
  minTime3 = '2019-12-19';

employers = [];
  locations = [];
  penalties = [
    { value: 1, display: '0' },
    { value: 1.125, display: '12.5%' },
    { value: 1.25, display: '25%' },
    { value: 1.5, display: '50%' },
    { value: 1.75, display: '75%' },
    { value: 2, display: '100%' },
    { value: 2.5, display: '150%' },
    { value: 3, display: '200%' }
  ];
  //createdAt = new Date();


  shift: Shift = {
    employerId: 1,
    locationId: 1,
    start1: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end1: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty1: 0,

    start2: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end2: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty2: 0,

    start3: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end3: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty3: 0,
    rate: 0,
    paid: false,

    employer: {
      id: 0,
      name:''
    },

    location: {
      id: 0,
      name:''
    }
  };

  employer: Employer = {
    id: 0,
    name: '',
  };

  location: Location = {
    id: 0,
    name: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private shiftService: ShiftsService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getEmployersFromApi();
    await this.getLocationsFromApi();
    await this.getShift();
    // console.log(this.categories);
  }

  updateShift() {
    console.log('update status' + this.shift.paid);
    this.shiftService.updateShift(this.shift).subscribe(() => {
      const toast = this.toastCtrl.create({
        color: 'success',
        message: 'Shift Updated',
        position:'top',
        duration: 2000,
      });
      toast.then((t) => t.present());
      this.modalCtrl.dismiss({ reload: true });
    });
  }

  async getEmployersFromApi() {
    await this.shiftService.getEmployers().then((emp) => {
      this.employers = emp as Employer[];
      // console.log('Emp from Api' + this.employers);
    });
  }

  async getLocationsFromApi() {
    await this.shiftService.getLocations().then((loc) => {
      this.locations = loc as Location[];
      // console.log('Loc from Api' + loc);
    });
  }

  async getShift() {
     this.shiftService.getShift(this.shitId).subscribe((sh) => {
       this.shift = sh as Shift;
      //  console.log('Shift',  this.shift.location);
        this.employerPlaceholder = this.shift.employer.name;
        this.locationPlaceholder = this.shift.location.name;
      //  this.changePenaltyState();
     });
  }

  // closeAddCategory() {
  //   this.addingCategory = false;
  // }

  close() {
    this.modalCtrl.dismiss();
  }

  changePenaltyState() {
    // console.log(this.shift.start3.valueOf, this.shift.end3.getMilliseconds);
    if (this.shift.start2 !== this.shift.end2) {
      // console.log('Different!!!!');
      this.isPenalty2 = true;
    }

    if (this.shift.start3 !== this.shift.end3) {
      // console.log('Different!!!!');
      this.isPenalty3 = true;
    }
  }

  setMinEndDate(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime = event.detail.value;
  }

  setMinEndDate2(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime2 = event.detail.value;
  }

  setMinEndDate3(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime3 = event.detail.value;
  }
}
