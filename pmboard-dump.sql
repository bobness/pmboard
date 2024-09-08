--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name text NOT NULL,
    product_id bigint NOT NULL,
    index integer
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: evidence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evidence (
    id integer NOT NULL,
    name text NOT NULL,
    url text,
    icon text,
    persona_id bigint,
    created_date date,
    modified_date date,
    story_id bigint,
    company_id bigint
);


ALTER TABLE public.evidence OWNER TO postgres;

--
-- Name: evidence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evidence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evidence_id_seq OWNER TO postgres;

--
-- Name: evidence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evidence_id_seq OWNED BY public.evidence.id;


--
-- Name: journey_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journey_steps (
    id integer NOT NULL,
    x text NOT NULL,
    y text NOT NULL,
    journey_id bigint,
    tag_id text NOT NULL,
    tag_class_name text,
    tag_text text,
    type text
);


ALTER TABLE public.journey_steps OWNER TO postgres;

--
-- Name: journeySteps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."journeySteps_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."journeySteps_id_seq" OWNER TO postgres;

--
-- Name: journeySteps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."journeySteps_id_seq" OWNED BY public.journey_steps.id;


--
-- Name: journeys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journeys (
    id integer NOT NULL,
    story_id bigint NOT NULL
);


ALTER TABLE public.journeys OWNER TO postgres;

--
-- Name: journeys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.journeys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.journeys_id_seq OWNER TO postgres;

--
-- Name: journeys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.journeys_id_seq OWNED BY public.journeys.id;


--
-- Name: personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas (
    id integer NOT NULL,
    name text NOT NULL,
    product_id bigint NOT NULL,
    index integer
);


ALTER TABLE public.personas OWNER TO postgres;

--
-- Name: personas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personas_id_seq OWNER TO postgres;

--
-- Name: personas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personas_id_seq OWNED BY public.personas.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    id integer NOT NULL,
    name text NOT NULL,
    product_id bigint NOT NULL,
    index integer
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_id_seq OWNER TO postgres;

--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name text NOT NULL,
    product_id bigint NOT NULL,
    index integer
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: trends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trends (
    id integer NOT NULL,
    name text NOT NULL,
    type text,
    evidence_id bigint NOT NULL
);


ALTER TABLE public.trends OWNER TO postgres;

--
-- Name: trends_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trends_id_seq OWNER TO postgres;

--
-- Name: trends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trends_id_seq OWNED BY public.trends.id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: evidence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence ALTER COLUMN id SET DEFAULT nextval('public.evidence_id_seq'::regclass);


--
-- Name: journey_steps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journey_steps ALTER COLUMN id SET DEFAULT nextval('public."journeySteps_id_seq"'::regclass);


--
-- Name: journeys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journeys ALTER COLUMN id SET DEFAULT nextval('public.journeys_id_seq'::regclass);


