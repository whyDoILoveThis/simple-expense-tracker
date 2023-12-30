// src/components/Income.js

import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

const Income = ({ onChange }) => {
  return (
    <Box>
      <Text fontSize="xl">Income</Text>
      <Input placeholder="Enter your income 💳💰🤑" onChange={onChange} />
    </Box>
  );
};

export default Income;
