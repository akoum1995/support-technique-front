import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReclamations'
})
export class FilterReclamationsPipe implements PipeTransform {

  transform(value: any[], search: any): any {
    if (search === '' || search === null || search === undefined) {
      return value;
    }

    return value.filter(obj => {
      let nomProduit;
      let description;

      if (obj.produit.nom_produit) {
      nomProduit = obj.produit.nom_produit.includes(search);
      }
      if (obj.description) {
       description =  obj.description.includes(search);
      }
      return (nomProduit ||  description );
 });
  }

}
