import { BasePublicationDto } from 'src/articles/dto/create-article.dto';
export declare class CreateScaleDto extends BasePublicationDto {
    short_title: string;
    validator_id: Array<number>;
    validator_name: Array<string>;
    validation_year: Date | undefined;
}
