import {
    Body,
    Controller,
    Post,
    UseGuards,
    Patch,
    Param,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { reportDto } from "./dtos/report-dto";
import { Serialize } from "../interceptors/serialize.interceptor";

@Controller("reports")
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(reportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
