import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';
import path from 'path';

import ApiResponseInfra from './infra/ApiResponse';
import LoggerInfra from './infra/Logger';
import { SERVICE_NAME } from './constants/strings';
import updateFavicon from './controllers/faviconController';
import uploadMiddleware from './middlewares/uploadMiddleware';

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

    <!-- short bio: TODO make it dynamic -->
    <h2 class="headings-h2">who I am</h2>
    <p>👋 Hello, I'm Yacine.</p>
    <p>I'm a software developer and an optimistic futurist. I am passionate about tech, AI, software engineering,
        and
        web development.</p>
    <p>Consider me as your go-to problem solver for any tasks that involve systems engineering, software
        engineering,
        deployment, and for training your team as well. I am a passionate lifelong learner, and I'm eager to tackle
        your
        next challenges, regardless of the technologies you are using: it's not about the tools, it's about which
        ones
        you chose and how you use them to build and repair your systems ;) I've made the commitment to always stay
        on
        top of things, tech-wise, so count me in as your powerful and versatile ally to face the complexity of your
        challenges.</p>
    <p>After ten years of service in the French Ground Army and various missions abroad, I've came back to the
        civilian
        life and realized how much technology has the potential to empower and improve everyone's life, from the
        little
        things that make it more pleasant to the big issues that we need to resolve as a society: this is why, in
        2018,
        I've decided to become a software developer.</p>
    <h2 class="headings-h2">what I do</h2>
    <p>As a builder, I can help you create and maintain:</p>
    <ul>
        <li>full-stack distributed web applications using various software programming languages (Python, Node.js,
            PHP,
            .NET), environments (on-premise, serverless, Kubernetes), and databases (PostgreSQL, MongoDB,)</li>
        <li>optimizations to manage the complexity of your application stacks by leveraging caches and queues
            (Redis),
            messaging systems (Pub/Sub), telemetry (for instance, with Google Cloud monitoring offerings), and more!
        </li>
        <li>CI/CD pipelines on the GCP and serverless solutions using Kubernetes or plain containers, for instance
            with
            Google Cloud Run</li>
        <li>powerful generative AI workflows to meet your organizational goals (RAG systems, agentic data
            collection,
            public facing agentic natural language interfaces, etc.) using tools like LangChain, LangGraph, or
            LlamaIndex</li>
        <li>ML computer vision or tabular data models that can be deployed on various stacks, even legacy ones
            (using
            ONNX)</li>
    </ul>
    <p>As a trainer, I can teach you and your team all of the above so that your organization can navigate technical
        challenges with ease!</p>
    <p>I had the opportunity of working for a wide array of organizations, of various scales, using a wide array of
        technologies. Some of my work included:</p>
    <ul>
        <li>building chatbots to help employees of a construction cie take their vacation from within a messaging
            application on their smartphone, greatly reducing the workload for the HR department</li>
        <li>deploying high-traffic websites that are visited daily by one-fourth of the English-speaking world (<a
                href="https://www.cinemablend.com/">cinemablend.com</a>, <a
                href="https://www.whattowatch.com/">whattowatch.com</a>, <a
                href="https://moneyweek.com/">moneyweek</a>,
            and many other <a href="https://futureplc.com/">Future PLC</a> websites, where I worked as DevOps
            Software
            Engineer)</li>
        <li>deploying a computer vision model to meet an OCR SLA for a cie that needed to process hand-written forms
            at
            scale; the solution I've implemented using PyTorch saw an increase of 30% hand-written forms correctly
            parsed</li>
        <li>building and deploying a web API and its frontend for <a href="https://qperfect.io/">a startup that
                provides
                quantum computing as a service</a> so that their team could focus on their core product</li>
        <li>training adults to write and deploy software for well-known e-learning and in situ training platforms,
            such
            as <a href="https://www.udacity.com/">Udacity</a>, <a
                href="https://openclassrooms.com/en/">OpenClassrooms</a>, and <a
                href="https://www.wildcodeschool.com/fr-fr/">Wild Code School</a>: one of my greatest prides is that
            several of my students did find a job and are now accomplished software developers!</li>
        <li>… and many more stuff!</li>
    </ul>
    <h2 class="headings-h2">how I work</h2>
    <ul>
        <li>
            <p><strong>Collaboration and Knowledge Sharing:</strong> In addition to delivering solutions — It's very
                important to me that your team is provided with the tools to understand, maintain, and expand these
                solutions. My training services ensure that your organization is equipped to handle future
                challenges
                independently, fostering long-term success, without knowledge silos.</p>
        </li>
        <li>
            <p><strong>Commitment to Excellence:</strong> I am committed to excellence, ensuring that every solution
                I
                deliver is of the highest quality and tailored to exceed client expectations. I take a personalized
                approach to every project, ensuring that I fully understand your unique challenges and goals. This
                allows me to deliver solutions that are perfectly tailored to your specific needs.</p>
        </li>
        <li>
            <p><strong>Discipline</strong>: My military experience has shaped my approach to problem-solving,
                instilling
                discipline, tactical thinking, and an unwavering commitment to achieving the mission —qualities that
                I
                now bring to every project in the tech world.</p>
        </li>
        <li>
            <p><strong>Integrity and Reliability:</strong> Integrity and reliability guide my work, ensuring that I
                am a
                trustworthy partner who delivers on promises and stands by my clients through every challenge.</p>
        </li>
        <li>
            <p><strong>Lifelong Learner Growth Mindset:</strong> I am committed to lifelong learning, continuously
                expanding my knowledge to stay at the forefront of technological advancements, ensuring that my
                clients
                always benefit from the latest and most effective solutions.</p>
        </li>
        <li>
            <p><strong>Optimism and Futurism:</strong> I believe in the power of technology to empower individuals
                and
                organizations, making life better and solving complex challenges. As an optimistic futurist, I bring
                a
                forward-thinking perspective to every project, ensuring that the solutions I deliver not only meet
                today's needs but also position your business for future success.</p>
        </li>
        <li>
            <p><strong>Versatility:</strong> I bring versatility across a wide array of programming languages,
                environments, and tools. This allows me to provide comprehensive, integrated solutions tailored to
                the
                specific needs of your project. From enabling millions of users to seamlessly access high-traffic
                websites to deploying AI models that transformed business processes, I always make sure that my work
                consistently delivers measurable impact.</p>
        </li>
    </ul>
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

    apiRouter.post('/favicon', uploadMiddleware, async (req: Request, res: Response, next: NextFunction) => {
        await updateFavicon(req, res);
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