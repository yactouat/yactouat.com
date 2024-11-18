import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';
import path from 'path';

import ApiResponseInfra from './infra/ApiResponse';
import apiTokenMiddleware from './middlewares/apiTokenMiddleware';
import LoggerInfra from './infra/Logger';
import { SERVICE_NAME } from './constants/strings';
import updateFavicon from './controllers/faviconController';
import uploadMiddleware from './middlewares/uploadMiddleware';
import { readShortBio } from './services/shortBioService';
import updateShortBio from './controllers/shortBioController';
(async () => {
    const loggerInfra = new LoggerInfra();

    const app = express();
    const PORT = process.env.PORT || 6002;

    // set up EJS
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cors());
    app.use(express.json());

    // web routes (before API routes)
    app.get('/', (req: Request, res: Response) => {
        res.render('pages/home', {
            main: `<section class="profile-section" id="bio">
<img src="https://yactouat.com/images/profile_pic.webp" alt="Yacine Touati" class="profile-pic">
<div>
    ${readShortBio()}
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

    const apiRouter = Router();

    apiRouter.get('/', (req: Request, res: Response) => {
        res.json(new ApiResponseInfra("yactouat.com API is up"));
    });

    apiRouter.post('/favicon', apiTokenMiddleware, uploadMiddleware, (req: Request, res: Response) => {
        updateFavicon(req, res);
    });

    apiRouter.post('/short-bio', apiTokenMiddleware, uploadMiddleware, (req: Request, res: Response) => {
        updateShortBio(req, res);
    });

    // 500 error handler for API routes
    apiRouter.use('*', async (err: Error, req: Request, res: Response, next: NextFunction) => {
        await loggerInfra.logMessage({
            context: SERVICE_NAME,
            message: err.message,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponseInfra('Something went wrong, please try again later'));
    });

    app.use('/api', apiRouter);

    // 404 error handler
    app.get('*', (req: Request, res: Response) => {
        res.status(404).json(new ApiResponseInfra('resource not found'));
    });

    app.listen(PORT, () => {
        loggerInfra.logMessage({
            context: SERVICE_NAME,
            message: `${SERVICE_NAME} is running on http://localhost:${PORT}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "INFO");
    });
})();