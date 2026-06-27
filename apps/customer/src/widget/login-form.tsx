import { useLogin } from "@/hooks/use-login";
import { useNavigate } from "react-router-dom";
import { Input } from "@/widget/input";
import { useState } from "react";

const EmailIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M4 6.75C4 5.784 4.784 5 5.75 5H18.25C19.216 5 20 5.784 20 6.75V17.25C20 18.216 19.216 19 18.25 19H5.75C4.784 19 4 18.216 4 17.25V6.75Z"
			stroke="currentColor"
			strokeWidth="1.6"
		/>
		<path
			d="M5 7L12 12.25L19 7"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const LockIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7 10V8C7 5.239 9.239 3 12 3C14.761 3 17 5.239 17 8V10"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
		/>
		<rect
			x="5"
			y="10"
			width="14"
			height="11"
			rx="2"
			stroke="currentColor"
			strokeWidth="1.6"
		/>
	</svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3 12C4.5 7.5 8 5 12 5C16 5 19.5 7.5 21 12C19.5 16.5 16 19 12 19C8 19 4.5 16.5 3 12Z"
			stroke="currentColor"
			strokeWidth="1.6"
		/>
		<circle
			cx="12"
			cy="12"
			r="3.2"
			stroke="currentColor"
			strokeWidth="1.6"
		/>
		{open ? null : (
			<path
				d="M5 19L19 5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		)}
	</svg>
);

export const LoginForm = () => {
	const { mutate, isPending, isError } = useLogin();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		mutate({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-[420px] rounded-[32px] bg-white/80 px-8 py-10 shadow-[0_30px_80px_-60px_rgba(68,61,170,0.9)] ring-1 ring-white/70 backdrop-blur"
		>
			<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-indigo-100">
				<div className="text-indigo-500">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 7.5C7 5.567 8.567 4 10.5 4H13.5C15.433 4 17 5.567 17 7.5V8.5C17 10.433 15.433 12 13.5 12H10.5C8.567 12 7 10.433 7 8.5V7.5Z"
							stroke="currentColor"
							strokeWidth="1.6"
						/>
						<path
							d="M5 20C5 16.686 8.134 14 12 14C15.866 14 19 16.686 19 20"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>

			<div className="mt-6 text-center">
				<h2 className="text-2xl font-semibold text-slate-900">
					Customer Login
				</h2>
				<p className="mt-2 text-sm text-slate-500">
					Welcome back! Please login to continue.
				</p>
			</div>

			<div className="mt-8 space-y-4">
				<Input
					name="email"
					type="email"
					placeholder="Email Address"
					required
					icon={<EmailIcon />}
				/>
				<Input
					name="password"
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					required
					icon={<LockIcon />}
					trailing={
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							aria-label={
								showPassword ? "Hide password" : "Show password"
							}
						>
							<EyeIcon open={showPassword} />
						</button>
					}
				/>
			</div>

			<div className="mt-4 flex items-center justify-between text-sm">
				<label className="flex items-center gap-2 text-slate-500">
					<input
						type="checkbox"
						className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
					/>
					Remember me
				</label>
				<button
					type="button"
					className="text-indigo-500 hover:text-indigo-600"
				>
					Forgot Password?
				</button>
			</div>

			{isError && (
				<p className="mt-4 text-sm text-rose-500">Invalid Login</p>
			)}

			<button
				disabled={isPending}
				className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:brightness-110 disabled:opacity-60"
			>
				{isPending ? "Loading..." : "Login"}
				<span className="text-lg">→</span>
			</button>

			<div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
				<span className="h-px flex-1 bg-slate-200" />
				OR
				<span className="h-px flex-1 bg-slate-200" />
			</div>

			<p className="mt-5 text-center text-sm text-slate-500">
				Don&apos;t have an account?
				<button
					type="button"
					onClick={() => navigate('/register')}
					className="ml-2 text-indigo-500 hover:text-indigo-600"
				>
					Register
				</button>
			</p>
		</form>
	);
};