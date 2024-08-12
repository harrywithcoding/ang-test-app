import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { MedicineComponent } from './medicine/medicine/medicine.component';
import { CartComponent } from './cart/cart.component';
import { BillComponent } from './bill/bill.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private viewContainerRef:any = ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  showPatients() {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(PatientComponent);
    this.viewContainerRef.createComponent(factory);
  }

  showMedicines() {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(MedicineComponent);
    this.viewContainerRef.createComponent(factory);
  }

  showCart() {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(CartComponent);
    this.viewContainerRef.createComponent(factory);
  }
  
  showBillGenerate() {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(BillComponent);
    this.viewContainerRef.createComponent(factory);
  }
}
