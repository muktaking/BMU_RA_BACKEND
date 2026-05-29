import { BasePublication } from 'src/articles/article.entity';
import { Researcher } from 'src/researchers/researcher.entity';
export declare class Scale extends BasePublication {
    short_title: string;
    validator_id: number[];
    validator_name: string[];
    validators: Researcher[];
    validation_year: string;
}
