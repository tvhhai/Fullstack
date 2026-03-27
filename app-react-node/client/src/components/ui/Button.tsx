import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";
import { forwardRef } from "react";

export interface ButtonProps extends MuiButtonProps {
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, disabled, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";
