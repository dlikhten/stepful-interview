# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_04_14_180627) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coach_time_slots", force: :cascade do |t|
    t.bigint "time_slot_id", null: false
    t.bigint "coach_id", null: false
    t.bigint "session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id", "time_slot_id"], name: "index_coach_time_slots_on_coach_id_and_time_slot_id", unique: true
    t.index ["coach_id"], name: "index_coach_time_slots_on_coach_id"
    t.index ["session_id"], name: "index_coach_time_slots_on_session_id"
    t.index ["time_slot_id"], name: "index_coach_time_slots_on_time_slot_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "start_time", precision: nil
    t.datetime "end_time", precision: nil
    t.bigint "coach_id", null: false
    t.bigint "student_id", null: false
    t.integer "satisfaction_rating"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_sessions_on_coach_id"
    t.index ["student_id"], name: "index_sessions_on_student_id"
  end

  create_table "time_slots", force: :cascade do |t|
    t.datetime "start_time", precision: nil
    t.datetime "end_time", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "user_type", null: false
    t.text "phone", null: false
    t.text "name", null: false
  end

  add_foreign_key "coach_time_slots", "sessions"
  add_foreign_key "coach_time_slots", "time_slots"
  add_foreign_key "coach_time_slots", "users", column: "coach_id"
  add_foreign_key "sessions", "users", column: "coach_id"
  add_foreign_key "sessions", "users", column: "student_id"
end
