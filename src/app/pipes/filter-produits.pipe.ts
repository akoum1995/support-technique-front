import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduits'
})
export class FilterProduitsPipe implements PipeTransform {

  transform(value: any[], search: any): any {
    if (search === '' || search === null || search === undefined) {
      return value;
    }

    return value.filter(obj => {
      let nomProduit;
      let version;
      let description;

      if (obj.nom_produit) {
        nomProduit = obj.nom_produit.includes(search);
      }
      if (obj.version) {
        version =  obj.version.includes(search);
      }
      if (obj.description) {
        description = obj.description.includes(search);
      }
      return (nomProduit ||  version || description);
 });
  }

}
