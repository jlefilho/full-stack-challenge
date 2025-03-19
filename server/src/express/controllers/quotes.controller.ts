import { Router, Request, Response } from "express";
import { QuoteService } from "../services/quote/quote.service";

export class QuotesController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response) => {
      new QuoteService()
        .listAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    });

    return router;
  }
}
