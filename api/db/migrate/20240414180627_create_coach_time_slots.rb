class CreateCoachTimeSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :coach_time_slots do |t|
      t.belongs_to :time_slot, index: true, foreign_key: true, null: false
      t.belongs_to :coach, index: true, foreign_key: { to_table: :users }, null: false
      t.belongs_to :session, null: true, foreign_key: true, index: true

      t.timestamps
    end
  end
end
