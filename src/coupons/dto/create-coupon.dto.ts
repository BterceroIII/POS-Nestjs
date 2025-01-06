import { IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator"

export class CreateCouponDto {

    @IsNotEmpty({message: 'Coupon name is required'})
    name: string


    @IsNotEmpty({message: 'Coupon percentage is required'})
    @IsInt({message: 'Coupon percentage must be an integer'})
    @Max(100, {message: 'Coupon percentage must be less than or equal to 100'})
    @Min(1, {message: 'Coupon percentage must be greater than or equal to 1'})
    percentage: number
    
    @IsNotEmpty({message: 'Coupon expiration date is required'})
    @IsDateString({},{message: 'Coupon expiratison date must be a valid date string'})
    expirationDate: Date
}
