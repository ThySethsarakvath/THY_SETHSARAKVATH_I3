import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ReceiptsService } from './receipts.service';
import { ReceiptType } from './types/receipt.type';

@Resolver(() => ReceiptType) // 👈 Use the Type class instead of a string
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query(() => [ReceiptType], { name: 'receipts' }) // 👈 Explicit return type function
  async getReceipts() {
    return this.receiptsService.findAll();
  }

  @Query(() => ReceiptType, { name: 'receipt' })
  async getReceipt(@Args('receiptId', { type: () => ID }) receiptId: string) {
    return this.receiptsService.findOne(receiptId);
  }

  @Mutation(() => ReceiptType)
  async createReceipt(
    @Args('issuedAt') issuedAt: string,
    @Args('name') name: string,
    @Args('price') price: number,
  ) {
    return this.receiptsService.create({ issuedAt, name, price });
  }

  @Mutation(() => Boolean) // 👈 Boolean return type
  async deleteReceipt(
    @Args('receiptId', { type: () => ID }) receiptId: string,
  ) {
    await this.receiptsService.remove(receiptId);
    return true;
  }
}
