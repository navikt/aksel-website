import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { isValid } from "date-fns";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
  });

  return (
    <UNSAFE_DatePicker {...datepickerProps}>
      <UNSAFE_DatePicker.Input
        {...inputProps}
        label="Velg dato"
        error={!isValid(selectedDay) && "Må velge en dag"}
      />
    </UNSAFE_DatePicker>
  );
};

export default withDsExample(Example);

export const args = {
  index: 9,
};
