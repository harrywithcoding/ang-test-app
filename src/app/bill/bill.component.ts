import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { MedicineService } from '../medicine.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  selectedPatient: any;
  medicines: any[] = [];
  filteredMedicines: any[] = [];
  selectedMedicines: any[] = [];
  searchTerm: string = '';
  searchMedicineTerm: string = '';
  showMedicineSelection: boolean = false;
  generatedBill: any = null;
  showAddPatientForm: boolean = false;
  showAddMedicineForm: boolean = false;

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

  newMedicine = {
    name: '',
    mfd: '',
    exp: '',
    batchno: '',
    quantity: '',
    price: ''
  };

  constructor(private patientService: PatientService, private router: Router, private medicineService: MedicineService, private navserv: NavigationService) { }

  ngOnInit() {
    const savedPatients = localStorage.getItem('patients');
  if (savedPatients) {
    this.patients = JSON.parse(savedPatients).map((patient: { address: { street: any; suite: any; city: any; zipcode: any; }; }) => ({
      ...patient,
      address: {
        ...patient.address,
        formattedAddress: `${patient.address.street}, ${patient.address.suite}, ${patient.address.city}, ${patient.address.zipcode}`
      }
    }));
    this.filteredPatients = [...this.patients];
  }

    
    this.medicines = this.medicineService.getMedicines().map(medicine => ({
      ...medicine,
      selectedQuantity: 1 
    }));
    this.filteredMedicines = [...this.medicines];
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
    this.selectedPatient = patient;
    this.showMedicineSelection = true;
    this.filteredPatients.forEach(p => p.selected = false); 
    patient.selected = true;
  }

  searchMedicines() {
    this.filteredMedicines = this.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(this.searchMedicineTerm.toLowerCase())
    );
  }

  toggleAddMedicineForm() {
    this.showAddMedicineForm = !this.showAddMedicineForm;
  }

  saveNewMedicine() {
    const medicine = { ...this.newMedicine, selectedQuantity: 1 };
    this.medicineService.addMedicine(medicine); 
    this.medicines = this.medicineService.getMedicines().map(med => ({ ...med, selectedQuantity: 1 })); 
    this.filteredMedicines = [...this.medicines];
    this.toggleAddMedicineForm(); 
    this.newMedicine = { name: '', mfd: '', exp: '', batchno: '', quantity: '',price: '' }; 
  }

  
  toggleMedicineSelection(medicine: any) {
    const index = this.selectedMedicines.indexOf(medicine);
    if (index === -1) {
      this.selectedMedicines.push(medicine);
      medicine.selected = true;
    } else {
      this.selectedMedicines.splice(index, 1);
      medicine.selected = false;
    }
  }

  increaseQuantity(medicine: any) {
    const selectedMedicine = this.selectedMedicines.find(m => m.name === medicine.name);
    if (selectedMedicine && selectedMedicine.selectedQuantity < selectedMedicine.quantity) {
      selectedMedicine.selectedQuantity++;
    }
  }

  decreaseQuantity(medicine: any) {
    const selectedMedicine = this.selectedMedicines.find(m => m.name === medicine.name);
    if (selectedMedicine && selectedMedicine.selectedQuantity > 1) {
      selectedMedicine.selectedQuantity--;
    }
  }

  calculateSubtotal(medicine: any) {
    return (medicine.selectedQuantity || 1) * medicine.price;
  }

  calculateTotal() {
    return this.selectedMedicines.reduce((total, medicine) => total + this.calculateSubtotal(medicine), 0);
  }

  generateBill() {


    const generatedBill = {
      patient: this.selectedPatient,
      medicines: this.selectedMedicines.map(medicine => ({
        ...medicine,
        subtotal: this.calculateSubtotal(medicine)
      })),
      totalAmount: this.calculateTotal(),
      date: new Date().toISOString()
    };

    const existingBills = JSON.parse(localStorage.getItem('bills') || '[]');
    existingBills.unshift(generatedBill);
    localStorage.setItem('bills', JSON.stringify(existingBills));

    alert('Bill generated and stored in local storage');

    this.navserv.showCart(); 
  }
  
}