import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (value) {
            value = value.toLocaleLowerCase();
             if (!items) return [];
                return items.filter(it =>{ 
                    if (it.info[field].toLocaleLowerCase().indexOf(value) > -1) {
                        return true;
                    }else if(it.info.Text.toLocaleLowerCase().indexOf(value) > -1){
                        return true
                    }else if(it.info.SKU.toLocaleLowerCase().indexOf(value) > -1){
                        return true;
                    }else if(it.info.MetaKeywords.toLocaleLowerCase().indexOf(value) > -1){
                        return true;
                    }
                    
                    return false;
                });
   
            // input = input.toLowerCase();
            // if(value){
                
            //     console.log(value);

            //     return value.filter(function (el: any) {
            //         return el.name.toLowerCase().indexOf(input) > -1;
            //     })
            // }
        }
        return items;
    }
}