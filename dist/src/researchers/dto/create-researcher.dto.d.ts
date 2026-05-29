import { ProfileDto } from 'src/users/dto/create-user.dto';
export declare class CreateResearcherDto extends ProfileDto {
    publication: Array<string>;
    awards: Array<string>;
    int_affiliation: Array<string>;
    editor_in_Journal: Array<string>;
    socialProfileResearcher: SocialProfileResearcherDto[];
}
export declare class SocialProfileResearcherDto {
    platform: string;
    profileLink: string;
}
