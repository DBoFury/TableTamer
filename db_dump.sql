--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE tabletamer;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:RMwydK/mtWa4XKl0ED4bPA==$MzcL4bY6jzP7NZSWZ11Lex/PVwW1Bm6HaCTHFMwLz0c=:orazdz+vLwaJVT51wc6CpNfomLoOwsZvJvnLZ+M7mpY=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "tabletamer" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

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

--
-- Name: tabletamer; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tabletamer WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE tabletamer OWNER TO postgres;

\connect tabletamer

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: departments_department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments_department (
    id bigint NOT NULL,
    title character varying(64) NOT NULL,
    department_url character varying(200) NOT NULL
);


ALTER TABLE public.departments_department OWNER TO postgres;

--
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.departments_department ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.departments_department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: halls_hall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.halls_hall (
    id bigint NOT NULL,
    title character varying(64) NOT NULL
);


ALTER TABLE public.halls_hall OWNER TO postgres;

--
-- Name: halls_hall_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.halls_hall ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.halls_hall_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: halls_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.halls_table (
    id bigint NOT NULL,
    table_number smallint NOT NULL,
    hall_id bigint NOT NULL
);


ALTER TABLE public.halls_table OWNER TO postgres;

--
-- Name: halls_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.halls_table ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.halls_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_order (
    id bigint NOT NULL,
    created_at timestamp with time zone NOT NULL,
    commentary text NOT NULL,
    paid_amount integer NOT NULL,
    is_takeaway boolean NOT NULL,
    table_id bigint,
    user_id bigint
);


ALTER TABLE public.orders_order OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders_order ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders_orderitem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_orderitem (
    id bigint NOT NULL,
    amount smallint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL
);


ALTER TABLE public.orders_orderitem OWNER TO postgres;

--
-- Name: orders_orderitem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders_orderitem ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.orders_orderitem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders_selectedattribute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_selectedattribute (
    id bigint NOT NULL,
    attribute_value_id bigint NOT NULL,
    order_item_id bigint NOT NULL
);


ALTER TABLE public.orders_selectedattribute OWNER TO postgres;

--
-- Name: orders_selectedattribute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders_selectedattribute ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.orders_selectedattribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products_attribute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_attribute (
    id bigint NOT NULL,
    title character varying(64) NOT NULL
);


ALTER TABLE public.products_attribute OWNER TO postgres;

