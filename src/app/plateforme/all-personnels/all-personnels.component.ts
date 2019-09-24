import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { PersonnelPipePipe } from '../../pipes/personnel-pipe.pipe';

@Component({
  selector: 'app-all-personnels',
  templateUrl: './all-personnels.component.html',
  styleUrls: ['./all-personnels.component.css']
})
export class AllPersonnelsComponent implements OnInit {
  personnels: any = [];
  personnelsFiltre: any = [];
  searchType = { status: [], postes: [], search: ''};
  personnelForm: FormGroup;
  personnelModifForm: FormGroup;
  idpersonnelModif;
  photo;
  sauvegarderPhoto;
    constructor( private adminService: AdminService, private notificationService: NotificationService) {
      this.personnelForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        mot_de_passe: new FormControl('', Validators.required),
        photo: new FormControl(''),
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        telephone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
      });
      this.adminService.getAllPersonnels().subscribe((data: any) => {
        this.personnels = data.data;
        this.personnelsFiltre = data.data;
      });
     }

    ngOnInit() {
      this.personnelForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        mot_de_passe: new FormControl('', Validators.required),
        photo: new FormControl(''),
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        telephone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)

      });
      this.adminService.getAllPersonnels().subscribe((data: any) => {
        this.personnels = data.data;
        this.personnelsFiltre = data.data;
      });
    }
    addToFilter(filerColumn, filterValue) {
      if (filerColumn === 'poste') {
        this.searchType.postes = filterValue;
      } else {
        let arrayCol: any[] = this.searchType[filerColumn] as Array<any>;
        if (arrayCol.includes(filterValue.toLowerCase())) {
          arrayCol = arrayCol.filter(elem => elem !== filterValue.toLowerCase());
        } else {
          arrayCol.push(filterValue.toLowerCase());
        }
        this.searchType[filerColumn] = arrayCol;
      }

      const p = new PersonnelPipePipe();
      this.personnelsFiltre = p.transform(this.personnels, this.searchType);
    }
    reactivePersonnel(id) {
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
            'Le personnel est réactivé',
            'success'
          );
          this.adminService.reactivePersonnel(id).subscribe((res: any) => {
            this.ngOnInit();
          });
        }
      });
    }
    supprimePersonnel(id) {
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
            'Le personnel est supprimé',
            'success'
          );
          this.adminService.supprimePersonnel(id).subscribe((res: any) => {
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
    getRole(valueRole) {
      this.personnelForm.controls.role.setValue(valueRole);
    }
    ajouterPersonnel(f) {
      if (f.valid) {
        if (this.sauvegarderPhoto) {
          const upload = new FormData();
          upload.append('Image', this.sauvegarderPhoto);
          this.adminService.uploadProduit(upload).subscribe((data: any) => {
            f.value.photo = data.filename;
            this.adminService.ajouterPersonnel(f.value).subscribe((res: any) => {
              this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est ajouté');
              this.ngOnInit();
              this.sauvegarderPhoto = undefined;
              this.photo = undefined;
            });
          });
        } else {
            this.adminService.ajouterPersonnel(f.value).subscribe((res: any) => {
              this.notificationService.showNotification('top', 'right', 'success', 'Ton produit est ajouté');
              this.ngOnInit();
          });
        }
      }
    }
}
