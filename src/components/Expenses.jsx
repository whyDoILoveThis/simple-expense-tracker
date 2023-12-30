// src/components/Expenses.js

import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

const Expenses = ({ onChange, name }) => {
  return (
    <Box>
      <Text fontSize="xl">{name}</Text>
      <Input placeholder={`Enter Expense 💸💸💸💸`} onChange={onChange} />
    </Box>
  );
};

export default Expenses;