--
-- Name: products_attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products_attribute ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_attribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products_attributevalue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_attributevalue (
    id bigint NOT NULL,
    value character varying(128) NOT NULL,
    price_addition smallint NOT NULL,
    attribute_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.products_attributevalue OWNER TO postgres;

--
-- Name: products_attributevalue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products_attributevalue ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_attributevalue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_category (
    id bigint NOT NULL,
    title character varying(64) NOT NULL,
    department_id bigint NOT NULL
);


ALTER TABLE public.products_category OWNER TO postgres;

--
-- Name: products_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products_category ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_product (
    id bigint NOT NULL,
    title character varying(128) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    image character varying(100) NOT NULL,
    slug character varying(50) NOT NULL,
    stock integer,
    is_in_stoplist boolean NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.products_product OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products_product ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(254),
    phone_number character varying(128),
    pin_code character varying(4) NOT NULL,
    first_name character varying(32) NOT NULL,
    last_name character varying(32) NOT NULL,
    image character varying(100) NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL
);


ALTER TABLE public.users_user OWNER TO postgres;

--
-- Name: users_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_user_groups OWNER TO postgres;

--
-- Name: users_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_user_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_user_user_permissions OWNER TO postgres;

--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_user_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Hall	6	add_hall
22	Can change Hall	6	change_hall
23	Can delete Hall	6	delete_hall
24	Can view Hall	6	view_hall
25	Can add table	7	add_table
26	Can change table	7	change_table
27	Can delete table	7	delete_table
28	Can view table	7	view_table
29	Can add Department	8	add_department
30	Can change Department	8	change_department
31	Can delete Department	8	delete_department
32	Can view Department	8	view_department
33	Can add Attribute	9	add_attribute
34	Can change Attribute	9	change_attribute
35	Can delete Attribute	9	delete_attribute
36	Can view Attribute	9	view_attribute
37	Can add Category	10	add_category
38	Can change Category	10	change_category
39	Can delete Category	10	delete_category
40	Can view Category	10	view_category
41	Can add Product	11	add_product
42	Can change Product	11	change_product
43	Can delete Product	11	delete_product
44	Can view Product	11	view_product
45	Can add Attribute Value	12	add_attributevalue
46	Can change Attribute Value	12	change_attributevalue
47	Can delete Attribute Value	12	delete_attributevalue
48	Can view Attribute Value	12	view_attributevalue
49	Can add order	13	add_order
50	Can change order	13	change_order
51	Can delete order	13	delete_order
52	Can view order	13	view_order
53	Can add order item	14	add_orderitem
54	Can change order item	14	change_orderitem
55	Can delete order item	14	delete_orderitem
56	Can view order item	14	view_orderitem
57	Can add selected attribute	15	add_selectedattribute
58	Can change selected attribute	15	change_selectedattribute
59	Can delete selected attribute	15	delete_selectedattribute
60	Can view selected attribute	15	view_selectedattribute
61	Can add user	16	add_user
62	Can change user	16	change_user
63	Can delete user	16	delete_user
64	Can view user	16	view_user
\.


--
-- Data for Name: departments_department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments_department (id, title, department_url) FROM stdin;
1	Kitchen	localhost:5003
2	Brazier	localhost:5001
3	Bar	localhost:5002
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	halls	hall
7	halls	table
8	departments	department
9	products	attribute
10	products	category
11	products	product
12	products	attributevalue
13	orders	order
14	orders	orderitem
15	orders	selectedattribute
16	users	user
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-06-05 15:46:02.663452+00
2	contenttypes	0002_remove_content_type_name	2023-06-05 15:46:02.683638+00
3	auth	0001_initial	2023-06-05 15:46:02.839404+00
4	auth	0002_alter_permission_name_max_length	2023-06-05 15:46:02.856001+00
5	auth	0003_alter_user_email_max_length	2023-06-05 15:46:02.867749+00
6	auth	0004_alter_user_username_opts	2023-06-05 15:46:02.881046+00
7	auth	0005_alter_user_last_login_null	2023-06-05 15:46:02.9025+00
8	auth	0006_require_contenttypes_0002	2023-06-05 15:46:02.914086+00
9	auth	0007_alter_validators_add_error_messages	2023-06-05 15:46:02.92641+00
10	auth	0008_alter_user_username_max_length	2023-06-05 15:46:02.939902+00
11	auth	0009_alter_user_last_name_max_length	2023-06-05 15:46:02.960704+00
12	auth	0010_alter_group_name_max_length	2023-06-05 15:46:02.978488+00
13	auth	0011_update_proxy_permissions	2023-06-05 15:46:02.991603+00
14	auth	0012_alter_user_first_name_max_length	2023-06-05 15:46:03.020696+00
15	users	0001_initial	2023-06-05 15:46:03.261537+00
16	admin	0001_initial	2023-06-05 15:46:03.319104+00
17	admin	0002_logentry_remove_auto_add	2023-06-05 15:46:03.339461+00
18	admin	0003_logentry_add_action_flag_choices	2023-06-05 15:46:03.360124+00
19	departments	0001_initial	2023-06-05 15:46:03.414285+00
20	halls	0001_initial	2023-06-05 15:46:03.510303+00
21	products	0001_initial	2023-06-05 15:46:03.705071+00
22	orders	0001_initial	2023-06-05 15:46:03.921041+00
23	orders	0002_initial	2023-06-05 15:46:03.979335+00
24	sessions	0001_initial	2023-06-05 15:46:04.056304+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: halls_hall; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.halls_hall (id, title) FROM stdin;
1	Hall 1
2	Hall 2
\.


--
-- Data for Name: halls_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.halls_table (id, table_number, hall_id) FROM stdin;
1	1	1
2	2	1
3	1	2
4	2	2
5	3	2
6	4	2
7	5	2
8	6	2
\.


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_order (id, created_at, commentary, paid_amount, is_takeaway, table_id, user_id) FROM stdin;
1	2023-05-28 14:39:59.766+00		250	f	4	1
2	2023-05-28 11:32:24.941+00		500	t	\N	1
\.


--
-- Data for Name: orders_orderitem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_orderitem (id, amount, order_id, product_id) FROM stdin;
1	1	1	2
2	2	2	1
3	3	1	1
4	4	1	3
\.


--
-- Data for Name: orders_selectedattribute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_selectedattribute (id, attribute_value_id, order_item_id) FROM stdin;
1	6	1
2	2	2
3	2	3
4	5	4
\.


--
-- Data for Name: products_attribute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_attribute (id, title) FROM stdin;
1	Size
2	Drink Volume
3	Spiciness
\.


--
-- Data for Name: products_attributevalue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_attributevalue (id, value, price_addition, attribute_id, category_id) FROM stdin;
1	Small	0	1	1
2	Normal	20	1	1
3	Big	50	1	1
4	0.5L	0	2	2
5	1L	15	2	2
6	Normal	0	3	3
7	Spicy	20	3	3
\.


--
-- Data for Name: products_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_category (id, title, department_id) FROM stdin;
1	Pizza	1
2	Drinks	3
3	Kebab	2
\.


--
-- Data for Name: products_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_product (id, title, description, price, image, slug, stock, is_in_stoplist, category_id) FROM stdin;
1	Four cheese pizza	Four cheese pizza	160		four-cheese-pizza	\N	f	1
2	Kebab	Savor our delicious kebab dish, featuring tender, marinated meat grilled to perfection with aromatic spices. Accompanied by fresh vegetables, zesty sauces, and a choice of rice or bread, it's a culinary delight that combines tradition and flavor. Experience the rich heritage of our restaurant in every bite.	140		kebab	\N	f	3
3	Juice	Refresh with our vibrant fruit juices. Made from fresh, flavorful fruits, our juices offer a revitalizing burst of natural goodness. From tangy citrus blends to tropical favorites, each sip is a refreshing treat. Enjoy the health benefits and delightful flavors of our carefully crafted juices, perfect for any time of day.	30		juice	24	f	2
\.


--
-- Data for Name: users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user (id, password, last_login, is_superuser, email, phone_number, pin_code, first_name, last_name, image, date_joined, is_active, is_staff) FROM stdin;
1	pbkdf2_sha256$600000$uSMXuLlgJOoZCumuhZmPpw$Crv7aS1/qiFvoH6rwYPnu8swBIIFfR80qK75F7g4THk=	\N	t	admin@admin.com	\N	1111				2023-05-23 14:08:32.302+00	t	t
\.


--
-- Data for Name: users_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 64, true);


