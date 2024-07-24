/* Schema for workouts DB */

CREATE TABLE workouts
(
    id SERIAL PRIMARY KEY,
    session_id INT,
    exercise varchar(255),
    weight varchar(255),
    sets varchar(255),
    reps varchar(255)
    FOREIGN KEY (session_id) REFERENCES archive(id) ON DELETE CASCADE
);

CREATE TABLE archive
(
    id SERIAL PRIMARY KEY,
    date DATE,
    workouts JSONB
);