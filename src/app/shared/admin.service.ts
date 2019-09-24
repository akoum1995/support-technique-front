import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) {}

  getAllClients() {
    return this.http.get(environment.url + 'api/allClients');
  }
  supprimeClient(id) {
    return this.http.post(environment.url + 'api/supprimeClient/' + id, null);
  }
  reactiveClient(id) {
    return this.http.post(environment.url + 'api/reactiveClient/' + id, null);
  }
  ajouterClient(client, contrat) {
    const object = client;
    object['produit'] = contrat.produit;
    object['periode'] = contrat.periode;
    return this.http.post(environment.url + 'api/ajouterClient', object);
  }
  getAllProduits() {
    return this.http.get(environment.url + 'api/allProduits');
  }
  getIntervention(idIntervention) {
    return this.http.get(environment.url + 'api/getIdIntervention/' + idIntervention);

  }
  supprimeProduit(id) {
    return this.http.post(environment.url + 'api/supprimeProduit/' + id, null);
  }
  reactiveProduit(id) {
    return this.http.post(environment.url + 'api/reactiveProduit/' + id, null);
  }
  ajouterProduit(produit) {
    return this.http.post(environment.url + 'api/ajoutProduit', produit);
  }
  uploadProduit(produit) {
    return this.http.post(environment.url + 'upload/', produit);
  }
  modifierProduit(produit, idProduit) {
    return this.http.post(environment.url + 'api/modifProduit/' + idProduit, produit);
  }
  getAllPersonnels() {
    return this.http.get(environment.url + 'api/allPersonnels');
  }
  ajouterPersonnel(personnel) {
    return this.http.post(environment.url + 'connexion/creationCompte', personnel);
  }
  supprimePersonnel(id) {
    return this.http.post(environment.url + 'api/supprimePersonnel/' + id, null);
  }
  reactivePersonnel(id) {
    return this.http.post(environment.url + 'api/reactivePersonnel/' + id, null);
  }
  getAllContratsOfClients(idClient) {
    return this.http.get(environment.url + 'api/reclamAndcontratsClient/' + idClient);
  }
  annulerContrat(idContrat) {
    return this.http.post(environment.url + 'api/annuleContrat/' + idContrat, null);
  }
  ajouterContrat(contrat, idClient) {
    return this.http.post(environment.url + 'api/ajouterContrat/' + idClient, contrat);
  }
  reactiverContrat(contrat, idContrat) {
    return this.http.post(environment.url + 'api/reactiverContrat/' + idContrat, contrat);
  }
  ajouterReclamation(reclamation, idClient) {
    return this.http.post(environment.url + 'api/ajouterReclamation/' + idClient, reclamation);
  }
  getAllreclamationsOfClients(idClient) {
    return this.http.get(environment.url + 'api/reclamClient/' + idClient);
  }
  getAllreclamations() {
    return this.http.get(environment.url + 'api/allReclamations');
  }
  getAllRespLogiciel() {
    return this.http.get(environment.url + 'api/allRespLogiciel');
  }
  getAllRespMateriel() {
    return this.http.get(environment.url + 'api/allRespMateriel');
  }
  affecterResponsableLogiciel(idResponsable, idReclamation) {
    return this.http.post(environment.url + 'api/affecterRespLogiciel/' + idResponsable + '/' + idReclamation, null);
  }
  affecterResponsableMateriel(idResponsable, idReclamation) {
    return this.http.post(environment.url + 'api/affecterRespMateriel/' + idResponsable + '/' + idReclamation, null);
  }
  getAllInterLogiciel() {
    return this.http.get(environment.url + 'api/allInterLogiciel');
  }
  getAllInterMateriel() {
    return this.http.get(environment.url + 'api/allInterMateriel');
  }
  affecterIntervenantLogiciel(idIntervenant, idReclamation) {
    return this.http.post(environment.url + 'api/affecterInterLogiciel/' + idIntervenant + '/' + idReclamation, null);
  }
  affecterIntervenantMateriel(idIntervenant, idReclamation) {
    return this.http.post(environment.url + 'api/affecterInterMateriel/' + idIntervenant + '/' + idReclamation, null);
  }
  getAllreclamationsOfresponsableLogiciel(idResponsable) {
    return this.http.get(environment.url + 'api/reclamRespLogiciel/' + idResponsable);
  }
  getAllreclamationsOfresponsableMateriel(idResponsable) {
    return this.http.get(environment.url + 'api/reclamRespMateriel/' + idResponsable);
  }
  getAllreclamationsOfintervenantLogiciel(idIntervenant) {
    return this.http.get(environment.url + 'api/reclamInterLogiciel/' + idIntervenant);
  }
  getAllreclamationsOfintervenantMateriel(idIntervenant) {
    return this.http.get(environment.url + 'api/reclamInterMateriel/' + idIntervenant);
  }
  ajouterIntervention(idReclamation, intervention) {
    return this.http.post(environment.url + 'api/creerPV/' + idReclamation, intervention);
  }
  getClientById(idclient) {
    return this.http.get(environment.url + 'api/getClientById/' + idclient);
  }
  getAdministrateurById(idAdministrateur) {
    return this.http.get(environment.url + 'api/getAdministrateurById/' + idAdministrateur);
  }
  getRespLogicielById(idRespLogiciel) {
    return this.http.get(environment.url + 'api/getRespLogicielById/' + idRespLogiciel);
  }
  getRespMaterielById(idRespMateriel) {
    return this.http.get(environment.url + 'api/getRespMaterielById/' + idRespMateriel);
  }
  getIntLogicielById(idIntLogiciel) {
    return this.http.get(environment.url + 'api/getIntLogicielById/' + idIntLogiciel);
  }
  getIntMaterielById(idIntMateriel) {
    return this.http.get(environment.url + 'api/getIntMaterielById/' + idIntMateriel);
  }
  ChangerAdmin(admin, idAdmin) {
    return this.http.post(environment.url + 'api/changerAdmin/' + idAdmin, admin);
  }
  ChangerRespLogiciel(resp, idResp) {
    return this.http.post(environment.url + 'api/changerRespLogiciel/' + idResp, resp);
  }
  ChangerRespMateriel(resp, idResp) {
    return this.http.post(environment.url + 'api/changerRespMateriel/' + idResp, resp);
  }
  ChangerIntLogiciel(int, idInt) {
    return this.http.post(environment.url + 'api/changerIntLogiciel/' + idInt, int);
  }
  ChangerIntMateriel(int, idInt) {
    return this.http.post(environment.url + 'api/changerIntMateriel/' + idInt, int);
  }
  ChangerClient(client, idClient) {
    return this.http.post(environment.url + 'api/changerClient/' + idClient, client);
  }
  ChangerCompte(utilisateur, idUtilisateur) {
    return this.http.post(environment.url + 'api/ChangerCompte/' + idUtilisateur, utilisateur);
  }
  getDetailsClient(idClient) {
    return this.http.get(environment.url + 'api/getDetailsClient/' + idClient);
  }
  modifierContrat(idContrat, contrat) {
    return this.http.post(environment.url + 'api/modifierContrat/' + idContrat, contrat);
  }
}
