import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type FieldProps = {
	label: string;
	error?: string;
	children: ReactNode;
};

const Field = ({ label, error, children }: FieldProps) => (
	<label className="block">
		<span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
		{children}
		{error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
	</label>
);

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
};

export const TextInput = ({ label, error, className = "", ...props }: InputProps) => (
	<Field label={label} error={error}>
		<input
			{...props}
			className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${className}`}
		/>
	</Field>
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label: string;
	error?: string;
};

export const TextareaInput = ({
	label,
	error,
	className = "",
	...props
}: TextareaProps) => (
	<Field label={label} error={error}>
		<textarea
			{...props}
			className={`min-h-28 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 ${className}`}
		/>
	</Field>
);
