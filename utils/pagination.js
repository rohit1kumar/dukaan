const { Op } = require('sequelize')

exports.findAllWithPagination = async (
	model,
	id = {},
	limit = '10',
	page = '1',
	searchCriteria = {}
) => {
	// Convert limit and page to integers. If conversion fails, default to 10 and 1 respectively.
	const _limit = isNaN(parseInt(limit)) ? 10 : parseInt(limit)
	const _page = isNaN(parseInt(page)) ? 1 : parseInt(page)
	const offset = (_page - 1) * _limit

	const whereClause = { ...id }
	const filteredCriteria = Object.fromEntries(
		// eslint-disable-next-line no-unused-vars
		Object.entries(searchCriteria).filter(([_, value]) => value)
	)

	for (const [key, value] of Object.entries(filteredCriteria)) {
		whereClause[key] = { [Op.like]: `%${value}%` }
	}

	const { count, rows } = await model.findAndCountAll({
		where: whereClause,
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
