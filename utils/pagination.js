exports.findAllWithPagination = async (
	model,
	id = {},
	limit = '10',
	page = '1'
) => {
	const _limit = parseInt(limit)
	const _page = parseInt(page)
	const offset = (_page - 1) * _limit

	const { count, rows } = await model.findAndCountAll({
		where: id,
		limit: _limit,
		offset
	})

	return {
		pagination: {
			currentPage: _page,
			itemsPerPage: _limit,
			totalPages: Math.ceil(count / _limit),
			totalItems: count
		},
		data: rows
	}
}
