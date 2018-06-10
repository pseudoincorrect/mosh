import { ErrorHandler } from "@angular/core";

export class AppErrorhandler implements ErrorHandler {
    handleError(error){
        console.log(error); 
    }
}