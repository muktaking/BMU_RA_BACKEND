import { SocialProfileBase } from 'src/users/social-profile.entity';
import { Profile } from 'src/users/user.entity';
export declare class Researcher extends Profile {
    publication: string;
    awards: string;
    int_affiliation: string;
    editor_in_Journal: string;
    socialProfiles: SocialProfileResearcher[];
}
export declare class SocialProfileResearcher extends SocialProfileBase {
    researcher: Researcher;
}
