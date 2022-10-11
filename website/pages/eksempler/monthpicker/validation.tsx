import { UNSAFE_MonthPicker, UNSAFE_useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps, selectedMonth } = UNSAFE_useMonthpicker(
    {
      fromDate: new Date("Aug 23 2019"),
      toDate: new Date("Aug 23 2025"),
    }
  );

  return (
    <>
      <UNSAFE_MonthPicker {...monthpickerProps}>
        <div className="grid gap-4">
          <UNSAFE_MonthPicker.Input
            {...inputProps}
            label="Velg månede"
            error={!selectedMonth && "Du må velge månede"}
          />
        </div>
      </UNSAFE_MonthPicker>
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
};
