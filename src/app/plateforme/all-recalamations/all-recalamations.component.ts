import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ReclamationPipePipe } from 'src/app/pipes/reclamation-pipe.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-recalamations',
  templateUrl: './all-recalamations.component.html',
  styleUrls: ['./all-recalamations.component.css']
})
export class AllRecalamationsComponent implements OnInit {
  clickAffectation = false;
  respLogiciel: any = [];
  description;
  respMateriel: any = [];
  intervention;
  idReclamation;
  interventionForm: FormGroup;
  reclamations: any = [];
  reclamationsFiltre: any = [];
  searchType = { status: [], search: '', degres: [], type_reclamation: []};
  constructor(private adminService: AdminService, private authService: AuthService, private notificationService: NotificationService) {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    this.adminService.getAllreclamations().subscribe((data: any) => {
      this.reclamations = data.data;
      this.reclamationsFiltre = data.data;
    });
    this.adminService.getAllRespLogiciel().subscribe((data: any) => {
      this.respLogiciel = data.data;
    });
    this.adminService.getAllRespMateriel().subscribe((data: any) => {
      this.respMateriel = data.data;
    });

  }
  getDescription(description) {
    this.description = description;
  }
  getIntervention(inter) {
    this.intervention = inter;
  }
  ngOnInit() {
    this.interventionForm = new FormGroup({
      pv: new FormControl('', Validators.required),
    });
    this.adminService.getAllreclamations().subscribe((data: any) => {
      this.reclamations = data.data;
      this.reclamationsFiltre = data.data;
    });
    this.adminService.getAllRespLogiciel().subscribe((data: any) => {
      this.respLogiciel = data.data;
    });
    this.adminService.getAllRespMateriel().subscribe((data: any) => {
      this.respMateriel = data.data;
    });
  }
  affecterResponsableLogiciel(responsable, idReclamation) {
    this.adminService.affecterResponsableLogiciel(responsable, idReclamation).subscribe((data: any) => {
      this.clickAffectation = false;
      this.notificationService.showNotification('top', 'right', 'success', 'La réclamation a été bien affectée');
    });
  }
  affecterResponsableMateriel(responsable, idReclamation) {
    this.adminService.affecterResponsableMateriel(responsable, idReclamation).subscribe((data: any) => {
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
