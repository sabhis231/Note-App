import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSearchShort',
})
export class StringSearchShortPipe implements PipeTransform {
  transform(value: string, ...args: string[]): unknown {
    let newValue = '';
    let maxChar: any = args[0];
    let searchString = args[1];
    if (searchString && maxChar) {
      let index = value.toLowerCase().indexOf(searchString.toLowerCase());
      if (index > -1) {
        newValue = '...';
        if (value.length - index > 30) {
          newValue = newValue
            .concat(value.substr(index, value.length))
            .concat('...');
        } else {
          newValue = newValue.concat(value.substr(index, value.length));
        }
      }
      return this.shorten(newValue, +maxChar);
    } else if (!searchString && maxChar) {
      return this.shorten(value, +maxChar);
    }
    return newValue;
  }
  private shorten(oldString: string, maxLength: number) {
    if (oldString.length <= +maxLength) {
      return oldString;
    } else {
      return oldString.substr(0, +maxLength) + '...';
    }
  }
}
