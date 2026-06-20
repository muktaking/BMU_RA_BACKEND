"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = to;
function to(promise) {
    return promise
        .then((data) => [null, data])
        .catch((err) => [err, undefined]);
}
//# sourceMappingURL=utils.js.map