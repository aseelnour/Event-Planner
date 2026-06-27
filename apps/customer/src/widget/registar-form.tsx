import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/use-register';

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

export const RegisterForm = () => {
	const navigate = useNavigate();
	const { mutate, isPending, isError } = useRegister();
	const [updatedFullName, setUpdatedFullName] = useState('');
	const [updatedEmail, setUpdatedEmail] = useState('');
	const [updatedPassword, setUpdatedPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate(
			{
				fullName: updatedFullName,
				email: updatedEmail,
				password: updatedPassword,
			},
			{
				onSuccess: () => navigate('/login'),
			}
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-[420px] rounded-[32px] bg-white/80 px-8 py-10 shadow-[0_30px_80px_-60px_rgba(68,61,170,0.9)] ring-1 ring-white/70 backdrop-blur"
		>
			<div className="text-center">
				<h1 className="text-3xl font-bold text-slate-900">
					Create Account
				</h1>
				<p className="mt-2 text-sm text-slate-500">
					Join Eventat and start booking amazing venues
				</p>
			</div>

			<div className="mt-8 space-y-6">
				<div>
					<label className="block text-sm font-semibold text-slate-900 mb-2">
						Full Name
					</label>
					<input
						type="text"
						placeholder="John Doe"
						value={updatedFullName}
						onChange={(e) => setUpdatedFullName(e.target.value)}
						required
						className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-slate-900 mb-2">
						Email
					</label>
					<input
						type="email"
						placeholder="john@example.com"
						value={updatedEmail}
						onChange={(e) => setUpdatedEmail(e.target.value)}
						required
						className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-slate-900 mb-2">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							value={updatedPassword}
							onChange={(e) => setUpdatedPassword(e.target.value)}
							required
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
						>
							<EyeIcon open={showPassword} />
						</button>
					</div>
				</div>
			</div>

			<button
				disabled={isPending}
				type="submit"
				className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:brightness-110 disabled:opacity-60"
			>
				{isPending ? 'Loading...' : 'Create Account'}
			</button>

			{isError && (
				<p className="mt-4 text-sm text-rose-500">Something went wrong</p>
			)}

			<div className="mt-6 space-y-3 text-center">
				<p className="text-sm text-slate-500">
					Already have an account?{' '}
					<button
						type="button"
						onClick={() => navigate('/login')}
						className="text-indigo-500 hover:text-indigo-600 font-semibold"
					>
						Login
					</button>
				</p>
				<button
					type="button"
					onClick={() => navigate('/')}
					className="text-sm text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 w-full"
				>
					← Back to home
				</button>
			</div>
		</form>
	);
};