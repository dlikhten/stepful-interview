import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export type PostSessionNotesFormAttributes = {
  sessionId: string;
  satisfactionRating: string;
  notes: string;
};

@Model()
export class PostSessionNotesFormRecord extends ApplicationRecord implements PostSessionNotesFormAttributes {
  static jsonapiType = 'post_session_notes_form';
  static endpoint = '/post_session_notes_forms';

  @Attr() sessionId!: string;
  @Attr() satisfactionRating!: string;
  @Attr() notes!: string;
}
