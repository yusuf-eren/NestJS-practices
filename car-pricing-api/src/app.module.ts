import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
// Entities
import { User } from "./users/user.entity";
import { Report } from "./reports/report.entity";

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: "sqlite", // db type
      database: "db.sqlite", // filename
      entities: [User, Report], // entities
      synchronize: true, // *!*
      // This option when set to true,
      // is going to cause typeOrm to take a look
      // at the structure of all your different entities
      // and then automatically update the structure
      // of your database
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
