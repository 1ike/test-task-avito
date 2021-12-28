import { of, Subscription, Observable } from 'rxjs';
import { delay, tap, mergeMap, repeat, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


export type PollingSubscription = Subscription | null;

export interface PollingInput<T> {
  subscription: PollingSubscription;
  setSubscription: (subscription: PollingSubscription) => void;
  streamFactory: () => Observable<T>;
  successCallback: (data: T) => void;
  errorCallback?: (err: any, caught?: Observable<T>) => void;
}

export default <T>({
  subscription,
  setSubscription,
  streamFactory,
  successCallback,
  errorCallback,
}: PollingInput<T>) => {
  if (subscription) subscription.unsubscribe();

  const polling$ = of(null).pipe(
    mergeMap(() => streamFactory()),
    tap(successCallback),
    delay(environment.POLLING_INTERVAL),
    repeat(),
    catchError((error, caught) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback && errorCallback(error, caught);
      return of(error);
    }),
  );

  setSubscription(polling$.subscribe());
};
