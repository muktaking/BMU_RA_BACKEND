export declare abstract class BasePublicationDto {
    title: string;
    description: string;
    publication_link: string | undefined;
    server_link: string | undefined;
    published_year: Date | undefined;
    publisher: string | undefined;
    tags: Array<string>;
}
export declare abstract class PublicationDto extends BasePublicationDto {
    author_id: Array<number>;
    author_name: Array<string>;
}
export declare class CreateArticleDto extends PublicationDto {
    doi: string | undefined;
}
