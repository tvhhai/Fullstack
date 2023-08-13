import {EExpenseCategory, EExpenseCategoryLabel} from "../enum/expense-category.enum";

export interface PersonalExpense {
  id: number;
  amount: number;
  date: string;
  note: string;
  expenseCategory: ExpenseCategory;
}

export interface PersonalExpenseRequest {
  id: number;
  amount: number;
  date: string;
  note: string;
  expenseCategory: string;
}

export interface TabExpenseCategory {
  label: EExpenseCategoryLabel,
  items: ExpenseCategory[]
}

export interface TabAction {
  title: string,
  onClick: (item: TabAction) => void,
  active: boolean,
  type: EExpenseCategory
}

export interface ExpenseCategory {
  id: number;
  icon: string,
  name: string,
  type: EExpenseCategory,
  active?: boolean
}

