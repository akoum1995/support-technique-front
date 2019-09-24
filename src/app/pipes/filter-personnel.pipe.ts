import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPersonnel'
})
export class FilterPersonnelPipe implements PipeTransform {

  transform(value: any[], search: any): any {
    if (search === '' || search === null || search === undefined) {
      return value;
    }

    return value.filter(obj => {
      let nom;
      let prenom;
      let email;
      let telephone;
      let address;
      if (obj.role === 'responsable logiciel') {
        if (obj.responsableLogiciel.nom) {
          nom = obj.responsableLogiciel.nom.includes(search);
        }
        if (obj.responsableLogiciel.prenom) {
          prenom = obj.responsableLogiciel.prenom.includes(search);
        }
        if (obj.responsableLogiciel.telephone) {
          telephone = obj.responsableLogiciel.telephone.includes(search);
        }
        if (obj.responsableLogiciel.address) {
          address = obj.responsableLogiciel.address.includes(search);
        }
      }
      if (obj.role === 'responsable materiel') {
        if (obj.responsableMateriel.nom) {
          nom = obj.responsableMateriel.nom.includes(search);
        }
        if (obj.responsableMateriel.prenom) {
          prenom = obj.responsableMateriel.prenom.includes(search);
        }
        if (obj.responsableMateriel.telephone) {
          telephone = obj.responsableMateriel.telephone.includes(search);
        }
        if (obj.responsableMateriel.address) {
          address = obj.responsableMateriel.address.includes(search);
        }
      }
      if (obj.role === 'intervenant logiciel') {
        if (obj.intervenantLogiciel.nom) {
          nom = obj.intervenantLogiciel.nom.includes(search);
        }
        if (obj.intervenantLogiciel.prenom) {
          prenom = obj.intervenantLogiciel.prenom.includes(search);
        }
        if (obj.intervenantLogiciel.telephone) {
          telephone = obj.intervenantLogiciel.telephone.includes(search);
        }
        if (obj.intervenantLogiciel.address) {
          address = obj.intervenantLogiciel.address.includes(search);
        }
      }
      if (obj.role === 'intervenant materiel') {
        if (obj.intervenantMateriel.nom) {
          nom = obj.intervenantMateriel.nom.includes(search);
        }
        if (obj.intervenantMateriel.prenom) {
          prenom = obj.intervenantMateriel.prenom.includes(search);
        }
        if (obj.intervenantMateriel.telephone) {
          telephone = obj.intervenantMateriel.telephone.includes(search);
        }
        if (obj.intervenantMateriel.address) {
          address = obj.intervenantMateriel.address.includes(search);
        }
      }
      if (obj.email) {
        email = obj.email.includes(search);
      }
      return (nom || prenom || email || telephone || address || address);
    });
  }

}
