"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScaleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_scale_dto_1 = require("./create-scale.dto");
class UpdateScaleDto extends (0, mapped_types_1.PartialType)(create_scale_dto_1.CreateScaleDto) {
}
exports.UpdateScaleDto = UpdateScaleDto;
//# sourceMappingURL=update-scale.dto.js.map