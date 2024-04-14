class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.timestamp :start_time
      t.timestamp :end_time
      t.belongs_to :coach, foreign_key: { to_table: :users }, index: true, null: false
      t.belongs_to :student, foreign_key: { to_table: :users }, index: true, null: false
      t.integer :satisfaction_rating
      t.text :notes

      t.timestamps
    end
  end
end
