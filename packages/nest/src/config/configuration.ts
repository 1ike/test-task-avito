export enum ConfigVarNames {
  PORT = 'PORT',
  HACKER_NEWS_API_URL = 'HACKER_NEWS_API_URL',
}

export default () => ({
  [ConfigVarNames.PORT]: parseInt(process.env[ConfigVarNames.PORT], 10) || 3000,
  [ConfigVarNames.HACKER_NEWS_API_URL]:
    process.env[ConfigVarNames.HACKER_NEWS_API_URL] ||
    'https://hacker-news.firebaseio.com/v0/',
});
