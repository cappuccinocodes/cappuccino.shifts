import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonList,
  ModalController,
  PopoverController,
  SelectValueAccessor,
  ToastController,
} from '@ionic/angular';
import { Shift, ShiftsService } from 'src/app/services/shifts.service';
import { AddShiftModalPage } from '../add-shift-modal/add-shift-modal.page';
import { ShiftsFilterPopoverPage } from '../shifts-filter-popover/shifts-filter-popover.page';
import { UpdateShiftModalPage } from '../update-shift-modal/update-shift-modal.page';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.page.html',
  styleUrls: ['./shifts-list.page.scss'],
})
export class ShiftsListPage implements OnInit {
  @ViewChild('slidingList') slidingList: IonList;

  shifts: Shift[] = [];
  allShifts: Shift[] = [];
  cashFlow = 0;

  testDate = new Date();

  constructor(
    private modalCtrl: ModalController,
    private shiftsService: ShiftsService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getShiftsFromApi();
  }

  async addShift() {
    const modal = await this.modalCtrl.create({
      component: AddShiftModalPage,
      cssClass: 'modalCss',
    });
    modal.present();
    modal.onWillDismiss().then(() => {
      this.getShiftsFromApi();
    });

    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        this.getShiftsFromApi();
      }
    });
  }

  async updateShift(i) {
    const modal = await this.modalCtrl.create({
      component: UpdateShiftModalPage,
      componentProps: {
        shitId: i,
      },
      cssClass: 'modalCss',
    });
    modal.present();
    modal.onWillDismiss().then(() => {
      this.getShiftsFromApi();
    });

    modal.onDidDismiss().then((res) => {
      if (res && res.data) {
        this.getShiftsFromApi();
      }
    });
  }

  getShiftsFromApi() {
    this.shiftsService.getShifts().subscribe((shifts) => {
      this.shifts = shifts as Shift[];
      this.allShifts = shifts as Shift[];

      this.shifts.forEach((value) => {
        console.log('shifts from database ' + value.paid);
      });
      console.log('end');
      this.updateCashflow();
    });
  }

  removeShift(i) {
    if (confirm('Are you sure?')) {
      console.log('delete pressed');
      this.shiftsService.deleteShift(i).subscribe(
        (res) => {
          this.getShiftsFromApi();
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.slidingList.closeSlidingItems();
    this.updateCashflow();
  }

  updateCashflow() {
    let result = 0;
    this.allShifts.map((shift) => {
      result += shift.money;
    });

    this.cashFlow = result;
  }

  updateFilteredCashflow() {
    let filteredResult = 0;
    this.shifts.map((shift) => {
      filteredResult += shift.money;
    });
    this.cashFlow = filteredResult;
  }

  async openFilter(e) {
    const popover = await this.popoverCtrl.create({
      component: ShiftsFilterPopoverPage,
      event: e,
    });

    await popover.present();

    popover.onDidDismiss().then((res) => {
      let selectedStatus = false;
      const selectedEmployerId = res.data[1];
      const selectedDateStart = res.data[2];
      const selectedDateEnd = res.data[3];

      if (res.data[0] === 'cat') {
        this.shifts = this.allShifts.filter(
          (shift) => shift.employerId === selectedEmployerId
        );
      } else if (res.data[0] === 'date') {
        this.shifts = this.allShifts.filter(
          (shift) =>
            new Date(shift.start1).getTime() >= selectedDateStart &&
            new Date(shift.start1).getTime() <= selectedDateEnd
        );
      } else if (res.data[0] === 'dat&cat') {
        this.shifts = this.allShifts.filter(
          (shift) =>
            new Date(shift.start1).getTime() >= selectedDateStart &&
            new Date(shift.start1).getTime() <= selectedDateEnd &&
            shift.employerId === selectedEmployerId
        );
      } else if (res.data[0] === 'status') {
        selectedStatus = res.data[1];
        this.shifts = this.allShifts.filter(
          (shift) => shift.paid === selectedStatus
        );
      }

      this.updateFilteredCashflow();
    });
  }
}
