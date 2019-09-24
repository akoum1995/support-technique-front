import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './plateforme/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AllClientsComponent } from './plateforme/all-clients/all-clients.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './plateforme/profile/profile.component';
import { ClientDetailsComponent } from './plateforme/all-clients/client-details/client-details.component';
import { AllPersonnelsComponent } from './plateforme/all-personnels/all-personnels.component';
import { AllRecalamationsComponent } from './plateforme/all-recalamations/all-recalamations.component';
import { AllProduitsComponent } from './plateforme/all-produits/all-produits.component';
import { Control } from './control';
import { ClientPipePipe } from './pipes/client-pipe.pipe';
import { FilterClientsPipe } from './pipes/filter-clients.pipe';
import { ProduitPipePipe } from './pipes/produit-pipe.pipe';
import { FilterProduitsPipe } from './pipes/filter-produits.pipe';
import { AddClientComponent } from './plateforme/all-clients/add-client/add-client.component';
import { PersonnelPipePipe } from './pipes/personnel-pipe.pipe';
import { FilterPersonnelPipe } from './pipes/filter-personnel.pipe';
import { PlateformeComponent } from './plateforme/plateforme.component';
import { AllContratsComponent } from './plateforme/all-contrats/all-contrats.component';
import { ContratPipePipe } from './pipes/contrat-pipe.pipe';
import { FilterContratsPipe } from './pipes/filter-contrats.pipe';
import { MesReclamationsComponent } from './plateforme/mes-reclamations/mes-reclamations.component';
import { FilterReclamationsPipe } from './pipes/filter-reclamations.pipe';
import { ReclamationPipePipe } from './pipes/reclamation-pipe.pipe';
import { RespReclamationsComponent } from './plateforme/resp-reclamations/resp-reclamations.component';
import { InterReclamationsComponent } from './plateforme/inter-reclamations/inter-reclamations.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AllClientsComponent,
    LoginComponent,
    ProfileComponent,
    ClientDetailsComponent,
    AllPersonnelsComponent,
    AllRecalamationsComponent,
    AllProduitsComponent,
    ClientPipePipe,
    FilterClientsPipe,
    ProduitPipePipe,
    FilterProduitsPipe,
    AddClientComponent,
    PersonnelPipePipe,
    FilterPersonnelPipe,
    PlateformeComponent,
    AllContratsComponent,
    ContratPipePipe,
    FilterContratsPipe,
    MesReclamationsComponent,
    FilterReclamationsPipe,
    ReclamationPipePipe,
    RespReclamationsComponent,
    InterReclamationsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    Control,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
