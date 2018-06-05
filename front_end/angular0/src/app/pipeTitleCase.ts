import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "titleCase"
})
export class pipeTitleCase implements PipeTransform {
    transform(str: string, args?: any) {
        return str.toLowerCase().split(' ').map(function(word) {
            if (word != "of" && word != "the")
                return word.charAt(0).toUpperCase() + word.slice(1);
            else
                return word.slice();
        }).join(' ');
    }
}