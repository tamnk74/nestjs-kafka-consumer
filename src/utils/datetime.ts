import { format } from 'date-fns';

export class DateTime {
  static format(date: Date): string {
    return format(date, 'yyyy/MM/dd HH:mm:ss');
  }
}
