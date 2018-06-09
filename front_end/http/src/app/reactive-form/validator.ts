import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PassValidator {
    
    static doesNotMatchOld(control: AbstractControl): ValidationErrors|null{
        if((control.value as string) !== "1234")
            return {doesNotMatchOld: true};
        else
            return null;
    }  

    static doesNotMatchNew(control: AbstractControl): ValidationErrors|null{
        let newPassword = control.get('newPass');
        let passMatchword = control.get('passMatch');
        console.log(newPassword.value, passMatchword.value);
        
        if(newPassword.value !==  passMatchword.value){
            console.log('error');
            return {doesNotMatchNew: true};
        }

        else
            return null;
    }  
}
