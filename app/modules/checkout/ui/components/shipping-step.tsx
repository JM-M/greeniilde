"use client";

import { AddressesForm } from "./addresses-form";

const ShippingStep = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto w-full max-w-2xl rounded-lg border p-4">
        <AddressesForm />
      </div>
    </div>
  );
};

export default ShippingStep;
