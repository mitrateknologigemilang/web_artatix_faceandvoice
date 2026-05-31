"use client";

import React from "react";
import { X } from "lucide-react";

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
 * Reusable centered modal dialog.
 * Backdrop click and the X button both trigger onClose.
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
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
			style={{ zIndex: 9999 }}
			onClick={onClose}>
			<div
				className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}>
				{!hideCloseButton && (
					<button
						onClick={onClose}
						aria-label="Tutup"
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
						<X className="w-5 h-5" />
					</button>
				)}

				{icon && <div className="mb-4">{icon}</div>}

				{title && (
					<h2 className="text-xl font-bold text-center text-[#1e2a4a] mb-2">
						{title}
					</h2>
				)}

				{description && (
					<div className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
						{description}
					</div>
				)}

				{children ?? (
					<button
						onClick={onClose}
						className="w-full bg-[#3b5bdb] text-white font-medium py-3 rounded-xl hover:bg-[#3451c5] transition-colors shadow-sm">
						Tutup
					</button>
				)}
			</div>
		</div>
	);
}
