"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const researcher_entity_1 = require("./researcher.entity");
const utils_1 = require("../utils/utils");
const create_researcher_dto_1 = require("./dto/create-researcher.dto");
const typeorm_2 = require("@nestjs/typeorm");
const csv = require("csv-parser");
const fs = require("fs");
let ResearchersService = class ResearchersService {
    researcherRepository;
    constructor(researcherRepository) {
        this.researcherRepository = researcherRepository;
    }
    async findAllResearchersWithLimit(limit) {
        const [err, researchers] = await (0, utils_1.to)(this.researcherRepository.find({ take: limit }));
        if (err)
            throw new common_1.InternalServerErrorException('Researchers Could not be find due to Database server error');
        return researchers;
    }
    async findResearhcerById(id) {
        const [err, researcher] = await (0, utils_1.to)(this.researcherRepository.findOneBy({ id: id }));
        if (err)
            throw new common_1.InternalServerErrorException(`Researcher of ${id} Could not be find due to Database server error`);
        return researcher;
    }
    async findResearhcerByInstituteId(institute_id) {
        console.log(institute_id);
        const [err, researchers] = await (0, utils_1.to)(this.researcherRepository.findBy({ institute: institute_id }));
        if (err)
            throw new common_1.InternalServerErrorException(`Researcheres Could not be find due to Database server error`);
        return researchers;
    }
    async findResearhcerByIds(ids) {
        const [err, researcher] = await (0, utils_1.to)(this.researcherRepository.find({
            where: {
                id: (0, typeorm_1.In)(ids),
            },
        }));
        if (err)
            throw new common_1.InternalServerErrorException(`List of Researchers could not be find due to database server error`);
        return researcher;
    }
    async createResearcher(createResearcherDto, filePath = 'neutral') {
        const researcher = new researcher_entity_1.Researcher();
        researcher.firstname = createResearcherDto.firstname;
        researcher.lastname = createResearcherDto.lastname;
        researcher.username = createResearcherDto.username;
        researcher.email = createResearcherDto.email;
        researcher.gender = createResearcherDto.gender;
        researcher.phone = createResearcherDto.phone;
        researcher.degree = createResearcherDto.degree;
        researcher.institute = createResearcherDto.institute;
        researcher.address = createResearcherDto.address;
        researcher.avatar = filePath;
        researcher.publication = Array.isArray(createResearcherDto.publication)
            ? createResearcherDto.publication?.join(',')
            : createResearcherDto.publication;
        researcher.awards = Array.isArray(createResearcherDto.awards)
            ? createResearcherDto.awards?.join(',')
            : createResearcherDto.awards;
        researcher.int_affiliation = Array.isArray(createResearcherDto.int_affiliation)
            ? createResearcherDto.int_affiliation?.join(',')
            : createResearcherDto.int_affiliation;
        researcher.editor_in_Journal = Array.isArray(createResearcherDto.editor_in_Journal)
            ? createResearcherDto.editor_in_Journal?.join(',')
            : createResearcherDto.editor_in_Journal;
        researcher.socialProfiles = [];
        createResearcherDto.socialProfileResearcher?.forEach((profile) => {
            const sProfile = new researcher_entity_1.SocialProfileResearcher();
            sProfile.platform = profile.platform;
            sProfile.url = profile.profileLink;
            researcher.socialProfiles.push(sProfile);
        });
        const [err, resOnSave] = await (0, utils_1.to)(this.researcherRepository.save(researcher));
        if (err)
            throw new common_1.InternalServerErrorException({
                message: 'Researcher Profile could not be created due to database error. ' +
                    err.message,
            });
        return resOnSave;
    }
    async createResearchersByUploadByCSV(res, file) {
        const results = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            Promise.all(results.map(async (researcherPartialData) => {
                const researcher = new create_researcher_dto_1.CreateResearcherDto();
                researcher.firstname = researcherPartialData.firstname;
                researcher.lastname = researcherPartialData.lastname;
                researcher.username = researcherPartialData.lastname?.toLowerCase();
                researcher.email = researcherPartialData.email;
                researcher.gender = researcherPartialData.gender;
                researcher.phone = researcherPartialData.phone;
                researcher.degree = researcherPartialData.degree;
                researcher.institute = researcherPartialData.institute;
                researcher.address = researcherPartialData.address;
                researcher.awards = researcherPartialData.awards;
                researcher.int_affiliation = researcherPartialData.int_affiliation;
                researcher.editor_in_Journal =
                    researcherPartialData.editor_in_Journal;
                researcher.socialProfileResearcher = [];
                const socialProfiles = Object.entries(researcher).filter(([key]) => key.startsWith('sp_'));
                socialProfiles.forEach((socialProfile) => {
                    const newProfile = new create_researcher_dto_1.SocialProfileResearcherDto();
                    newProfile.platform = socialProfile[0].split('_')[1];
                    newProfile.profileLink = socialProfile[1];
                    researcher.socialProfileResearcher.push(newProfile);
                });
                await this.createResearcher(researcher);
            }))
                .then((response) => {
                res.json({ message: 'Successfully Uploaded Users' });
            })
                .catch((error) => {
                res.status(common_1.HttpStatus.CONFLICT).json({ message: error.message });
            });
        });
    }
    async updateResearcherById(id, updateResearcherDto, filePath) {
        const [err, [researcher]] = await (0, utils_1.to)(this.researcherRepository.findBy({ id: id }));
        if (err)
            throw new common_1.InternalServerErrorException(err.message);
        if (filePath !== '') {
            researcher.avatar = filePath;
        }
        if (updateResearcherDto.socialProfileResearcher) {
            if (researcher.socialProfiles?.length < 1)
                researcher.socialProfiles = [];
            updateResearcherDto.socialProfileResearcher?.forEach((sProfile) => {
                const editedProfiles = researcher?.socialProfiles?.find((uProfile) => uProfile.platform === sProfile.platform);
                if (editedProfiles)
                    editedProfiles.url = sProfile.profileLink;
                if (!editedProfiles) {
                    const newProfile = new researcher_entity_1.SocialProfileResearcher();
                    newProfile.platform = sProfile.platform;
                    newProfile.url = sProfile.profileLink;
                    researcher.socialProfiles.push(newProfile);
                }
            });
            delete updateResearcherDto.socialProfileResearcher;
        }
        Object.assign(researcher, {
            ...updateResearcherDto,
            publication: updateResearcherDto.publication,
            awards: updateResearcherDto.awards,
            int_affiliation: updateResearcherDto.int_affiliation,
            editor_in_Journal: updateResearcherDto.editor_in_Journal,
        });
        const [errOnUpdate, resOnUpdate] = await (0, utils_1.to)(this.researcherRepository.save(researcher));
        if (errOnUpdate)
            throw new common_1.InternalServerErrorException(errOnUpdate.message);
        return { message: 'Researcher data edited successfully' };
    }
    async deleteResearcherById(id) {
        const [errOnDelete, resOnDelete] = await (0, utils_1.to)(this.researcherRepository.delete(id));
        if (errOnDelete)
            throw new common_1.InternalServerErrorException(errOnDelete.message);
        return { message: `Researcher deleted successfully.`, data: resOnDelete };
    }
};
exports.ResearchersService = ResearchersService;
exports.ResearchersService = ResearchersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(researcher_entity_1.Researcher)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ResearchersService);
//# sourceMappingURL=researchers.service.js.map