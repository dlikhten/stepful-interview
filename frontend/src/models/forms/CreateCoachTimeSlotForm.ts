import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export type CreateCoachTimeSlotFormAttributes = {
  timeSlotStart: string;
};

@Model()
export class CreateCoachTimeSlotForm extends ApplicationRecord implements CreateCoachTimeSlotFormAttributes {
  static jsonapiType = 'create_coach_time_slot_form';
  static endpoint = '/create_coach_time_slot_forms';

  @Attr() timeSlotStart!: string;
}
