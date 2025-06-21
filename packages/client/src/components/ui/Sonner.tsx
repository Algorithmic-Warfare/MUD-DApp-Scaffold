import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          background: "var(--background)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          borderRadius: 0,
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        } as React.CSSProperties,
        classNames: {
          success: "!bg-success/60 !border-success",
          error: "!bg-error/60 !border-error",
          warning: "!bg-primary/60 !border-primary",
          info: "!bg-info/60 !border-info",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
