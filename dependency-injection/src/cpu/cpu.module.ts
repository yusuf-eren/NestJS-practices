import { Module } from "@nestjs/common";
import { CpuService } from "./cpu.service";
import { PowerModule } from "src/power/power.module";

@Module({
    // importing power module (exported from power.module.ts)
    imports: [PowerModule],
    providers: [CpuService],
})
export class CpuModule {}
