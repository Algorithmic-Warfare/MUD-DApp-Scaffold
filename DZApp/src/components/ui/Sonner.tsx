import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme='dark'
      className="toaster group"
      style={
        {
          background: "var(--background)"
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
          success: "!bg-green/60 !border-green",
          error: "!bg-red/60 !border-red",
          warning: "!bg-quantum/60 !border-quantum",
          info: "!bg-blue/60 !border-blue",
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
