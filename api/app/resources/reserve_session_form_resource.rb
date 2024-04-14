class ReserveSessionFormResource < FormResource
  self.type = :reserve_session_form
  self.model = ReserveSessionForm

  attribute :coach_time_slot_id, :string
end