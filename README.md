# Dmitriy Likhten's interview challenge submission for Stepful

## Running

prereqs:

- you need to have postgres installed. And the ability to install the `pg` gem, which means all libraries are already
  properly linked in your system.
- you need to have at least a ruby and node installed so we can run `bundle install` / `npm install`.
- if you have rb-env or rvm, the backend has configs for it
- if you have nvm, the frontend has configs for it
- if you aren't using version managers, please check the `api/.ruby-version` and `frontend/.nvmrc` for which versions
  this code was written against, it is very likely to work against other versions, but I haven't tested others.

to run the server:

```bash
> cd api
> cp .env.example .env
# optional if you have rvm installed, follow the "rvm install" instructions that rvm spits out, and then "rvm use"
> bundle install
> rake db:create db:migrate db:seed
> rails s # run the api server, on localhost:3000
> rake # run tests
```

to run the front-end:

```bash
> cd frontend
> cp .env.local.example .env.local
# optional if you have nvm installed, follow the "nvm use" instructions that nvm spits out
> npm install
> npm run dev  # run the front-end, on localhost:3001
```

Critical note on commits:

If you're running `nvm`, you have to be in command-line to submit the commit, I haven't fully figured out how to
get husky to correctly run in tools like SourceTree to be able to automatically invoke prettier (I love prettier on commit).

## Problem-specific architectural notes

The modeling I use:

User:
- the login + represents a student / coach
- if i had a bunch more time, I would split out login from data concerns. Depending on how complex the data got  they
  might not share a model. In any case, I kept it simple here.

TimeSlot:
- A representation of a time (say 3-4pm). This is agnostic of coaches, this way it is very easy to query for what time
  slots are available.
- I made a decision just to keep my life simple that 3-4pm is actually 3-3:59pm, just to keep the logic really simple
  however we can adjust that if needed but would just have to give the queries a bit more thought instead of a trivial
  between clause

CoachTimeSlot:
- A representation of a coach having this timeslot available. This also links to a session so we know if this slot is
  still open or closed.
- This allows a student to query a list of time slots, and immediately see which coaches are available.

Session:
- A session between a coach and a student
- Relates to a coach time slot
- I duplicated things like time in here, as once this record is created / session happens, it becomes a historical
  record, so regardless of what we do to TimeSlots or any related model, all information about the session as it
  happened will be here.

The resources follow the model definitions. You can see how they are defined in `app/resources`
Form resources also exist in the resource path, but the form action objects can be found in `app/forms`

### Accessible pages

- `/login` -- the login page
- `/student` -- the student view where they see their active/upcoming sessions and can reserve timeslots
- `/coach` -- a coach's view of upcoming sessions and timeslots. Place where you can create more time slots
- `/coach_history` -- a page for all historical sessions, including the currently active one. Can leave session notes.

### API Endpoints
Note, since this follows JSONAPI specifications, each model fetched can include its relationships and decendants as part
of any API call.

Data fetching APIs:

- GET    /api/time_slots
- GET    /api/coach_time_slots                                                                   
- GET    /api/sessions                                                                           

Form submissions:

- POST   /api/reserve_session_forms                                                              
- POST   /api/create_coach_time_slot_forms                                           
- POST   /api/post_session_notes_forms                                                           

### Notes on decisions

- For now, pagination is not implemented, but it should definitely be if we were to really ship this product.
  For now I fetch 1000 records and call it done. In a real project this needs to be handled.
- It was not immediately clear from the requirements that a student cannot double-book their time. For example
  scheduling a coach call at 1:00 and then another at 2:30 (technically when they’re still in a session with another coach).
  I have made a call that students won’t see any timeslots that intersect with a session they already have scheduled. I
  want to call this out because this is exactly a place where a product decision can be made: Do we allow intersections
  and just warn students, do we still show intersections but as “unavailable”, etc.
- It was not clear in the requirements if coaches can create any amount of slots, even if they overlap. I have chosen
  not to allow coach slot overlaps (one coach cannot have a slot at 2pm and 2:30pm for 2 hours each). If this
  requirement is to change, the form actions for booking and creating slots will have to be modified – creating slots
  will allow any slot creation as long as the starting time is unique for that coach, and reserving a slot will remove
  any time slots that overlap with the new session with appropriate locking to ensure 2 students can’t take overlapping
  time.
