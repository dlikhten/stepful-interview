class AddMoreFieldsToUser < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.text :user_type, null: false
      t.text :phone, null: false
      t.text :name, null: false
    end
  end
end
