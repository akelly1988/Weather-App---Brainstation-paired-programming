import React from "react";
import "./Currency.scss";

function Currency({ currency, gbp }) {
  return (
    <div>
      1 GBP = {(currency.value / gbp).toFixed(2)} {currency.code}
    </div>
  );
}

export default Currency;
