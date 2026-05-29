import { Researcher } from 'src/researchers/researcher.entity';
import { BaseEntity } from 'typeorm';
export declare abstract class BasePublication extends BaseEntity {
    id: number;
    title: string;
    description: string;
    publication_link: string;
    server_link: string;
    published_year: string;
    publisher: string;
    tags: string[];
}
export declare abstract class Publication extends BasePublication {
    author_id: number[];
    author_name: string[];
    authors: Researcher[];
}
export declare class Article extends Publication {
    doi: string;
    generateDOI(): void;
}
