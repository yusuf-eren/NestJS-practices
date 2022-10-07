import { IsEmail, IsString, IsOptional } from "class-validator";

// IsOptional is checks value if it is missing
// and if so, ignores all validators
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
