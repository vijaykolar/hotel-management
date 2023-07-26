import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
import Button from "../ui/Button.jsx";
import { useState } from "react";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <CabinTable />
      <Button
        variation={showForm ? "secondary" : "primary"}
        onClick={() => setShowForm((showForm) => !showForm)}
      >
        {showForm ? "Cancel" : "Add new cabin"}
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
