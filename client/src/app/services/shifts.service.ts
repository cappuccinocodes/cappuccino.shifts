import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


export interface Shift {
  id?: number;
    employerId: number;
    employer?: {
      id: number;
      name: string;
    };
    location?: {
      id: number;
      name: string;
    };
    locationId: number;
    start1: string;
    end1: string;
    penalty1: number;
    duration?: string;

    start2?: string;
    end2?: string;
    penalty2?: number;
    duration2?: string;

    start3?: string;
    end3?: string;
    penalty3?: number;
    duration3?: string;
    rate: number;
    money?: number;
    paid: boolean;
}

export interface Employer {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  // readonly rootURL = 'https://localhost:5001/api';
  readonly rootURL = 'https://cappuccinoshiftsserver.azurewebsites.net/api';

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

// TODO: DISABLE ADD shift BUTTON UNTIL shift TYPE IS SELECTED
// STYLE SELECT DROPDOWN

  getShifts(){
    return this.http.get(this.rootURL + '/shifts');
  }

  getShift(id) {
    return this.http.get(this.rootURL + '/shifts/' + id);
  }

  getEmployers(){
    return this.http.get(this.rootURL + '/employers').toPromise();
  }

  getLocations(){
    return this.http.get(this.rootURL + '/locations').toPromise();
  }

  addShift(shift: Shift) {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.rootURL + '/shifts', shift, httpOptions);
  }

  addEmployer(employer: Employer) {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.rootURL + '/employers', employer, httpOptions);
  }

  addLocation(location: Location) {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.rootURL + '/locations', location, httpOptions);
  }

  deleteShift(id) {
    const url = this.rootURL + '/shifts/' + id;
    console.log(url);
    return this.http.delete(url);
  }

  deleteEmployer(id) {
    const url = this.rootURL + '/employers/' + id;
    console.log('employer ' + id);
    return this.http.delete(url);
  }

  deleteLocation(id) {
    const url = this.rootURL + '/locations/' + id;
    console.log(url);
    return this.http.delete(url);
  }

  updateShift(shift: Shift) {
    const httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.rootURL + '/shifts/' + shift.id, shift, httpOptions);
  }
}
