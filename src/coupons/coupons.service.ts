import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {

  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  async findAll() {
    const coupons = await this.couponRepository.find();

    if (!coupons) {
      return {message: 'No coupons found'};
    }

    return coupons;
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOne({
      where: {couponId: id}
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon #${id} not found`);
    }

    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id);

    if (!coupon) {
      throw new NotFoundException(`Coupon #${id} not found`);
    }

    Object.assign(coupon, updateCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.couponRepository.findOne({
      where: {couponId: id}
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon #${id} not found`);
    }

    await this.couponRepository.remove(coupon);

    return `This action removes a #${id} coupon`;
  }

  async applyCoupon(coupon_name: string) {
    const coupon = await this.couponRepository.findOneBy({name: coupon_name});
    if(!coupon){
      throw new NotFoundException(`Coupon ${coupon_name} not found`);
    }

    const currentDate = new Date();
    const experitationDate = endOfDay(coupon.expirationDate);

    if(isAfter(currentDate, experitationDate)){
      throw new UnprocessableEntityException('Coupon has expired');
    }

    return {
      message: 'Coupon applied successfully',
      ...coupon
    }

  }
}
