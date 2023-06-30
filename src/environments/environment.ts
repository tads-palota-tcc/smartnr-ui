export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    tokenAllowedDomains: [ 'localhost:8080' ],
    tokenDisallowedRoutes: ['http://localhost:8080/auth/login', 'http://localhost:8080/auth/refresh-token']
}