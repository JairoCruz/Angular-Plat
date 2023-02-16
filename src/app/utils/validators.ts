import { AbstractControl } from '@angular/forms';

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

}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}