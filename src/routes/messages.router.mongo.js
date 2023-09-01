import { Router } from "express";
import { messagesMongo } from "../dao/managers/messages/MessagesMongo.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const messages = await messagesMongo.findAll();
      console.log(messages);
      res.status(200).json({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error); // Log the error
      res.status(500).json({ error });
    }
  });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const message = await messagesMongo.findById(id);
    if (!product) {
      res.status(400).json({ message: "Invalid message ID" });
    } else {
      res.status(200).json({ message: "message found", message });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { message, user } = req.body;
  if (!user || !message) {
    return res.status(200).json({ message: "Some data is missing" });
  }
  try {
    const newMessage = await messagesMongo.createOne(req.body);
    res.status(200).json({ message: "message created", message: newMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.put('/:id', async(req, res) => {
//     try {
//         res.status(200).json({message:})

//     } catch (error) {
//         res.status(500).json({error})
//     }
// })

// router.delete('/:id', async(req, res) => {
//     try {
//         res.status(200).json({message:})

//     } catch (error) {
//         res.status(500).json({error})
//     }
// })

export default router;
