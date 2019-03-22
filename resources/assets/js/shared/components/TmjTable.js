import React from 'react'
import PropTypes from 'prop-types'

import ReactTable from 'react-table'

const translation = window.translations.shared.datatable

class TmjTable extends React.Component {

    constructor(props) {
        super(props)
        // this.fetchData.bind(this);
        this.timeout
        this.state = {
            loading: false
        }
    }

    ref(tableInstance) {
        if (this.props.getTableInstance)
            this.props.getTableInstance(tableInstance)
    }

    fetchData(callback, data) {
        clearTimeout(this.timeout)
        this.setState({
            loading: true
        })

        this.timeout = setTimeout(() => {
            callback(data).then(() => {
                this.setState({
                    loading: false
                })
            }, () => {
                this.setState({
                    loading: false
                })
            })
        }, 500)
    }

    render() {
        // let columns = _getColumns()
        return (
            <ReactTable
                // data to be rendered
                data={this.props.data}
                // total no. of pages
                pages={this.props.pages}
                // column definition
                columns={this.props.columns}
                // checking if it is loading
                loading={this.loading}
                // handling ref of react table
                ref={this.ref.bind(this)}
                // handling of fetching of data
                onFetchData={this.fetchData.bind(this, this.props.onFetchData)}
                // it means we wil handle data in server side
                manual
                defaultPageSize={10}
                filterable

                // text translation
                previousText={translation.prev}
                nextText={translation.next}
                loadingText={translation.loading}
                noDataText={translation.noData}
                pageText={translation.page}
                ofText='/'
                rowsText={translation.rows}
                getTdProps={this.props.getTdProps}
            />
        )

    }
}

TmjTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    pages: PropTypes.number,
    columns: PropTypes.arrayOf(PropTypes.object),
    getTableInstance: PropTypes.func,
    onFetchData: PropTypes.func
}

export default TmjTable