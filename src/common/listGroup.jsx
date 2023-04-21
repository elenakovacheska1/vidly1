import React, { Component } from "react";

class ListGroup extends Component {
	render() {
		const { items, currentItem, onFilter } = this.props;
		return (
			<ul className="list-group mb-5" id="myList">
				{items.map((item) => (
					<li
						key={item}
						style={{ cursor: "pointer" }}
						onClick={(e) => onFilter(e)}
						className={
							item === currentItem
								? "list-group-item active"
								: "list-group-item"
						}
					>
						{item}
					</li>
				))}
			</ul>
		);
	}
}

export default ListGroup;
