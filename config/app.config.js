import configDevelopment from './app.development.config'
import configStaging from './app.staging.config'
import configProduction from './app.production.config'

const ENV_DEVELOPMENT = 'development'
const ENV_STAGING = 'staging'
const ENV_PRODUCTION = 'production'

const env = process.env.CONFIG
let config = configDevelopment
if (env === ENV_STAGING) {
  config = configStaging
} else if (env === ENV_PRODUCTION) {
  config = configProduction
}

export default config