- I have also chosen to keep the logic for if a time slot is valid and not overlapping inside the action to create time
  slots. This allows us to change the logic for overlapping rules fairly easily during actions, while the data in the
  db can support either way.
- The system is not real-time in that students don’t see updates to new timeslots or reservations as they happen. So
  the validations tell students the “already taken” errors, but a much better UX would just remove or note as
  “already reserved” for timeslots that get used up.
- Some concurrency concerns:
  - What happens when 2 students reserve at the same time? (handled in action, see code)
    Unfortunately this is really hard to test, even a a then b, because useSWR is such a great framework it actually knows
    to refresh all api calls when you gain focus on the window. So tabbing between windows still won't trigger this.
  - There is a potential race condition that can occur if 2 coaches try to create the same exact timeslot at the same
    time. I haven't fully thought through how to solve this, but its just a bit of smart critical section and locking
    in the action, that will just take too long to implement for this exercise.
- Didn't have time to write unit tests, but you should be able to see that the models are fairly simple and easy to test
  and actions are plain ol' ruby objects, so should be trivial to throw into a testing framework and get through all
  scenarios without having to go through testing the lifecycles of the API requests or any of the boilerplate there.
- From a product standpoint, I have not handled repeating timeslots. I know usually these are desirable but due to time
  constraints and because I didn't think to ask about it during the initial call, I have chosen not to include that work.

## Architectural notes

The starting point for this is base rails, using graphiti as the API serialization resource strategy 
(see https://jsonapi.org/ for the specification), and spraypaint as the API framework for the front-end. On top of this
I built a very simple form (a.k.a. mutator) framework.

I also didn't go for 100% test coverage to save time, but handled the critical scenarios mainly around data integrity
and form operations where things could go wrong.

### Backend

The general architecture is using [json-api](https://jsonapi.org/) along with [graphiti](https://www.graphiti.dev)
which handles the api -> frontend communication protocol. The front-end uses the spraypaint framework provided by
graphiti.

The general approach I do here is:

- standard resources for data pulls, and relationship graphs
- form resources for all actions, including form submission (mutations in graphql).

This may seem a bit overkill for such a simple problem, but I wanted to show off a bit of architecting. The approach
really shines when forms have more than just a simple object CRUD. The more complex the form, the easier it is to deal
with a form object that takes all the data in and creates appropriate mutations (with tests) as compared to invoking
multiple REST endpoints for mutations and hoping it all lines up. This creates a very well tested and easy to reason
about back-end, and removes lots of database knowledge from the front-end for form prepopulation.

With this approach, a form can create (no id given), update (an id is given of the top level object), and get/hydrate
(provide the id during a get operation on the form, to for example fill out an edit form with correct data in the
expected structure). While graphiti does give the concept of "side-posting" to allow one form submission to create a
complex relationship graph, I feel that it puts too much knowledge into the front-end about how to correctly submit
forms. The form pattern keeps the front-end really dumb, which makes it much easier to manage long-term.

This also makes testing really simple. Since the form is just a plain ol' ruby object with a few helper methods, we can
trivially test it. Resource testing can be really simple since most of the logic will already be tested in the form/action
objects.

Regarding actions, I feel that sticking with the form pattern for simple actions still has benefits because it keeps the
overall architecture consistent and each action can easily be extended with more attributes later if necessary, or
adding actions that may be the same models but executed in different contexts (such as admin actions).

The scaffolding I use is here https://github.com/dlikhten/interview-scaffolding so you can see what I actually built for
this interview, vs what was just scaffolding + a mini-framework I built some time ago for a project of mine.

### Frontend

The general architecture is

- next.js (react, typescript)
- spraypaint (api communication management)
- useSWR (data request framework, it is amazing)
- tailwindcss (I personally really like this for managing css in react)
- formik for form management (again a really great framework to keep forms simple)
- dayjs for date/timezone processing



