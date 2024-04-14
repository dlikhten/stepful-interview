# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
#
# We will use factories to help us out here...
#
User.create(user_type: :coach, name: 'Abram Coach1', phone: '6661112222', email: 'coach1@example.com')
User.create(user_type: :coach, name: 'Fonzy Coach2', phone: '6662222222', email: 'coach2@example.com')
User.create(user_type: :coach, name: 'Milo Coach3', phone: '6663332222', email: 'coach3@example.com')
User.create(user_type: :coach, name: 'Akira Coach4', phone: '6664442222', email: 'coach4@example.com')

User.create(user_type: :student, name: 'Alice Student1', phone: '7771113333', email: 'student1@example.com')
User.create(user_type: :student, name: 'Bonnie Student2', phone: '7772223333', email: 'student2@example.com')
User.create(user_type: :student, name: 'Charlie Student3', phone: '7773333333', email: 'student3@example.com')
User.create(user_type: :student, name: 'Dave Student4', phone: '7774443333', email: 'student4@example.com')


tomorrow = Time.zone.now.beginning_of_day + 1.day
tomorrow_at_3 = tomorrow + 15.hours
end_time_for_3 = tomorrow_at_3 + 2.hours - 1.second # just to keep things easier to query, if we want it to be exactly on the hour, it'll just make the sql logic a bit more complex

# ts 1 is open for students 2, 3,  with 2 coaches, and student 1 already has a session
ts1 = TimeSlot.create(start_time: tomorrow_at_3, end_time: end_time_for_3)
cts1 = ts1.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach1@example.com'),
)
cts2 = ts1.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach2@example.com'),
)
cts3 = ts1.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach2@example.com'),
)
cts2.create_session(
  start_time: ts1.start_time,
  end_time: ts1.end_time,
  coach: cts2.coach,
  student: User.find_by(email: 'student1@example.com')
)

# ts 2 is open for only 1 coach, but all students
ts2 = TimeSlot.create(start_time: tomorrow_at_3 + 2.hours, end_time: end_time_for_3 + 2.hours)
cts2_1 = ts2.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach2@example.com'),
)

# ts 3 has no free coaches, and used by students 1, 3
ts3 = TimeSlot.create(start_time: tomorrow_at_3 + 4.hours, end_time: end_time_for_3 + 4.hours)
cts3_1 = ts3.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach2@example.com'),
)
cts3_2 = ts3.coach_time_slots.create(
  coach: User.find_by(user_type: :coach, email: 'coach3@example.com'),
)
cts3_1.create_session(
  start_time: ts3.start_time,
  end_time: ts3.end_time,
  coach: cts3_1.coach,
  student: User.find_by(email: 'student1@example.com')
)
cts3_2.create_session(
  start_time: ts3.start_time,
  end_time: ts3.end_time,
  coach: cts3_2.coach,
  student: User.find_by(email: 'student3@example.com')
)

# student 1 should only see slot 2
# student 2 should see slot 1, 2, 3
# student 3 should see slot 1, 2
# TODO: This should all be unit tested for the resource if time permits