import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ReclamationPipePipe } from 'src/app/pipes/reclamation-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-resp-reclamations',
  templateUrl: './resp-reclamations.component.html',
  styleUrls: ['./resp-reclamations.component.css']
})
export class RespReclamationsComponent implements OnInit {
  clickAffectation = false;
  interLogiciel: any = [];
  interMateriel: any = [];
  reclamations: any = [];
  description;
  interventionForm: FormGroup;
  intervention;
  idReclamation;
  reclamationsFiltre: any = [];
  searchType = { status: [], search: '', degres: [], type_reclamation: []};
  constructor(private adminService: AdminService, private authService: AuthService, private notificationService: NotificationService) {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    if (this.authService.utilisateurConnecte.responsableLogiciel) {
      this.adminService.getAllreclamationsOfresponsableLogiciel(this.authService.utilisateurConnecte.responsableLogiciel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    if (this.authService.utilisateurConnecte.responsableMateriel) {
      this.adminService.getAllreclamationsOfresponsableMateriel(this.authService.utilisateurConnecte.responsableMateriel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    this.adminService.getAllInterLogiciel().subscribe((data: any) => {
      this.interLogiciel = data.data;
    });
    this.adminService.getAllInterMateriel().subscribe((data: any) => {
      this.interMateriel = data.data;
    });
  }
  getDescription(description) {
    this.description = description;
  }
  getIntervention(intervention) {
    this.intervention = intervention;
  }
  ngOnInit() {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    if (this.authService.utilisateurConnecte.responsableLogiciel) {
      this.adminService.getAllreclamationsOfresponsableLogiciel(this.authService.utilisateurConnecte.responsableLogiciel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    if (this.authService.utilisateurConnecte.responsableMateriel) {
      this.adminService.getAllreclamationsOfresponsableMateriel(this.authService.utilisateurConnecte.responsableMateriel)
                        .subscribe((data: any) => {
        this.reclamations = data.data.reclamations;
        this.reclamationsFiltre = data.data.reclamations;
      });
    }
    this.adminService.getAllInterLogiciel().subscribe((data: any) => {
      this.interLogiciel = data.data;
    });
    this.adminService.getAllInterMateriel().subscribe((data: any) => {
      this.interMateriel = data.data;
    });
  }
  affecterIntervenantLogiciel(responsable, idReclamation) {
    this.adminService.affecterIntervenantLogiciel(responsable, idReclamation).subscribe((data: any) => {
      this.clickAffectation = false;
      this.notificationService.showNotification('top', 'right', 'success', 'La réclamation a été bien affectée');
    });
  }
  affecterIntervenantMateriel(responsable, idReclamation) {
    this.adminService.affecterIntervenantMateriel(responsable, idReclamation).subscribe((data: any) => {
      this.clickAffectation = false;
      this.notificationService.showNotification('top', 'right', 'success', 'La réclamation a été bien affectée');
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
    const p = new ReclamationPipePipe();
    this.reclamationsFiltre = p.transform(this.reclamations, this.searchType);
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
}
