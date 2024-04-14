# frozen_string_literal: true

class ReserveSessionForm < BaseForm
  def initialize(*)
    super
    write_only!
  end

  attr_accessor :coach_time_slot_id

  def save_transactioned
    # we must lock, otherwise we run into a situation where 2 users can try to reserve at the same time
    cts = CoachTimeSlot.find(coach_time_slot_id)
    cts.with_lock do
      if cts.session
        errors.add(:coach_time_slot_id, 'time slot has been taken.')
        false
      elsif Session.where(student: current_user).overlaps_with(cts.time_slot).exists?
        errors.add(:coach_time_slot_id, 'overlaps with existing session.')
        false
      else
        records_to_save = []
        records_to_save << cts
        records_to_save << cts.build_session(
          start_time: cts.time_slot.start_time,
          end_time: cts.time_slot.end_time,
          coach: cts.coach,
          student: current_user
        )

        # TODO: if we want to convert to allow overlapping coach timeslots need to close timeslots that overlap with this reservation

        save_model(cts, records_to_save)
      end
    end
  end
end
