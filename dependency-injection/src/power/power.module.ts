import { Module } from "@nestjs/common";
import { PowerService } from "./power.service";

@Module({
    providers: [PowerService],
    // make this class available
    // to other modules
    exports: [PowerService],
})
export class PowerModule {}
