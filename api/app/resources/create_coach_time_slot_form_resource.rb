class CreateCoachTimeSlotFormResource < FormResource
  self.type = :create_coach_time_slot_form
  self.model = CreateCoachTimeSlotForm

  attribute :time_slot_start, :datetime
end