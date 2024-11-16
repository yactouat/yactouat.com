"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponseInfra {
    constructor(msg, data = null) {
        this.data = data;
        this.msg = msg;
    }
}
exports.default = ApiResponseInfra;
