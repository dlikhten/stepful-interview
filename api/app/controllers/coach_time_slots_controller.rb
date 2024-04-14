class CoachTimeSlotsController < ApplicationController
  def index
    respond_with(CoachTimeSlotResource.all(params))
  end

  def show
    respond_with(CoachTimeSlotResource.find(params))
  end
end
