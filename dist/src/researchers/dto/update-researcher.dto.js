"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResearcherDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_researcher_dto_1 = require("./create-researcher.dto");
class UpdateResearcherDto extends (0, mapped_types_1.PartialType)(create_researcher_dto_1.CreateResearcherDto) {
}
exports.UpdateResearcherDto = UpdateResearcherDto;
//# sourceMappingURL=update-researcher.dto.js.map