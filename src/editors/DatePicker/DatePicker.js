import React, {
  Component,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import {
  KEY_BACKSPACE,
  KEY_DELETE,
  isLeftOrRight,
  deleteOrBackspace,
  isKeyPressedNumeric,
} from "./helpers";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatepicker, setShowDatepicker] = useState(true);
  function handleDateChange(d) {
    setSelectedDate(d);
  }

  useImperativeHandle(ref, () => {
    return {
      init: (params) => {
        setSelectedDate(Date.parse(params.value));
      },
      getValue: () => {
        let dateString = null;
        if (selectedDate) {
          dateString = format(selectedDate, "dd/MM/yyyy");
        }
        return dateString;
      },
      isCancelAfterEnd: () => {
        return !selectedDate;
      },
      afterGuiAttached: () => {
        if (!props.value) {
          return;
        }
        const [_, day, month, year] = props.value.match(
          /(\d{2})\/(\d{2})\/(\d{4})/
        );
        let selectedDate = new Date(year, month - 1, day);
        setSelectedDate(selectedDate);
      },
    };
  });

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={selectedDate}
      onChange={handleDateChange}
    />
  );
});
