import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class PayloadDTO {
    @ApiProperty({ description: 'X capacity'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    x_capacity: number;


    @ApiProperty({ description: 'Y capacity'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    y_capacity: number;

    @ApiProperty({ description: 'Z amount wanted'})
    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    z_amount_wanted: number;
}