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
    ?.replace(/-?amped$/, ``)
    ?.replace(/-?full belly$/, ``)
    ?.replace(/-?single strike$/, ``)
    ?.replace(/-?rapid strike$/, ``);
