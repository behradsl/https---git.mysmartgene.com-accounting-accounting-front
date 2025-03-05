const isObject = (object: any) =>
  typeof !!object && typeof object === "object" && !Array.isArray(object);
export const removeEmptyObjectsByKeys = (object: Record<string, any>) => {
  if (!isObject(object)) return object;

  let newObject: Record<string, any> = {};
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      newObject[key] = object[key];
    }
  });

  return newObject;
};
