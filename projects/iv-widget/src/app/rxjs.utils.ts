import { filter } from 'rxjs/operators';

export const isDefined = filter(x => !!x);
