/**
 * Datatable service for react-table (mongo)
 * @author Offshore Lab
 * @copyright TMJ Engineers 2018
 */
class MongoDataTableService {
    constructor(params, model, orgCode, rdbmsModel) {
        this.params = params
        this.model = model
        this.orgCode = orgCode
        this.rdbmsModel = rdbmsModel
    }

    getFilters(filters) {
        if (!filters.length) return

        let query = {}

        filters.forEach((element)=>{
            if (typeof element.value == 'object') {
                query[element.id] = { $in: element.value}
                return
            }
            query[element.id] = new RegExp(element.value, 'i')
        })
        return query
    }

    getSorts(sorts) {
        if (!sorts.length) return

        let sort = {}

        sorts.forEach((element)=>{
            sort[element.id] = 1
            if (element.desc) {
                sort[element.id] = -1
            }
        })

        return sort
    }

    async getMysqlData() {
        let data = await this.rdbmsModel
            .query()
            .where('organization_code', this.orgCode)
            .fetch()
        let fetchedData = data.toJSON()
        return fetchedData[0]
    }

    async reload() {
        /**
         * fetchedData is still unused
         * this will be used for merging mysql and mongodb
         */
        // let fetchedData = await this.getMysqlData();

        let count = await this.model.count({organization_code: this.orgCode})

        let filters = this.getFilters(this.params['filtered'])
        let query = {
            organization_code: this.orgCode,
            ...filters
        }

        let sort = this.getSorts(this.params['sorted'])
        let datatable = await this.model
            .find(query)
            .skip(this.params['pageSize'] * this.params['page'])
            .limit(this.params['pageSize'])
            .sort(sort)
        return {
            lists: datatable,
            // pages: Math.ceil(Math.ceil(count / this.params['pageSize']))
            pages: Math.ceil(count / this.params['pageSize'])
        }
    }

}

module.exports = MongoDataTableService