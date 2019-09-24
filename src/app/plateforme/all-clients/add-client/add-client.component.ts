import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  contratForm: FormGroup;
  produits: any = [];
  sauvegarderPhoto;
  photo;
  constructor(private adminService: AdminService, private notificationService: NotificationService) {
    this.clientForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      mot_de_passe: new FormControl('', Validators.required),
      nom_societe: new FormControl('', Validators.required),
      logo: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    this.contratForm = new FormGroup({
      produit: new FormControl('', [Validators.required]),
      periode: new FormControl('', Validators.required),
    });
    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
    });
  }

  ngOnInit() {
    this.clientForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      mot_de_passe: new FormControl('', Validators.required),
      nom_societe: new FormControl('', Validators.required),
      logo: new FormControl(''),
      telephone: new FormControl('', Validators.required),
      site_web: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    this.contratForm = new FormGroup({
      produit: new FormControl('', [Validators.required]),
      periode: new FormControl('', Validators.required),
    });
    this.adminService.getAllProduits().subscribe((res: any) => {
      this.produits = res.data.filter(obj => obj.status !== 'supprime');
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
  ajouterClient(clientF, contratF) {
    if (clientF.valid && contratF.valid) {
      if (this.sauvegarderPhoto) {
        const upload = new FormData();
        upload.append('Image', this.sauvegarderPhoto);
        this.adminService.uploadProduit(upload).subscribe((data: any) => {
          clientF.value.logo = data.filename;
          this.adminService.ajouterClient(clientF.value, contratF.value).subscribe((res: any) => {
            this.notificationService.showNotification('top', 'right', 'success', 'Ton client est ajouté avec son contrat');
            this.ngOnInit();
            this.sauvegarderPhoto = undefined;
            this.photo = undefined;
          });
        });
      } else {
        this.adminService.ajouterClient(clientF.value, contratF.value).subscribe((res: any) => {
          this.notificationService.showNotification('top', 'right', 'success', 'Ton client est ajouté avec son contrat');
          this.ngOnInit();
          this.sauvegarderPhoto = undefined;
          this.photo = undefined;
        });
      }
    } else {
      this.notificationService.showNotification('top', 'right', 'danger', 'Vérifiez vos informations');

    }
  }

}
