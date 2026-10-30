import React from "react";

const FooterMobileBtn = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="sticky bottom-0 z-40 mt-auto -mx-4 -mb-4 ">
			<div className="border-t border-slate-100 bg-white/95 backdrop-blur-md">
				<div className="mx-auto grid w-full max-w-md grid-flow-col auto-cols-fr gap-3 px-4 py-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))] *:min-w-0 *:w-full *:h-12 *:rounded-2xl *:text-sm *:font-semibold">
					{children}
				</div>
			</div>
		</div>
	);
};

export default FooterMobileBtn;
