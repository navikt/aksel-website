import { UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    UNSAFE_useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
    });

  return (
    <>
      <UNSAFE_DatePicker {...datepickerProps}>
        <div className="grid gap-4">
          <UNSAFE_DatePicker.Input {...fromInputProps} label="Fra" />
          <UNSAFE_DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </UNSAFE_DatePicker>
      {selectedRange && (
        <div className="pt-4">
          <div>{selectedRange?.from && selectedRange.from.toDateString()}</div>
          <div>{selectedRange?.to && selectedRange.to.toDateString()}</div>
        </div>
      )}
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 7,
};
