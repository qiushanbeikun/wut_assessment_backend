const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/contacts/:id", handlerWrapper(async (req) => {
  return controller.findById(req.params.id);
}));

router.get("/contacts", handlerWrapper(async (req) => {
  return controller.search(req.query.text);
}));

router.post("/contacts", handlerWrapper(async (req) => {
  return controller.create(req.body)
}))

router.put("/contacts/:id", handlerWrapper(async (req) => {
  return  controller.update(req.body);
}))

router.delete("/contacts/:id", handlerWrapper(async (req) => {
  const result = await controller.remove(req.params.id);
  return {message: result ? `Deleted contact of id: ${req.params.id}` : `Nothing to delete for id: ${req.params.id}`};
}));

function handlerWrapper(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'The server encountered an unexpected error.' });
    }
  }
}

module.exports = router;