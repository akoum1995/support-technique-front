import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personnelPipe'
})
export class PersonnelPipePipe implements PipeTransform {

  transform(value: any, searchJson: any): any {
    if (searchJson.status.length === 0 && searchJson.postes.length === 0) {
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
        status = searchJson.status.includes(it.status.toLowerCase());
      } else {
        status = true;
      }
      let postes;
      if (searchJson.postes.length !== 0) {
        postes = searchJson.postes.includes(it.role.toLowerCase());
      } else {
        postes = true;
      }

      return (status && postes);
    });
  }

}
