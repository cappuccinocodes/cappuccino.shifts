import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Employer, ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-shifts-filter-popover',
  templateUrl: './shifts-filter-popover.page.html',
  styleUrls: ['./shifts-filter-popover.page.scss'],
})
export class ShiftsFilterPopoverPage implements OnInit {
  selectByEmployer = false;
  selectByDate = false;
  selectByDateAndEmployer = false;
  selectByStatus = false;
  selectAll = false;
  filterChosen = false;
  placeHolder = 'Please Select';

  employers = [];

  dateStart = new Date().toISOString();
  dateEnd = new Date().toISOString();
  dateStartNumber: number;
  dateEndNumber: number;

  minTime = '2019-12-19';

  employerId = 0;
  status = false;

  constructor(
    private popoverCtrl: PopoverController,
    private shiftsService: ShiftsService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.getEmployers();
  }

  onSelectByEmployer() {
    this.selectByEmployer = true;
  }

  onSelectByDate() {
    this.selectByDate = true;
  }

  onSelectByDateAndEmployer() {
    this.selectByDateAndEmployer = true;
  }

  onSelectByStatus() {
    this.selectByStatus = true;
  }

  onShowAllRecords() {
    this.popoverCtrl.dismiss(['all']);
  }

  setMinEndDate(event: any) {
    this.minTime = event.detail.value;
    this.dateEnd = event.detail.value;
  }

  select(selectedValue: any) {
    this.employerId = selectedValue.detail.value[0].id;
    this.placeHolder = selectedValue.detail.value[0].name;
  }

  chooseDates() {
    this.dateStartNumber = new Date(this.dateStart).setHours(0, 0, 0, 0);
    this.dateEndNumber = new Date(this.dateEnd).setHours(0, 0, 0, 0);
  }

  filter() {
    if (this.selectByEmployer) {
      this.popoverCtrl.dismiss(['cat', this.employerId]);
    } else if (this.selectByDate) {
      this.chooseDates();
      this.popoverCtrl.dismiss([
        'date',
        0,
        this.dateStartNumber,
        this.dateEndNumber,
      ]);
    } else if (this.selectByDateAndEmployer) {
      this.chooseDates();
      this.popoverCtrl.dismiss([
        'dat&cat',
        this.employerId,
        this.dateStartNumber,
        this.dateEndNumber,
      ]);
    } else if (this.selectByStatus) {
      this.popoverCtrl.dismiss(['status', this.status]);
    }
  }

  async getEmployers() {
    await this.shiftsService.getEmployers().then((emp) => {
      this.employers = emp as Employer[];
    });
  }
}
