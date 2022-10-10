import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class reportDto {
    @Expose()
    make: string;
    @Expose()
    approved: boolean;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    mileage: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    price: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;
}
