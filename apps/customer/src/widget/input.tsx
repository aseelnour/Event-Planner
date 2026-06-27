import { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	icon?: ReactNode;
	trailing?: ReactNode;
};

export const Input = ({ className = "", icon, trailing, ...props }: Props) => {
	return (
		<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400/80">
			{icon ? <span className="text-indigo-500">{icon}</span> : null}
			<input
				{...props}
				className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none ${className}`}
			/>
			{trailing ? (
				<span className="text-slate-400 hover:text-indigo-500">
					{trailing}
				</span>
			) : null}
		</div>
	);
};
