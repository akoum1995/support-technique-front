import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContrats'
})
export class FilterContratsPipe implements PipeTransform {

  transform(value: any[], search: any): any {
    if (search === '' || search === null || search === undefined) {
      return value;
    }

    return value.filter(obj => {
      let nomProduit;
      let periode;

      if (obj.produit.nom_produit) {
        nomProduit = obj.produit.nom_produit.includes(search);
      }
      if (obj.periode) {
        periode =  obj.periode.includes(search);
      }
      return (periode || nomProduit);
 });
  }

}
