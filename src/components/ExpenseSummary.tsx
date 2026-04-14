import React from 'react';
import { Expense, Category } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
  categories: Category[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses, categories }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category.name);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
      ...category,
      total,
      count: categoryExpenses.length,
    };
  }).filter(category => category.total > 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense Summary</h2>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-blue-600">
          {formatAmount(totalExpenses)}
        </div>
        <div className="text-gray-500">Total Expenses</div>
      </div>

      {expensesByCategory.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700">By Category</h3>
          <div className="space-y-3">
            {expensesByCategory.map((category) => {
              const percentage = totalExpenses > 0 ? (category.total / totalExpenses) * 100 : 0;
              
              return (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count} items)</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {formatAmount(category.total)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;