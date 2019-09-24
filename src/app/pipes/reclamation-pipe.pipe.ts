import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reclamationPipe'
})
export class ReclamationPipePipe implements PipeTransform {

  transform(value: any, searchJson: any): any {
    if (searchJson.status.length === 0 && searchJson.degres.length === 0 && searchJson.type_reclamation.length === 0) {
      return value;
    }
    Array.prototype['equals'] = function(array) {
      if (!array) {
        return false;
      }
      for (let i = 0, l = this.length; i < l; i++) {
        if (array.includes(this[i].toLowerCase())) {
          return true;
        }
      }
      return false;
    };

    return value.filter(it => {
      let status;
      if (searchJson.status.length !== 0) {
        status = searchJson.status.includes(it.statut.toLowerCase());
      } else {
        status = true;
      }
      let degres;
      if (searchJson.status.length !== 0) {
        degres = searchJson.degres.includes(it.degres.toLowerCase());
      } else {
        degres = true;
      }
      let type;
      if (searchJson.type_reclamation.length !== 0) {
        type = searchJson.type_reclamation.includes(it.type_reclamation.toLowerCase());
      } else {
        type = true;
      }
      return (status && degres && type);
    });
  }

}
