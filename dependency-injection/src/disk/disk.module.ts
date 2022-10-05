import { Module } from "@nestjs/common";
import { PowerModule } from "src/power/power.module";
import { DiskService } from "./disk.service";

@Module({
    // importing power module (exported from power.module.ts)
    imports: [PowerModule],
    providers: [DiskService],
    exports: [DiskService],
})
export class DiskModule {}
