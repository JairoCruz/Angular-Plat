import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs';
import { CategoryService } from '../services/category.service';

export class MyValidators {

    static validPassword(control: AbstractControl) {
        const value = control.value;
        if (!containsNumber(value)) {
          return {invalid_password: true};
        }
        return null;
      }

      static matchPasswords(control: AbstractControl) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if (password === confirmPassword) {
          // si todo esta bien se devuelve un null
          return null;
        }
        // si hay algun error se manda un objeto con un nombre y su respectivo valor a true
        return { match_password: true}
      }


      static validCategory(service: CategoryService) {
        return (control: AbstractControl) => {
          const value = control.value;
          return service.checkCategory(value)
          .pipe(
            map((response: any) => {
              const isAvailable = response.isAvailable;
              if (!isAvailable) {
                return {not_available: true};
              }
              return null;
            })
          );
        };
      }
}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}