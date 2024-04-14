class CreateTimeSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :time_slots do |t|
      t.timestamp :start_time
      t.timestamp :end_time

      t.timestamps
    end
  end
end
