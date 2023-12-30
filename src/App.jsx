// src/App.js

import { Container } from "@chakra-ui/react";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <Container maxW="md" centerContent>
      <ExpenseTracker />
    </Container>
  );
}

export default App;
