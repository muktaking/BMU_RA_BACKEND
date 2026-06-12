import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import {
  csvFileFilter,
  editFileName,
  imageFileFilter,
} from 'src/utils/files-uploading.utils';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/roles.decorator';
import { RolePermitted } from 'src/users/user.entity';
import {
  AllowAnonymous,
  Roles,
  Session,
  UserSession,
} from '@thallesp/nestjs-better-auth';

@Controller('researchers')
export class ResearchersController {
  constructor(private researchersService: ResearchersService) {}

  @AllowAnonymous()
  @Get()
  async getAllResearchers(@Query('limit', ParseIntPipe) limit: number) {
    return await this.researchersService.findAllResearchersWithLimit(limit);
  }

  @AllowAnonymous()
  @Get(':id')
  async getResearhcerById(@Param('id') id: string) {
    return await this.researchersService.findResearhcerById(id);
  }

  @AllowAnonymous()
  @Get('/institute/:institute_id')
  async getResearhcersByInstituteId(
    @Param('institute_id', ParseIntPipe) institute_Id: number,
  ) {
    return await this.researchersService.findResearhcerByInstituteId(
      institute_Id,
    );
  }

  @Post('/upload/csv')
  @Roles(['admin', 'coordinator', 'moderator', 'researcher'])
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
  @Roles(['admin', 'coordinator', 'moderator', 'researcher'])
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createResearcher(
    @Body() createResearcherDto: CreateResearcherDto,
    @Req() req,
  ) {
    return await this.researchersService.createResearcher(
      createResearcherDto,
      req.file.path,
    );
  }

  @Patch(':id')
  @Roles(['admin', 'coordinator', 'moderator', 'researcher'])
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateResearcherById(
    @Param('id') id: string,
    @Body() updateResearcherDto: UpdateResearcherDto,
    @Req() req,
  ) {
    return await this.researchersService.updateResearcherById(
      id,
      updateResearcherDto,
      req.file?.path,
    );
  }

  @Delete(':id')
  @Roles(['admin', 'coordinator'])
  async deleteResearcherById(@Param('id', ParseIntPipe) id: number) {
    return await this.researchersService.deleteResearcherById(id);
  }
}
