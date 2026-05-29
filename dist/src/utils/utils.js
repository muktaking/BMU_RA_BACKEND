"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = to;
function to(promise) {
    return promise
        .then((data) => {
        return [null, data];
    })
        .catch((err) => [err]);
}
//# sourceMappingURL=utils.js.map