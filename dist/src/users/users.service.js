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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const utils_1 = require("../utils/utils");
const social_profile_entity_1 = require("./social-profile.entity");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUserByEmail(email) {
        const [err, user] = await (0, utils_1.to)(this.userRepository.findBy({ email: email }));
        if (err)
            throw new common_1.InternalServerErrorException('User data could not be retrived due to server error.');
        return user[0];
    }
    async createUser(createUser) {
        const user = new user_entity_1.User();
        user.firstname = createUser.firstname;
        user.lastname = createUser.lastname;
        user.username = createUser.username;
        user.avatar = 'neutral';
        user.email = createUser.email;
        user.gender = createUser.gender;
        user.phone = createUser.phone;
        user.degree = createUser.degree;
        user.institute = createUser.institute;
        user.address = createUser.address;
        user.role = 1;
        user.socialProfiles = [];
        try {
            createUser.socialProfile?.forEach((profile) => {
                const sProfile = new social_profile_entity_1.SocialProfile();
                sProfile.platform = profile.platform;
                sProfile.url = profile.profileLink;
                user.socialProfiles.push(sProfile);
            });
            const salt = await (0, bcryptjs_1.genSalt)(10);
            user.password = await (0, bcryptjs_1.hash)(createUser.password, salt);
            const userEntryRes = await this.userRepository.save(user);
            return userEntryRes;
        }
        catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException(`'${user.email}' is already exist.`, common_1.HttpStatus.CONFLICT);
            }
            else
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, updateUserDto) {
        const [err, [user]] = await (0, utils_1.to)(this.userRepository.findBy({ id: id }));
        if (err)
            throw new common_1.InternalServerErrorException(err.message);
        if (updateUserDto.socialProfile) {
            if (user.socialProfiles?.length < 1)
                user.socialProfiles = [];
            updateUserDto.socialProfile?.forEach((sProfile) => {
                const editedProfiles = user?.socialProfiles?.find((uProfile) => uProfile.platform === sProfile.platform);
                if (editedProfiles)
                    editedProfiles.url = sProfile.profileLink;
                if (!editedProfiles) {
                    const newProfile = new social_profile_entity_1.SocialProfile();
                    newProfile.platform = sProfile.platform;
                    newProfile.url = sProfile.profileLink;
                    user.socialProfiles.push(newProfile);
                }
            });
            delete updateUserDto.socialProfile;
        }
        Object.assign(user, updateUserDto);
        const [errOnUpdate, resOnUpdate] = await (0, utils_1.to)(this.userRepository.save(user));
        if (errOnUpdate)
            throw new common_1.InternalServerErrorException(errOnUpdate.message);
        return { message: 'User data edited successfully' };
    }
    async deleteUser(id) {
        const [errOnDelete, resOnDelete] = await (0, utils_1.to)(this.userRepository.delete(id));
        if (errOnDelete)
            throw new common_1.InternalServerErrorException(errOnDelete.message);
        return { message: `User deleted successfully.`, data: resOnDelete };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map