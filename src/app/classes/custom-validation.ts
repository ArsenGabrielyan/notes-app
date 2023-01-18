import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidation {
     static spaceValidation(control: AbstractControl): ValidationErrors | null {
          const val = control.value as string;
          if(val.trim()==="") return {hasAnyBlankSpaces: true};
          return null;
     }
}
