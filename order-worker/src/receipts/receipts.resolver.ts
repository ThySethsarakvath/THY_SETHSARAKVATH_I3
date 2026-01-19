import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptsService } from './receipts.service';
import { Receipt } from 'src/database/entities/receipts.entity';

@Resolver('Receipt')
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query('receipts')
  async getReceipts(): Promise<Receipt[]> {
    return this.receiptsService.findAll();
  }

  @Query('receipt')
  async getReceipt(@Args('receiptId') receiptId: string): Promise<Receipt> {
    return this.receiptsService.findOne(receiptId);
  }

  @Mutation('createReceipt')
  async createReceipt(
    @Args('issuedAt') issuedAt: string,
    @Args('name') name: string,
    @Args('price') price: number,
  ): Promise<Receipt> {
    return this.receiptsService.create({ issuedAt, name, price });
  }

  @Mutation('updateReceipt')
  async updateReceipt(
    @Args('receiptId') receiptId: string,
    @Args('issuedAt') issuedAt?: string,
    @Args('name') name?: string,
    @Args('price') price?: number,
  ): Promise<Receipt> {
    return this.receiptsService.update(receiptId, { issuedAt, name, price });
  }

  @Mutation('deleteReceipt')
  async deleteReceipt(@Args('receiptId') receiptId: string): Promise<boolean> {
    await this.receiptsService.remove(receiptId);
    return true;
  }
}
