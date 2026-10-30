import React from "react";
import { cn } from "@/lib/utils";

export interface InfoListItem {
	title: string;
	desc: string;
}

export interface InfoListCardProps {
	title: React.ReactNode;
	items: InfoListItem[];
	numbered?: boolean;
	className?: string;
}

export default function InfoListCard({
	title,
	items,
	numbered = true,
	className,
}: InfoListCardProps) {
	return (
		<div
			className={cn(
				"w-full rounded-2xl border border-slate-200 bg-white overflow-hidden text-left",
				className,
			)}>
			<div className="border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
				<h3 className="text-xs font-bold text-[#1e2a4a]">{title}</h3>
			</div>
			<div className="divide-y divide-slate-100 px-4">
				{items.map((item, idx) => (
					<div key={idx} className="py-3">
						<p className="text-xs font-semibold text-[#1e2a4a]">
							{numbered ? `${idx + 1}. ` : ""}
							{item.title}
						</p>
						<p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
							{item.desc}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
