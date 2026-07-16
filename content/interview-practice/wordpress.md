# WordPress Interview PrepFor Freshers

**1\. What is WordPress?**

A free, open-source content management system built on PHP and MySQL. It lets people build and manage websites through a visual admin dashboard instead of writing everything from scratch — with themes controlling how a site looks and plugins adding functionality.

**2\. How do you install WordPress?**

Download the package from WordPress.org, upload it to your web host via FTP (or their file manager), create a MySQL database, then run through the install script by visiting your domain in a browser — it walks you through connecting the database and creating an admin account. Most hosts now offer a one-click installer that automates all of this.

**3\. What are some essential features of WordPress?**

A visual content editor for posts/pages, one-click installs and updates, thousands of themes for design flexibility, a huge plugin ecosystem to add features without coding, built-in user role management, and support for basically any type of site — blog, business site, store, portfolio.

**4\. What are WordPress plugins?**

Installable packages of code that extend what WordPress can do — anything from a simple contact form to a full e-commerce store (WooCommerce) or SEO toolkit (Yoast). Installed either from the dashboard's plugin directory search or uploaded manually as a zip.

**5\. What's the difference between posts and pages in WordPress?**

Posts are timestamped, chronological content — blog entries, news updates — usually organized with categories and tags. Pages are static, standalone content that doesn't really change over time or belong in a timeline, like an About or Contact page.

**6\. How do you disable comments in WordPress?**

For future posts: Settings → Discussion, uncheck "Allow people to submit comments on new posts." For posts that already exist, you have to open each one (or bulk-edit via the Posts list) and turn off comments individually, since the global setting only affects new content going forward.

**7\. What is a Gravatar, and how is it used in WordPress?**

A profile photo tied to your email address across any Gravatar-supporting site. WordPress automatically pulls it in next to comments and author bylines based on the email you registered with, so you don't have to manually upload an avatar per site.

**8\. Why might widgets not show up in the sidebar?**

A few usual suspects: the active theme doesn't actually register/support a widget area in that location, the widget was added but never saved, or functions.php has an error that's silently breaking the theme's widget registration. Worth checking Appearance → Widgets to confirm it's actually placed in an area the theme renders.

**9\. Explain shortcodes in WordPress.**

A bracketed tag like \[gallery\] that you drop into a post/page, and WordPress swaps it out for whatever dynamic output the shortcode is programmed to generate — a photo gallery, an embedded form, a pricing table. Saves users from writing raw PHP/HTML for common dynamic elements.

**10\. Explain custom post types in WordPress.**

Content types beyond the built-in "post" and "page" — like "Product," "Event," or "Testimonial" — each with its own admin list, fields, and (optionally) its own URL structure and templates. Lets you model genuinely different kinds of content instead of forcing everything into a blog-post shape.

register_post_type('event', \['public' => true, 'label' => 'Events'\]);

**11\. How can you secure a WordPress website?**

Keep core, themes, and plugins updated, use strong unique passwords (and 2FA where possible), install a security plugin (Wordfence, Sucuri) to catch brute-force attempts and malware, and take regular backups so a worst-case compromise isn't catastrophic.

**12\. How would you set up a multilingual WordPress site?**

A translation plugin like WPML or Polylang — lets you create a translated version of each post/page and switch the front-end language via a selector, with the plugin managing the URL structure per language. For genuinely separate sites per region, WordPress Multisite with one language per site is the other common approach.

**13\. Explain shortcodes with an example.**

Same concept as Q9 — a shortcode like \[contact-form-7 id="123"\] gets replaced at render time by whatever the corresponding plugin generates, in this case rendering an actual HTML contact form on the page.

**14\. How do you add social media sharing buttons to a WordPress site?**

Easiest path is a plugin (AddToAny, Social Warfare) that adds a configurable share bar to posts automatically. Manually, you'd drop the platform's share-link markup (or JS SDK) directly into your theme's single-post template.

**15\. Describe your approach to WordPress security.**

Same fundamentals as Q11: stay current on updates, enforce strong credentials with limited login attempts, run a security plugin for firewall/malware scanning, and back up on a schedule you'd actually trust to restore from if something went wrong.

**16\. Explain the role of caching in WordPress performance.**

WordPress builds most pages dynamically on every request (querying the database, running PHP). A caching plugin (WP Super Cache, W3 Total Cache) saves a static, pre-built version of that page and serves it directly for subsequent visitors, skipping the expensive rebuild — dramatically cutting server load and load time.

**17\. What are WordPress hooks?**

The mechanism plugins/themes use to tap into WordPress's execution flow without editing core files. Action hooks let you run your own code at a specific point (add_action('init', 'my_function')), and filter hooks let you intercept and modify a piece of data before it's used or displayed (add_filter('the_content', 'my_filter')).

# Intermediate

