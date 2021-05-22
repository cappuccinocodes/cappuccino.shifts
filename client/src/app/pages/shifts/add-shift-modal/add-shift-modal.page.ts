
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Employer, Location, Shift, ShiftsService } from 'src/app/services/shifts.service';
import { ManageEmployersModalPage } from '../manage-employers-modal/manage-employers-modal.page';
import { ManageLocationsModalPage } from '../manage-locations-modal/manage-locations-modal.page';

@Component({
  selector: 'app-add-shift-modal',
  templateUrl: './add-shift-modal.page.html',
  styleUrls: ['./add-shift-modal.page.scss'],
})
export class AddShiftModalPage implements OnInit {
  addingStuff = false;
  addingPenalty1 = false;
  addingPenalty2 = false;

  startWasSelected = false;
  start2WasSelected = false;
  start3WasSelected = false;

  rateError = false;
  disableButton = true;

  fixDate = new Date().toISOString();

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
    employerId: 0,
    locationId: 0,
    start1: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end1: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty1: 0,

    start2: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end2: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty2: 0,

    start3: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    end3: new Date().toLocaleString('en-US', {timeZone: 'Australia/Brisbane'}),
    penalty3: 0,
    rate: 1,
    paid: false
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

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.getEmployersFromApi();
    await this.getLocationsFromApi();
    // console.log(this.categories);
    this.startWasSelected = false;
    this.start2WasSelected = false;
    this.start3WasSelected = false;
  }

  addShift() {

    console.log(this.shift);
    this.shiftService.addShift(this.shift).subscribe(() => {
      const toast = this.toastCtrl.create({
        color: 'success',
        message: 'Shift Added',
        position:'top',
        duration: 2000,
      });
      toast.then((t) => t.present());
      this.modalCtrl.dismiss({ reload: true });
    });
  }

  async manageEmployers() {
    const modal = await this.modalCtrl.create({
      component: ManageEmployersModalPage,
      cssClass: 'modalCss',
    });

    modal.present().then(() => {
      this.addingStuff = true;
    });
    modal.onWillDismiss().then(() => {
      this.addingStuff = false;
    });

    modal.onDidDismiss().then(() => {
      // console.log('I was dismissed');
      this.getEmployersFromApi();
    });
  }

  async manageLocations() {
    const modal = await this.modalCtrl.create({
      component: ManageLocationsModalPage,
      cssClass: 'modalCss',
    });

    modal.present().then(() => {
      this.addingStuff = true;
    });
    modal.onWillDismiss().then(() => {
      this.addingStuff = false;
    });

    modal.onDidDismiss().then(() => {
      // console.log('I was dismissed');
      this.getLocationsFromApi();
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

  // closeAddCategory() {
  //   this.addingCategory = false;
  // }

  close() {
    this.modalCtrl.dismiss();
  }

  addPenalty() {
    this.addingPenalty1 = true;
  }

  addPenalty2() {
    this.addingPenalty2 = true;
  }

  setMinEndDate(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime = event.detail.value;
    this.startWasSelected = true;
  }

  setMinEndDate2(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime2 = event.detail.value;
  }

  setMinEndDate3(event: any) {
    // console.log('I changed =' + event.detail.value);
    this.minTime3 = event.detail.value;
  }

  getRate(ev: any) {
    if (ev.target.value <= 0) {
      console.log('wrong' + this.disableButton);
      this.disableButton = true;
      this.rateError = true;
    } else {
      console.log('right' + this.disableButton);
      this.disableButton = false;
      this.rateError = false;
    }
  }

  getStatus(ev: any) {
    // this.disableButton = false;
}
}
