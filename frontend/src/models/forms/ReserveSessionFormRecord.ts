import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export type ReserveSessionFormAttributes = {
  coachTimeSlotId: string;
};

@Model()
export class ReserveSessionFormRecord extends ApplicationRecord implements ReserveSessionFormAttributes {
  static jsonapiType = 'reserve_session_form';
  static endpoint = '/reserve_session_forms';

  @Attr() coachTimeSlotId!: string;
}
