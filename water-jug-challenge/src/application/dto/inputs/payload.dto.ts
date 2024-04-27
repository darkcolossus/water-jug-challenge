import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class PayloadDTO {
    @ApiProperty({ description: 'X capacity'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    x_capacity: number;


    @ApiProperty({ description: 'Y capacity'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    y_capacity: number;

    @ApiProperty({ description: 'Z amount wanted'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    z_amount_wanted: number;
}