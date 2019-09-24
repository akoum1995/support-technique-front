import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  utilisateurConnecte;

  constructor(private http: HttpClient) {
    this.utilisateurConnecte = this.decodeToken();

  }
  login(form) {
    return this.http.post('http://localhost:3000/connexion/connexion', form);
  }
  decodeToken() {
    if (localStorage.getItem('token')) {
      const decode = jwt_decode(localStorage.getItem('token'));
      return decode.data;
    } else {
      return null;
    }
  }

}
