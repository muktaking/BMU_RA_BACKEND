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
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/roles.decorator';
import { RolePermitted } from 'src/users/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  csvFileFilter,
  editFileName,
  pdfFileFilter,
} from 'src/utils/files-uploading.utils';

@Controller('scales')
export class ScalesController {
  constructor(private scalesService: ScalesService) {}

  @Get(':id')
  async getArticleByid(@Param('id', ParseIntPipe) id: number) {
    return await this.scalesService.findArticleById(id);
  }

  @Get()
  async getAllScales(@Query('limit', ParseIntPipe) limit: number) {
    return await this.scalesService.findAllScales(limit);
  }

  // @Get('author/:id')
  // async getAllScalesByAuthorId(@Param('id', ParseIntPipe) id: number) {
  //   return await this.scalesService.findAllScalesByAuthorId(id);
  // }

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
  async createScalesByUploadByCSV(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.scalesService.createScalesByUploadByCSV(res, file);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.researcher)
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
      req.file.path,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.researcher)
  @UsePipes(ValidationPipe)
  async updateAnScaleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScaleDto: UpdateScaleDto,
  ) {
    return await this.scalesService.updateAScaleById(id, updateScaleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.researcher)
  async deleteAScaleById(@Param('id', ParseIntPipe) id: number) {
    return await this.scalesService.deleteAScaleById(id);
  }
}
