import FeralCodegen from "./FeralCodegen";

export const FeralCodeGenLayout = ({
  style,
  count = 5,
}: {
  style?: string;
  count?: number;
}) => {
  const codes = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className={`absolute flex justify-between px-10 justify-items-center w-full text-xs ${style}`}
    >
      {codes.map((index) => (
        <FeralCodegen key={index} />
      ))}{" "}
    </div>
  );
};