--
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_department_id_seq', 3, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 16, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 24, true);


--
-- Name: halls_hall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.halls_hall_id_seq', 2, true);


--
-- Name: halls_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.halls_table_id_seq', 8, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 2, true);


--
-- Name: orders_orderitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderitem_id_seq', 4, true);


--
-- Name: orders_selectedattribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_selectedattribute_id_seq', 4, true);


--
-- Name: products_attribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_attribute_id_seq', 3, true);


--
-- Name: products_attributevalue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_attributevalue_id_seq', 7, true);


--
-- Name: products_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_category_id_seq', 3, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 3, true);


--
-- Name: users_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_groups_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: departments_department departments_department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments_department
    ADD CONSTRAINT departments_department_pkey PRIMARY KEY (id);


--
-- Name: departments_department departments_department_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments_department
    ADD CONSTRAINT departments_department_title_key UNIQUE (title);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: halls_hall halls_hall_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls_hall
    ADD CONSTRAINT halls_hall_pkey PRIMARY KEY (id);


--
-- Name: halls_hall halls_hall_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls_hall
    ADD CONSTRAINT halls_hall_title_key UNIQUE (title);


--
-- Name: halls_table halls_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls_table
    ADD CONSTRAINT halls_table_pkey PRIMARY KEY (id);


--
-- Name: orders_order orders_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_pkey PRIMARY KEY (id);


--
-- Name: orders_orderitem orders_orderitem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderitem
    ADD CONSTRAINT orders_orderitem_pkey PRIMARY KEY (id);


--
-- Name: orders_selectedattribute orders_selectedattribute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_selectedattribute
    ADD CONSTRAINT orders_selectedattribute_pkey PRIMARY KEY (id);


