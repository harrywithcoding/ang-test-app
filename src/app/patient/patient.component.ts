import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm: string = '';
  showAddPatientForm: boolean = false;

  newPatient = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    }
  };

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      this.patients = JSON.parse(savedPatients);
      this.filteredPatients = [...this.patients];
    } else {
      this.patientService.getPatients().subscribe(
        patients => {
          this.patients = patients.map(patient => ({
            ...patient,
            address: {
              ...patient.address,
              formattedAddress: `${patient.address.street}, ${patient.address.suite}, ${patient.address.city}, ${patient.address.zipcode}`
            }
          }));
          this.filteredPatients = [...this.patients];
          localStorage.setItem('patients', JSON.stringify(this.patients));
        },
        error => {
          console.error('Error loading patients', error);
        }
      );
    }
  }
  

  searchPatients() {
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAddPatientForm() {
    this.showAddPatientForm = !this.showAddPatientForm;
  }

  saveNewPatient() {
    const patient = {
      ...this.newPatient,
      address: {
        ...this.newPatient.address,
        formattedAddress: `${this.newPatient.address.street}, ${this.newPatient.address.suite}, ${this.newPatient.address.city}, ${this.newPatient.address.zipcode}`
      }
    };
    this.patients.push(patient);
    this.filteredPatients = [...this.patients];
    localStorage.setItem('patients', JSON.stringify(this.patients));
    this.toggleAddPatientForm(); 
    this.newPatient = {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      }
    };
  }

  selectPatient(patient: any) {
    console.log(`Selected patient: ${patient.name}`);
  }
}