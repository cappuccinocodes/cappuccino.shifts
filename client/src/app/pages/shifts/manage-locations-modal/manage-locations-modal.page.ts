import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Location, ShiftsService } from 'src/app/services/shifts.service';

@Component({
  selector: 'app-manage-locations-modal',
  templateUrl: './manage-locations-modal.page.html',
  styleUrls: ['./manage-locations-modal.page.scss'],
})
export class ManageLocationsModalPage implements OnInit {

  locations = [];
  deletingLocations = false;
  deleteLocationPlaceholder = 'Select Location to Delete';

  location: Location = {
    id: 0,
    name: '',
  };

  public locationToDelete = 0;

  constructor(
    private modalCtrl: ModalController,
    private shiftsService: ShiftsService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getLocations();
    // console.log(this.locations);
  }

  addLocation() {
    this.shiftsService.addLocation(this.location).subscribe(() => {
      const toast = this.toastCtrl.create({
        message: 'location saved',
        duration: 200,
      });
      toast.then((t) => t.present());
      this.close();
    });
  }

  async getLocations() {
    await this.shiftsService.getLocations().then((loc) => {
      this.locations = loc as Location[];
      // console.log(this.locations[0].icon);
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  displayDeleteLocation() {
    this.deletingLocations = true;
  }

  closeDeleteLocation() {
    this.deletingLocations = false;
  }

  deleteLocation() {
    if (confirm('Are you sure? All shifts associated with this employer will be deleted.')){
      this.shiftsService.deleteLocation(this.locationToDelete).subscribe(
        (res) => {
          console.log('hurra');
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.deletingLocations = false;
    this.close();
  }

  getLocationIndexForDeletion(selectedValue: any) {
    this.locationToDelete = selectedValue.detail.value[0];
    this.deleteLocationPlaceholder = selectedValue.detail.value[1];
    console.log('Index ' + this.locationToDelete);
  }

}
