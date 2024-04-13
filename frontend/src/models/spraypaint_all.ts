/**
 * Don't allow any of this to be transpiled out!
 *
 * Don't need to worry about Forms since they don't reference records, and will
 * get transpiled out whenever appropriate. For models we must make sure all
 * are loaded so relationships can be appropriately read.
 */
export function spraypaintAll() {
  return [];
}
