import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitRes',
})
export class SplitResPipe implements PipeTransform {
  transform(args: string, num: number): unknown {
    return args
      .replace(
        'FULL SPOILER-FREE REVIEW @ https://www.firstshowing.net/2023/review-dungeons-dragons-honor-among-thieves-is-a-delightful-surprise/',
        ''
      )
      .split(' ')
      .slice(0, num)
      .join(' ');
  }
}
