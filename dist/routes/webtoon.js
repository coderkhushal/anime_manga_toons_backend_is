"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../middleware/authmiddleware");
const webtoon_1 = require("../handlers/v1/webtoon");
const router = express_1.default.Router();
router.get("/", webtoon_1.handleGetWebtoons);
router.post("/", authmiddleware_1.AuthMiddleware, webtoon_1.handleCreateWebtoon);
router.get("/:id", webtoon_1.handleGetWebtoon);
router.delete("/:id", authmiddleware_1.AuthMiddleware, webtoon_1.handleDeleteWebtoon);
module.exports = router;
