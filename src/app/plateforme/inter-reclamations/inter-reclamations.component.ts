import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ReclamationPipePipe } from 'src/app/pipes/reclamation-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-inter-reclamations',
  templateUrl: './inter-reclamations.component.html',
  styleUrls: ['./inter-reclamations.component.css']
})
export class InterReclamationsComponent implements OnInit {
  reclamations: any = [];
  reclamationsFiltre: any = [];
  description;
  interventionForm: FormGroup;
  idReclamation;
  searchType = { status: [], search: '', degres: [], type_reclamation: [] };
  constructor(private adminService: AdminService, private authService: AuthService, private notificationService: NotificationService) {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    if (this.authService.utilisateurConnecte.intervenantLogiciel) {
      this.adminService.getAllreclamationsOfintervenantLogiciel(this.authService.utilisateurConnecte.intervenantLogiciel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    if (this.authService.utilisateurConnecte.intervenantMateriel) {
      this.adminService.getAllreclamationsOfintervenantMateriel(this.authService.utilisateurConnecte.intervenantMateriel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
  }
  getDescription(description) {
    this.description = description;
  }
  ngOnInit() {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    if (this.authService.utilisateurConnecte.intervenantLogiciel) {
      this.adminService.getAllreclamationsOfintervenantLogiciel(this.authService.utilisateurConnecte.intervenantLogiciel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    if (this.authService.utilisateurConnecte.intervenantMateriel) {
      this.adminService.getAllreclamationsOfintervenantMateriel(this.authService.utilisateurConnecte.intervenantMateriel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
  }
  getReclamation(idReclam) {
    this.idReclamation = idReclam;
  }
  ajouterIntervention(f) {
    if (f.valid) {
      this.adminService.ajouterIntervention(this.idReclamation, f.value). subscribe((data: any) => {
        this.notificationService.showNotification('top', 'right', 'success', 'Ton pv est sauvegardé');
        this.ngOnInit();
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
    const p = new ReclamationPipePipe();
    this.reclamationsFiltre = p.transform(this.reclamations, this.searchType);
  }
}
