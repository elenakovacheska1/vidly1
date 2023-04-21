const users = [
	{
		id: 1,
		name: "John Smith",
		imageUrl:
			"https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077482/profile-card/images/profile-picture.png",
		job: "Product Designer",
		description:
			"Elena is a talented front-end web developer with a passion for creating feature-rich apps. ",
		following: "56K",
		followers: "940",
		likes: "320",
	},
	{
		id: 2,
		name: "Jane Smith",
		imageUrl:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		job: "Front-end Web Developer",
		description:
			"I was impressed with Elena's skills in React, JavaScript, HTML, and CSS.",
		following: "46K",
		followers: "540",
		likes: "150",
	},
	{
		id: 3,
		name: "Bob Smith",
		imageUrl:
			"https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		job: "Photographer",
		description:
			"I had the pleasure of working with Elena and was thoroughly impressed with her abilities.",
		following: "850",
		followers: "950",
		likes: "100",
	},
	{
		id: 4,
		name: "Maria Smith",
		imageUrl:
			"https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		job: "Back-end Web Developer",
		description:
			"Elena is passionate about creating user-friendly and engaging interfaces.",
		following: "85K",
		followers: "850",
		likes: "550",
	},
	{
		id: 5,
		name: "Victoria Smith",
		imageUrl:
			"https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		job: "Mobile App Developer",
		description:
			"I highly recommend Elena for any front-end development project.",
		following: "65K",
		followers: "320",
		likes: "350",
	},
];

export function getUsers() {
	return users;
}
