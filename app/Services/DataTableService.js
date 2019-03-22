/**
 * Datatable service for react-table
 * @author Offshore Lab
 * @copyright TMJ Engineers 2018
 */
class DataTableService {
    // dtParamas = datatable Params
    constructor(modelInstance, dtParams) {
        this.params = dtParams

        // column conditions
        this.columnConditions = {}
        this.columnDefinition = {}
        this.addedConditions = []

        this.query = modelInstance.query()
        this.queryCount = modelInstance.query()
    }

    /**
     * Get the instance of query
     */
    getInstance(callback) {
        this.query = callback(this.query)
    }

    /**
     * Get the instance of queryCount
     */
    getCountInstance(callback) {
        this.queryCount = callback(this.queryCount)
    }

    setColumnCondition(columnName, condition) {
        this.columnConditions[columnName] = condition
    }

    // if the column definition from client is different
    // in column definition in the database.
    setColumnDefinition(columnName, transformColumn) {
        this.columnDefinition[columnName] = transformColumn
    }

    /**
     * Logical Operator : AND or OR (RDBMS)
     * Push condition to queryCount and query
     */
    pushCondition(statement, bindings, logicalOperator) {
        this.addedConditions.push({
            statement, bindings, logicalOperator
        })
    }

    async reload() {
        let query = this.query
        let queryCount = this.queryCount

        let limit = this.params['pageSize']
        let offset = this.params['page']

        if (this.params['filtered'].length || this.addedConditions) {
            let filters = this._getFilters()

            query = query.whereRaw(filters.query, filters.bindings)
            queryCount = queryCount.whereRaw(filters.query, filters.bindings)
        }

        if (this.params['sorted'].length) {
            let sorted = this._getSorts(this.params['sorted'])

            query = query.orderByRaw(sorted.query)
            queryCount = queryCount.orderByRaw(sorted.query)
        }

        queryCount = await queryCount.count('id as total')

        let total = queryCount[0].total

        return {
            lists: await query.offset(offset * limit).limit(limit).fetch(),
            // lists: await query.offset(offset * limit).limit(limit).on('query', console.log).fetch(),
            pages: Math.ceil(total / limit)
        }
    }

    _getSorts(sorted) {
        let orderQuery = ''
        let arrLength = sorted.length - 1

        for (var key in sorted) {
            let sort = sorted[key]
            let order = (sort.desc == true) ? ' DESC ' : ' ASC '

            // get the label to be sort
            orderQuery += sort.id + order

            // check if to add multiple sort
            orderQuery += (key >= arrLength) ? '' : ', '
        }

        return {
            query: orderQuery
        }
    }

    _getFilters() {
        let filters = {}
        let addedFilters = this._getAddedFilters()
        let columnFilters = this._getColumnFilters()

        filters.query = addedFilters.query + columnFilters.query
        filters.bindings = addedFilters.bindings
        filters.bindings = filters.bindings.concat(columnFilters.bindings)

        return filters
    }

    _getColumnFilters() {
        let filtered = this.params['filtered']
        let whereQuery = (filtered.length) ? '(' : ''
        let bindings = []
        let arrLength = filtered.length - 1

        for (var key in filtered) {
            let filter = filtered[key]
            let column = filter.id
            // if there is set column condition use that condition
            let condition = this.columnConditions[column] || 'LIKE'
            let value = (this.columnConditions[column]) ? filter.value : '%' + filter.value + '%'
            // the column definition is changed
            let columnDefinition = this.columnDefinition[column] || column

            // get first the label to be searched
            whereQuery += columnDefinition + ' ' + condition + ' ?'
            // then push it in the bindings
            bindings.push(value)

            // add a condition
            whereQuery += (key >= arrLength) ? ')' : ' AND '
        }
        return {
            query: whereQuery,
            bindings
        }
    }

    _getAddedFilters() {
        let addedFilters = this.addedConditions
        let whereQuery = ''
        let bindings = []
        let arrLength = addedFilters.length - 1

        for (var key in addedFilters) {
            let addedFilter = addedFilters[key]
            whereQuery += addedFilter.statement
            Array.isArray(addedFilter.bindings) ? bindings.concat(addedFilter.bindings)
                : bindings.push(addedFilter.bindings)
            // if logicalOperator is empty we will use AND Operator by default
            // this is for the concatenation for the column filters
            let logicalOperator = (!addedFilter.logicalOperator) ? ' AND '
                : ` ${addedFilter.logicalOperator} `

            whereQuery +=  (!this.params['filtered'].length && key >= arrLength) ? '' : logicalOperator
        }

        return {
            query: whereQuery,
            bindings
        }
    }
}

module.exports = DataTableService
