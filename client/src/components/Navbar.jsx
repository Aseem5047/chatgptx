import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";

const BoltSvg = (
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
			d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
		/>
	</svg>
);

const PrintSvg = (
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
			d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
		/>
	</svg>
);

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const menuRef = useRef(null);

	const handleOnClick = () => {
		setToggleMenu(!toggleMenu);
	};

	// this logic checks for clicks inside and outside the menu and handles the event appropriately
	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setToggleMenu(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="sticky top-0 flex justify-between w-full p-4">
				<div
					className={`${
						toggleMenu && "bg-white/20 p-2"
					} relative flex justify-center items-ceter gap-2 font-bold text-xl hoverEffectText`}
					ref={menuRef}
				>
					<p className="self-center" onClick={handleOnClick}>
						ChatGPT <span className="text-gray-300">3.5</span>
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4 align-middle self-center"
						onClick={handleOnClick}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
					{toggleMenu && (
						<div className="absolute top-14 left-0 bg-black max-w-[24rem] w-max overflow-hidden rounded-xl py-4 px-2 flex flex-col gap-4">
							<Card
								icon={BoltSvg}
								text1={"GPT-3.5"}
								text2={"Great for Everyday Tasks"}
								isMenuCard={true}
								menuButtonConent={""}
							/>
							<Card
								icon={PrintSvg}
								text1={"GPT-4"}
								text2={
									"Our Smartest and most capable model. Includes DALL·E browsing and more."
								}
								isMenuCard={true}
								menuButtonConent={"Upgrade to Plus+"}
							/>
						</div>
					)}
				</div>
				<p className="border border-white/20 px-2 py-2 rounded-md hoverEffectText self-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
				</p>
			</div>
		</>
	);
};

export default Navbar;
