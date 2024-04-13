import { BASE_URL } from 'consts';
import spraypaintMiddleware from 'models/spraypaintMiddleware';
import { Attr, Model, Scope, SpraypaintBase } from 'spraypaint';

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static clientApplication = 'thingy';
  static baseUrl = BASE_URL;
  static apiNamespace = '/api';
  static middlewareStack = spraypaintMiddleware;

  @Attr({ persist: false }) createdAt!: string;
  @Attr({ persist: false }) updatedAt!: string;
}

// this is useful when making complex applications where we want to ensure that records are kept in a storage
// and any api call that refreshes a record updates all usages of that record, even in unconnected components
ApplicationRecord.sync = false;
ApplicationRecord.jwtStorage = false;
