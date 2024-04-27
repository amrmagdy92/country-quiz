// Base Module
import express from "express"

// Security Modules
import cors from "cors"
import helmet from "helmet"
import csp from "helmet-csp"
import expressRateLimiter from "express-rate-limit"

// Environment configuration
import dotenv from "dotenv"

// Database Singleton

// Request handlers
import bodyParser from "body-parser"
import compress from "compression"

// Routers

// app configuration
dotenv.config()
const configuredBodyParserJSON = bodyParser.json()
const configuredBodyParserURLEncoding = bodyParser.urlencoded({ extended: true })   
const configuredCompress = compress()

// Security Configurations
const configuredHelmet = helmet({ crossOriginResourcePolicy: false })
const configuredCSP = csp({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net"],
        styleSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net"],
        imgSrc: ["'self' 'unsafe-inline'"]
    }
})
const configuredCors = cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: process.env.CORS_CREDENTIALS
})
const configuredRateLimiter = expressRateLimiter({
    window: process.env.RATE_WINDOW,
    max: process.env.RATE_MAX,
    message: process.env.RATE_MESSAGE,
    Headers: true,
    keyGenerator: (req, res) => {
        return req.ip
    }
})

// Database connection

// App initialization
const app = express()
app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURLEncoding)
app.use(configuredCompress)
app.use(configuredHelmet)
app.use(configuredCSP)
app.use(configuredCors)
app.use(configuredRateLimiter)
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("index.html")
})

// Routes

// Export
export default app