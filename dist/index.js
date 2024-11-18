"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const ApiResponse_1 = __importDefault(require("./infra/ApiResponse"));
const apiTokenMiddleware_1 = __importDefault(require("./middlewares/apiTokenMiddleware"));
const Logger_1 = __importDefault(require("./infra/Logger"));
const strings_1 = require("./constants/strings");
const faviconController_1 = __importDefault(require("./controllers/faviconController"));
const uploadMiddleware_1 = __importDefault(require("./middlewares/uploadMiddleware"));
const shortBioService_1 = require("./services/shortBioService");
const shortBioController_1 = __importDefault(require("./controllers/shortBioController"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const loggerInfra = new Logger_1.default();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 6002;
    // set up EJS
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.join(__dirname, 'views'));
    // serve static files
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // web routes (before API routes)
    app.get('/', (req, res) => {
        res.render('pages/home', {
            main: `<section class="profile-section" id="bio">
<img src="https://yactouat.com/images/profile_pic.webp" alt="Yacine Touati" class="profile-pic">
<div>

    <!-- short bio: TODO make it dynamic -->
    ${(0, shortBioService_1.readShortBio)()}
</div>
</section>

<section class="where-to-find-me" id="links">
<h2 class="headings-h2">Where to find me</h2>
<div class="social-links">
    <a href="https://comeup.com/fr/@yacinetouati" target="_blank">comeup.com</a>
    <a href="https://github.com/yactouat?preview=true" target="_blank">GitHub</a>
    <a href="https://www.meetup.com/fr-FR/members/313767573/" target="_blank">Meetup</a>
    <a href="https://stackoverflow.com/users/9499355/yactouat" target="_blank">Stack Overflow</a>
</div>
</section>

<!-- services: TODO make them dynamic -->
<section class="services" id="services">
<h2 class="headings-h2">Services</h2>
<div class="services-grid">
    <div class="service-card">
        <h3>Full-Stack Development</h3>
        <p>Building end-to-end web applications with modern technologies and best practices.</p>
    </div>
    <div class="service-card">
        <h3>API Development</h3>
        <p>Creating robust and scalable APIs to power your applications.</p>
    </div>
    <div class="service-card">
        <h3>DevOps & Infrastructure</h3>
        <p>Setting up and maintaining CI/CD pipelines and cloud infrastructure.</p>
    </div>
    <div class="service-card">
        <h3>AI & Machine Learning</h3>
        <p>Implementing agentic applications, computer vision, and predictive modeling solutions.</p>
    </div>
    <div class="service-card">
        <h3>Technical Training</h3>
        <p>Empowering teams through comprehensive technical training and mentorship.</p>
    </div>
    <div class="service-card">
        <h3>Technical Writing</h3>
        <p>Delivering clear documentation, articles, and technical content.</p>
    </div>
    <div class="service-card">
        <h3>Web Optimization</h3>
        <p>Improving performance, SEO, and maintaining existing codebases.</p>
    </div>
    <div class="service-card">
        <h3>Data Collection</h3>
        <p>Building efficient scrapers and data collection systems.</p>
    </div>
</div>
</section>

<!-- skills: TODO make them dynamic -->
<section id="skills">
<h2 class="headings-h2" style="text-align: center">Skills</h2>
<div class="skills">
    <span class="skill-tag">.NET</span>
    <span class="skill-tag">Agentic Applications</span>
    <span class="skill-tag">Docker</span>
    <span class="skill-tag">GCP</span>
    <span class="skill-tag">LangChain/LangGraph</span>
    <span class="skill-tag">Machine Learning</span>
    <span class="skill-tag">Node.js</span>
    <span class="skill-tag">Organic SEO</span>
    <span class="skill-tag">PHP</span>
    <span class="skill-tag">PostgreSQL</span>
    <span class="skill-tag">Python</span>
    <span class="skill-tag">React</span>
    <span class="skill-tag">Redis</span>
</div>
</section>`,
            nav: `<nav class="internal-nav">
    <div class="nav-links">
        <a href="#bio">Bio</a>
        <a href="#links">Links</a>
        <a href="#services">Services</a>
        <a href="#skills">Skills</a>
    </div>
</nav>`,
            style: 'home',
            title: 'Home'
        });
    });
    const apiRouter = (0, express_1.Router)();
    apiRouter.get('/', (req, res) => {
        res.json(new ApiResponse_1.default("yactouat.com API is up"));
    });
    apiRouter.post('/favicon', apiTokenMiddleware_1.default, uploadMiddleware_1.default, (req, res) => {
        (0, faviconController_1.default)(req, res);
    });
    apiRouter.post('/short-bio', apiTokenMiddleware_1.default, uploadMiddleware_1.default, (req, res) => {
        (0, shortBioController_1.default)(req, res);
    });
    // 500 error handler for API routes
    apiRouter.use('*', (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield loggerInfra.logMessage({
            context: strings_1.SERVICE_NAME,
            message: err.message,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponse_1.default('Something went wrong, please try again later'));
    }));
    app.use('/api', apiRouter);
    // 404 error handler
    app.get('*', (req, res) => {
        res.status(404).json(new ApiResponse_1.default('resource not found'));
    });
    app.listen(PORT, () => {
        loggerInfra.logMessage({
            context: strings_1.SERVICE_NAME,
            message: `${strings_1.SERVICE_NAME} is running on http://localhost:${PORT}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "INFO");
    });
}))();
