class TimeSlotsController < ApplicationController
  def index
    respond_with(TimeSlotResource.all(params))
  end

  def show
    respond_with(TimeSlotResource.find(params))
  end
end
