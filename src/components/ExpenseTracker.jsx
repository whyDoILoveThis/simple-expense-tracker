// src/components/ExpenseTracker.js
import React, { useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  flexbox,
} from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi2";
import { useTable } from "react-table";

import Income from "./Income";
import Expenses from "./Expenses";
import "./styles.css";

const ExpenseTracker = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [category, setCategory] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleIncomeChange = (e) => {
    setIncome(Number(e.target.value));
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const holdCurrentExpense = (e) => {
    setCurrentExpense(Number(e.target.value));
  };

  const handleExpenseChange = () => {
    if (expenseName && currentExpense && categoryName) {
      const newExpense = {
        name: expenseName,
        currentExpense,
        category: categoryName,
        id: Date.now(),
      };

      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

      // If the category doesn't exist, add it to the categories array
      if (!category.includes(categoryName)) {
        setCategory((allCateg) => [...allCateg, categoryName]);
      }

      // Clear the input fields
      setExpenseName("");
      setCategoryName("");
    }
  };

  const handleDeleteExpense = (id, category) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );

    // Check if the deleted expense is the last one in its category
    const categoryExpenses = expenses.filter(
      (expense) => expense.name === category
    );
    if (categoryExpenses.length === 1) {
      // Remove the category from the list of categories
      setCategory((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    }
  };

  const handleCategoryClick = (clickedCategory) => {
    setSelectedCategory(clickedCategory);
  };

  const allExpenses = selectedCategory
    ? expenses.filter((expense) => expense.name === selectedCategory)
    : expenses;

  return (
    <Box>
      <Text fontSize="3xl">Expense Tracker</Text>
      <Income onChange={handleIncomeChange} />
      <Expenses name="Expense" onChange={holdCurrentExpense} />
      <Input
        placeholder="Expense Name"
        value={expenseName}
        onChange={handleExpenseNameChange}
        mt={2}
      />
      <Input
        placeholder="Category"
        value={categoryName}
        onChange={handleCategoryNameChange}
        mt={2}
      />
      <Button colorScheme="blue" mt={4} onClick={handleExpenseChange}>
        Submit
      </Button>
      <Text fontSize="xl" mt={4}>
        Total Income: ${income}
      </Text>
      <Text fontSize="xl" mt={4}>
        Total Expenses: $
        {allExpenses
          .reduce((total, expense) => total + expense.currentExpense, 0)
          .toFixed(2)}
      </Text>
      <Box mt={4} display={"flex"} flexWrap={"wrap"} gap={4}>
        {category.map((cat) => (
          <Button
            key={cat}
            colorScheme={selectedCategory === cat ? "teal" : "blue"}
            onClick={() => handleCategoryClick(cat)}
            mr={2}
          >
            {cat}
          </Button>
        ))}
        <Button
          colorScheme={!selectedCategory ? "teal" : "blue"}
          onClick={() => handleCategoryClick(null)}
        >
          View All Expenses
        </Button>
      </Box>
      <Table mt={4} variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Expense</Th>
            <Th>Amount</Th>
            <Th>Percentage of Income</Th>
            <Th color="red">DELETE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allExpenses.map((expense) => (
            <Tr key={expense.id}>
              <Td>{expense.name}</Td>
              <Td>${expense.currentExpense.toFixed(2)}</Td>
              <Td>{((expense.currentExpense / income) * 100).toFixed(2)}%</Td>
              <Td>
                <button
                  className="btn--trash"
                  onClick={() => handleDeleteExpense(expense.id, expense.name)}
                >
                  <HiTrash />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpenseTracker;
