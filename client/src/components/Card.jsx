import React from "react";

const Card = ({ icon, text1, text2, isMenuCard, menuButtonConent }) => {
	return (
		<>
			{!isMenuCard ? (
				<div className="flex justify-start items-center gap-2 py-2 p-4 hoverEffectText min-h-[3rem] cursor-pointer mx-3 rounded-xl ">
					<div className="border border-white/20 rounded-full p-1">{icon}</div>
					<div className="flex flex-col justify-center ">
						<span className="font-medium">{text1}</span>
						<span className="text-xs text-gray-400">{text2}</span>
					</div>
				</div>
			) : (
				<div className="flex justify-start items-start gap-2 hoverEffectText  cursor-pointer mx-3 rounded-xl ">
					<div className="">{icon}</div>
					<div className="flex flex-col flex-1 grow justify-center gap-4">
						<div className="flex flex-col">
							<div className="flex justify-between w-full items-center">
								<span className="font-medium text-lg">{text1}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<span className="text-sm text-gray-400">{text2}</span>
						</div>
						{menuButtonConent?.length > 0 && (
							<p className="bg-primary-500 text-sm text-center hover:opacity-80 py-2 rounded-lg w-full">
								Upgrade to Plus+
							</p>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Card;
