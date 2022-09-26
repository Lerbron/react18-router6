const SERVER_PORT = 3000
const SERVER_HOST = '0.0.0.0'
const PROJECT_NAME = "React18+Router6"
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  isDev,
  PROJECT_NAME,
  SERVER_PORT,
  SERVER_HOST
}