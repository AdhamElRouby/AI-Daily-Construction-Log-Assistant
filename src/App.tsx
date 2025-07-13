import { Container } from "@mui/material"
import Form from "./components/Form"
import Summary from "./components/Summary"

function App() {

  return (
    <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
      <Form />
      <Summary />
    </Container>
  )
}

export default App
