import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Custom styling based on variant
        const getToastClass = () => {
          if (variant === "destructive") {
            return "bg-toast-error text-toast-error-foreground border-toast-error animate-fade-in";
          }
          if (title === "Login Successful" || title === "Registration Successful" || title?.includes("Success") || title?.includes("sent")) {
            return "bg-toast-success text-toast-success-foreground border-toast-success animate-fade-in";
          }
          return "";
        };

        return (
          <Toast key={id} {...props} className={getToastClass()}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
