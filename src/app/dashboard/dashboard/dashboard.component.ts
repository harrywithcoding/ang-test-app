import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit,OnInit {
  @ViewChild('content', { read: ViewContainerRef }) viewContainerRef:any = ViewContainerRef;

  constructor(private router: Router, private navserv: NavigationService) {
    
   }
  ngOnInit() {
    this.navserv.showBillGenerate();
  }
  showBillGenerate() {
    this.navserv.showBillGenerate();
  }

  ngAfterViewInit() {
    this.navserv.setViewContainerRef(this.viewContainerRef);
  }

  showPatients() {
    this.navserv.showPatients();
  }

  showMedicines() {
    this.navserv.showMedicines();
  }

  showCart() {
    this.navserv.showCart();
  }

 
  
  patients: any[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
  ];
  selectedPatient: any = null;

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  onPatientSelected(patient: any) {
    this.selectedPatient = patient;
    this.router.navigate(['/medicine'], { state: { patient } });
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }
}
function showBillGenerate() {
  throw new Error('Function not implemented.');
}

