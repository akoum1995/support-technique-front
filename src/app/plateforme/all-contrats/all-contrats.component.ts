import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { ContratPipePipe } from 'src/app/pipes/contrat-pipe.pipe';

@Component({
  selector: 'app-all-contrats',
  templateUrl: './all-contrats.component.html',
  styleUrls: ['./all-contrats.component.css']
})
export class AllContratsComponent implements OnInit {
  contrats: any = [];
  getProduit: any;
  contratsFiltre: any = [];
  searchType = { status: [], search: '' };
  contratFormReactivation: FormGroup;
  conrtatAjoutForm: FormGroup;
  reclamationForm: FormGroup;
  idContratModif: any;
  produits: any = [];
  clicked = 'liste';
  constructor(private adminService: AdminService, private authService: AuthService, private notificationService: NotificationService) {
    this.contratFormReactivation = new FormGroup({
      periode: new FormControl('', Validators.required),
    });
    this.conrtatAjoutForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.required),
    });
    this.reclamationForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      sujet: new FormControl('', Validators.required),
      type_reclamation: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      degres: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.adminService.getAllContratsOfClients(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
      this.contrats = data.data.contrats;
      this.contratsFiltre = data.data.contrats;
    });

    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
    });

  }
  getContrat(id) {
    this.idContratModif = id;
  }
  ngOnInit() {
    this.reclamationForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      sujet: new FormControl('', Validators.required),
      type_reclamation: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      degres: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.conrtatAjoutForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.required),
    });
    this.contratFormReactivation = new FormGroup({
      periode: new FormControl('', Validators.required),
    });
    this.adminService.getAllContratsOfClients(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
      this.contrats = data.data.contrats;
      this.contratsFiltre = data.data.contrats;
    });
    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
    });
  }
  getDegres(valueDegres) {
    this.reclamationForm.controls.degres.setValue(valueDegres);
  }
  addToFilter(filerColumn, filterValue) {
    let arrayCol: any[] = this.searchType[filerColumn] as Array<any>;
    if (arrayCol.includes(filterValue.toLowerCase())) {
      arrayCol = arrayCol.filter(elem => elem !== filterValue.toLowerCase());
    } else {
      arrayCol.push(filterValue.toLowerCase());
    }
    this.searchType[filerColumn] = arrayCol;
    const p = new ContratPipePipe();
    this.contratsFiltre = p.transform(this.contrats, this.searchType);
  }
  ajouterReclamation(f) {
    if (f.valid) {
      this.adminService.ajouterReclamation(f.value, this.authService.utilisateurConnecte.client).subscribe((data: any) => {
        this.ngOnInit();
        this.clicked = 'liste';
        this.notificationService.showNotification('top', 'right', 'success', 'Votre réclamations va étre traitée');
      });
    }
  }
  ajouterContrat(f) {
    if (f.valid) {
      this.adminService.ajouterContrat(f.value, this.authService.utilisateurConnecte.client).subscribe((data: any) => {
        this.ngOnInit();
        this.clicked = 'liste';
        this.notificationService.showNotification('top', 'right', 'success', 'Votre contrat est bien généré');
      });
    }
  }
  goToRecamation(produit) {
    this.getProduit = produit;
    this.reclamationForm = new FormGroup({
      produit: new FormControl(produit._id, Validators.required),
      sujet: new FormControl('', Validators.required),
      type_reclamation: new FormControl('', Validators.required),
      client: new FormControl(this.authService.utilisateurConnecte.client, Validators.required),
      degres: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.clicked = 'reclamation';
  }
  reactiverContrat(f) {
    if ( f.valid) {
      this.adminService.reactiverContrat(f.value, this.idContratModif).subscribe((data: any) => {
        this.notificationService.showNotification('top', 'right', 'success', 'Votre contrat est bien renouvelé');
        this.ngOnInit();
      });
    }
  }
  annulerContrat(id) {
    swal.fire({
      title: 'Etes vous sure?',
      text: 'Voulez vous vraiment l\'annuler ?!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#039be5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Annuler!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Annulé!',
          'Le contrat est annulé',
          'success'
        );
        this.adminService.annulerContrat(id).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });

  }
}
