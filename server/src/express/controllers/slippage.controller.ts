import { Router, Request, Response } from "express";
import { SlippageService } from "../services/slippage.service";

export class SlippageController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response) => {
      new SlippageService()
        .listAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    });

    return router;
  }
}
