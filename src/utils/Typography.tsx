export const removeDash = (str: string) => str?.replace(/-/g, ` `);

export const uppercase = (str: string) => str.toUpperCase();

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
