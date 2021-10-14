export const getCommentsByIds = (commentEntities: any, ids: number[]) => {
  // console.log('comments = ', commentEntities);
  const entities = ids.reduce(
    (acc, id) => (commentEntities[id] ? { ...acc, [id]: commentEntities[id] } : acc),
    {},
  );
  // console.log('entities = ', entities);

  return { ids, entities };
};
