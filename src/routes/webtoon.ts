
import express from "express"

import { AuthMiddleware } from "../middleware/authmiddleware"
import { handleCreateWebtoon, handleDeleteWebtoon, handleGetWebtoon, handleGetWebtoons } from "../handlers/v1/webtoon"
const router = express.Router()

router.get("/", handleGetWebtoons)
router.post("/", AuthMiddleware, handleCreateWebtoon)
router.get("/:id", handleGetWebtoon )
router.delete("/:id",AuthMiddleware, handleDeleteWebtoon )


module.exports = router