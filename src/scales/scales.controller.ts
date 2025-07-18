import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
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

@Controller('scales')
export class ScalesController {
  constructor(private scalesService: ScalesService) {}

  @Get()
  async getAllScales() {
    return await this.scalesService.findAllScales();
  }

  // @Get('author/:id')
  // async getAllScalesByAuthorId(@Param('id', ParseIntPipe) id: number) {
  //   return await this.scalesService.findAllScalesByAuthorId(id);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.member)
  @UsePipes(ValidationPipe)
  async createAnScale(@Body() createScaleDto: CreateScaleDto) {
    return await this.scalesService.createAnScale(createScaleDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateAnScaleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScaleDto: UpdateScaleDto,
  ) {
    return await this.scalesService.updateAScaleById(id, updateScaleDto);
  }

  @Delete(':id')
  async deleteAScaleById(@Param('id', ParseIntPipe) id: number) {
    return await this.scalesService.deleteAScaleById(id);
  }
}
