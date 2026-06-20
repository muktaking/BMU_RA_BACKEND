import { SocialProfileBase } from '@/users/social-profile.entity';
import { Profile } from '@/users/user.entity';
export declare class Researcher extends Profile {
    id: string;
    publication: string;
    awards: string;
    int_affiliation: string;
    editor_in_Journal: string;
    socialProfiles: SocialProfileResearcher[];
}
export declare class SocialProfileResearcher extends SocialProfileBase {
    researcher: Researcher;
}
