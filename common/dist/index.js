"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Post = exports.Signin = exports.Signup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.Signup = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3),
    name: zod_1.default.string()
});
exports.Signin = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3)
});
exports.Post = zod_1.default.object({
    title: zod_1.default.string(),
    context: zod_1.default.string()
});
exports.Put = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    context: zod_1.default.string()
});
