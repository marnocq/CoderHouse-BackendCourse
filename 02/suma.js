"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    Suma.prototype.getResult = function () {
        return this.num1 + this.num2;
    };
    return Suma;
}());
exports.Suma = Suma;
