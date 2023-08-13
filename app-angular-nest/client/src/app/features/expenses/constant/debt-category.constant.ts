import {EExpenseCategory} from "../enum/expense-category.enum";

export class DebtConstant {
  public static readonly LIST_DEBT: any = ['Lend', 'Borrow', 'Repayment', 'Debt Collection']
  public static readonly DATA: any = [
    {
      name: "Lend",
      titleI18n: "expenses.debtCategory.lend",
      type: EExpenseCategory.EXPENSE
    },
    {
      name: "Repayment",
      titleI18n: "expenses.debtCategory.repayment",
      type: EExpenseCategory.EXPENSE
    },
    {
      name: "Borrow",
      titleI18n: "expenses.debtCategory.borrow",
      type: EExpenseCategory.INCOME
    },
    {
      name: "Debt Collection",
      titleI18n: "expenses.debtCategory.debtCollection",
      type: EExpenseCategory.INCOME
    }
  ];
}
