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
import { ScalesService } from './scales.service';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@/roles.guard';
import { Role } from '@/roles.decorator';
import { RolePermitted } from '@/users/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  csvFileFilter,
  editFileName,
  pdfFileFilter,
} from '@/utils/files-uploading.utils';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('scales')
export class ScalesController {
  constructor(private scalesService: ScalesService) {}

  @AllowAnonymous()
  @Get(':id')
  async getArticleByid(@Param('id', ParseIntPipe) id: number) {
    return await this.scalesService.findArticleById(id);
  }

  @AllowAnonymous()
  @Get()
  async getAllScales(@Query('limit', ParseIntPipe) limit: number) {
    return await this.scalesService.findAllScales(limit);
  }

  // @Get('author/:id')
  // async getAllScalesByAuthorId(@Param('id', ParseIntPipe) id: number) {
  //   return await this.scalesService.findAllScalesByAuthorId(id);
  // }

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
  async createScalesByUploadByCSV(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.scalesService.createScalesByUploadByCSV(res, file);
  }

  @Post()
  @Roles(['admin', 'coordinator', 'moderator', 'researcher'])
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('pdf_file', {
      storage: diskStorage({
        destination: './uploads/scales',
        filename: editFileName,
      }),
      fileFilter: pdfFileFilter,
    }),
  )
  async createAnScale(@Body() createScaleDto: CreateScaleDto, @Req() req) {
    return await this.scalesService.createAnScale(
      createScaleDto,
      req?.file?.path,
    );
  }

  @Patch(':id')
  @Roles(['admin', 'coordinator', 'moderator', 'researcher'])
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('pdf_file', {
      storage: diskStorage({
        destination: './uploads/scales',
        filename: editFileName,
      }),
      fileFilter: pdfFileFilter,
    }),
  )
  async updateAnScaleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScaleDto: UpdateScaleDto,
    @Req() req,
  ) {
    return await this.scalesService.updateAScaleById(
      id,
      updateScaleDto,
      req.file?.path,
    );
  }

  @Delete(':id')
  @Roles(['admin', 'coordinator'])
  async deleteAScaleById(@Param('id', ParseIntPipe) id: number) {
    return await this.scalesService.deleteAScaleById(id);
  }
}
