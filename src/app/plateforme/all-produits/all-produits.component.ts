import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import swal from 'sweetalert2';
import { ProduitPipePipe } from '../../pipes/produit-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-all-produits',
  templateUrl: './all-produits.component.html',
  styleUrls: ['./all-produits.component.css']
})
export class AllProduitsComponent implements OnInit {
  searchType = { status: [], search: ''};
  produit;
  produits: any;
  produitsFiltre: any;
  produitForm: FormGroup;
  produitmodifForm: FormGroup;
  photo;
  idModifProduit;
  sauvegarderPhoto;
  clicked = false;
  constructor(private adminService: AdminService, private notificationService: NotificationService) {
    this.produitForm = new FormGroup({
      nom_produit: new FormControl('', Validators.required),
      photo: new FormControl(''),
      description: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
    });
    this.produitmodifForm = new FormGroup({
      nom_produit: new FormControl('', Validators.required),
      photo: new FormControl(''),
      description: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
    });
    this.adminService.getAllProduits().subscribe((data: any) => {
      this.produits = data.data;
      this.produitsFiltre = data.data;
    });
  }
  getPorduit(produit) {
    this.produit = produit;
    this.clicked = true;
  }
  ngOnInit() {
    this.produitForm = new FormGroup({
      nom_produit: new FormControl('', Validators.required),
      photo: new FormControl(''),
      description: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
    });
    this.adminService.getAllProduits().subscribe((data: any) => {
      this.produits = data.data;
      this.produitsFiltre = data.data;
    });
  }
  addToFilter(filerColumn, filterValue) {
    let arrayCol: any[] = this.searchType[filerColumn] as Array<any>;
    if (arrayCol.includes(filterValue.toLowerCase())) {
      arrayCol = arrayCol.filter(elem => elem !== filterValue.toLowerCase());
    } else {
      arrayCol.push(filterValue.toLowerCase());
    }
    this.searchType[filerColumn] = arrayCol;
    const p = new ProduitPipePipe();
    this.produitsFiltre = p.transform(this.produits, this.searchType);
  }
  reactiveProduit(id) {
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
          'Le Produit est réactivé',
          'success'
        );
        this.adminService.reactiveProduit(id).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });
  }
  supprimeProduit(id) {
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
          'Le Produit est supprimé',
          'success'
        );
        this.adminService.supprimeProduit(id).subscribe((res: any) => {
          this.ngOnInit();
        });
      }
    });

  }
  filechageEvent(event: any) {
    const tab = event.target.files as Array<File>;
    const reader = new FileReader();
    this.sauvegarderPhoto = tab[0];
    reader.readAsDataURL(tab[0]);
    reader.onload = (_event) => {
      this.photo = reader.result;
    };
    // this.produitForm.controls.photo.setValue(tab[0].name);
  }
  ajouterProduit(f) {
    if (f.valid) {
      if (this.sauvegarderPhoto) {
        const upload = new FormData();
        upload.append('Image', this.sauvegarderPhoto);
        this.adminService.uploadProduit(upload).subscribe((data: any) => {
          f.value.photo = data.filename;
          this.adminService.ajouterProduit(f.value).subscribe((res: any) => {
            this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est ajouté');
            this.ngOnInit();
            this.sauvegarderPhoto = undefined;
            this.photo = undefined;
          });
        });
      } else {
          this.adminService.ajouterProduit(f.value).subscribe((res: any) => {
            this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est ajouté');
            this.ngOnInit();
        });
      }
    }
  }

  getProduit(produit) {
    this.idModifProduit = produit._id;
    this.produitmodifForm = new FormGroup({
      nom_produit: new FormControl(produit.nom_produit, Validators.required),
      photo: new FormControl(produit.photo),
      description: new FormControl(produit.description, Validators.required),
      version: new FormControl(produit.version, Validators.required),
    });
  }
  modifierProduit(f) {
    if (f.valid) {
      if (this.sauvegarderPhoto) {
        const upload = new FormData();
        upload.append('Image', this.sauvegarderPhoto);
        this.adminService.uploadProduit(upload).subscribe((data: any) => {
          f.value.photo = data.filename;
          this.adminService.modifierProduit(f.value, this.idModifProduit).subscribe((res: any) => {
            this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est modifié');
            this.ngOnInit();
            this.sauvegarderPhoto = undefined;
            this.photo = undefined;
          });
        });
      } else {
          this.adminService.modifierProduit(f.value, this.idModifProduit).subscribe((res: any) => {
            this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est modifié');
            this.ngOnInit();
        });
      }
  }
}
}
