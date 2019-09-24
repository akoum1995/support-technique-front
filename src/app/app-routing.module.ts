import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './plateforme/dashboard/dashboard.component';
import { AllClientsComponent } from './plateforme/all-clients/all-clients.component';
import { ProfileComponent } from './plateforme/profile/profile.component';
import { AllRecalamationsComponent } from './plateforme/all-recalamations/all-recalamations.component';
import { AllProduitsComponent } from './plateforme/all-produits/all-produits.component';
import { LoginComponent } from './login/login.component';
import { AllPersonnelsComponent } from './plateforme/all-personnels/all-personnels.component';
import { AddClientComponent } from './plateforme/all-clients/add-client/add-client.component';
import { PlateformeComponent } from './plateforme/plateforme.component';
import { AllContratsComponent } from './plateforme/all-contrats/all-contrats.component';
import { AuthGuard } from './guards/auth.guard';
import { MesReclamationsComponent } from './plateforme/mes-reclamations/mes-reclamations.component';
import { RespReclamationsComponent } from './plateforme/resp-reclamations/resp-reclamations.component';
import { InterReclamationsComponent } from './plateforme/inter-reclamations/inter-reclamations.component';


const routes: Routes = [
  { path: '', redirectTo: 'plateforme', pathMatch: 'full' },
  { path: 'plateforme', component: PlateformeComponent, canActivate: [AuthGuard], children : [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'allClients', component: AllClientsComponent},
    { path: 'allPersonnels', component: AllPersonnelsComponent},
    { path: 'allReclamations', component: AllRecalamationsComponent},
    { path: 'mesReclamations', component: MesReclamationsComponent},
    { path: 'respReclamations', component: RespReclamationsComponent},
    { path: 'interReclamations', component: InterReclamationsComponent},
    { path: 'mesContrats', component: AllContratsComponent},
    { path: 'allProduits', component: AllProduitsComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'ajoutClient', component: AddClientComponent},
    { path: '', pathMatch: 'full', redirectTo: 'profile'},
  ]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false, })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
