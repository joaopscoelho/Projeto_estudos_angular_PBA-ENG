import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cadastro', component: DataFormComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  // { path: '**', redirectTo: '/cadastro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
