import { ExampleKeys, Examples } from ".";

export default {
  title: "Stories/Examples",
  component: Examples,
  argTypes: {
    example: {
      defaultValue: ExampleKeys[0],
      control: {
        type: "select",
        options: ExampleKeys,
      },
    },
  },
};

const ExampleCodePreview = (key: string) => {
  const Comp = Examples[key];
  return <Comp />;
};

export const Default = (props: any) => {
  return (
    <div className="flex w-full flex-col justify-center p-4">
      <div className="inline-grid flex-wrap items-center gap-4">
        {ExampleCodePreview(props.example)}
      </div>
    </div>
  );
};
