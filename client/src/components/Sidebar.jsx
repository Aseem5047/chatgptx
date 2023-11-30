import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useChat } from "../context/chatContext";

const StarSvg = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="w-5 h-5"
	>
		<path
			fillRule="evenodd"
			d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
			clipRule="evenodd"
		/>
	</svg>
);

const Sidebar = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const toggleSidebar = () => {
		setOpenSidebar(!openSidebar);
	};
	const { previousChats, setCurrentTitle, setPrompt, setMessage } = useChat();

	useEffect(() => {
		if (window.innerWidth <= 768) {
			setOpenSidebar(false);
		}
	}, []);

	const startNewChat = () => {
		setCurrentTitle(null);
		setMessage([]);
		setPrompt("");
	};

	const assignCurrentTitle = (uniqueTitle) => {
		setCurrentTitle(uniqueTitle);
	};

	const uniqueTitles = Array.from(
		new Set(previousChats.map((previousChat) => previousChat.title))
	);
	return (
		<>
			<section
				className={` ${
					!openSidebar
						? "hidden"
						: "left-0 bg-[#000000] h-screen min-w-[275px] max-w-[300px] fixed md:relative z-20 p-4 flex flex-col gap-8 "
				}`}
			>
				{/* new chat button */}
				<button
					className="rounded-xl w-full flex justify-between gap-2 items-center hoverEffectText"
					onClick={startNewChat}
				>
					<div className="flexRowGroup">
						<img
							src="https://cdn-icons-png.flaticon.com/512/12222/12222560.png"
							alt=""
							className="w-10 "
						/>
						<span className="align-middle text-lg">New Chat</span>
					</div>
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
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</button>

				{/* past chat history */}
				<div className="px-2 ">
					<p className="px-2 text-xs text-gray-400">Today</p>
					{uniqueTitles.length > 0 ? (
						<ul className="py-2 flex flex-col gap-3">
							{uniqueTitles?.map((uniqueTitle, index) => (
								<li
									key={index}
									onClick={() => assignCurrentTitle(uniqueTitle)}
									className="px-2 text-base font-semibold text-gray-100 hoverEffectText rounded-xl cursor-pointer max-w-[225px] overflow-x-hidden text-ellipsis whitespace-nowrap"
								>
									{uniqueTitle}
								</li>
							))}
						</ul>
					) : (
						<p
							className="px-2 text-base font-semibold text-gray-100 rounded-xl cursor-pointer mt-2 hoverEffectText"
							onClick={startNewChat}
						>
							Start New Conversation
						</p>
					)}
				</div>

				{/* bottom navigation menu */}
				<nav className="absolute bottom-4 left-0 w-full flex flex-col pt-2">
					{/* upgrade plans button */}
					<Card
						icon={StarSvg}
						text1={"Upgrade"}
						text2={"Get GPT-4 DALL·E and more ..."}
						isMenuCard={false}
						menuButtonConent={""}
					/>

					{/* user button */}
					<div className="flex justify-start items-center gap-3 py-2 px-4 hoverEffectText min-h-[3rem] cursor-pointer mx-3 rounded-xl ">
						<img
							src="/assets/user.jpg"
							alt="Profile"
							className="w-10 h-10 rounded-full object-fit"
						/>

						<span className="font-semibold">Aseem Gupta</span>
					</div>
				</nav>
				<button
					className="absolute right-4 top-1/2 hoverEffectText w-fit"
					onClick={toggleSidebar}
				>
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
							d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
						/>
					</svg>
				</button>
			</section>
			{!openSidebar && (
				<button
					className="hoverEffectText bg-white/5 rounded-l-none w-fit h-[7rem] p-4 fixed left-0 z-10"
					onClick={toggleSidebar}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 "
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
						/>
					</svg>
				</button>
			)}
		</>
	);
};

export default Sidebar;
