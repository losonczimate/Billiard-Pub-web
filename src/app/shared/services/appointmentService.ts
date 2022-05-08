import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class appointmentService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  collectionName = 'Appointment';
  newdate?: Appointment;

  getDates(asztal1: string) {
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where("id", "==", asztal1)).valueChanges();
  }

  getOpenDates(asztal: string) {
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('foglalte', '==', false).where("id", "==", asztal)).valueChanges();
  }

  bookanAppointment(idopont: string, asztal: string){
    this.newdate= {"foglalasDatum":idopont, "foglalte":true, "asztalid":asztal};
    return this.afs.collection<Appointment>(this.collectionName).doc(asztal + idopont).set(this.newdate);
  
  }
}