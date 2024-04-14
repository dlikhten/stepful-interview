# frozen_string_literal: true

class PostSessionNotesForm < BaseForm
  attr_accessor :session_id, :satisfaction_rating, :notes

  def save_transactioned
    session = Session.find(session_id)

    session.satisfaction_rating = satisfaction_rating
    session.notes = notes

    simple_save(session, [session]) do
      import_error(session, {
                     satisfaction_rating: :satisfaction_rating,
                     notes: :notes
                   })
    end
  end
end
