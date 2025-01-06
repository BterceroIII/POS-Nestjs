import { IsNotEmpty } from "class-validator";

export class ApplyCouponDto{

    @IsNotEmpty({message: 'Coupon code is required'})
    coupon_name: string;
}