// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { cryptoCurrenciesListings } from "~/mocks/defaults/cryptoCurrenciesListings";

export const handlers = [
  rest.get("/api/crypto/listings", (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(cryptoCurrenciesListings),
  )),
];
