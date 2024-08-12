import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'] 
})
export class MedicineComponent implements OnInit {
  medicines: any[] = [];
  filteredMedicines: any[] = [];
  searchTerm: string = '';
  showAddMedicineForm: boolean = false;

  newMedicine = {
    name: '',
    mfd: '',
    exp: '',
    batchno: '',
    quantity: '',
    price: ''
  };

  constructor(private medicineService: MedicineService) { }

  ngOnInit() {

    this.medicines = this.medicineService.getMedicines();
    this.filteredMedicines = [...this.medicines];
  }

  searchMedicines() {
    this.filteredMedicines = this.medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAddMedicineForm() {
    this.showAddMedicineForm = !this.showAddMedicineForm;
  }

  saveNewMedicine() {
    const medicine = { ...this.newMedicine };
    this.medicineService.addMedicine(medicine); 
    this.medicines = this.medicineService.getMedicines(); 
    this.filteredMedicines = [...this.medicines];
    this.toggleAddMedicineForm(); 
    this.newMedicine = { name: '', mfd: '', exp: '', batchno: '', quantity: '',price: '' }; 
  }

  selectMedicine(medicine: any) {
    console.log(`Selected medicine: ${medicine.name}`);
    
  }
}
