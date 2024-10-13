"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteWebtoon = exports.handleCreateWebtoon = exports.handleGetWebtoon = exports.handleGetWebtoons = void 0;
const DbManager_1 = require("../../utils/DbManager");
const prisma = DbManager_1.DbManager.getInstance().getClient();
const handleGetWebtoons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page, take } = req.query;
        const p = page ? Number.parseInt(page === null || page === void 0 ? void 0 : page.toString()) : 1;
        const t = take ? Number.parseInt(take === null || take === void 0 ? void 0 : take.toString()) : 10;
        const webtoons = yield prisma.webtoon.findMany({
            skip: (p - 1) * t,
            take: t
        });
        return res.status(200).json({
            "webtoons": webtoons
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "msg": "Internal Server Error" });
    }
});
exports.handleGetWebtoons = handleGetWebtoons;
const handleGetWebtoon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({
                "msg": "Id not found"
            });
        }
        const webtoon = yield prisma.webtoon.findFirst({
            where: {
                id
            }
        });
        if (!webtoon) {
            return res.status(400).json({
                "msg": "No webtoon Found",
                "webtoon": null
            });
        }
        return res.status(200).json({
            "webtoon": webtoon
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "msg": "Internal Server Error" });
    }
});
exports.handleGetWebtoon = handleGetWebtoon;
const handleCreateWebtoon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, content, images } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                "msg": "All fields not provided"
            });
        }
        if (!req.body.user.role.includes("ADMIN")) {
            res.status(403).json({
                "msg": "unauthorised"
            });
        }
        yield prisma.webtoon.create({
            data: {
                title,
                content,
                images,
                published: true,
                author: {
                    connect: {
                        id: req.body.user.id
                    }
                }
            }
        });
        res.status(200).json({
            "msg": "Created Successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "msg": "Internal Server Error" });
    }
});
exports.handleCreateWebtoon = handleCreateWebtoon;
const handleDeleteWebtoon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({
                "msg": "Id not Found"
            });
        }
        if (!req.body.user.role.includes("ADMIN")) {
            res.status(403).json({
                "msg": "unauthorised"
            });
        }
        let existingwebtoon = yield prisma.webtoon.findFirst({
            where: {
                id: id
            }
        });
        if (!existingwebtoon) {
            return res.status(400).json({
                "msg": "Webtoon not found"
            });
        }
        yield prisma.webtoon.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            "msg": "Deleted Successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "msg": "Internal Server Error" });
    }
});
exports.handleDeleteWebtoon = handleDeleteWebtoon;
