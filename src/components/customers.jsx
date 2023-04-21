import React from "react";
import UserCard from "../common/userCard";
import { getUsers } from "../services/fakeUserService";

const Customers = () => {
	const users = getUsers();

	return (
		<React.Fragment>
			{users.map((user) => (
				<UserCard
					key={user.id}
					imageUrl={user.imageUrl}
					name={user.name}
					job={user.job}
					description={user.description}
					following={user.following}
					followers={user.followers}
					likes={user.likes}
				/>
			))}
		</React.Fragment>
	);
};

export default Customers;
