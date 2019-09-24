import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClients'
})
export class FilterClientsPipe implements PipeTransform {

  transform(value: any[], search: any): any {
    if (search === '' || search === null || search === undefined) {
      return value;
    }

    return value.filter(obj => {
      let nomSociete;
      let email;
      let telephone;
      let address;

      if (obj.client.nom_societe) {
      nomSociete = obj.client.nom_societe.includes(search);
      }
      if (obj.email) {
       email =  obj.email.includes(search);
      }
      if (obj.client.telephone) {
       telephone = obj.client.telephone.includes(search);
      }
      if (obj.client.address) {
       address = obj.client.address.includes(search);
      }
      return (nomSociete ||  email || telephone || address );
 });
  }

}