--
-- Name: products_attribute products_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_attribute
    ADD CONSTRAINT products_attribute_pkey PRIMARY KEY (id);


--
-- Name: products_attributevalue products_attributevalue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_attributevalue
    ADD CONSTRAINT products_attributevalue_pkey PRIMARY KEY (id);


--
-- Name: products_category products_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_category
    ADD CONSTRAINT products_category_pkey PRIMARY KEY (id);


--
-- Name: products_category products_category_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_category
    ADD CONSTRAINT products_category_title_key UNIQUE (title);


--
-- Name: products_product products_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_product
    ADD CONSTRAINT products_product_pkey PRIMARY KEY (id);


--
-- Name: products_product products_product_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_product
    ADD CONSTRAINT products_product_title_key UNIQUE (title);


--
-- Name: users_user users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_email_key UNIQUE (email);


--
-- Name: users_user_groups users_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_pkey PRIMARY KEY (id);


--
-- Name: users_user_groups users_user_groups_user_id_group_id_b88eab82_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_user_id_group_id_b88eab82_uniq UNIQUE (user_id, group_id);


--
-- Name: users_user users_user_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_phone_number_key UNIQUE (phone_number);


--
-- Name: users_user users_user_pin_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_pin_code_key UNIQUE (pin_code);


--
-- Name: users_user users_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user
    ADD CONSTRAINT users_user_pkey PRIMARY KEY (id);


