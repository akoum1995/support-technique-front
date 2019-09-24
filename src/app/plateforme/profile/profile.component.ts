import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  utilisateurForm: FormGroup;
  user;
  compteForm: FormGroup;
  constructor(private adminService: AdminService, public authService: AuthService, private notificationService: NotificationService) {
    this.compteForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      mot_de_passe: new FormControl(''),
    });
    if (this.authService.utilisateurConnecte.role !== 'client') {
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl('', [Validators.required]),
            nom: new FormControl('', [Validators.required]),
            telephone: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            photo: new FormControl(''),
          });
    } else {
        this.utilisateurForm = new FormGroup({
          nom_societe: new FormControl('', [Validators.required]),
          site_web: new FormControl('', [Validators.required]),
          telephone: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required]),
          logo: new FormControl(''),
          description: new FormControl('', [Validators.required]),
        });
    }
   }

  ngOnInit() {
    this.compteForm = new FormGroup({
      email: new FormControl(this.authService.utilisateurConnecte.email, [Validators.required, Validators.email]),
      mot_de_passe: new FormControl(''),
    });
    if (this.authService.utilisateurConnecte.role !== 'client') {
      if (this.authService.utilisateurConnecte.administrateur) {
        this.adminService.getAdministrateurById(this.authService.utilisateurConnecte.administrateur).subscribe((data: any) => {
          this.user = data.data;
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl(data.data.prenom, [Validators.required]),
            nom: new FormControl(data.data.nom, [Validators.required]),
            telephone: new FormControl(data.data.telephone, [Validators.required]),
            address: new FormControl(data.data.address, [Validators.required]),
            photo: new FormControl(data.data.photo),
          });
        });
      }
      if (this.authService.utilisateurConnecte.responsableLogiciel) {
        this.adminService.getRespLogicielById(this.authService.utilisateurConnecte.responsableLogiciel).subscribe((data: any) => {
          this.user = data.data;
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl(data.data.prenom, [Validators.required]),
            nom: new FormControl(data.data.nom, [Validators.required]),
            telephone: new FormControl(data.data.telephone, [Validators.required]),
            address: new FormControl(data.data.address, [Validators.required]),
            photo: new FormControl(data.data.photo),
          });
        });
      }
      if (this.authService.utilisateurConnecte.responsableMateriel) {
        this.adminService.getRespMaterielById(this.authService.utilisateurConnecte.responsableMateriel).subscribe((data: any) => {
          this.user = data.data;
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl(data.data.prenom, [Validators.required]),
            nom: new FormControl(data.data.nom, [Validators.required]),
            telephone: new FormControl(data.data.telephone, [Validators.required]),
            address: new FormControl(data.data.address, [Validators.required]),
            photo: new FormControl(data.data.photo),
          });
        });
      }
      if (this.authService.utilisateurConnecte.intervenantLogiciel) {
        this.adminService.getIntLogicielById(this.authService.utilisateurConnecte.intervenantLogiciel).subscribe((data: any) => {
          this.user = data.data;
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl(data.data.prenom, [Validators.required]),
            nom: new FormControl(data.data.nom, [Validators.required]),
            telephone: new FormControl(data.data.telephone, [Validators.required]),
            address: new FormControl(data.data.address, [Validators.required]),
            photo: new FormControl(data.data.photo),
          });
        });
      }
      if (this.authService.utilisateurConnecte.intervenantMateriel) {
        this.adminService.getIntMaterielById(this.authService.utilisateurConnecte.intervenantMateriel).subscribe((data: any) => {
          this.user = data.data;
          this.utilisateurForm = new FormGroup({
            prenom: new FormControl(data.data.prenom, [Validators.required]),
            nom: new FormControl(data.data.nom, [Validators.required]),
            telephone: new FormControl(data.data.telephone, [Validators.required]),
            address: new FormControl(data.data.address, [Validators.required]),
            photo: new FormControl(data.data.photo),
          });
        });
      }

    } else {
      this.adminService.getClientById(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
        this.user = data.data;
        this.utilisateurForm = new FormGroup({
          nom_societe: new FormControl(data.data.nom_societe, [Validators.required]),
          site_web: new FormControl(data.data.site_web, [Validators.required]),
          telephone: new FormControl(data.data.telephone, [Validators.required]),
          address: new FormControl(data.data.address, [Validators.required]),
          logo: new FormControl(data.data.logo),
          description: new FormControl(data.data.description, [Validators.required]),
        });
      });
    }
  }
  ChangerAdmin(utilisateurForm) {
    this.adminService.ChangerAdmin(utilisateurForm.value, this.authService.utilisateurConnecte.administrateur).subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  changerClient(utilisateurForm) {
    this.adminService.ChangerClient(utilisateurForm.value, this.authService.utilisateurConnecte.client).subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  ChangerRespLogiciel(utilisateurForm) {
    this.adminService.ChangerRespLogiciel(utilisateurForm.value, this.authService.utilisateurConnecte.responsableLogiciel)
                      .subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  ChangerRespMateriel(utilisateurForm) {
    this.adminService.ChangerRespMateriel(utilisateurForm.value, this.authService.utilisateurConnecte.responsableMateriel)
                      .subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  ChangerIntLogiciel(utilisateurForm) {
    this.adminService.ChangerIntLogiciel(utilisateurForm.value, this.authService.utilisateurConnecte.intervenantLogiciel)
                      .subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  ChangerIntMateriel(utilisateurForm) {
    this.adminService.ChangerIntMateriel(utilisateurForm.value, this.authService.utilisateurConnecte.intervenantMateriel)
                      .subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      this.ngOnInit();
    });
  }
  ChangerCompte(compteForm) {
    let object = {};
    if (compteForm.value.mot_de_passe === '') {
      object = {email: compteForm.value.email};
    } else {
      object = compteForm.value;
    }
    this.adminService.ChangerCompte(object, this.authService.utilisateurConnecte._id).subscribe((data: any) => {
      this.notificationService.showNotification('top', 'right', 'success', 'Modification terminée');
      localStorage.setItem('token', data.data.token);
      this.authService.utilisateurConnecte = this.authService.decodeToken();
      this.ngOnInit();
    });
  }
}