**18\. What is the purpose of the \`.htaccess\` file in WordPress?**

An Apache server config file that controls things like permalink rewriting (turning ?p=123 into clean URLs), redirects, and access rules. WordPress auto-generates the basic version needed for pretty permalinks, but developers commonly extend it for security rules or caching headers.

**19\. How do you create a custom WordPress theme?**

Make a new folder in wp-content/themes/, add a style.css with a theme header comment (name, version, author), and an index.php as the fallback template. From there you build out header.php, footer.php, functions.php, and template files for different content types, then activate it from Appearance → Themes.

/\*

Theme Name: My Theme

Version: 1.0

\*/

**20\. What is the WordPress loop?**

The core PHP construct (while (have_posts()) { the_post(); ... }) that fetches matching posts from the database and lets a template output each one — every archive, blog listing, and single-post page runs through some form of this loop.

**21\. How do you improve the performance of a WordPress site?**

Add a caching plugin, compress and properly size images, minify CSS/JS, use a CDN for static assets, keep the number of active plugins reasonable, optimize the database periodically, enable Gzip compression, and choose hosting that's actually built for WordPress rather than generic shared hosting.

**22\. What is a child theme in WordPress?**

A theme that inherits everything from a parent theme but lets you override specific templates/styles in its own folder. The point is that your customizations survive parent theme updates instead of getting wiped out — you never edit a parent theme's files directly if you plan to keep receiving its updates.

**23\. What is a WordPress shortcode, and how is it used?**

Same core idea as Q9/13 — a bracketed placeholder tag processed at render time, typically registered by a plugin, that outputs dynamic content or a UI element without the end user needing to touch any code.

**24\. What is the purpose of \`functions.php\` in a theme?**

The theme's "brain" — where you register menus, widget areas, enqueue styles/scripts, hook into WordPress actions/filters, and add custom features. It behaves like a plugin scoped to that theme, though heavy site-specific logic is often better placed in an actual small custom plugin so it doesn't disappear if the theme changes.

**25\. What is a Multisite network in WordPress?**

A single WordPress install that runs multiple sites, each with its own content/themes/plugins settings but sharing the same core codebase, users table, and database. Useful for things like a university with per-department sites, or an agency managing many client sites from one place — though it adds real operational complexity, so it's not the default choice for most single-site projects.

**26\. How do you optimize images for a WordPress site?**

Compress with a plugin (Smush, ShortPixel, Imagify) or before upload, pick the right format (JPEG for photos, PNG for transparency, SVG for icons/logos, WebP where supported), resize to the actual display dimensions rather than uploading oversized originals, lazy-load offscreen images, and serve through a CDN.

**27\. What is the role of \`wp-config.php\`?**

The core configuration file — database name/user/password/host, security keys/salts, table prefix, and environment flags like WP_DEBUG. It's the first file WordPress reads on every request, before anything else runs.

**28\. What are the default WordPress user roles?**

Administrator (full control), Editor (can publish/manage all posts), Author (can publish their own posts), Contributor (can write but not publish their own posts — needs an editor to approve), and Subscriber (profile management and commenting only).

**29\. What is the WordPress REST API?**

A built-in API exposing WordPress data (posts, pages, users, media) as JSON over standard HTTP endpoints, so external apps, JavaScript front-ends, or mobile apps can read and write WordPress content without touching the PHP admin directly — this is also the foundation the block editor (Gutenberg) itself is built on.

GET /wp-json/wp/v2/posts

**30\. How do you create a custom page template in WordPress?**

Add a new PHP file in the theme folder with a template header comment, then select it from the Page Attributes panel when editing a page.

<?php

/\* Template Name: Custom Page Template \*/

?>

**31\. What is WP-CLI, and how do you use it to manage a site?**

A command-line tool for WordPress — install/update plugins and themes, create posts, manage users, flush caches, run database searches/replacements, all via terminal/SSH instead of clicking through the dashboard. Especially useful for scripting repetitive tasks or managing a site where the admin UI is slow or inaccessible.

wp plugin install woocommerce --activate

**32\. What are transients in WordPress, and how are they used?**

A simple caching API for storing a value in the database with an expiration time — good for caching the result of something expensive (an external API call, a heavy query) so you don't redo that work on every page load.

set_transient('weather_data', $data, 12 \* HOUR_IN_SECONDS);

$data = get_transient('weather_data');

**33\. What is \`WP_DEBUG\`, and how is it used?**

A constant in wp-config.php that, when set to true, surfaces PHP errors, warnings, and notices instead of hiding them — essential during development to catch bugs early. It should always be false (or logging to a file instead of displaying) on a live production site, since showing raw errors publicly can leak sensitive info.

**34\. What's the difference between WordPress.com and WordPress.org?**

WordPress.org is the free, self-hosted software — you supply your own hosting and get full control over themes, plugins, and monetization, but you're responsible for maintenance. WordPress.com is a hosted service running that same software for you, with easier setup but real limits on customization and monetization unless you pay for higher-tier plans.

# For Experienced Developers

**35\. How do you ensure the security of a WordPress website (advanced)?**

Beyond the basics (Q11) — enforce 2FA, restrict wp-admin access by IP where feasible, disable file editing from the dashboard (DISALLOW_FILE_EDIT), keep a Web Application Firewall in front of the site, and audit installed plugins for abandoned/unmaintained ones since those are a common attack vector.

**36\. What are custom fields in WordPress, and how are they used?**

Extra metadata attached to a post/page/custom post type beyond its title and content — like a "price" or "event date" field on a product/event. Built with either raw add_post_meta()/get_post_meta() calls, or more commonly through a plugin like Advanced Custom Fields that gives you a proper UI for defining and managing them.

**37\. Explain Template Tags in WordPress.**

Built-in PHP functions themes use to pull and display dynamic WordPress data — the_title(), the_content(), get_header() — instead of writing raw database queries in every template file. They're the vocabulary theme development is built around.

**38\. Differences between WordPress and Wix.**

WordPress is open-source software you self-host (or host via WordPress.com) — steeper learning curve, but essentially unlimited customization and full plugin/theme flexibility. Wix is a fully hosted, drag-and-drop website builder — much easier to pick up, managed security/hosting included, but far more limited once you need custom functionality beyond what Wix's own app marketplace offers.

**39\. Name some commonly used template tags in WordPress.**

get_header()/get_footer()/get_sidebar() pull in shared template parts, the_title()/the_content()/the_permalink() output post data, the_post_thumbnail() renders the featured image, and wp_nav_menu() renders a registered navigation menu.

**40\. What's the difference between Action and Filter hooks?**

Action hooks let you execute your own code at a specific point in WordPress's request lifecycle (like right after a post saves) without expecting anything back. Filter hooks are for modifying a piece of data as it passes through — you take the value in, return a changed version, and WordPress uses your modified result instead of the original.

add_action('publish_post', 'notify_slack');

add_filter('the_content', 'add_disclaimer');

**41\. What are transients, and how do you use them? (deeper)**

Same mechanism as Q32 — but worth knowing that transients aren't guaranteed to persist for their full expiration time; WordPress can clear them early (e.g. if using an object cache that gets flushed), so code reading a transient should always handle the "it's gone" case gracefully rather than assuming it's always there.

**42\. What techniques optimize a WordPress site for performance?**

Page/object caching, image compression and lazy loading, minifying and combining CSS/JS, a CDN for static assets, database cleanup (removing post revisions, spam comments, orphaned metadata), and, often the highest-leverage fix, moving off cheap shared hosting to something built specifically for WordPress performance.

**43\. What steps secure a WordPress site (full checklist)?**

Regular core/theme/plugin updates, strong unique passwords plus 2FA, a security plugin for monitoring and firewalling, limited login attempts, a non-default login URL, disabled in-dashboard file editing, scheduled offsite backups, and an SSL certificate so all traffic (especially login credentials) is encrypted in transit.

**44\. Explain WordPress Multisite with a real scenario.**

Same core concept as Q25 — one install running many sites off a shared codebase/database. Real example: a university running separate sites for each department (science.university.edu, arts.university.edu) from one WordPress install, so IT manages one set of core updates and shared plugins instead of maintaining a dozen fully independent installs.

**45\. What is the role of \`wp_localize_script\`?**

Passes PHP data (like the site's AJAX URL, a security nonce, or translated strings) into a JavaScript file as a global object, so your enqueued script can read server-side values without hardcoding them — the standard bridge for PHP-to-JS data in classic (non-block) plugin/theme development.

wp_localize_script('my-script', 'myData', \['ajaxUrl' => admin_url('admin-ajax.php')\]);

**46\. Describe WordPress roles and capabilities.**

Roles (Q28) are just named bundles of individual capabilities (edit_posts, publish_posts, manage_options, etc.) — WordPress actually checks capabilities under the hood, not role names directly, so you can add/remove specific capabilities from a role, or create an entirely custom role, using add_role()/add_cap()/remove_cap().

**47\. Explain the WordPress Template Hierarchy.**

The lookup order WordPress follows to decide which template file renders a given page — most specific file wins, falling back progressively to more general ones. For a single post it checks single-{post-type}-{slug}.php, then single-{post-type}.php, then single.php, then singular.php, and finally index.php if nothing more specific exists. Understanding this order is essential for theme development — it's how you target exactly the right page type without conditionals everywhere.

**48\. Benefits and drawbacks of page builders (Elementor, etc.)?**

Benefit: non-developers can build fairly complex layouts visually, fast, without touching code. Drawback: they often add noticeable bloat (extra CSS/JS shipped on every page) that hurts performance, and switching away from the builder later can mangle your content since it's stored in the builder's own markup format, not clean WordPress content.

**49\. Differences between the \`wp_options\` and \`postmeta\` tables?**

wp_options stores site-wide settings — one value per key, shared across the whole site (plugin settings, theme mods, general config). postmeta stores metadata tied to a specific individual post/page/custom post type — the same meta key can exist many times, once per post it's attached to.

**50\. How does WordPress handle automatic updates?**

Minor core releases (security/maintenance patches) install automatically by default; major version updates require a manual click unless you've explicitly enabled auto-updates for those too. Plugin and theme auto-updates are off by default but can be toggled per-plugin from the Plugins screen, or enforced site-wide via a filter in functions.php.