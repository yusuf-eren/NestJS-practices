import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private repo: Repository<Report>,
    ) {}

    async create(reportDto: CreateReportDto, user: User) {
        const report = await this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        console.log(report)
        if (!report) throw new NotFoundException("report not found");

        report.approved = approved;
        return this.repo.save(report);
    }
}
