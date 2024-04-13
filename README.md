# Dmitriy Likhten's interview challenge submission for ...

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
- form resources for all actions, including form submission.

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

### Frontend

The general architecture is

- next.js (react, typescript)
- spraypaint (api communication management)
- useSWR (data request framework, it is amazing)
- tailwindcss (I personally really like this for managing css in react)
- formik for form management (again a really great framework to keep forms simple)
- dayjs for date/timezone processing
