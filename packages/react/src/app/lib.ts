export const transformDate = (time: number) => time * 1000;

export const formatDate = (time: number) => (new Date(time)).toLocaleString('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
