const express = require('express');
const app = express();
const ejs = require('ejs'); // Require EJS
app.use(express.static('assets'));
// Dummy user data (for demonstration purposes).
const users = [
    { id: 1, name: 'Abebe', email: 'abebe@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'ere leba leba', email: 'yazut_yazut@example.com' },
    { id: 4, name: 'ende ende leba', email: 'awo_leba@example.com' },
    { id: 5, name: 'police dewelu fetenu', email: 'hello_police_leba_ere_leba@example.com' },
    { id: 6, name: 'yete akababi nw', email: 'KFC@example.com' },
    { id: 7, name: 'tenesh wede megenagna kereb telu', email: 'be-x-meneged-nw@example.com' },
];
// List of allowed IP addresses (for testing purposes).
const allowedIPs = [
    '172.16.0.5',
    '203.0.113.17',
    '198.51.100.22',
    '192.0.2.33',
    '196.231.54.78'
   
];
// List of directory names
const directories = [
    '.htpasswd', '.listing', '.listings', '.mysql_history', '.passwd', '.perf', '.profile', '.rhosts',
    '.sh_history', '.ssh', '.subversion', '.svn', '.svn/entries', '.swf', '.web', '@', '_', '_adm', '_admin',
    '_ajax', '_archive', '_assets', '_backup', '_baks', '_borders', '_cache', '_catalogs', '_code', '_common',
    '_conf', '_config', '_css', '_data', '_database', '_db_backups', '_derived', '_dev', '_dummy', '_files',
    '_flash', '_fpclass', '_images', '_img', '_inc', '_include', '_includes', '_install', '_js', '_layouts',
    '_lib', '_media', '_mem_bin', '_mm', '_mmserverscripts', '_mygallery', '_net', '_notes', '_old', '_overlay',
    '_pages', '_private', '_reports', '_res', '_resources', '_scriptlibrary', '_scripts', '_source', '_src',
    '_stats', '_styles', '_swf', '_temp', '_tempalbums', '_template', '_templates', '_test', '_themes', '_tmp',
    '_tmpfileop', '_vti_aut', '_vti_bin', '_vti_bin/_vti_adm/admin.dll', '_vti_bin/_vti_aut/author.dll', '_vti_bin/shtml.dll',
    '_vti_cnf', '_vti_inf', '_vti_log', '_vti_map', '_vti_pvt', '_vti_rpc', '_vti_script', '_vti_txt', '_www',
    '~adm', '~admin', '~administrator', '~amanda', '~apache', '~bin', '~ftp', '~guest', '~http', '~httpd', '~log',
    '~logs', '~lp', '~mail', '~nobody', '~operator', '~root', '~sys', '~sysadm', '~sysadmin', '~test', '~tmp',
    '~user', '~webmaster', '~www', '0', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '1', '10',
    '100', '1000', '1001', '101', '102', '103', '11', '12', '123', '13', '14', '15', '1990', '1991', '1992',
    '1993', '1994', '1995', '1996', '1997', '1998', '1999', '1x1', '2', '20', '200', '2000', '2001', '2002',
    '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '21', '22',
    '2257', '23', '24', '25', '2g', '3', '30', '300', '32', '3g', '3rdparty', '4', '400', '401', '403', '404',
    '42', '5', '50', '500', '51', '6', '64', '7', '7z', '8', '9', '96', 'a', 'A', 'aa', 'aaa', 'abc', 'abc123',
    'abcd', 'abcd1234', 'about', 'About', 'about_us', 'aboutus', 'about-us', 'AboutUs', 'abstract', 'abuse', 'ac',
    'academic', 'academics', 'acatalog', 'acc', 'access', 'access.1', 'access_db', 'access_log', 'access_log.1',
    'accessgranted', 'accessibility', 'access-log', 'access-log.1', 'accessories', 'accommodation', 'account',
    'account_edit', 'account_history', 'accountants', 'accounting', 'accounts', 'accountsettings', 'acct_login',
    'achitecture', 'acp', 'act', 'action', 'actions', 'activate', 'active', 'activeCollab', 'activex', 'activities',
    'activity', 'ad', 'ad_js', 'adaptive', 'adclick', 'add', 'add_cart', 'addfav', 'addnews', 'addons', 'addpost',
    'addreply', 'address', 'address_book', 'addressbook', 'addresses', 'addtocart', 'adlog', 'adlogger', 'adm',
    'ADM',  'admin.cgi', 'admin.php', 'admin.pl', 'admin_', 'admin_area', 'admin_banner',
    'admin_c', 'admin_index', 'admin_interface', 'admin_login', 'admin_logon', 'admin1', 'admin2', 'admin3',
    'admin4_account', 'admin4_colon', 'admin-admin', 'admin-console', 'admincontrol', 'admincp', 'adminhelp',
    'admin-interface', 'administer', 'administr8', 'administracion', 'administrador', 'administrat', 'administratie',
    'administration', 'Administration', 'administrator', 'administratoraccounts', 'administrators', 'administrivia',
    'adminlogin', 'adminlogon', 'adminpanel', 'adminpro', 'admins', 'AdminService', 'adminsessions', 'adminsql',
    'admintools', 'AdminTools', 'admissions', 'admon', 'ADMON', 'adobe', 'adodb', 'ads', 'adserver', 'adsl', 'adv',
    'adv_counter', 'advanced', 'advanced_search', 'advancedsearch', 'advert', 'advertise', 'advertisement',
    'advertisers', 'advertising', 'adverts', 'advice', 'adview', 'advisories', 'af', 'aff', 'affiche', 'affiliate',
    'affiliate_info', 'affiliate_terms', 'affiliates', 'affiliatewiz', 'africa', 'agb', 'agency', 'agenda', 'agent',
    'agents', 'aggregator', 'AggreSpy', 'ajax', 'ajax_cron', 'akamai', 'akeeba.backend.log', 'alarm', 'alarms',
    'album', 'albums', 'alcatel', 'alert', 'alerts', 'alias', 'aliases', 'all', 'alltime', 'all-wcprops', 'alpha',
    'alt', 'alumni', 'alumni_add', 'alumni_details', 'alumni_info', 'alumni_reunions', 'alumni_update', 'am', 'amanda',
    'amazon', 'amember', 'analog', 'analyse', 'analysis', 'analytics', 'and', 'android', 'announce', 'announcement',
    'announcements', 'annuaire', 'annual', 'anon', 'anon_ftp', 'anonymous', 'ansi', 'answer', 'answers', 'antibot_image',
    'antispam', 'antivirus', 'anuncios', 'any', 'aol', 'ap', 'apac', 'apache', 'apanel', 'apc', 'apexec', 'api', 'apis',
    'apl', 'apm', 'app', 'app_browser', 'app_browsers', 'app_code', 'app_data', 'app_themes', 'appeal', 'appeals',
    'append', 'appl', 'apple', 'applet', 'applets', 'appliance', 'appliation', 'application', 'application.wadl',
    'applications', 'apply', 'apps', 'AppsLocalLogin', 'AppsLogin', 'apr', 'ar', 'arbeit', 'arcade', 'arch', 'architect',
    'architecture', 'archiv', 'archive', 'Archive', 'archives', 'archivos', 'arquivos', 'array', 'arrow', 'ars', 'art',
    'article', 'articles', 'Articles', 'artikel', 'artists', 'arts', 'artwork', 'as', 'ascii', 'asdf', 'ashley', 'asia',
    'ask', 'ask_a_question', 'askapache', 'asmx', 'asp', 'aspadmin', 'aspdnsfcommon', 'aspdnsfencrypt', 'aspdnsfgateways',
    'aspdnsfpatterns', 'aspnet_client', 'asps', 'aspx', 'asset', 'assetmanage', 'assetmanagement',  'at',
    'AT-admin.cgi', 'atom', 'attach', 'attach_mod', 'attachment', 'attachments', 'attachs', 'attic', 'au', 'auction',
    'auctions', 'audio', 'audit', 'audits', 'auth', 'authentication', 'author', 'authoring', 'authorization',
    'authorized_keys', 'authors', 'authuser', 'authusers', 'auto', 'autobackup', 'autocheck', 'autodeploy', 'autodiscover',
    'autologin', 'automatic', 'automation', 'automotive', 'aux', 'av', 'avatar', 'avatars', 'aw', 'award', 'awardingbodies',
    'awards', 'awl', 'awmdata', 'awstats', 'awstats.conf', 'axis', 'axis2', 'axis2-admin', 'axis-admin', 'axs', 'az', 'b',
    'B', 'b1', 'b2b', 'b2c', 'back', 'backdoor', 'backend', 'background', 'backgrounds', 'backoffice', 'BackOffice',
    'backup', 'back-up', 'backup_migrate', 'backup2', 'backup-db', 'backups', 'bad_link', 'bak', 'bakup', 'bak-up',
    'balance', 'balances', 'ban', 'bandwidth', 'bank', 'banking', 'banks', 'banned', 'banner', 'banner_element',
    'banner2', 'banneradmin', 'bannerads', 'banners', 'bar', 'base', 'Base', 'baseball', 'bash', 'basic', 'basket',
    'basketball', 'baskets', 'bass', 'bat', 'batch', 'baz', 'bb', 'bbadmin', 'bbclone', 'bb-hist', 'bb-histlog',
    'bboard', 'bbs', 'bc', 'bd', 'bdata', 'be', 'bea', 'bean', 'beans', 'beehive', 'beheer', 'benefits', 'benutzer',
    'best', 'beta', 'bfc', 'bg', 'big', 'bigadmin', 'bigip', 'bilder', 'bill', 'billing', 'bin', 'binaries', 'binary',
    'bins', 'bio', 'bios', 'bitrix', 'biz', 'bk', 'bkup', 'bl', 'black', 'blah', 'blank', 'blb', 'block', 'blocked',
    'blocks', 'blog', 'Blog', 'blog_ajax', 'blog_inlinemod', 'blog_report', 'blog_search', 'blog_usercp', 'blogger',
    'bloggers', 'blogindex', 'blogs', 'blogspot', 'blow', 'blue', 'bm', 'bmz_cache', 'bnnr', 'bo', 'board', 'boards',
    'bob', 'body', 'bofh', 'boiler', 'boilerplate', 'bonus', 'bonuses', 'book', 'booker', 'booking', 'bookmark',
    'bookmarks', 'books', 'Books', 'bookstore', 'boost_stats', 'boot', 'bot', 'bots', 'bottom', 'bot-trap', 'boutique',
    'box', 'boxes', 'br', 'brand', 'brands', 'broadband', 'brochure', 'brochures', 'broken', 'broken_link', 'broker',
    'browse', 'browser', 'Browser', 'bs', 'bsd', 'bt', 'bug', 'bugs', 'build', 'BUILD', 'builder', 'buildr', 'bulk',
    'bulksms', 'bullet', 'busca', 'buscador', 'buscar', 'business', 'Business'
];

// Create routes for each directory
directories.forEach(directory => {
    app.get(`/${directory}`, (req, res) => {
        res.send(`Also known as forced browse, directory brute forcing is the process of requesting files and server directories to which there are no direct links in the application or the server's pages. This is usually done by getting the directory and filenames from a common names list.Dirb is good`);
    });
});

// Set EJS as the view engine.
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Specify the views directory.

// Middleware to parse JSON request bodies.
app.use(express.json());

// Home page.
app.get('/', (req, res) => {
    res.render('index', { users }); // Render the 'users.ejs' template and pass the 'users' data.
});
// Admin page (requires a specific IP address in X-Forwarded-For header).
app.get('/.htaccess', (req, res) => {
    const authorizedIP = '192.168.1.101'; // Authorized IP for admin access.

    // Check if the X-Forwarded-For header matches the authorized IP.
    if (req.headers['x-forwarded-for'] === authorizedIP) {
        const htaccess = `
        User-agent: *
        deny from all
  
        allow from 172.16.0.5
        allow from 203.0.113.17
        allow from 198.51.100.22
        allow from 192.0.2.33
        allow from 196.231.54.78
        
        `;
        res.type('text/plain').send(htaccess);
    } else {
        res.status(403).send('Access denied.Bypass me');
    }
});
// Serve the robots.txt file as plain text
app.get('/robots.txt', (req, res) => {
    const robotsTxt = `
User-agent: *
Disallow: /admin
Allow: /users
Allow from 192.168.1.101
Allow from 10.0.0.2
Deny from all

`;

    res.type('text/plain').send(robotsTxt);
});
// Route to view a list of users (rendered using EJS).
app.get('/users', (req, res) => {
    res.render('users', { users }); // Render the 'users.ejs' template and pass the 'users' data.
});

// Route to add a new user (vulnerable to X-Forwarded-For attack).
app.post('/adduser', (req, res) => {
    // Vulnerability: Trusting the X-Forwarded-For header to add a user.
    const forwardedFor = req.headers['x-forwarded-for'];
    const name = req.body.name;

    if (!forwardedFor || !name) {
        return res.status(400).send('Bad Request');
    }

    const newUser = { id: users.length + 1, name };
    users.push(newUser);

    res.status(201).json(newUser);
});

// Admin page (requires a specific IP address in X-Forwarded-For header, rendered using EJS).
app.get('/admin', (req, res) => {
    const clientIP = req.headers['x-forwarded-for'];
    
    // Check if the client's IP is in the list of allowed IPs.
    const isAdmin = allowedIPs.includes(clientIP);
    const flag = "AXUM{***X_Abysinia_Hackers_is_bests***}"
    res.render('admin', { isAdmin, flag }); // Render the 'admin.ejs' template and pass the 'isAdmin' data.
});

// Error handling middleware.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).send('Page Not Found!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
