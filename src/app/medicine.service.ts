import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private medicines: any[] = [
    { name: 'Paracetamol', mfd: '2023-01-01', exp: '2025-01-01', batchno: 'P001', quantity: 100, price: 500 },
    { name: 'Ibuprofen', mfd: '2022-06-15', exp: '2024-06-15', batchno: 'I002', quantity: 150, price: 200 },
    { name: 'Amoxicillin', mfd: '2023-03-10', exp: '2025-03-10', batchno: 'A003', quantity: 200,price: 100 }
  ];

  getMedicines() {
    return this.medicines;
  }

  addMedicine(medicine: any) {
    this.medicines.unshift(medicine);
  }
}
