import React from "react";

const FooterMobileBtn = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
			<div className="mx-auto grid w-full max-w-175 grid-flow-col auto-cols-fr gap-2 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] [&>*]:min-w-0 [&>*]:w-full">
				{children}
			</div>
		</div>
	);
};

export default FooterMobileBtn;
