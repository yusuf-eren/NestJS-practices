import { Module } from "@nestjs/common";
import { CpuService } from "./cpu.service";
import { PowerModule } from "src/power/power.module";

@Module({
    // importing power module (from power.module.ts)
    // *!* everything listed as an exports from PowerModule
    imports: [PowerModule],
    providers: [CpuService],
    // exporting cpu service
    exports: [CpuService],
})
export class CpuModule {}
