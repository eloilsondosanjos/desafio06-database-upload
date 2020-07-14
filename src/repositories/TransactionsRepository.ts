import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce(
      (totalIncome, { type, value }) =>
        type === 'income' ? totalIncome + Number(value) : totalIncome,
      0,
    );

    const outcome = transactions.reduce(
      (totalOutcome, { value, type }) =>
        type === 'outcome' ? totalOutcome + Number(value) : totalOutcome,
      0,
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
