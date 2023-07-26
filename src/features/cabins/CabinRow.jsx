import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styled from "styled-components";
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers.js";
import { deleteCabin } from "../../services/apiCabins.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin.js";

// v1
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  background: #fff;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  max-width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
  border: 1px solid var(--color-grey-200);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonGroup = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow>
        <Img src={cabin.image} alt={cabin.name} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>
          {cabin.discount ? (
            formatCurrency(cabin.discount)
          ) : (
            <span>&mdash;</span>
          )}
        </Discount>
        <ButtonGroup>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            <HiOutlinePencil />
            <p>{showForm}</p>
          </button>
          <button disabled={isDeleting} onClick={() => deleteCabin(cabin.id)}>
            <HiOutlineTrash />
          </button>
          <button>
            <HiOutlineClipboardDocument />
          </button>
        </ButtonGroup>
      </TableRow>
      {showForm && <CreateCabinForm cabinToUpdate={cabin} />}
    </>
  );
}

export default CabinRow;
