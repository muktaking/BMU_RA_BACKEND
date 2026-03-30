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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

@Controller('researchers')
export class ResearchersController {
  constructor(private researchersService: ResearchersService) {}

  @Get()
  async getAllResearchers(@Query('limit', ParseIntPipe) limit: number) {
    return await this.researchersService.findAllResearchersWithLimit(limit);
  }

  @Get(':id')
  async getResearhcerById(@Param('id', ParseIntPipe) id: number) {
    return await this.researchersService.findResearhcerById(id);
  }

  @Get('/institute/:institute_id')
  async getResearhcersByInstituteId(
    @Param('institute_id', ParseIntPipe) institute_Id: number,
  ) {
    return await this.researchersService.findResearhcerByInstituteId(
      institute_Id,
    );
  }

  @Post('/upload/csv')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.moderator)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.moderator)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.moderator)
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResearcherDto: UpdateResearcherDto,
    @Req() req,
  ) {
    return await this.researchersService.updateResearcherById(
      id,
      updateResearcherDto,
      req.file.path,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.coordinator)
  async deleteResearcherById(@Param('id', ParseIntPipe) id: number) {
    return await this.researchersService.deleteResearcherById(id);
  }
}
