export interface ICapitalizeOptions {
  eachWord?: boolean;
}

export default function capitalize(
  str: string,
  options: ICapitalizeOptions = { eachWord: false },
): string {
  if (options.eachWord) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
