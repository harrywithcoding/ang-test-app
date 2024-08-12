import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bills: any[] = [];
  selectedBill: any = null;

  ngOnInit() {
    this.loadBills();
  }

  loadBills() {
    const savedBills = localStorage.getItem('bills');
    if (savedBills) {
      this.bills = JSON.parse(savedBills);
      console.log('Loaded bills:', this.bills); 
    }
  }

  viewBillDetails(bill: any) {
    this.selectedBill = bill;
    console.log('Viewing bill details:', this.selectedBill); 
  }

  deleteBill(index: number) {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.bills.splice(index, 1);
      localStorage.setItem('bills', JSON.stringify(this.bills));
      console.log('Bill deleted:', this.bills); 
      this.selectedBill = null;  
    }
  }

  closePopup() {
    this.selectedBill = null;
  }
}
