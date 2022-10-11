import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    defaultSelected: new Date(),
  });

  return (
    <>
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
      </UNSAFE_DatePicker>
      <div className="pt-4">{selectedDay && selectedDay.toDateString()}</div>
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 6,
};
