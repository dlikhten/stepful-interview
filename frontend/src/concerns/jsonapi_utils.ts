import { flatten } from 'lodash-es';
import { ApplicationRecord } from 'models/ApplicationRecord';
import { FC, NamedExoticComponent, useMemo } from 'react';
import { IncludeScope, SortScope, WhereClause } from 'spraypaint/lib-esm/scope';

export type FCWithGraphDeps<T> = FC<T> & {
  GRAPH_DEPENDENCY:
    | IncludeScope
    | {
        [key: string]: IncludeScope;
      };
};

export interface ComponentWithGraphDeps<T> extends NamedExoticComponent<T> {
  GRAPH_DEPENDENCY:
    | IncludeScope
    | {
        [key: string]: IncludeScope;
      };
}

export const mergeIncludes = (...includes: IncludeScope[]): IncludeScope => {
  return flatten<any>(includes);
};

export const useMergeIncludes = (...includes: IncludeScope[]): IncludeScope => {
  return useMemo(() => mergeIncludes(...includes), [includes]);
};

type CreateSWRKeyOptions = {
  where?: WhereClause;
  order?: SortScope;
  includes?: IncludeScope;
  per?: number;
  page?: number;
};

export function createSWRKey(
  recordClass: typeof ApplicationRecord,
  { where, order, includes, per, page }: CreateSWRKeyOptions = {}
) {
  return {
    url: recordClass.endpoint,
    where,
    order,
    per,
    page,
    includes: includes || '',
  };
}

export function createSWRKeyForFind(
  recordClass: typeof ApplicationRecord,
  id?: string,
  { where, order, includes, per, page }: CreateSWRKeyOptions = {}
) {
  return id
    ? {
        url: recordClass.endpoint,
        id,
        where,
        order,
        per,
        page,
        includes: includes || '',
      }
    : null;
}
