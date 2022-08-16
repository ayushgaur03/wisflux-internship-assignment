const pgp = require("pg-promise")(/* options */);

export const db = pgp(
  "postgres://postgres_ayush:Ayush037@localhost:5432/wisflux_pizza"
);
