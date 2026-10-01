# Self-Assessment - Amir

This was a team project with Amir, Olga, Stefan and Tara. I mostly helped on the backend.

## Quality and functionality of my code

The VehicleRental CRUD endpoints I worked on all function, with sensible status codes and
error handling (400 for a bad id, 404 when nothing is found, 400 on failed validation,
and a 500 fallback). The backend tests with Vitest and Supertest cover the success and
error paths for POST, DELETE and PUT. The auth controllers hash passwords with bcrypt and
issue JWTs. It is organised into routes, controllers and models.

## Challenges and how I got past them

- Getting the tests to run cleanly against MongoDB took a few tries. I worked through the
  connection, state cleanup and teardown until the suite passed.
- Keeping the API shape steady so the frontend did not break meant checking in with the
  others before changing field names or responses.

## What I learned

- How to structure an Express and Mongoose API with routes, controllers and models kept
  separate.
- Testing an API end to end with Supertest.
- How JWT and bcrypt auth fit together.

Overall it was a good team effort and everyone pulled their weight.
