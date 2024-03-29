export const removeDash = (str: string) => str?.replace(/\b-\b/g, ` `);

export const uppercase = (str: string) => str.toUpperCase();

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const removeLongName = (str: string) =>
  str
    ?.replace(/-?altered$/, ``)
    ?.replace(/-?normal$/, ``)
    ?.replace(/-?land$/, ``)
    ?.replace(/-?plant$/, ``)
    ?.replace(/-?red striped$/, ``)
    ?.replace(/-?blue striped$/, ``)
    ?.replace(/-?standard$/, ``)
    ?.replace(/-?incarnate$/, ``)
    ?.replace(/-?ordinary$/, ``)
    ?.replace(/-?aria$/, ``)
    ?.replace(/-?male$/, ``)
    ?.replace(/-?shield$/, ``)
    ?.replace(/-?average$/, ``)
    ?.replace(/-?50$/, ``)
    ?.replace(/-?midday$/, ``)
    ?.replace(/-?solo$/, ``)
    ?.replace(/-?red meteor$/, ``)
    ?.replace(/-?disguised$/, ``)
    ?.replace(/-?amped/, ``)
    ?.replace(/-?low key/, ``)
    ?.replace(/-?full belly$/, ``)
    ?.replace(/-?single strike/, ``)
    ?.replace(/-?rapid strike/, ``)
    ?.replace(/-?combat breed/, ``)
    ?.replace(/-?blaze breed/, ``)
    ?.replace(/-?aqua breed/, ``);

export const sanitizeForXML = (str: string) => {
  return str
    .replaceAll(/&/g, `&amp;`)
    .replaceAll(/</g, `&lt;`)
    .replaceAll(/>/g, `&gt;`)
    .replaceAll(/"/g, `&quot;`)
    .replaceAll(/'/g, `&apos;`);
};
