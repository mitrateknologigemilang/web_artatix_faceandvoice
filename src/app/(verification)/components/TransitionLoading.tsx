import { Loader2 } from "lucide-react";

export function TransitionLoading({ message }: { message: string }) {
	return (
		<div
			className="flex min-h-[calc(100vh-9rem)] items-center justify-center"
			role="status"
			aria-live="polite">
			<div className="flex flex-col items-center gap-3 text-center">
				<Loader2 className="h-10 w-10 animate-spin text-[#3b5bdb]" />
				<p className="text-sm font-medium text-gray-600">{message}</p>
			</div>
		</div>
	);
}
