class PostSessionNotesFormResource < FormResource
  self.type = :post_session_notes_form
  self.model = PostSessionNotesForm

  attribute :session_id, :string
  attribute :satisfaction_rating, :string
  attribute :notes, :string
end