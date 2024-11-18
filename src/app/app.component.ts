import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MenuComponent } from './componentes/menu/menu.component';
import { GuidedTourModule } from 'ngx-guided-tour';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    CardModule, 
    ButtonModule, 
    MenuComponent, 
    ToastModule,
    GuidedTourModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = ''
  apresentar = false
  constructor() {
    setTimeout(() => {
      this.apresentar = true
    }, 500)
  }
}
