import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../users/user.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

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
        console.log(report);
        if (!report) throw new NotFoundException("report not found");

        report.approved = approved;
        return this.repo.save(report);
    }

    async estimatePrice({
        make,
        model,
        lng,
        lat,
        mileage,
        year,
    }: GetEstimateDto) {
        return await this.repo
            .createQueryBuilder()
            .select("*")
            .where("make = :make", { make })
            .andWhere("model = :model", { model })
            .andWhere("lng - :lng BETWEEN -5 and 5", { lng })
            .andWhere("lat - :lat BETWEEN -5 and 5", { lat })
            .andWhere("year - :year BETWEEN -3 and 3", { year })
            .orderBy("mileage - :mileage")
            .setParameters({ mileage })
            .limit(3)
            .getRawMany();
    }
}
