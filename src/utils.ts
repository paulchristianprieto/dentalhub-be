export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_([a-z])/g, (match, letter) =>
          letter.toUpperCase()
        );
        newObj[newKey] = snakeToCamel(obj[key]);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}
