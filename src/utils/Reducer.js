export function getHash(newHash, originalHash, idKey = 'id') {
  return newHash.reduce((acc, item) => {
    return {
      ...acc,
      [item[idKey]]: item
    };
  }, originalHash);
}

export function getRemovedHash(id, hash) {
  return Object.keys(hash).reduce((acc, key) => {
    if (key === id) {
      return acc;
    }

    return {
      ...acc,
      [key]: hash[key]
    };
  }, {});
}

export function getCachedHash(list) {
  return list.reduce((acc, service) => {
    return {
      [service.id]: service,
      ...acc
    };
  }, {});
}

export function getDeletedList(datum, list, idKey = 'id') {
  return list.reduce((acc, item) => {
    if (item[idKey] === datum[idKey]) {
      return acc;
    }

    return [item, ...acc];
  }, []);
}
