"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
//app.use(express.json())
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.get("/login", (inRequest, inResponse) => {
    inResponse.json({ message: "Like this shitttt !!" });
});
app.listen(PORT, () => {
    console.log(`Server a correr na porta ${PORT}`);
});
