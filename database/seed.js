module.exports = {
    rdbms: {
        directory: 'rdbms',
        files: [
            //'FakeSystemUserDatumSeeder.js',
            //'FakeOrganizationSeeder.js',
            // 'FakeTenantUserSeeder.js',
            'DefaultSystemUserSeeder.js',
            'DefaultOrganizationSeeder.js',
            'DefaultTenantUserSeeder.js'
        ]
    },

    mongo: {
        directory: 'mongo',
        files: [
            // 'FakeSeederMongo.js'
            // 'ConversationSeederMongo.js',
            // 'ScheduleSeederMongo.js',
            // 'EmployeeScheduleConversationsSeederMongo.js',
            // 'DefaultScheduleSeederMongo.js',
            'DefaultHomeSeeder.js'
        ]
    },
    // development seeders
    dev: {
        directory: 'dev',
        files: [
            //'ChatbotSeeder.js',
        ]
    },
    // production seeder
    prod: {

    }
}
