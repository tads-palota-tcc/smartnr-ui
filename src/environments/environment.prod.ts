export const environment = {
    production: true,
    apiUrl: 'https://api.smartnr.com.br',
    tokenAllowedDomains: [ 'api.smartnr.com.br' ],
    tokenDisallowedRoutes: ['https://api.smartnr.com.br/auth/login', 'https://api.smartnr.com.br/auth/refresh-token']
}