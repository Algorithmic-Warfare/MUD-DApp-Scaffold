# UI Component Styling Workflow

This workflow outlines the steps for styling UI components consistently using CSS variables.

!!! IMPORTANT !!!
- Do not change the existing variables in `App.css`.
- Make the newly defined variables work with the existing theme.

## 1. Planning Phase
- Analyze component structure
- Identify styling elements (colors, typography, spacing, etc.)
- Determine theme requirements
- Example from AlertDialog:
  ```tsx
  // Identified elements:
  // - Overlay background
  // - Content container styles
  // - Title/description text
  ```

## 2. CSS Variables Definition
- Add to App.css under `@theme inline`
- Follow naming convention: `--[component]-[part]-[property]`
- Example:
  ```css
  /* AlertDialog Variables */
  --alert-dialog-overlay-bg: rgba(0, 0, 0, 0.5);
  --alert-dialog-title-color: var(--foreground);
  ```

## 3. Component Implementation
- Replace hardcoded values with variables
- Use `cn()` utility for class merging
- Example:
  ```tsx
  className={cn(
    "bg-[var(--alert-dialog-content-bg)]",
    "border-[var(--alert-dialog-content-border)]"
  )}
  ```

## 4. Validation
- Run build: `pnpm build`
- Check in development environment
- Verify theme consistency

## Full AlertDialog Example

**Before:**
```tsx
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      className
    )}
    {...props}
  />
));
```

**After:**
```tsx
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
      "bg-[var(--alert-dialog-overlay-bg)] backdrop-blur-[var(--alert-dialog-overlay-blur)]",
      className
    )}
    {...props}
  />
));
