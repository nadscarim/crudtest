module.exports = {
    title: 'Project - {page}',
    copyright: '2019 TMJP Engineers',
    prompt: {
        default: {
            title: 'Prompt'
        },
        success: {
            title: 'Saved!',
            text: 'You have successfully saved your entry.'
        },
        fail: {
            title: 'Oh No!',
            text: 'The row selected is not available on our database anymore.'
        },
        button: {
            yes: 'Yes',
            no: 'No',
            okay: 'Okay',
            confirm: 'Confirm',
            cancel: 'Cancel'
        },
        warning: {
            title: 'Hold on...',
            text: 'Are you sure you want to do this?',
            disable: {
                text: 'Are you sure you want to disable this user?'
            },
            enable: {
                text: 'Are you sure you want to enable this user?'
            }
        }
    },
    datatable: {
        prev: 'Prev',
        next: 'Next',
        loading: 'Loading ...',
        noData: 'No record(s) found.',
        page: 'Page',
        rows: 'rows',
        edit: 'Edit',
        delete: 'Delete'
    },
    validation: {
        header: 'Oh no!',
        required: '{field} is required',
        min: '{field} requires at least {value} characters',
        equals: '{field} should match {value}',
        email: '{field} should be a valid email',
        locale: {
            in: 'Translation not found'
        }
    }
}
