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
exports.deleteUserController = exports.updateUserController = exports.getAllUserController = exports.addUserController = void 0;
const userCollection_1 = require("../repository/userCollection");
const uuid_1 = require("uuid");
const addUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const id = (0, uuid_1.v4)();
        yield (0, userCollection_1.addUserData)(id, data);
        res.status(200).json({ message: "Create user data successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addUserController = addUserController;
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield (0, userCollection_1.fetchUserData)());
    if (!user || user.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user);
});
exports.getAllUserController = getAllUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, data } = req.body;
        yield (0, userCollection_1.updateUserData)(id, data);
        res.status(200).json({ message: "Update user data successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, userCollection_1.deleteUserData)(id);
        res.status(200).json({ message: "Delete user data successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUserController = deleteUserController;
