export function saveToLocalDb(key, value) {
	localStorage.setItem(String(key), JSON.stringify(value));
}

export function getFromLocalDb(key) {
	const value = JSON.parse(localStorage.getItem(String(key)));
	return !value ? [] : value;
}
