"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	description?: React.ReactNode;
	icon?: React.ReactNode;
	/** Footer / action area. Defaults to a single "Tutup" button. */
	children?: React.ReactNode;
	/** Hide the top-right close (X) button. */
	hideCloseButton?: boolean;
}

/**
 * Reusable bottom sheet dialog using shadcn Sheet.
 */
export function Modal({
	open,
	onClose,
	title,
	description,
	icon,
	children,
	hideCloseButton = false,
}: ModalProps) {
	return (
		<Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<SheetContent
				side="bottom"
				showCloseButton={!hideCloseButton}
				className="mx-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl">
				<div className="mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
				{icon && <div className="mb-1 flex justify-center">{icon}</div>}

				<SheetHeader className="p-0 text-center">
					<SheetTitle
						className={
							title
								? "text-base font-bold text-center text-[#1e2a4a]"
								: "sr-only"
						}>
						{title || "Notifikasi"}
					</SheetTitle>
					{description && (
						<SheetDescription asChild>
							<div className="text-slate-600 text-xs text-center mt-1 leading-relaxed">
								{description}
							</div>
						</SheetDescription>
					)}
				</SheetHeader>

				{children ?? (
					<button
						onClick={onClose}
						className="mt-2 w-full bg-[#3b5bdb] text-white font-semibold text-sm h-11 rounded-xl hover:bg-[#3451c5] active:scale-[0.99] transition-all">
						Tutup
					</button>
				)}
			</SheetContent>
		</Sheet>
	);
}
