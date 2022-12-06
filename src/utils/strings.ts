export const caseInsensitiveInclude = (str: string, searchString: string) => {
  return str.toLowerCase().includes(searchString.toLowerCase());
};
