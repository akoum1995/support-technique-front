import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import swal from 'sweetalert2';
import { ClientPipePipe } from '../../pipes/client-pipe.pipe';
import { NotificationService } from 'src/app/shared/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit {
clients: any = [];
contratFormReactivation: FormGroup;
clientsFiltre: any = [];
searchType = { status: [], search: ''};
clicked = false;
client;
ajout = 'show';
reclamations;
conrtatAjoutForm: FormGroup;
contrats;
intervention;
description;
produits;
idContratModif;
  constructor( private adminService: AdminService, private notificationService: NotificationService) {
    this.contratFormReactivation = new FormGroup({
      periode: new FormControl('', Validators.required),
    });
    this.conrtatAjoutForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.required),
    });
    this.adminService.getAllClients().subscribe((data: any) => {
      this.clients = data.data;
      this.clientsFiltre = data.data;
    });
    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
    });
   }
   getDescription(description) {
     this.description = description;
   }
   getContrat(id) {
    this.idContratModif = id;
  }
  getIntervention(intervention) {
    this.adminService.getIntervention(intervention).subscribe((interven: any) => {
      this.intervention = interven.data;
      console.log(this.intervention);
    });
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
          this.getClient(this.client);
        });
      }
    });

  }
  ngOnInit() {
    this.contratFormReactivation = new FormGroup({
      periode: new FormControl('', Validators.required),
    });
    this.conrtatAjoutForm = new FormGroup({
      produit: new FormControl('', Validators.required),
      periode: new FormControl('', Validators.required),
    });
    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
    });
    this.adminService.getAllClients().subscribe((data: any) => {
      this.clients = data.data;
      this.clientsFiltre = data.data;
    });
  }
  getClient(client) {
    this.adminService.getDetailsClient(client.client._id).subscribe((data: any) => {
      this.contrats = data.data.contrats;
      this.reclamations = data.data.reclamations;
      this.client = client;
      this.clicked = true;
      this.ajout = 'show';
    });
  }
  reactiverContrat(f) {
    if ( f.valid) {
      this.adminService.reactiverContrat(f.value, this.idContratModif).subscribe((data: any) => {
        this.notificationService.showNotification('top', 'right', 'success', 'Votre contrat est bien renouvelé');
        // this.ngOnInit();
        this.getClient(this.client);
      });
    }
  }
  addToFilter(filerColumn, filterValue) {
    let arrayCol: any[] = this.searchType[filerColumn] as Array<any>;
    if (arrayCol.includes(filterValue.toLowerCase())) {
      arrayCol = arrayCol.filter(elem => elem !== filterValue.toLowerCase());
    } else {
      arrayCol.push(filterValue.toLowerCase());
    }
    this.searchType[filerColumn] = arrayCol;
    const p = new ClientPipePipe();
    this.clientsFiltre = p.transform(this.clients, this.searchType);
  }
  reactiveClient(id) {
    swal.fire({
      title: 'Etes vous sure?',
      text: 'Voulez vous vraiment le réactiver?!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#039be5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, réactiver!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Supprimé!',
          'Le client est réactivé',
          'success'
        );
        this.adminService.reactiveClient(id).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });
  }
  supprimeClient(id) {
    swal.fire({
      title: 'Etes vous sure?',
      text: 'Voulez vous vraiment le supprimer?!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#039be5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Supprimé!',
          'Le client est supprimé',
          'success'
        );
        this.adminService.supprimeClient(id).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });

  }


  ajouterContrat(f) {
    if (f.valid) {
      this.adminService.ajouterContrat(f.value, this.client.client._id).subscribe((data: any) => {
        this.ngOnInit();
        this.clicked = false;
        this.ajout = 'show';
        this.notificationService.showNotification('top', 'right', 'success', 'Votre contrat est bien généré');
      });
    }
  }
}