--
-- Name: users_user_user_permissions users_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: users_user_user_permissions users_user_user_permissions_user_id_permission_id_43338c45_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_user_id_permission_id_43338c45_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: departments_department_title_bb20b679_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departments_department_title_bb20b679_like ON public.departments_department USING btree (title varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: halls_hall_title_4b1f9d48_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX halls_hall_title_4b1f9d48_like ON public.halls_hall USING btree (title varchar_pattern_ops);


--
-- Name: halls_table_hall_id_9b7c515b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX halls_table_hall_id_9b7c515b ON public.halls_table USING btree (hall_id);


--
-- Name: orders_order_table_id_14015bc1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_table_id_14015bc1 ON public.orders_order USING btree (table_id);


--
-- Name: orders_order_user_id_e9b59eb1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_user_id_e9b59eb1 ON public.orders_order USING btree (user_id);


--
-- Name: orders_orderitem_order_id_fe61a34d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_orderitem_order_id_fe61a34d ON public.orders_orderitem USING btree (order_id);


--
-- Name: orders_orderitem_product_id_afe4254a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_orderitem_product_id_afe4254a ON public.orders_orderitem USING btree (product_id);


--
-- Name: orders_selectedattribute_attribute_value_id_f90ea30e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_selectedattribute_attribute_value_id_f90ea30e ON public.orders_selectedattribute USING btree (attribute_value_id);


--
-- Name: orders_selectedattribute_order_item_id_1cd76b7f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_selectedattribute_order_item_id_1cd76b7f ON public.orders_selectedattribute USING btree (order_item_id);


--
-- Name: products_attributevalue_attribute_id_82b9ba3c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_attributevalue_attribute_id_82b9ba3c ON public.products_attributevalue USING btree (attribute_id);


--
-- Name: products_attributevalue_category_id_2cea6735; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_attributevalue_category_id_2cea6735 ON public.products_attributevalue USING btree (category_id);


--
-- Name: products_category_department_id_c66d30aa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_category_department_id_c66d30aa ON public.products_category USING btree (department_id);


--
-- Name: products_category_title_3e22be6c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_category_title_3e22be6c_like ON public.products_category USING btree (title varchar_pattern_ops);


--
-- Name: products_product_category_id_9b594869; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_category_id_9b594869 ON public.products_product USING btree (category_id);


--
-- Name: products_product_slug_70d3148d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_slug_70d3148d ON public.products_product USING btree (slug);


--
-- Name: products_product_slug_70d3148d_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_slug_70d3148d_like ON public.products_product USING btree (slug varchar_pattern_ops);


--
-- Name: products_product_title_659cf449_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_product_title_659cf449_like ON public.products_product USING btree (title varchar_pattern_ops);


--
-- Name: users_user_email_243f6e77_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_email_243f6e77_like ON public.users_user USING btree (email varchar_pattern_ops);


--
-- Name: users_user_groups_group_id_9afc8d0e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_groups_group_id_9afc8d0e ON public.users_user_groups USING btree (group_id);


--
-- Name: users_user_groups_user_id_5f6f5a90; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_groups_user_id_5f6f5a90 ON public.users_user_groups USING btree (user_id);


--
-- Name: users_user_phone_number_aff54ffd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_phone_number_aff54ffd_like ON public.users_user USING btree (phone_number varchar_pattern_ops);


--
-- Name: users_user_pin_code_f30e81cd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_pin_code_f30e81cd_like ON public.users_user USING btree (pin_code varchar_pattern_ops);


--
-- Name: users_user_user_permissions_permission_id_0b93982e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_user_permissions_permission_id_0b93982e ON public.users_user_user_permissions USING btree (permission_id);


--
-- Name: users_user_user_permissions_user_id_20aca447; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_user_user_permissions_user_id_20aca447 ON public.users_user_user_permissions USING btree (user_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: halls_table halls_table_hall_id_9b7c515b_fk_halls_hall_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.halls_table
    ADD CONSTRAINT halls_table_hall_id_9b7c515b_fk_halls_hall_id FOREIGN KEY (hall_id) REFERENCES public.halls_hall(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order orders_order_table_id_14015bc1_fk_halls_table_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_table_id_14015bc1_fk_halls_table_id FOREIGN KEY (table_id) REFERENCES public.halls_table(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order orders_order_user_id_e9b59eb1_fk_users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_user_id_e9b59eb1_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_orderitem orders_orderitem_order_id_fe61a34d_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderitem
    ADD CONSTRAINT orders_orderitem_order_id_fe61a34d_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_orderitem orders_orderitem_product_id_afe4254a_fk_products_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderitem
    ADD CONSTRAINT orders_orderitem_product_id_afe4254a_fk_products_product_id FOREIGN KEY (product_id) REFERENCES public.products_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_selectedattribute orders_selectedattri_attribute_value_id_f90ea30e_fk_products_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_selectedattribute
    ADD CONSTRAINT orders_selectedattri_attribute_value_id_f90ea30e_fk_products_ FOREIGN KEY (attribute_value_id) REFERENCES public.products_attributevalue(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_selectedattribute orders_selectedattri_order_item_id_1cd76b7f_fk_orders_or; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_selectedattribute
    ADD CONSTRAINT orders_selectedattri_order_item_id_1cd76b7f_fk_orders_or FOREIGN KEY (order_item_id) REFERENCES public.orders_orderitem(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: products_attributevalue products_attributeva_attribute_id_82b9ba3c_fk_products_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_attributevalue
    ADD CONSTRAINT products_attributeva_attribute_id_82b9ba3c_fk_products_ FOREIGN KEY (attribute_id) REFERENCES public.products_attribute(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: products_attributevalue products_attributeva_category_id_2cea6735_fk_products_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_attributevalue
    ADD CONSTRAINT products_attributeva_category_id_2cea6735_fk_products_ FOREIGN KEY (category_id) REFERENCES public.products_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: products_category products_category_department_id_c66d30aa_fk_departmen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_category
    ADD CONSTRAINT products_category_department_id_c66d30aa_fk_departmen FOREIGN KEY (department_id) REFERENCES public.departments_department(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: products_product products_product_category_id_9b594869_fk_products_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_product
    ADD CONSTRAINT products_product_category_id_9b594869_fk_products_category_id FOREIGN KEY (category_id) REFERENCES public.products_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_user_groups users_user_groups_group_id_9afc8d0e_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_group_id_9afc8d0e_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_user_groups users_user_groups_user_id_5f6f5a90_fk_users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_groups
    ADD CONSTRAINT users_user_groups_user_id_5f6f5a90_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_user_user_permissions users_user_user_perm_permission_id_0b93982e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_perm_permission_id_0b93982e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_user_user_permissions users_user_user_permissions_user_id_20aca447_fk_users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_user_id_20aca447_fk_users_user_id FOREIGN KEY (user_id) REFERENCES public.users_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

