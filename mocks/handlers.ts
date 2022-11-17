// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { cryptoCurrenciesListings } from "~/mocks/defaults/cryptoCurrenciesListings";
import { orders } from "~/mocks/defaults/orders";

export const handlers = [
  rest.get("/api/crypto/listings", (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(cryptoCurrenciesListings),
  )),
  rest.get("/api/crypto/orders/young", (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(orders),
  )),
];
