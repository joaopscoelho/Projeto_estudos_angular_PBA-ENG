import { Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PessoaComponent } from './componentes/pessoa/pessoa.component';
import { CadastroPessoaComponent } from './componentes/pessoa/cadastro-pessoa/cadastro-pessoa.component';

export const routes: Routes = [
    // pessoas
    {path: 'pessoa/listar', component: PessoaComponent },
    {path: 'pessoa/cadastrar', component: CadastroPessoaComponent},
    {path: 'pessoa/editar/:id', component: CadastroPessoaComponent},
    
    // Raiz
    {path: 'home', component: DashboardComponent},
];
