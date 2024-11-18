import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'menu-geral',
  standalone: true,
  imports: [
    TieredMenuModule,
    SidebarModule,
    ButtonModule,
    CardModule,
    TooltipModule,
    SpeedDialModule
  ],

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  itensMenu: any [] = []
  itensMenuUser: any [] = []
  sidebar: boolean = false
  sidebarMenu: boolean = false
  constructor(private _router: Router,
    private _msg: MessageService) {}
  
  ngOnInit(): void {
    this.itensMenu = [
      {
        label: 'Pessoas',
        icon: 'pi pi-user',
        command: () => {
          this._router.navigate(['/pessoa/listar']);
          setTimeout(() => {
            this.sidebarMenu = false
          }, 100)
        }
      },
      {
        label: 'Endereços',
        icon: 'pi pi-flag',
        command: () => {
          this._msg.add({severity: 'success', summary: 'Não tem nada aqui, só deixei para ficar bonito', icon: 'pi-face-smile'})
        }
      },
      {
        label: 'Início',
        icon: 'pi pi-home',
        command: () => {
          this._router.navigate(['home'])
          this.sidebarMenu = false
        }
      } 
    ]

    this.itensMenuUser = [
      {
        label: 'Dados básicos',
        icon: 'pi pi-pencil',
        command: () => {
          this._router.navigate(['/pessoa/listar']);
          setTimeout(() => {
            this.sidebarMenu = false
          }, 100)
      }
      } 
    ]
  }
}
