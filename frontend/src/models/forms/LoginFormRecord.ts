import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export type LoginFormAttributes = {
  email: string;
};

@Model()
export class LoginFormRecord extends ApplicationRecord implements LoginFormAttributes {
  static jsonapiType = 'login_form';
  static endpoint = '/login_forms';

  @Attr() email!: string;
}
