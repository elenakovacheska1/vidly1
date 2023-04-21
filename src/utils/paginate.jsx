export function paginate(items, currentPage, recordsPerPage) {
	if (!items || !items.length) return [];

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	return items.slice(indexOfFirstRecord, indexOfLastRecord);
}
