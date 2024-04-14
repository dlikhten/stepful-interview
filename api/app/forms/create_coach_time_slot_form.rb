# frozen_string_literal: true

class CreateCoachTimeSlotForm < BaseForm
  def initialize(*)
    super
    write_only!
  end

  attr_accessor :time_slot_start

  def save_transactioned
    if time_slot_start < Time.current
      # this is the exact reason we don't want to put this validation into the model object. Data-wise it is valid to
      # create a time slot in the past in our db, but for the purposes of this action, it is invalid.
      #
      # example: imagine we had an admin action which would allow us to put in historical
      #          timeslots which happened offline
      errors.add(:time_slot_start, 'you must specify a slot in the future.')
      return false
    end

    # TODO: make this configurable
    end_time = time_slot_start + 2.hours

    records_to_save = []

    time_slot = TimeSlot.find_by(start_time: time_slot_start, end_time: end_time)
    time_slot = TimeSlot.new(start_time: time_slot_start, end_time: end_time) if time_slot.nil?

    # TODO: if we want to allow for overlapping timeslots, convert this to just check for uniqueness in start time
    if CoachTimeSlot.where(coach: current_user).overlaps_with(time_slot).exists?
      errors.add(:time_slot_start, 'this time slot overlaps with an existing time slot.')
      false
    else
      records_to_save << time_slot
      records_to_save << time_slot.coach_time_slots.build(coach: current_user)
      save_model(time_slot, records_to_save)
    end
  end
end
