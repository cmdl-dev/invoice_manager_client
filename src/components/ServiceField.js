import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import CurrencyInput from "react-currency-input";
import { services } from "../config/services";
// TODO: Figure this out
// require("../uikit-icons.min.js");
// require("../uikit.min.js");

const ServiceField = ({
  index,
  serviceInfo,
  removeService,
  updateTotal,
  updateServiceInfo,
}) => {
  const [price, setPrice] = useState(serviceInfo.price);
  const [service, setService] = useState(serviceInfo.service);

  useEffect(() => {
    updateServiceInfo(index, { service, price });
    // console.log(price, service);
  }, [price, service]);

  const updateOption = value => {
    setService(value.label);
    setPrice(value.value);
  };
  return (
    <div className="uk-flex uk-flex-between uk-padding-small uk-padding-remove-top uk-padding-remove-horizontal">
      <div
        style={{ paddingRight: 5 }}
        className="remove_icon uk-flex uk-flex-column uk-flex-center"
      >
        <span
          className="fa fa-minus-square fa-lg"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => removeService(index)}
        />
      </div>
      <div className="service_description uk-width-1-1 uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
        <CreatableSelect
          isClearable={true}
          defaultInputValue={serviceInfo.service}
          options={services}
          onInputChange={(newValue, actionMeta) =>
            newValue && newValue.length > 0 && setService(newValue)
          }
          onChange={(newValue, actionMeta) =>
            newValue && updateOption(newValue)
          }
          // onChange={handleChange}
          // onInputChange={handleInputChange}
        />
      </div>
      <div className="price uk-width-1-3">
        <div className="uk-inline">
          <span className="uk-form-icon">$</span>
          <CurrencyInput
            className="uk-input"
            id="price"
            placeholder="100.00"
            value={price}
            onChangeEvent={e => setPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceField;
