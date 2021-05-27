import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Employer, ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-manage-employers-modal',
  templateUrl: './manage-employers-modal.page.html',
  styleUrls: ['./manage-employers-modal.page.scss'],
})
export class ManageEmployersModalPage implements OnInit {
  employers = [];
  deletingEmployers = false;
  deleteEmployerPlaceholder = 'Select Employer to Delete';

  employer: Employer = {
    id: 0,
    name: '',
  };

  public employerToDelete = 0;

  constructor(
    private modalCtrl: ModalController,
    private shiftsService: ShiftsService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.getEmployers();
    console.log(this.employers);
  }

  addEmployer() {
    this.shiftsService.addEmployer(this.employer).subscribe(() => {
      const toast = this.toastCtrl.create({
        message: 'Employer saved',
        duration: 200,
      });
      toast.then((t) => t.present());
      this.close();
    });
  }

  async getEmployers() {
    await this.shiftsService.getEmployers().then((cat) => {
      this.employers = cat as Employer[];
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  displayDeleteEmployer() {
    this.deletingEmployers = true;
  }

  closeDeleteEmployer() {
    this.deletingEmployers = false;
  }

  deleteEmployer() {
    if (
      confirm(
        'Are you sure? All shifts associated with this employer will be deleted.'
      )
    ) {
      this.shiftsService.deleteEmployer(this.employerToDelete).subscribe(
        (res) => {
          console.log('hurra');
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.deletingEmployers = false;
    this.close();
  }

  getEmployerIndexForDeletion(selectedValue: any) {
    this.employerToDelete = selectedValue.detail.value[0];
    this.deleteEmployerPlaceholder = selectedValue.detail.value[1];
    console.log('Index ' + this.employerToDelete);
  }
}
