import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniqueTitle',
  pure: false
})
export class UniqueTitlePipe implements PipeTransform {
    transform(value: any): any{
        if(value!== undefined && value!== null){
            return _.sortBy(_.uniqBy(value, 'Title'),'Title');
        }
        return value;
    }
}