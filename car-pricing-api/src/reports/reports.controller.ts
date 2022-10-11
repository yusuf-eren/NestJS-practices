import {
    Body,
    Controller,
    Post,
    UseGuards,
    Patch,
    Param,
    Query,
    Get,
} from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import { User } from "../users/user.entity";
import { reportDto } from "./dtos/report-dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { ApprovedReportDto } from "./dtos/approve-report.dto";
import { AdminGuard } from "../guards/admin.guard";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Controller("reports")
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.estimatePrice(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(reportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: string, @Body() body: ApprovedReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
