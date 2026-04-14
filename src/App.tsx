import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm.tsx';
import ExpenseList from './components/ExpenseList.tsx';
import ExpenseSummary from './components/ExpenseSummary.tsx';
import { Expense, Category } from './types';

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#EF4444' },
  { id: '2', name: 'Transportation', color: '#3B82F6' },
  { id: '3', name: 'Shopping', color: '#10B981' },
  { id: '4', name: 'Entertainment', color: '#F59E0B' },
  { id: '5', name: 'Bills & Utilities', color: '#8B5CF6' },
  { id: '6', name: 'Healthcare', color: '#EC4899' },
  { id: '7', name: 'Education', color: '#06B6D4' },
  { id: '8', name: 'Other', color: '#6B7280' },
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories] = useState<Category[]>(defaultCategories);

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Track your expenses and manage your budget
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <ExpenseSummary expenses={expenses} categories={categories} />
          
          <ExpenseForm onAddExpense={addExpense} categories={categories} />
          
          <ExpenseList 
            expenses={expenses} 
            categories={categories} 
            onDeleteExpense={deleteExpense} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;