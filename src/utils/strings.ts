export const caseInsensitiveEqual = (a: string, b: string) => a.toLowerCase().trim() === b.toLowerCase().trim();
export const caseInsensitiveInclude = (str: string, searchString: string) => {
  return str.toLowerCase().includes(searchString.toLowerCase());
};

export const capitalize = (str: string) => str[0].toLowerCase() + str.slice(1);
