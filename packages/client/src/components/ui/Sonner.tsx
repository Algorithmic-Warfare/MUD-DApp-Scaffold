import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={{}}
      toastOptions={{
        style: {
          borderRadius: "var(--sonner-toaster-radius)",
          background: "var(--sonner-toaster-bg)",
          color: "var(--sonner-toaster-fg)",
          border: "var(--sonner-toaster-border)",
        } as React.CSSProperties,
        classNames: {
          success:
            "!bg-[var(--sonner-toaster-success-bg)] !border-[var(--sonner-toaster-success-border)]",
          error:
            "!bg-[var(--sonner-toaster-error-bg)] !border-[var(--sonner-toaster-error-border)]",
          warning:
            "!bg-[var(--sonner-toaster-warning-bg)] !border-[var(--sonner-toaster-warning-border)]",
          info: "!bg-[var(--sonner-toaster-info-bg)] !border-[var(--sonner-toaster-info-border)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
