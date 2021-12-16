// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HACKER_NEWS_API_URL: 'https://hacker-news.firebaseio.com/v0/',
  POLLING_INTERVAL: 600000,
  STORIES_QTY: 100,
  STORIES_QTY_PER_PAGE: 10,
  TITLE_POSTFIX: 'Avito test task',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
