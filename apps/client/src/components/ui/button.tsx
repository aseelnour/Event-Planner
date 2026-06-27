import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "danger" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
	primary:
		"bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200 disabled:bg-indigo-300",
	outline:
		"border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-100 disabled:text-gray-400",
	danger:
		"border border-red-200 bg-white text-red-600 hover:bg-red-50 focus:ring-red-100 disabled:text-red-300",
	ghost:
		"bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-100 disabled:text-gray-300",
};

const sizes: Record<ButtonSize, string> = {
	sm: "min-h-9 px-3 py-2 text-xs",
	md: "min-h-11 px-4 py-2.5 text-sm",
	lg: "min-h-12 px-5 py-3 text-base",
};

export const Button = ({
	children,
	className = "",
	variant = "primary",
	size = "md",
	icon,
	type = "button",
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			type={type}
			className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-4 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
		>
			{icon}
			{children}
		</button>
	);
};
