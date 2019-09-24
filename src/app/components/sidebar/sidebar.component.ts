import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/plateforme/allProduits', title: 'Produits',  icon: 'design_bullet-list-67', class: '' },
  { path: '/plateforme/allClients', title: 'Clients',  icon: 'users_single-02', class: '' },
  { path: '/plateforme/allPersonnels', title: 'Personnels',  icon: 'design_app', class: '' },
  { path: '/plateforme/allReclamations', title: 'Réclamations',  icon: 'design_app', class: '' },

];
export const CLIENTROUTES: RouteInfo[] = [
  { path: '/plateforme/mesReclamations', title: 'Réclamations',  icon: 'design_app', class: '' },
  { path: '/plateforme/mesContrats', title: 'Contrats',  icon: 'design_app', class: '' },
];
export const RESPROUTES: RouteInfo[] = [
  { path: '/plateforme/respReclamations', title: 'Réclamations',  icon: 'design_app', class: '' },
];
export const INTERROUTES: RouteInfo[] = [
  { path: '/plateforme/interReclamations', title: 'Réclamations',  icon: 'design_app', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.utilisateurConnecte.role === 'client') {
      this.menuItems = CLIENTROUTES.filter(menuItem => menuItem);
    }
    if (this.authService.utilisateurConnecte.role === 'administrateur') {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    if (this.authService.utilisateurConnecte.role === 'responsable logiciel' || this.authService.utilisateurConnecte.role === 'responsable materiel') {
      this.menuItems = RESPROUTES.filter(menuItem => menuItem);
    }
    if (this.authService.utilisateurConnecte.role === 'intervenant logiciel' || this.authService.utilisateurConnecte.role === 'intervenant materiel') {
      this.menuItems = INTERROUTES.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
}