--
-- Name: personas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas ALTER COLUMN id SET DEFAULT nextval('public.personas_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: trends id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trends ALTER COLUMN id SET DEFAULT nextval('public.trends_id_seq'::regclass);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, product_id, index) FROM stdin;
1	CRA	1	\N
2	SRI	1	\N
3	Y-Combinator	1	\N
4	Start Garden	1	\N
5	Productboard	2	\N
6	New technologies (e.g., on Product Hunt)	5	\N
7	Digg	3	\N
8	Slashdot	3	\N
9	Apple News(+)	3	\N
10	Twitter	3	\N
11	Twitch	3	\N
12	c1	4	\N
13	c2	4	\N
14	All Job Boards	6	\N
15	Fiverr	6	\N
16	Upwork	6	\N
\.


--
-- Data for Name: evidence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evidence (id, name, url, icon, persona_id, created_date, modified_date, story_id, company_id) FROM stdin;
1	Datagotchi Proposal	https://docs.google.com/document/d/1RPeGXVGPUrk8QH6lbqhpY_5ir7IHRzseGDIGhnr5KhM/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	1	\N	\N	\N	\N
4	Dear Founders, Before Pitching to an Investor, Prepare an Investment Memo _ by Wayne Wee _ Jun, 2024 _ Startup Stash.pdf	https://drive.google.com/file/d/1KSqZXEJqZVhAQEKEWUJxnIEvfuHyHyQP/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-11	2024-08-11	\N	\N
5	Strategies For Getting VCs To Compete For Your Startup _ Medium.pdf	https://drive.google.com/file/d/1SRnaY-gf8m2Z8Ihw0_U-0862ZI7WUI1v/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-11	2024-08-11	\N	\N
6	You Are Being Lied to About Building a Business in Your 40s _ by Sarina Chiu _ Career Paths _ Jul, 2024 _ Medium.pdf	https://drive.google.com/file/d/1qlGCGwL64Ym1A8g0KJJm9RBZmIxHgQOC/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-11	2024-08-11	\N	\N
7	Actual tactics (not strategies) for growing a bootstrapped B2B startup _ by Nevo David _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1Fsbw0ha6qkwTo3DopH2rV1aKerLOY3VQ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-11	2024-08-11	\N	\N
8	SaaS Is Under Pressure. SaaS has been the holy grail of… _ by Ryan Frederick _ Medium.pdf	https://drive.google.com/file/d/1xPbVyD3JBkRh3kCuJ6hbj-twGFtZkgwy/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-13	2024-08-13	\N	\N
9	How To Stay Motivated When Your Dreams Keep Drifting Into The Future _ by Alberto Cabas Vidani _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1xDjgq3UmlgGiGKoh-eK08MVUZo2WCx62/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-13	2024-08-13	\N	\N
10	Neuroscience Says This Quality Is Key for Entrepreneurial Success, and It Has Nothing to Do With Intelligence or Grit _ Inc.com.pdf	https://drive.google.com/file/d/1U-rbRJb5nwqx7XE32id_ghTYPaaQ6FCE/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-08-13	2024-08-13	\N	\N
11	Venture capitalists move toward _pay to play_.pdf	https://drive.google.com/file/d/1PnyAVHteY4quNPbWGmO8n-bKH2i5Wq_Y/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	4	2024-08-13	2024-08-13	\N	\N
13	Investor	\N	\N	\N	\N	\N	2	\N
14	PMBoard proposal	https://docs.google.com/document/d/1KzD6QLuWW0qv7SJreMW0G3Piw96x7zBmUgdLC-vCIoE/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	5	\N	\N	\N	\N
15	PMboard Self user research notes - R&D scientist	https://docs.google.com/document/d/1fDUyMO5GRTokJn5khMWPAhJCsuFUmQp62m-lYmhfDGo/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	5	2024-08-08	2024-08-08	\N	\N
16	Self user research notes - DG Labs	https://docs.google.com/document/d/1hynxBUqOSq8o_0Y2zAkbNHeUVQ36f_U1cNZTwKhubp4/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	5	2024-08-07	2024-08-07	\N	\N
17	We Need to Raise the Bar for AI Product Managers _ by Julia Winn _ Aug, 2024 _ Towards Data Science.pdf	https://drive.google.com/file/d/1EpBkloFburQh-EC1n_1wSM8rKd1tQIsS/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	6	2024-08-12	2024-08-12	\N	\N
19	Counteroffer self user research notes -- Driven	https://docs.google.com/document/d/1Z0NPKFz1AshUPttLePROeVEgmbQgujyVwR8IFfzmQ1c/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	7	\N	\N	\N	\N
27	Interview - Megan	https://docs.google.com/document/d/1udeKLySXsdG4VQp_OO8QGR4LhI6Q6fqHz4SPZpziDTg/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	8	\N	\N	\N	\N
28	Interview - Molly	https://docs.google.com/document/d/1WjmDXTRvzQ_G1n80Yb3MrJqjU9XUd4q4LsAYWmifL-4/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	8	\N	\N	\N	\N
29	Inspect: Self user research notes outline -- US citizen	https://docs.google.com/document/d/1WDL5N38AVfiZY5UGxkv3Et0H8cMnQ1WZJcID0DLlBto/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	8	\N	\N	\N	\N
30	Inspect proposal for information tracking	https://docs.google.com/document/d/1UI8zBNhSGD31j6YuBpH3rFm0wrJwLeyXt7iaZR-M1yU/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	8	\N	\N	\N	\N
31	Tracking the Reliability of Information _ Datagotchi Labs.pdf	https://drive.google.com/file/d/1KCxhnd6j8XPr5dZHJ-MaNVK3BTmUS-TF/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	8	\N	\N	\N	\N
32	Trump bizarrely blames Harris for turned-Black remark_ _She said it. I didn't say it_ (video) - Boing Boing.pdf	https://drive.google.com/file/d/1xFDIjHTSpLPZ_D5TVff92nfJz-i-YZFQ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	8	2024-08-11	2024-08-11	\N	\N
33	Inspect proposal for information tracking	https://docs.google.com/document/d/1UI8zBNhSGD31j6YuBpH3rFm0wrJwLeyXt7iaZR-M1yU/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	9	\N	\N	\N	\N
20	Counteroffer self user research notes -- Collusion	https://docs.google.com/document/d/1zPEtCLeSYJCT_3iLFYuR4U3NqAY8-ZoptGnN0RiR3XI/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	7	2024-08-06	2024-08-06	\N	\N
18	PMBoard proposal	https://docs.google.com/document/d/1KzD6QLuWW0qv7SJreMW0G3Piw96x7zBmUgdLC-vCIoE/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	7	\N	\N	\N	\N
37	We All Know AI Can’t Code, Right_ _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1Q2SncKXRLoNMBpdIOZF9HD5-8oV7aeJU/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	15	2024-08-11	2024-08-11	\N	\N
38	The Braindead Senior Dev Hypothesis _ by Andrew Zuo _ Aug, 2024 _ Medium.pdf	https://drive.google.com/file/d/1WlOWFq7uFUpUACaEaheSWvl_HThR6f5Z/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	15	2024-08-12	2024-08-12	\N	\N
39	Flood of 'junk'_ How AI is changing scientific publishing.pdf	https://drive.google.com/file/d/1oq8fJ7ur33fnvkVWij2onoHu6sN4yCJj/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-08-11	2024-08-11	\N	\N
40	We Need to Raise the Bar for AI Product Managers _ by Julia Winn _ Aug, 2024 _ Towards Data Science.pdf	https://drive.google.com/file/d/1EpBkloFburQh-EC1n_1wSM8rKd1tQIsS/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	17	2024-08-12	2024-08-12	\N	\N
41	6 hard truths of generative AI in the enterprise _ CIO.pdf	https://drive.google.com/file/d/10XYXrur15fUetRiweVg455N7aVCbxk0m/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	18	2024-08-13	2024-08-13	\N	\N
42	Remote work is bad for you. How people willingly slow down their… _ by Michal Malewicz _ Jul, 2024 _ Medium.pdf	https://drive.google.com/file/d/1jFUtbEavbyI7LmqUiysqrv75_mtET3lX/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-13	2024-08-13	\N	\N
43	There is no Developer Shortage. None of this crap really needs to exist _ by Kenneth Reilly _ Medium.pdf	https://drive.google.com/file/d/1GKgAON8U43XwIWaXr23YLQvIhLHxbj9K/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-13	2024-08-13	\N	\N
44	Tech Companies Can’t Find Good Employees and It’s Their Own Fault _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1IWBIk1pTXS7Szc-LTa32CrlZbusU1u7e/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-13	2024-08-13	\N	\N
45	Hard Core Programming is Dead. Software developers voted with their… _ by The Secret Developer _ Jun, 2024 _ Medium.pdf	https://drive.google.com/file/d/1f_8Hlk5zttqi_NrUrnT-GsqOCmz5st9o/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-12	2024-08-12	\N	\N
46	Why Most Programmers Burn Out After the Age of 40 _ by Aleena _ Jul, 2024 _ Level Up Coding.pdf	https://drive.google.com/file/d/1TWYLquN7LZwSm6Fj6pxGglvsd85EqpH-/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-11	2024-08-11	\N	\N
47	HackerX	https://docs.google.com/document/d/1rXwkoYJIM9ybNDFC7AsKWYTIw0cmegAw9JSJN5YqKvU/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	20	\N	\N	\N	\N
48	My past jobs' task breakdown	https://docs.google.com/document/d/1Sr5l76cOj8SO9R4iW2aOxfj7IqdFdpM5sjP6ahaUQ4k/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	20	\N	\N	\N	\N
49	Consulting brainstorming	https://docs.google.com/document/d/1gxjaEB-2YLZyx2slPN7VpZcAx_JUdnbDjGX2yIqsUN0/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	20	\N	\N	\N	\N
50	Petaluma businesses	https://docs.google.com/spreadsheets/d/1XbXRtRk0wm5YRRw_2A67rSS4WCDXuzpqhuQGHQbeFkA/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet	20	\N	\N	\N	\N
51	Counteroffer v3 (combined marketplace) proposal	https://docs.google.com/document/d/1YjKfPKhnFZZkUIuVCqEOKnumhzyQmG5iENBmhhqKNXw/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	20	\N	\N	\N	\N
52	Jobhunters Flood Recruiters With AI-Generated CVs - Slashdot.pdf	https://drive.google.com/file/d/1nVcQPKz-GFQeLhNE1IX-T5fKEn6RgGH6/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-08-13	2024-08-13	\N	\N
53	Counteroffer self user research notes -- Tanium (#1)	https://docs.google.com/document/d/17-ErdWqh0nhy03n90tsHjLDNSmhseAmW6QkaT1MEj6c/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	21	\N	\N	\N	\N
54	Counteroffer self user research notes -- Driven	https://docs.google.com/document/d/1Z0NPKFz1AshUPttLePROeVEgmbQgujyVwR8IFfzmQ1c/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	21	\N	\N	\N	\N
55	Counteroffer self user research notes -- Collusion	https://docs.google.com/document/d/1zPEtCLeSYJCT_3iLFYuR4U3NqAY8-ZoptGnN0RiR3XI/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	21	\N	\N	\N	\N
56	Counteroffer self user research notes -- Exaptive	https://docs.google.com/document/d/1I-kxJBTBNjiuUEgaYEW0dYNDFy98sWc1CnqPJ3KJfbc/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	21	\N	\N	\N	\N
57	Counteroffer v1 proposal	https://docs.google.com/document/d/1sncONQyNV2mrYZftuwtOll4CoHU1uJvQAx3_OR2TMPQ/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	21	\N	\N	\N	\N
58	Using Leverage to Make Demands from Employers _ Datagotchi Labs.pdf	https://drive.google.com/file/d/1d2AGhDcn9JQX9KQWz8yhmEWUqoBlOBsF/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	21	\N	\N	\N	\N
59	My New Tech Job Strategy is Doing Nothing _ by The Secret Developer _ Jun, 2024 _ Medium.pdf	https://drive.google.com/file/d/13KKCg7nQh1PU8tH2O5dQtqydP4dK3MNW/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	21	2024-08-11	2024-08-11	\N	\N
60	There is no Developer Shortage. None of this crap really needs to exist _ by Kenneth Reilly _ Medium.pdf	https://drive.google.com/file/d/1GKgAON8U43XwIWaXr23YLQvIhLHxbj9K/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	22	2024-08-13	2024-08-13	\N	\N
61	Hard Core Programming is Dead. Software developers voted with their… _ by The Secret Developer _ Jun, 2024 _ Medium.pdf	https://drive.google.com/file/d/1f_8Hlk5zttqi_NrUrnT-GsqOCmz5st9o/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	22	2024-08-12	2024-08-12	\N	\N
36	New Google Pixel 9 voice assistant Gemini is a trainwreck - Fast Company.pdf	https://drive.google.com/file/d/1v1fwScg0uJz2Q1gUCNnMnrd9Skm9JkKB/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-08-15	2024-08-15	\N	\N
62	Tech Companies Can’t Find Good Employees and It’s Their Own Fault _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1IWBIk1pTXS7Szc-LTa32CrlZbusU1u7e/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	22	2024-08-13	2024-08-13	\N	\N
63	Recruiter research: Barry Kwok	https://docs.google.com/document/d/1XyIbba5H05ckeBVqADJ3iG5PeUeX5IcQaTIoIdQWihc/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	23	\N	\N	\N	\N
64	Career Nebula	https://docs.google.com/document/d/1NhY2KogMo0ik8bqYwH1KPu6qTXv2ngeOgwGcpY44qlY/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	23	\N	\N	\N	\N
65	Counteroffer v2 (employer side, "Illuminate") proposal	https://docs.google.com/document/d/1y6aUf9A1BrprUvvlVzl-6rEpPqyNGLuvRT4tNAn32rU/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	23	\N	\N	\N	\N
66	Jobhunters Flood Recruiters With AI-Generated CVs - Slashdot.pdf	https://drive.google.com/file/d/1nVcQPKz-GFQeLhNE1IX-T5fKEn6RgGH6/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	23	2024-08-13	2024-08-13	\N	\N
67	Bandana lands new investment to help hourly wage workers find good jobs _ TechCrunch.pdf	https://drive.google.com/file/d/1WInVBD1wlZPReuL3RvGgSkPjnDAx1luN/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	24	2024-08-11	2024-08-11	\N	\N
68	Social Thought Leader	\N	\N	\N	\N	\N	15	\N
69	Social Thought Leader	\N	\N	\N	\N	\N	16	\N
70	All People	\N	\N	\N	\N	\N	17	\N
71	Techie	\N	\N	\N	\N	\N	20	\N
72	Techie	\N	\N	\N	\N	\N	21	\N
73	Unemployed Techie	\N	\N	\N	\N	\N	21	\N
74	Employed Techie	\N	\N	\N	\N	\N	21	\N
78	Product Manager	\N	\N	\N	2024-08-17	2024-08-17	22	\N
21	Counteroffer self user research notes -- Exaptive	https://docs.google.com/document/d/1I-kxJBTBNjiuUEgaYEW0dYNDFy98sWc1CnqPJ3KJfbc/edit?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document	7	2024-08-06	2024-08-06	\N	\N
89	Signal Is More Than Encrypted Messaging. Under Meredith Whittaker, It’s Out to Prove Surveillance Capitalism Wrong _ WIRED.pdf	https://drive.google.com/file/d/1GoGt7MGmAcJ00KZc5BXF35Da-LLSNHhN/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-08-30	2024-08-30	\N	\N
90	8 Tips To Optimize Your Resume For Applicant Tracking Systems.pdf	https://drive.google.com/file/d/1hN9MpgdPMoQ61V6K-D9LLaLoL28q3act/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-08-30	2024-08-30	\N	\N
91	A podcast gives an inside look at how the far-right is mainstreaming itself _ Vox.pdf	https://drive.google.com/file/d/1zG2ya3m0cgX95q67xF4paztFv5jdAV6j/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	8	2024-08-30	2024-08-28	\N	\N
92	The End of the Creator Economy. YouTubers and TikTokers are the new… _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1gA817iA4-PlaG4KqUgW7E1irQ72cRFrS/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	9	2024-08-30	2024-08-27	\N	\N
94	Stakeholder Wants vs. User Needs_ Why Following Orders Creates Bad Products _ by Michael H. Goitein _ Aug, 2024 _ Product Coalition.pdf	https://drive.google.com/file/d/19v0-abf0uZOvfVY7thO08j1aBWgo6iLo/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	7	2024-08-30	2024-08-27	\N	\N
95	Stakeholder Wants vs. User Needs_ Why Following Orders Creates Bad Products _ by Michael H. Goitein _ Aug, 2024 _ Product Coalition.pdf	https://drive.google.com/file/d/19v0-abf0uZOvfVY7thO08j1aBWgo6iLo/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	6	2024-08-30	2024-08-27	\N	\N
96	AI Influencers Are Falling for Hoaxes and Scams.pdf	https://drive.google.com/file/d/1LlDagjF8pF0j1huBTcMRC7Yxs64hJN_H/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-08-30	2024-08-26	\N	\N
97	Why Artificial Intelligence Hype Isn't Living Up To Expectations.pdf	https://drive.google.com/file/d/17WhE-Zpctp2DTxaaZw5T2hLXGVSqrhbW/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-08-30	2024-08-26	\N	\N
98	Paperguide - Discover, read, write and manage research with ease using AI _ Product Hunt.pdf	https://drive.google.com/file/d/1KMsPslHVvz-3LVn9ohpEYhfGTdCcIskU/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	\N	2024-08-30	2024-08-26	\N	6
35	Is Your Rent an Antitrust Violation_ - The Atlantic.pdf	https://drive.google.com/file/d/1Y-XQbq-dnVOde9GjSjjQ4lPzDaXU6de1/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-08-11	2024-08-11	\N	\N
99	uBest - Efficient hiring made simple _ Product Hunt.pdf	https://drive.google.com/file/d/1MJtisFPns-0nVwGAqFWT2v7L5wbCG5O0/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	\N	2024-08-30	2024-08-26	\N	6
101	The problem with growth_ why everything is failing now _ by Joanna Weber _ Aug, 2024 _ UX Collective.pdf	https://drive.google.com/file/d/1hnIZUTqz3iSYMILQg44Yu6u2008yIam0/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	7	2024-08-30	2024-08-23	\N	\N
102	A Recruiter Actually Said This to Me _ by Courtney Leigh _ Writers’ Blokke _ Medium.pdf	https://drive.google.com/file/d/1Kc69DyY76h6jgMSbJWrJQns20ZhKYbxx/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-08-30	2024-08-23	\N	\N
103	Venture capital is full of distribution deadbeats.pdf	https://drive.google.com/file/d/1P8iWm3ujKLmMzDFKTazsCcISvQnQBdLT/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	4	2024-08-30	2024-08-20	\N	\N
104	GM cuts 1,000 software jobs as it prioritizes quality and AI _ TechCrunch.pdf	https://drive.google.com/file/d/1r8CWTz55kNdjSf572hRFFC9ptDZmsGSE/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-08-30	2024-08-20	\N	\N
105	The Tech Industry Finally Broke the Spirit of Its Last Great Employee _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1wdIBJ5Dw4UQfuUKmDztkpyt6SbKV067o/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-08-30	2024-08-20	\N	\N
106	Startups Take Longer To Close Rounds, As Funding Cliff Looms.pdf	https://drive.google.com/file/d/1C_OZmc9vp40r_PegKmcBqqXf7DfH6OXJ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-08-19	\N	\N
107	Why Side Hustles And Portfolio Careers Are The Future Of Work.pdf	https://drive.google.com/file/d/1YGDNp8eThFObO08V3BKS6kc_U5Voi9WR/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-09-02	2024-05-16	\N	\N
108	How Work Became Toxic In 2024. The real reason for the death of… _ by Joe Procopio _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1p0IHt41GBykfDo8lgOpn4_iSxzAZ2prZ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	21	2024-08-16	2024-08-16	\N	\N
109	Start With Why AI. Stop poisoning your business with AI… _ by Cassie Kozyrkov _ Aug, 2024 _ Medium.pdf	https://drive.google.com/file/d/133QYoaQSiSxvWL_zDrRvdjjiOnwtAYRc/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-09-02	2024-08-16	\N	\N
110	The end of the internet. can be closer than we think _ by Michal Malewicz _ Medium.pdf	https://drive.google.com/file/d/1MRT_ABLNwF5ex6oiu-8PnZz8TTn0LdgU/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-08-16	\N	\N
111	The end of the internet. can be closer than we think _ by Michal Malewicz _ Medium.pdf	https://drive.google.com/file/d/1MRT_ABLNwF5ex6oiu-8PnZz8TTn0LdgU/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-08-16	\N	\N
112	Do You Know the Difference Between a Customer and a Buyer_ _ by Aaron Dinin, PhD _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1sQaBRP9ouV_qTILm1U614iaWcn7_zYBG/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	7	2024-09-02	2024-08-16	\N	\N
113	Do You Know the Difference Between a Customer and a Buyer_ _ by Aaron Dinin, PhD _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1sQaBRP9ouV_qTILm1U614iaWcn7_zYBG/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	6	2024-09-02	2024-08-16	\N	\N
114	“Disruptive” Technologies from 2016 _ by Jacob Bartlett _ Aug, 2024 _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1TFSxrQG-nInZlBmtSfPWDIBrq32CG4t_/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-08-16	\N	\N
115	Have IT Companies Lost Their Minds_ _ by Aleena _ Aug, 2024 _ Level Up Coding.pdf	https://drive.google.com/file/d/1-QJLvtyyk35OlG3JPVPOLUw56AZjZjlN/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-09-02	2024-08-17	\N	\N
116	Yes, AI burnout is already happening at work.pdf	https://drive.google.com/file/d/1GBkC4rsSA075QUB4aU4QNDGv3bWCsy-p/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	21	2024-09-02	2024-08-17	\N	\N
117	Yes, AI burnout is already happening at work.pdf	https://drive.google.com/file/d/1GBkC4rsSA075QUB4aU4QNDGv3bWCsy-p/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-08-17	\N	\N
118	Remote work is becoming less available (if you're not a CEO).pdf	https://drive.google.com/file/d/1zXCekTWzM4h8W7zwb0nhHMvlm5cip-4l/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	21	2024-09-02	2024-08-17	\N	\N
119	Power-hungry AI data centers are raising electric bills and blackout risk.pdf	https://drive.google.com/file/d/17gZZONzP9ALjqEuDJ0N_J-4e6D-u5QOz/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-08-18	\N	\N
120	Should technology teams sell products_ _ by Kike Peña _ Aug, 2024 _ UX Collective.pdf	https://drive.google.com/file/d/1ZoPEi7JeqrcsB2OEl4wagoIaI9wNn5Ds/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	7	2024-09-02	2024-08-31	\N	\N
121	What laid-off tech workers need to know about the industry – NBC Bay Area.pdf	https://drive.google.com/file/d/1WSKipDmm_6I20rAQW6c7vKyQ9C-9isMq/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-09-02	2024-08-31	\N	\N
122	Investors are already valuing OpenAI at over $100B on the secondaries market _ TechCrunch.pdf	https://drive.google.com/file/d/1pc0xbQ5j8cbOZHGS_id9TMhzFPtQwWuk/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	4	2024-09-02	2024-08-31	\N	\N
123	Illegal Age Discrimination Isn’t Common in Tech. Here’s What Is. _ by Dr. Derek Austin 🥳 _ Career Programming _ Aug, 2024 _ Medium.pdf	https://drive.google.com/file/d/1azua8zQUml-5heUi2TDUJ3KAbTP09Ser/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-09-02	2024-08-31	\N	\N
124	How To Craft An Offer So Good, People Say “Shut Up And Take My Money!” _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1Hle9Vvsn4Rn8YoapUx_CzB_6SctzGwTJ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-08-31	\N	\N
125	How to Pitch to Angels—Your Early Stage Investors _ by DC Palter _ Entrepreneurship Handbook.pdf	https://drive.google.com/file/d/1jWdVWlN0Fb18qP8NuZUFqOn6tKWt_xRl/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-09-02	\N	\N
126	There’s a Reason Things Feel So Damn Hard Right Now _ by Peter Shanosky _ Jul, 2024 _ Medium.pdf	https://drive.google.com/file/d/1WavBHQyRQwxfpvWyK_sHTzVcvj1ApaHY/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	20	2024-09-02	2024-09-02	\N	\N
128	Going Back to Work Made Me Realize How Pointless It Is _ by Aure's Notes _ Notes _ Aug, 2024 _ Medium.pdf	https://drive.google.com/file/d/1Gff2ed0MpHUnGUCRY1YnSNNqKjMPHNax/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	19	2024-09-02	2024-09-02	\N	\N
129	Generative AI Transformed English Homework. Math Is Next _ WIRED.pdf	https://drive.google.com/file/d/1iZFjiMGk3Z-8mWH0wEeUrtBTRZ3HFtYj/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-09-02	2024-09-02	\N	\N
130	Fight Health Insurance uses AI to appeal claim denials.pdf	https://drive.google.com/file/d/1-kffqOKMwt-9pdJNY6wnPIjz0T87P2Oa/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
131	VC Roundup_ Blockchain startups remain popular among investors in August.pdf	https://drive.google.com/file/d/1IbqvTtm9omWUJ7m1P-b3Oi1y_MAoKoaQ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	4	2024-09-02	2024-09-02	\N	\N
132	How To Become an Entrepreneur in 2024 – Forbes Advisor INDIA.pdf	https://drive.google.com/file/d/1v8JYwT5FHaLzO6iAjWrGOH5xja9l4Url/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	3	2024-09-02	2024-09-02	\N	\N
133	California lawmakers approve legislation to ban deepfakes, regulate AI _ AP News.pdf	https://drive.google.com/file/d/1HpT-bG7_4j9UzHa6gwt8ESVdlCYc_o1u/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
134	AI Image Generators Make Child Sexual Abuse Material (CSAM) - IEEE Spectrum.pdf	https://drive.google.com/file/d/13eklLKnBce-s95qhx3S98_GDfTWO9usG/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
135	ChatGPT hits 200 million active weekly users, but how many will admit using it_ _ Ars Technica.pdf	https://drive.google.com/file/d/169_1jQsi1VUd7gq8bWJlW2vWwZ8CnRDZ/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
136	What’s next for SB 1047_ California Gov. Newsom has the chance to make AI history _ Vox.pdf	https://drive.google.com/file/d/12O0YpMLTvc393-L2k3onKG53WkQ2Nf4z/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
137	Why A.I. Isn’t Going to Make Art _ The New Yorker.pdf	https://drive.google.com/file/d/1LkSuFYUUJu7P2-LyNW1dot0c9tHZVQHd/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	16	2024-09-02	2024-09-02	\N	\N
141	AIDP_SeekingReliableElectionInformation-DontTrustAI_2024.pdf	https://drive.google.com/file/d/1rWTWHxtRmYsA6Y8_tAtSwvVa5Z3tO-vy/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	14	2024-09-02	2024-09-02	\N	\N
142	AIDP_SeekingReliableElectionInformation-DontTrustAI_2024.pdf	https://drive.google.com/file/d/1rWTWHxtRmYsA6Y8_tAtSwvVa5Z3tO-vy/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	8	2024-09-02	2024-09-02	\N	\N
143	California lawmakers approve legislation to ban deepfakes, regulate AI _ AP News.pdf	https://drive.google.com/file/d/1HpT-bG7_4j9UzHa6gwt8ESVdlCYc_o1u/view?usp=drivesdk	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf	12	2024-09-02	2024-09-02	\N	\N
147	Entrepreneurs/Startups	\N	\N	7	\N	\N	11	\N
\.


--
-- Data for Name: journey_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journey_steps (id, x, y, journey_id, tag_id, tag_class_name, tag_text, type) FROM stdin;
6	400px	50px	14	There is so much information involved in the creation of new products	objective selected	There is so much information involved in the creation of new products (1)	terminus
9	700px	170px	14	Make money	goal	Make money (1)	\N
10	50px	150px	14	Research & document stakeholder needs	goal	Research & document stakeholder needs (1)	\N
\.


--
-- Data for Name: journeys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journeys (id, story_id) FROM stdin;
14	23
\.


--
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personas (id, name, product_id, index) FROM stdin;
1	All People	1	\N
3	Entrepreneur	1	\N
4	Investor	1	\N
8	All People	3	\N
9	Social Thought Leader	3	\N
10	Journalist	3	\N
11	News Employee	3	\N
12	p1	4	\N
13	p2	4	\N
14	All People	5	\N
15	Software Engineer	5	\N
16	Researchers	5	\N
17	Product Manager	5	\N
18	CIO	5	\N
19	Techie	6	\N
20	Unemployed Techie	6	\N
21	Employed Techie	6	\N
22	Hiring Manager	6	\N
23	Recruiter	6	\N
24	Wage Workers	6	\N
5	R&D Scientist	2	0
7	Entrepreneurs/Startups	2	1
6	Product Manager	2	2
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name) FROM stdin;
1	Datagotchi Labs
2	PMBoard
3	Inspect
4	Test
5	Collaborative Copilot
6	Counteroffer
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stories (id, name, product_id, index) FROM stdin;
15	Make sharing important news on social media easier for Thought Leaders	3	\N
16	Enable Thought Leaders to synthesize news articles into new insights	3	\N
17	Enable People to consume news according to its reliability	3	\N
18	s1	4	\N
19	s2	4	\N
20	Enable all kinds of Techies to quickly apply to gigs based on specific skills	6	\N
21	Enable Techies to use CO as a career dashboard their entire lives	6	\N
22	Integrated product teams will retain employees better, make them less upset/burned out/etc.	2	6
25	Enable Entrepreneurs to document MVP test lessons	2	8
9	Enable users to link trends at different levels/types	2	9
14	Enable R&D Scientists to compare several revenue streams	2	7
4	Make new products useful to yourself first	1	0
2	Reduce investor risk aversion by being able to empathize with all stakeholders	1	1
1	Help Entrepreneurs create new startups by understanding stakeholders	1	2
5	Then rely on word-of-mouth marketing	1	3
6	Improve Michigan's startup scenes	1	4
23	Enable R&D Scientists to explore user journeys to decide on a solution	2	1
11	Assist Entrepreneurs/Startups empathizing with stakeholders using PMBoard	2	0
24	Enable R&D Scientists, Entrepreneurs, & Product Managers to manage risks across business areas	2	2
26	Enable Entrepreneurs & Product Managers to document business objectives and link them to stakeholder needs	2	4
13	For MVP iteration, users need a timeline view of lessons learned	2	5
12	Enable R&D Scientists, Entrepreneurs, and Product Managers to quickly & effectively pivot when markets/stakeholder needs change	2	3
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, name, product_id, index) FROM stdin;
26	Enable custom trend types	2	\N
27	t1	4	\N
28	t2	4	\N
29	Add web links to dg.net/inspect	3	\N
30	Fix Android app	3	\N
31	Reach out to thought leaders	3	\N
32	Base source reliability on # of shares / #of article summaries	3	\N
33	Implement user analytics	3	\N
34	Interesting because of the compartmentalization of discussions (and to some extent the knowledge base stuff)	3	\N
35	People mostly are not interested in creating summaries or spending time finding people to follow	3	\N
36	Use favorite flag to show summaries/meta-summaries on your profile	3	\N
37	Apply to gigs based on React, Express, Webpack, databases, etc.	6	\N
38	Put CO live on AWS & invite Alex	6	\N
39	MVP lesson: just visualizing skills, even ones from the job listing, is not sufficient to get a job	6	\N
40	Fiverr/client-searchable gigs are risky because it’s likely no one will ever find us	6	\N
41	No one will ever find us Partly because I don’t do hype-y things like generative AI	6	\N
42	And partly because I’m great at things no one thinks they need	6	\N
43	\tGet basic resume creation from LinkedIn CVS working again	6	\N
12	Maybe pitch startup incubation based on stakeholder empathy	1	5
23	Create a proxy, so I can use one easy to instance for all three projects	1	6
24	Reduce ec2 size while it's just me	1	7
4	MSU organization is *not* just for MSU people -- it's called Conquer	1	8
44	Look into Redux & GraphQL & backend caching	2	\N
45	Show product name > item type > item name on modal	2	\N
20	With my skills, EIR @ SG would be great (focused on nearly stage opportunity discovery &  validation) -- ask Laurie or her contact?	1	0
7	I'm incubating Datagotchi Labs to be about addressing these issues (in underserved markets/communities?) and finding novel business models to support them	1	1
10	For MI-centric messaging, maybe focus on local hires rather than remote gig workers	1	2
11	Either way, become an expert at building teams (with Counteroffer?)	1	3
13	But unless I get donations up front, perhaps with equity promises (profit dividends), this will take forever and not make much money	1	4
\.


--
-- Data for Name: trends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trends (id, name, type, evidence_id) FROM stdin;
80	To empower myself & other people with information	objective	15
608	Talk to friends and family about current events	task	27
1	Information is important to quickly and effectively make decisions		1
2	People are overloaded with information		1
3	They also have information hidden from them		1
4	They also often don’t know what to do with the information		1
5	People need access to information without being overloaded		1
6	People need access to information that is hidden from them		1
7	People need access to information that they can use		1
8	Any solution must enable people to opt-in to relevant information, and, if that’s not possible, to at least allow them to opt-out		1
9	Any solution must incentivize information sources to release it to those who desire/could use it		1
10	Any solution must both suggest relevant actions from information and flexibility to use it in novel ways		1
11	Focusing on opt-in experiences with opt-out & never experiences that have neither (advertising)		1
13	Always enabling exporting and using data in other contexts		1
89	Prototype empowering information products	activity	16
112	Integration of product information to everyone on a team creates integrated product teams (IPTs)	goal	18
85	Wordpress		16
86	Software development		16
87	Blogging		16
88	Applying to/posting gigs on Fiverr/Upwork		16
146	Often need to talk with the founders/executives to get clarity on the vision	\N	20
180	Google News	resource	27
178	Finds news in social media		27
181	Facebook		27
182	Nextdoor		27
183	Pays for NYT		27
187	LinkedIn		27
606	PMBoard	resource	18
607	Interviewing	resource	94
167	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		21
407	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		54
415	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		55
433	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		56
145	Engineers are often busy in other meetings instead of doing work		20
382	Engineers are often busy in other meetings instead of doing work		53
398	Engineers are often busy in other meetings instead of doing work		54
421	Engineers are often busy in other meetings instead of doing work		55
438	Engineers are often busy in other meetings instead of doing work		56
424	PHP		55
425	Node.js		55
426	The Collusion app		55
427	Worked in office		55
430	To be a productive engineer		56
571	Software development is often outsourced		101
564	Client/investor desires are not the same as customer needs		94
563	Clients/investors are not product customers		94
560	Ideally, talk to "superuser" people	task	94
561	Failing talking to superusers, talk to the customer support team	task	94
562	Not all users have the same importance	activity	94
565	Designing for "superusers" will result in a better product	activity	94
117	Any solution must link stakeholder needs to value propositions, then value propositions to features and their roadmaps		18
572	Software developers often have no contact with the business	objective	101
604	A strong understanding of a product’s need at the beginning of a project can empower you with solid arguments to sell in the future		120
592	Traditional waterfall approaches did not consider that user needs might change		101
559	Bringing our stakeholders along to these discussions, along with Tech and UX, would have allowed everyone to move from “building an app” to solving real people’s problems through the app.		94
591	Risk management is largely forgotten		101
590	UX research is now often just evaluative		101
566	Acting as a "waiter" means doing what stakeholders ask		94
567	Acting as a "doctor" means solving the customers' actual problems		94
569	The key is to define the problem and the way to measure success		94
568	When consulting, sometimes you need to do "waiter" things and sometimes "doctor" things		94
12	Focusing on creating two-sided marketplaces so people can share information to their benefit		1
32	Probably through generation of pitches		13
33	There is so much information involved in the creation of new products		14
34	Also a lot of information in MVP iteration		14
35	The biggest problem with startups and R&D teams is that they rarely collaborate enough		14
36	Integration of product information to everyone on a team creates integrated product teams (IPTs)		14
37	IPT members need to do stakeholder research to deeply understand the problems and the stakeholders affected by them		14
38	IPT members need to do market research to be able to explain why their solution is better than all other possible solutions		14
422	Talking with executives		55
596	A product's direct benefits/value are often not why someone would buy it		112
594	Many entrepreneurs focus on development to ship their product and ignore why customers might buy it		112
584	Most project management systems ignore user research		101
39	Any solution must integrate multimodal and qual/quant stakeholder data		14
40	Any solution must link stakeholder needs to value propositions, then value propositions to features and their roadmap		14
41	IPT members need to do MVP iteration to commercialize their product / find p-s fit and p-m fit		14
42	Any solution must any solution must track and link stakeholder research (original and with your product), market research, and product development/launches over time		14
43	Incrementally-Formalized Stakeholder Empathy Visualizations		14
44	Semantic Widget Citations		14
45	Linked Widget Timelines		14
46	Feedly		15
48	Twitter		15
49	Email		15
50	GitHub		15
51	Visual Studio Code		15
52	Reacat		15
53	Node.js		15
54	Kickstarter		15
55	AngelList		15
56	Product Hunt		15
57	Google Ads		15
58	Talk to friends and family		15
59	Email myself insights from talking to friends and family		15
60	Network to gain professional connections		15
61	Email myself insights from professional connections		15
63	Share articles/posts to myself via email		15
64	Prototype in React & Node.js in Visual Studio Code		15
65	Analyze, approve, & push code reviews on GitHub		15
67	Talk to people who might be associated to a problem space		15
68	Document insights from talking to people		15
70	Document important articles/posts		15
71	Develop & test prototypes locally		15
72	Commit code to GitHub to document it"		15
73	Try crowdfunding, investors, subscriptions, transaction fees, etc…		15
75	Research & document markets		15
76	Prototype & document solutions		15
78	To explore social problem spaces, potential solutions, & novel revenue streams		15
79	To document my learnings so I can get better/make others better over time		15
82	Upwork		16
83	Fiverr		16
84	Medium		16
90	Provide services to companies		16
91	Write online content and share it		16
92	Sharing my knowledge and skills		16
93	Documenting my knowledge and skills		16
94	To frame information so it can be used		16
95	To expose hidden information		16
96	To reduce information overload		16
97	To empower myself & other people with information		16
98	To use my knowledge and skills		16
99	LinkedIn job alerts		16
100	Counteroffer		16
101	PMBoard		16
102	Apply to jobs from LinkedIn job alerts		16
103	Improving my cover letter & Fiverr/Upwork profiles with PMBoard screenshots		16
104	Improving my resume with Counteroffer		16
105	Get a job		16
106	Make money		16
107	Afford to live by myself		16
109	There is a lot of information with through MVP iteration		18
110	There is a lot of information through growth		18
111	The biggest problem with startups and R&D teams is that they rarely collaborate enough		18
116	Any solution must integrate multimodal and qual/quant stakeholder data		18
118	Any solution must track and link stakeholder research (original and with your product), market research, and product development/launches over time		18
119	AngularJS		19
121	Google Drawing		19
122	Code Reviews		19
123	Pair programming		19
124	Talking with my boss/other executives		19
126	Constantly doing heuristic UX reviews of the product		19
127	Repeatedly measuring times between components		19
128	Checking in with teammates		19
129	Getting required tasks		19
131	To ensure my teammates were not blocked		19
132	To ensure our product performed well		19
133	To ensure our product had great UX		19
134	To be a productive engineer		19
135	To be an effective team leader		19
136	To be a productive product manager		19
137	Google Docs		19
66	Create campaigns on Kickstarter, AngelList, Product Hunt, Google Ads	task	15
77	Try & document various revenue streams	activity	15
81	PMBoard	resource	15
108	There is so much information involved in the creation of new products	objective	18
113	IPT members need to do stakeholder research to deeply understand the problems and the stakeholders affected by them		18
120	Java		19
125	Engineers are often busy in other meetings instead of doing work	objective	19
115	IPT members need to do MVP iteration to commercialize their product / find p-s fit and p-m fit		18
114	IPT members need to do market research to be able to explain why their solution is better than all other possible solutions		18
69	Stay aware of news in my feeds	activity	15
62	Read Feedly, Google News, Twitter	task	15
130	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given	objective	19
47	Google News	resource	15
74	Research & document stakeholder needs across my projects	goal	15
138	Reading sales meeting notes & enumerating insights in Google Docs		19
139	Continuously documenting & analyzing user research		19
140	Standup meetings		19
147	Constantly doing heuristic UX reviews of the product		20
148	Checking in with teammates		20
149	Getting required tasks		20
150	To design cross-platform (iPhone, iPad, laptop) user journeys		20
151	To ensure our product had great UX		20
153	To be a productive engineer		20
154	To be a productive UX designer		20
155	To be a productive product lead"		20
141	Javascript		20
142	PHP		20
157	D3.js		21
159	Rserve		21
160	Standup meetings		21
162	Talking with the founders/executives		21
163	Constantly doing heuristic UX reviews of the product		21
164	Checking in with teammates		21
165	Getting required tasks		21
166	To ensure our product had great UX		21
168	To be a productive engineer		21
169	To apply my recently-gained human-systems integration (HSI)/government R&D knowledge to startups		21
170	To be a productive assistant product lead		21
158	Python		21
143	Node.js		20
144	The Collusion app		20
156	Javascript		21
184	Uses Instagram, but not for news		27
192	Gets alerts from Apple News		28
193	Overloaded by the news		28
194	Heavy iPhone User		28
195	Trust news based on source reliability		28
196	Avoids sources with strong feelings		28
197	Cross-checks stories with other sources		28
198	Apple News		28
200	Friends		29
201	Family		29
202	Feedly		29
203	Google News		29
204	Skim news on my feeds		29
205	Read the news online		29
206	Talk to friends and family about current events		29
207	Text my friends about current events		29
208	Eat dinner with my parents with the tv on		29
209	To be well-informed about current events		29
210	Email myself news that seem important		29
211	Many of the articles are hidden behind paywalls		30
212	Social media posts about news need to be taken seriously		30
213	Overloaded by the news		30
214	Social media		30
215	Any solution must include reliability and context visualizations in summaries and shared social media posts		30
216	Many articles have clickbait headlines		30
217	Many articles have sensationalist headlines		30
218	Much news is fake: misinformation & disinformation		30
220	Trust news based on source reliability		30
221	The Thorough, Multimodal Summary Reposter		30
222	Adaptable Reliability & Context Visualizations		30
223	As the world becomes more connected and more complex, it is increasingly difficult to know what to believe		31
224	Events happen far away from us, to other people, and we usually hear about them after the fact		31
225	Since we can no longer rely on many institutions, we will need to make sense of the world ourselves		31
226	Some information sources are more reliable than others		31
227	It's difficult to know which sources are reliable		31
228	We need to determine what sources we should trust		31
229	We may also want other ways to verify the truth of claims		31
230	We still need to share true information with others in a way that they can use it both immediately and in the future		31
231	A solution is needed to reliably create and share source trust data		31
232	A solution is needed to consistently evaluate the truth of claims		31
233	A solution is needed to use true claims to improve source trust data that will help them evaluate claims against the trustworthiness of the source		31
234	Overloaded by the news		31
235	Reach people on more online platforms		33
236	Unify discussions from their posts		33
237	Need to be able to get people to take their posts seriously, trust them, and take action from them		33
238	Need to provide context with posts		33
239	Need to make posts easily actionable		33
240	Want to get the word out about important issues		33
241	The Thorough, Multimodal Summary Reposter		33
242	Adaptable Reliability & Context Visualizations		33
248	Remote work is bad for you		42
249	Remote work can kill a junior's career		42
250	Techies won't grow if they stay at one company in one domain		42
251	Digital collaboration tools don't let you really connect on ideas		42
252	Digital collaboration doesn't let you absorb everything from your coworkers		42
189	Overloaded by the news	objective	27
152	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		20
161	Engineers are often busy in other meetings instead of doing work		21
185	Trust news based on source reliability	goal	27
190	Friends	resource	27
191	Social media	resource	27
188	Cross-checks stories with other sources	activity	27
253	In-office work teaches you about how the business works		42
254	In-office work teaches you more strategic knowledge & skills		42
255	People tend to be more productive when there’s a possibility someone may directly oversee their work		42
256	To capture the in-office benefits and support remote work, hybrid roles are becoming common		42
257	Office work is stressful		42
258	Techies that need to work remotely will have slower-growing careers		42
259	Junior candidates should work at local businesses, even if they aren't very good		42
260	In-office work is good for you		42
261	Working at local businesses is "real experience"		42
262	In-office collaboration is better than remote, especially for junior people		42
263	In the United States alone there are over one million “unfilled roles” in software engineering as of 2024 and the number is rising every year		43
264	There are many roles because of Unrealistic Expectations		43
265	There are many roles because of Manipulative Practices		43
266	There are many roles because of Overdigitalization of our lives		43
267	There are many roles because of employee burnout		43
268	We should seek meaningful work in other industries to build real products or fulfill legitimate service needs for others and actually see your work being completed and appreciated by employers and customers alike		43
269	Many of the open roles are not good fits for us		43
270	Existing talent can override knowing one specific technology or having a lot of experience in it		43
271	Hiring managers think that we need to have experience in their exact tech stacks		43
272	Hiring managers are rarely as talented as the people they are hiring (and that's the point)		43
273	Senior stakeholders abuse us for their own career growth/ego		43
274	Many tech companies have laid off techies to save money		44
275	Techies were the reasons tech companies succeeded		44
276	Many job listings posted on LInkedIn aren't real/available jobs		44
277	AI rejects resume out of hand		44
278	No one can wade through so many bad job applications		44
279	Junior employees/interns also reject resumes unreasonably		44
280	lack of capacity to be able to filter the technically elite from the barely literate		44
281	Increasing lack of participation in a hiring process		44
282	Even extremely talented and accomplished candidates have to jump through hoops to get a job		44
283	There are a large number of interview sessions		44
284	There are intelligence-insulting aptitude tests		44
285	There are requests to do actual work for the company as part of the interview		44
286	Companies need to hire techies to keep releasing their products well		44
287	Software engineers value making quality software		45
288	Leaders of software engineers don't value quality software, just long hours		45
289	Software engineers & leaders have conflicting perspectives on software quality		45
290	Software engineers traditionally valued increased pay		45
291	Now software engineers are starting to value work-life balance		45
292	Continuous learning is essential for software engineers		45
293	Software engineers still seek new jobs for a pay raise		45
294	Software engineers are also looking for more fulfillment and better company culture		45
295	Since the pandemic, software engineers want to work from home more and have more control over their work		45
296	Companies are still trying to hire people to work long hours in their offices		45
297	Many people want to make impact at work		45
298	Many jobs deny software engineers from making impact		45
299	Many applications for new jobs are rejected due to not having impact at previous jobs		45
300	Technical interviews rarely filter out bad candidates, or even find good candidates		45
301	The world is changing: software engineers want more & hiring managers want to give less		45
302	Software engineers think they can find better jobs, so they are not held down by one company		45
303	Many software engineers can't get new jobs		45
304	Working from home wasn't always an option		46
305	Many of us could work from home during the pandemic		46
306	Many companies want their employees back at the office		46
307	Many people still want to work from anywhere in the world and make good money		46
308	Most companies don’t allow employees to work from anywhere		46
309	You’re expected to attend pointless daily meetings every day		46
310	There are many approaches to writing software		46
311	Many software engineers have big egos		46
312	Rewriting someone else's code can conflict with their ego		46
313	The implementation of Agile at most companies is called Scrum		46
314	The reason Scrum is so popular is that it’s easy to understand, easy to implement, and easy to teach		46
315	One could argue that Scrum is an inflexible, rigid process		46
316	Software is supposed to be changeable		46
317	Many software engineers are assigned to on-call rotations, where they need to be prepared to handle urgent customer calls during weekends or at night		46
318	Software engineers are stressed		46
319	Changing requirements can stress people out		46
320	Technologies change very fast		46
321	Engineers need to stay aware of all of them, regardless of their quality		46
322	Many technologies that were fads are not used anymore		46
323	Most engineers over 40 are experiencing burnout		46
324	One option for engineers over 40 is to go into management		46
325	Another option for engineers over 40 is to keep job hopping to find something actually good		46
326	The third option for engineers over 40 is to try to treat it like a hobby again rather than a job		46
327	Speed dating is employer-friendly		47
328	Junior developers are willing to put themselves in job opening categories		47
329	Employers were confused by my unique/seasoned skills		47
423	Javascript		55
330	Senior label is for 5-6 years of experience		47
331	Speed dating with employers		47
332	I have more than 20 years of software development experience		48
333	I have 19 years of user research experience		48
334	Main gig idea is to help with various user research tasks		48
335	I can't get a job		48
336	Looking for jobs		48
337	Looking for gigs		48
338	I thought about consulting on AI		49
339	AI is trendy right now		49
340	I have a lot of AI knowledge and experience		49
341	Most people are not aware of the true risks of AI		49
342	I thought about framing AI risks as high costs and low revenue		49
343	I thought about consulting for R&D/startups		49
344	Most people are not aware of problem-solution and product-market fit		49
345	I can't get a job		49
346	I made several versions of this file		49
347	Rather than consult on saving money from AI, I decided to let the hype bubble burst		49
348	I have > 20 years of R&D and startups		49
349	I can't get a job		50
350	I looked into consulting for local businesses		50
351	I talked to several local businesses		50
352	Local businesses are not interested in tech help		50
353	We were burned out/micromanaged at previous jobs		51
354	So many of us quit to find something better		51
355	Now we can't find any jobs		51
356	Our main desire is to work remotely		51
357	Thousands of applications for remote jobs		51
358	40% of job listings are fake		51
359	Many of us were laid off because of AI doing our work		51
360	Employers like gig jobs because they don't have to pay benefits		51
361	Many fake job listings are to collect resumes		51
362	Other fake job listings are to make it look like the company is doing well		51
363	Some of these fake listings have unicorn-like requirements		51
364	Some suggest outright lying on your resume to meet these requirements		51
365	Applicant tracking systems reject resumes due to missing keywords		51
366	Some keywords might not even be on job listings		51
367	Applicant tracking systems also compare us to "ideal candidate" profiles		51
368	We need to be able to apply to many job listings		51
369	Our applying needs to be fast and immediately when they are posted		51
370	We especially want to be confident in our applications		51
371	To be a productive engineer		53
372	To be an effective team leader		53
374	To make sure my teammates were not blocked		53
375	Getting required tasks		53
376	Getting schedules		53
377	Checking in with teammates		53
378	Standup meetings		53
379	Code reviews		53
380	Talking to platform engineers		53
381	Talking to my boss		53
383	Javascript		53
384	Node.js		53
385	The ability to talk to some of the platform engineers anytime I wanted		53
386	AngularJS		53
387	Remotely worked		53
388	To learn how mature startups commercialize their technologies		53
389	To be a productive product manager		54
390	To ensure our product had great UX		54
391	To ensure our product performed well		54
392	Constantly doing heuristic UX reviews of the product		54
393	Repeatedly measuring times between components		54
394	Checking in with teammates		54
395	Getting required tasks		54
396	Standup meetings		54
397	Code reviews		54
399	Talking to my boss		54
400	Talking with executives		54
401	Javascript		54
402	Java		54
403	Freedom to design most things how I wanted		54
404	To be a productive engineer		54
405	To be an effective team leader		54
406	To make sure my teammates were not blocked		54
408	AngularJS		54
409	Worked in office		54
410	To learn how mid-stage startups commercialize their technologies		54
411	To be a productive engineer		55
412	To be a productive UX designer		55
413	To be a productive product lead		55
414	To ensure our product had great UX		55
416	Constantly doing heuristic UX reviews of the product		55
417	To design cross-platform (iPhone, iPad, laptop) user journeys		55
418	Checking in with teammates		55
419	Getting required tasks		55
420	Standup meetings		55
373	Engineers are pressured to focus on quickly and effectively accomplish engineering tasks they were given		53
428	To learn how early-stage startups commercialize their technologies		55
429	To apply my recently-gained HSI/government R&D knowledge to startups		56
431	To be a productive assistant product lead		56
432	To ensure our product had great UX		56
434	Constantly doing heuristic UX reviews of the product		56
435	Checking in with teammates		56
436	Getting required tasks		56
437	Standup meetings		56
439	Talking with executives		56
440	Javascript		56
441	D3.js		56
442	Python		56
443	Rserve		56
444	Remotely worked		56
445	Worked in office		56
446	We need to acquire more information to decide to focus on opportunities		57
447	We need to find, compare between, and decide whether or not to apply to jobs		57
448	We need to target our application materials for each job to which we apply		57
449	Cultural norms against leaving & NC agreements keep us from working for similar companies		57
450	Seeking a better job is a tremendous commitment of time and energy		57
451	Top developers are approached by recruiters on social media platforms like LinkedIn		57
452	A solution is needed to more easily and quickly solicit additional information from recruiters		57
453	A solution is needed to more easily apply to jobs via prioritization, and measuring their fitness for the job requirements across more opportunities		57
454	A solution is needed to more easily adjust one’s application materials based directly on the job opportunities		57
455	In the pandemic, 40-95% of workers wanted to quit their jobs		58
456	Those who didn't want to quit their jobs because they are happy at their job or because they are paralyzed by the fear of not finding a new one		58
457	Many employees became less happy because they are realizing that they prefer working from home while their employer is asking them to come back to the office		58
458	Work conditions have become so bad that they are not sure how they can manage their jobs and their lives at the same time		58
459	Lack of recognition for performing well at their job and lack of support for improving are becoming all too common		58
460	Recruiting has pain points throughout the process		63
461	Many of the problems exist after sourcing		63
462	Uses GitHub to find candidates		63
463	Uses LinkedIn to find candidates		63
464	Teams often have no idea what they are looking for		63
465	Existing systems largely miss the point		63
466	Continues to rely on manual sourcing for his jobs		63
467	Seems like recruiters need help at all levels		63
468	Wants feedback collected from the recruiter		63
469	Wants to group candidates into (ideal) personas over time		63
470	Wants better initial sourcing		63
471	Focused on early-stage/funded startups		64
472	Pivoted to mostly founders		64
473	Worked with CTOs on technical jobs to get skill requirements		64
474	With CPO has to ask what does “product sense” mean to you?		64
475	Recruiters’ biggest challenge is hiring managers		64
476	First hiring manager challenge is lack of clarity and nepotism		64
477	Second hiring manager challenge is wanting unicorns		64
478	Recruiters can’t (yet?) be replaced by AI because of the human touch		64
479	He’s found that recruiters don’t need his help on how to recruit		64
480	Reach people on more online platforms		68
481	Unify discussions from their posts		68
482	Want to get the word out about important issues		68
483	Need to be able to get people to take their posts seriously, trust them, and take action from them		68
484	Need to provide context with posts		68
485	Need to make posts easily actionable		68
486	The Thorough, Multimodal Summary Reposter		68
487	Adaptable Reliability & Context Visualizations		68
488	This means implement meta-summaries, but the current idea is to cite personas here, not tasks		69
489	Visualize reliability on the article discussion page/screen		70
490	Visualize reliability on social media posts		70
491	Techies won't grow if they stay at one company in one domain		71
492	Office work is stressful		71
493	There are many roles because of Unrealistic Expectations		71
494	There are many roles because of Unrealistic Expectations		71
495	There are many roles because of Manipulative Practices		71
496	There are many roles because of Unrealistic Expectations		71
497	There are many roles because of Manipulative Practices		71
498	There are many roles because of Overdigitalization of our lives		71
598	Many startups struggle with sustainable sales growth		112
541	Linked Widget Timelines		18
597	You have to think about it from the perspective of an actual user of the software		112
542	Semantic Widget Citations		18
543	Incrementally-Formalized Stakeholder Empathy Visualizations		18
600	Product development teams do not know the reasons behind a solution		120
587	Profitable unique value proposition is needed for business strategy		101
588	Venture capitalists push startups for growth-at- all-costs		101
595	But few entrepreneurs/startups know what jobs their buyers are trying to get done		112
585	User research is needed for business strategy	objective	101
586	Market research is needed for business strategy	objective	101
603	Product sales knowledge can be used to support the rationale for a solution with teammates or internal stakeholders at any stage of a process		120
593	A new system is needed that includes all relevant product information & changes over time		101
602	Product teams usually need to respond to an area or external role that brings the customer’s performance or voice to us		120
599	Product development teams often are hidden from sales		120
601	If our focus is just the delivery part, we are only accountable for how we built something		120
186	News has become transient to people	objective	27
219	News has become transient to people	objective	30
199	News has become transient to people	objective	28
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 16, true);


--
-- Name: evidence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evidence_id_seq', 147, true);


--
-- Name: journeySteps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."journeySteps_id_seq"', 23, true);


--
-- Name: journeys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.journeys_id_seq', 15, true);


--
-- Name: personas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personas_id_seq', 24, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 6, true);


--
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stories_id_seq', 26, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 45, true);


--
-- Name: trends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trends_id_seq', 608, true);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: evidence evidence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT evidence_pkey PRIMARY KEY (id);


--
-- Name: journey_steps journeySteps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journey_steps
    ADD CONSTRAINT "journeySteps_pkey" PRIMARY KEY (id);


--
-- Name: journeys journeys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journeys
    ADD CONSTRAINT journeys_pkey PRIMARY KEY (id);


--
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: trends trends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trends
    ADD CONSTRAINT trends_pkey PRIMARY KEY (id);


--
-- Name: journey_steps u_jid_tid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journey_steps
    ADD CONSTRAINT u_jid_tid UNIQUE (journey_id, tag_id);


--
-- Name: journeys u_sid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journeys
    ADD CONSTRAINT u_sid UNIQUE (story_id);


--
-- Name: evidence fk_cid_companies; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT fk_cid_companies FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: trends fk_eid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trends
    ADD CONSTRAINT fk_eid FOREIGN KEY (evidence_id) REFERENCES public.evidence(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: personas fk_pid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_pid FOREIGN KEY (product_id) REFERENCES public.products(id) NOT VALID;


--
-- Name: tasks fk_pid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_pid FOREIGN KEY (product_id) REFERENCES public.products(id) NOT VALID;


--
-- Name: evidence fk_pid_personas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT fk_pid_personas FOREIGN KEY (persona_id) REFERENCES public.personas(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: journeys fk_sid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journeys
    ADD CONSTRAINT fk_sid FOREIGN KEY (story_id) REFERENCES public.stories(id) NOT VALID;


--
-- Name: journey_steps fk_sid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journey_steps
    ADD CONSTRAINT fk_sid FOREIGN KEY (journey_id) REFERENCES public.journeys(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: evidence fk_sid_stories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT fk_sid_stories FOREIGN KEY (story_id) REFERENCES public.stories(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

