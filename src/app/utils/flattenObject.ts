export const flattenObject = (
  obj: any,
  parentKey: string = ''
): { [key: string]: any } => {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
};

export const flattenObjectFurther = (obj: any): { [key: string]: any } => {
  const result: { [key: string]: any } = {};

  function recurse(current: any, parent: string) {
    for (const key in current) {
      const property = parent ? `${parent}.${key}` : key;
      if (typeof current[key] === 'object' && !Array.isArray(current[key])) {
        recurse(current[key], property);
      } else {
        result[property] = current[key];
      }
    }
  }

  recurse(obj, '');

  // Remove the question number prefix
  const finalResult: { [key: string]: any } = {};
  for (const key in result) {
    const matches = key.match(/question\d+\.(\w+)/);
    if (matches && matches.length > 1) {
      finalResult[matches[1]] = result[key];
    }
  }

  return finalResult;
};
