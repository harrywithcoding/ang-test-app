import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MedicineComponent } from './medicine/medicine/medicine.component';
import { AuthGuard } from './auth/auth.guard.spec';
import { CartComponent } from './cart/cart.component';
import { PatientComponent } from './patient/patient.component';
import { BillComponent } from './bill/bill.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'medicine', component:MedicineComponent, canActivate: [AuthGuard] },
  { path: 'patient', component:PatientComponent, canActivate: [AuthGuard] },
  { path: 'bill', component: BillComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
