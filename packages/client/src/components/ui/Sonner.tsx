/**
 * @file
 * @summary Provides a customizable Toaster component for displaying notifications.
 * @description This file exports the `Toaster` component, which is a wrapper around the `sonner` library's
 * `Toaster` component. It provides a centralized way to display various types of notifications
 * (success, error, warning, info) with customizable styling and theming.
 *
 * @exports Toaster - A component for displaying notifications.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Notifications**: Use this component to display transient messages to the user.
 * - **Styling**: The `toastOptions` prop is used to apply custom CSS variables for theming the toasts.
 * - **Integration**: This component relies on the `sonner` library for its core functionality.
 */
import { Toaster as Sonner, ToasterProps } from "sonner";

/**
 * @summary A customizable Toaster component for displaying notifications.
 * @description This component configures and renders the `sonner` Toaster, applying a dark theme
 * and custom styles for different toast types (success, error, warning, info) using CSS variables.
 *
 * @param {object} props - The props for the Toaster component.
 * @param {ToasterProps} props - All other props supported by the `sonner` Toaster component.
 * @returns {JSX.Element} A React element representing the configured toaster.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Global Component**: This component is typically rendered once at the root of the application.
 * - **Theming**: The `theme="dark"` and `toastOptions.style` and `toastOptions.classNames` define the visual appearance.
 * - **Type-specific Styling**: Note how different toast types (`success`, `error`, etc.) have distinct background and border colors.
 */
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
