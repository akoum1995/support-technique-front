import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { AuthService } from 'src/app/shared/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ReclamationPipePipe } from 'src/app/pipes/reclamation-pipe.pipe';

@Component({
  selector: 'app-mes-reclamations',
  templateUrl: './mes-reclamations.component.html',
  styleUrls: ['./mes-reclamations.component.css']
})
export class MesReclamationsComponent implements OnInit {
  reclamations: any = [];
  intervention;
  description;
  reclamationsFiltre: any = [];
  searchType = { status: [], search: '', degres: [], type_reclamation: []};
  constructor(private adminService: AdminService, private authService: AuthService, private notificationService: NotificationService) {
    this.adminService.getAllreclamationsOfClients(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
      this.reclamations = data.data.reclamations;
      this.reclamationsFiltre = data.data.reclamations;
      console.log(this.reclamations);
    });

  }
  ngOnInit() {
    this.adminService.getAllreclamationsOfClients(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
      this.reclamations = data.data.reclamations;
      this.reclamationsFiltre = data.data.reclamations;
    });
  }
  getIntervention(intervention) {
    this.intervention = intervention;
  }
  getDescription(description) {
    this.description = description;
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
