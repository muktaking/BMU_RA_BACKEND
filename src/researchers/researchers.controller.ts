import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { csvFileFilter, editFileName } from 'src/utils/files-uploading.utils';

@Controller('researchers')
export class ResearchersController {
  constructor(private researchersService: ResearchersService) {}

  @Get()
  async getAllResearchers() {
    return await this.researchersService.findAllResearchers();
  }

  @Get(':id')
  async getResearhcerById(@Param('id', ParseIntPipe) id: number) {
    return await this.researchersService.findResearhcerById(id);
  }

  @Post('/upload/csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async createResearchersByUploadByCSV(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.researchersService.createResearchersByUploadByCSV(
      res,
      file,
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createResearcher(@Body() createResearcherDto: CreateResearcherDto) {
    return await this.researchersService.createResearcher(createResearcherDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateResearcherById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResearcherDto: UpdateResearcherDto,
  ) {
    return await this.researchersService.updateResearcherById(
      id,
      updateResearcherDto,
    );
  }

  @Delete(':id')
  async deleteResearcherById(@Param('id', ParseIntPipe) id: number) {
    return await this.researchersService.deleteResearcherById(id);
  }
}
