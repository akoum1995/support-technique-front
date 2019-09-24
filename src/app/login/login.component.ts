import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router,
              private adminService: AdminService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      mot_de_passe: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      mot_de_passe: new FormControl('', Validators.required),
    });
  }
  login(f) {
    if (f.valid) {
      this.authService.login(f.value).subscribe((res: any) => {

        if (res.msg === 'supprime') {
          this.notificationService.showNotification('top', 'right', 'danger', 'Votre compte est désactivée');
          localStorage.clear();
          this.authService.utilisateurConnecte = null;
          localStorage.removeItem('token');
        } else {
          localStorage.setItem('token', res.data.token);
          this.authService.utilisateurConnecte = this.authService.decodeToken();
          if (this.authService.utilisateurConnecte.role === 'client') {
            this.adminService.getDetailsClient(this.authService.utilisateurConnecte.client).subscribe((data: any) => {
              for (const contrat of data.data.contrats) {
                if (contrat.periode > 0 && contrat.status !== 'annule') {
                  const dateCreationContrat = new Date(contrat.date_creation);
                  const dateActuelle = new Date();
                  const difference = dateActuelle.getTime() - dateCreationContrat.getTime();
                  const differenceParJour = Math.floor(difference / (1000 * 3600 * 24));
                  contrat.periode = contrat.periode - differenceParJour;
                  if (contrat.periode <= 0) {
                    contrat.persiode = 0;
                    contrat.status = 'expire';
                  }
                  // tslint:disable-next-line: no-trailing-whitespace
                  this.adminService.modifierContrat(contrat._id, contrat).subscribe((data2: any) => {});
                }
              }
            });
          }
          this.router.navigateByUrl('/plateforme');
        }
      });
    }
  }
}
