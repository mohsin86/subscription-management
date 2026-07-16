# Tailwind CSS Interview PrepBasics

**1\. Why do we use Tailwind CSS?**

It lets you style elements directly in your markup using small, single-purpose utility classes instead of writing separate CSS files. That means faster iteration (no switching between files), a smaller final stylesheet since you're only ever using classes that already exist, and no need to invent class names for every little element.

**2\. Explain the concept of "utility-first" in Tailwind CSS.**

Instead of writing custom CSS rules like .card { padding: 1rem; border-radius: 0.5rem; }, you compose the same result from small, single-purpose classes right in the HTML: class="p-4 rounded-lg". Each class does exactly one thing, so you build up a design by combining primitives rather than naming and maintaining custom classes.

**3\. How do you set up Tailwind CSS in a project?**

Quickest way for a prototype is the CDN link, but for a real project you install it via npm and let it generate a stylesheet based on the classes it finds in your files.

npm install -D tailwindcss

npx tailwindcss init

/\* input.css \*/

@tailwind base;

@tailwind components;

@tailwind utilities;

npx tailwindcss -i ./input.css -o ./output.css --watch

**4\. Is Tailwind CSS free and open-source?**

Yes — the core framework is MIT-licensed and free. Tailwind Labs does sell some paid add-ons (like Tailwind UI, a library of pre-built component designs), but the framework itself has no cost.

**5\. What does the \`drop-shadow\` utility do, and how is it different from \`shadow\`?**

shadow (and shadow-md, shadow-lg, etc.) applies the CSS box-shadow property, which draws a shadow based on the element's rectangular box. drop-shadow applies a CSS filter: drop-shadow(...), which follows the actual visible shape of the content — this matters for things like a transparent PNG logo, where a box-shadow would draw a rectangle around the image but drop-shadow hugs the actual non-transparent pixels.

**6\. What's the purpose of the \`container\` class in Tailwind CSS?**

It caps an element's width at fixed breakpoints (so it doesn't stretch edge-to-edge on large screens) and is typically paired with mx-auto to horizontally center it.

&lt;div class="container mx-auto px-4"&gt;...&lt;/div&gt;

**7\. How do you make text bold in Tailwind CSS?**

font-bold (or font-semibold/font-extrabold for other weights) — these map to the CSS font-weight property.

**8\. How do you center an element both horizontally and vertically?**

The most common approach is flexbox: put flex items-center justify-center on the parent.

&lt;div class="flex items-center justify-center h-screen"&gt;

&lt;div&gt;Centered&lt;/div&gt;

&lt;/div&gt;

**9\. How do you add spacing between sibling elements in Tailwind CSS?**

space-y-{n} adds vertical gaps between stacked children, and space-x-{n} adds horizontal gaps between children in a row — both apply the spacing only \*between\* elements, not on the outer edges, which is handy for lists or nav items.

&lt;div class="flex space-x-4"&gt;

&lt;button&gt;One&lt;/button&gt;

&lt;button&gt;Two&lt;/button&gt;

&lt;/div&gt;

**10\. How do you build a CSS Grid layout with Tailwind CSS?**

grid turns an element into a grid container, grid-cols-{n}/grid-rows-{n} define the tracks, and gap-{n} sets spacing between cells. col-span-{n} and row-span-{n} let individual items stretch across multiple tracks.

&lt;div class="grid grid-cols-3 gap-4"&gt;

&lt;div class="col-span-2"&gt;Wide item&lt;/div&gt;

&lt;div&gt;Item&lt;/div&gt;

&lt;/div&gt;

**11\. How do you rotate an element in Tailwind CSS?**

rotate-{deg} classes (rotate-45, rotate-90, rotate-180) rotate clockwise, and a leading minus (-rotate-45) rotates counter-clockwise. Under the hood it's just a CSS transform: rotate(...), so it also needs the base transform class in older Tailwind versions (v3+ applies transforms automatically).

**12\. What does the \`border-collapse\` utility do?**

It maps to CSS border-collapse: collapse, which merges adjacent table cell borders into a single line instead of each cell drawing its own separate border — the standard look for a clean data table.

**13\. How do you center form elements using Tailwind CSS?**

Wrap them in a flex container with flex flex-col items-center justify-center — items-center handles horizontal centering for a column layout, and you can add justify-center if the container also has a fixed height.

**14\. How do you position two elements on opposite sides of a container?**

Flexbox with justify-between is the standard approach — it pushes the first and last child to opposite edges automatically, no manual positioning needed.

&lt;div class="flex justify-between"&gt;

&lt;span&gt;Left&lt;/span&gt;

&lt;span&gt;Right&lt;/span&gt;

&lt;/div&gt;

**15\. How do you add custom colors to Tailwind while keeping the default palette?**

Extend (rather than replace) the theme in tailwind.config.js — using theme.extend.colors merges your custom colors in alongside the built-in ones instead of overwriting them.

module.exports = {

theme: {

extend: {

colors: { brand: '#1E3A8A' },

},

},

};

**16\. How do you apply a shadow effect to an element?**

The shadow-{size} scale (shadow-sm through shadow-2xl), plus shadow-inner for an inset shadow and shadow-none to remove one.

&lt;div class="p-4 rounded-lg shadow-lg"&gt;Card&lt;/div&gt;

**17\. How do you make an element fill the width of its parent?**

w-full sets width to 100%. For height, h-full does the equivalent, though it only works if the parent has an explicit height set — percentage heights in CSS need a sized ancestor to resolve against.

**18\. How does Tailwind CSS differ from component-based frameworks like Bootstrap?**

Bootstrap ships pre-styled components (a .btn already looks like a button), so you get a consistent look fast but have to override its CSS to deviate from that look. Tailwind gives you unstyled utility primitives instead — nothing looks like anything until you compose it — which means more upfront decisions but no fighting against someone else's opinionated defaults later.

| | Bootstrap | Tailwind CSS |

|---|---|---|

| Approach | Pre-built components | Utility-first primitives |

| Customization | Override existing styles | Compose from scratch |

| Output CSS size | Larger (full framework) | Smaller (only used classes) |

| Visual identity | Recognizable "Bootstrap look" | Unopinionated by default |

**19\. What does the \`@apply\` directive do?**

It lets you pull a group of utility classes into a single custom CSS class, useful when the same combination of utilities keeps repeating and you'd rather write it once.

.btn-primary {

@apply bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700;

}

**20\. What are the main benefits and drawbacks of using Tailwind CSS?**

Benefits: fast iteration since you never leave the markup, a smaller shipped CSS bundle (unused utilities are stripped in production), and no need to invent and maintain custom class names. Drawbacks: markup can get visually noisy with long class strings, there's a real learning curve to memorizing the utility names, and keeping a consistent design system across a team takes more discipline since nothing is "locked in" by default the way a component library enforces it.

# Intermediate

**21\. How does Tailwind CSS handle flex direction?**

flex-row (default, left to right), flex-row-reverse, flex-col (top to bottom), and flex-col-reverse — always applied alongside the base flex class on the container.

**22\. How do you reorder flex or grid items without changing the HTML?**

The order-{n} utilities (order-1 through order-12, plus order-first/order-last) visually reorder items independent of their position in the DOM — handy for reordering on different breakpoints without duplicating markup.

&lt;div class="flex"&gt;

&lt;div class="order-2"&gt;First in HTML, shown second&lt;/div&gt;

&lt;div class="order-1"&gt;Second in HTML, shown first&lt;/div&gt;

&lt;/div&gt;

**23\. Can you change the base font family in Tailwind's config?**

Yes — override or extend theme.fontFamily in tailwind.config.js, then reference it with a class like font-sans (Tailwind maps that name to whatever font stack you defined).

theme: {

extend: {

fontFamily: { sans: \['Inter', 'sans-serif'\] },

},

},

**24\. Do Tailwind classes override each other automatically, like CSS specificity would suggest?**

Not really — utility classes have equal, low specificity, so when two conflicting classes are both present, whichever one comes later in the compiled stylesheet wins, not whichever is "more specific." This is why conditionally toggling classes (e.g., with a clsx/classnames helper) is the safe way to swap styles rather than relying on override order.

**25\. How do you build a form with Tailwind CSS?**

There's no special form markup — you style inputs directly with utilities (border, rounded-lg, px-3, py-2, focus:ring-2), and Tailwind's official @tailwindcss/forms plugin resets browser-default input styling so utilities apply predictably across browsers.

&lt;input class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" type="text" /&gt;

**26\. What is overscroll behavior, and how does Tailwind CSS let you control it?**

It controls what happens when a user scrolls past the boundary of a scrollable element — by default the scroll "chains" to the parent/page. overscroll-contain stops that chaining so scrolling a modal or sidebar to its edge doesn't also scroll the page behind it; overscroll-none disables the default bounce/rubber-banding effect too.

**27\. How does Tailwind CSS handle font family utilities?**

Three built-in stacks — font-sans, font-serif, and font-mono — each mapping to a sensible cross-browser font fallback list, customizable via the config's fontFamily key as shown in Q23.

**28\. How would you implement box shadows with more control than the default scale?**

Use the preset scale (shadow-sm to shadow-2xl) for most cases, but for a fully custom shadow you can use an arbitrary value directly in the class name.

&lt;div class="shadow-\[0_4px_14px_0_rgba(0,0,0,0.25)\]"&gt;Custom shadow&lt;/div&gt;

**29\. How does Tailwind CSS handle opacity, and what related utilities exist?**

opacity-{n} (0 to 100, in steps of 5 or 25 depending on config) controls the whole element's transparency. For finer control, bg-opacity-{n}, text-opacity-{n}, and border-opacity-{n} let you adjust just the background, text color, or border independently — and all of these work with state variants like hover:opacity-75.

**30\. How do responsive breakpoints work in Tailwind CSS?**

Prefix any utility with a breakpoint name (sm:, md:, lg:, xl:, 2xl:) and it only applies at that screen width and above — it's mobile-first, so an unprefixed class is the base/smallest-screen style, and each prefixed variant progressively overrides it going up.

&lt;div class="text-sm md:text-base lg:text-lg"&gt;Responsive text&lt;/div&gt;

**31\. How do you remove unused CSS from a Tailwind production build?**

Modern Tailwind (v3+) does this automatically via its JIT engine — it scans the file paths you list in the content array of tailwind.config.js and only generates CSS for classes it actually finds used there, so there's no separate manual "purge" step needed anymore.

module.exports = {

content: \['./src/\*\*/\*.{js,jsx,ts,tsx,html}'\],

};

**32\. How does theming and design-token customization work in Tailwind CSS?**

Everything — colors, spacing, font sizes, breakpoints — lives in the theme section of tailwind.config.js. Using theme.extend adds to the defaults, while directly setting a key under theme (not extend) replaces that section entirely, which is an easy mistake to make if you only meant to add one custom value.

**33\. What does the \`hover:\` prefix do, and what other state variants exist?**

It's a variant prefix that scopes a utility to only apply on that pseudo-class/state — hover:bg-blue-700 only takes effect while the element is being hovered. The same pattern applies to focus:, active:, disabled:, and even structural ones like first: and last:.

&lt;button class="bg-blue-500 hover:bg-blue-700 focus:ring-2"&gt;Click me&lt;/button&gt;

**34\. What's the difference between the \`container\` class and just setting a \`max-width\`?**

container is a Tailwind-specific utility that automatically applies a \*different\* fixed max-width at each breakpoint (so its max-width itself changes as the screen grows), whereas a plain max-w-lg sets one single fixed cap regardless of screen size. container is meant specifically for a page's outer wrapping element.

**35\. How do you implement dark mode in Tailwind CSS?**

Prefix any utility with dark: and it only applies when dark mode is active. Whether "active" means the OS-level prefers-color-scheme or a manually toggled class depends on the darkMode setting in the config ('media' vs 'class').

&lt;div class="bg-white dark:bg-gray-900 text-black dark:text-white"&gt;Content&lt;/div&gt;

**36\. How do you make a container responsive and centered?**

Combine a max-width utility with mx-auto for centering, and responsive padding so content doesn't touch the screen edges on mobile.

&lt;div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"&gt;Content&lt;/div&gt;

# Advanced

**37\. How do you apply CSS animations using Tailwind CSS?**

Built-in ones (animate-spin, animate-ping, animate-pulse, animate-bounce) cover common cases directly. For a fully custom animation, define the @keyframes in your CSS and register it under theme.extend.animation/keyframes in the config so it becomes available as a utility class.

**38\. How do you set up the official Tailwind Forms plugin?**

npm install -D @tailwindcss/forms

// tailwind.config.js

module.exports = {

plugins: \[require('@tailwindcss/forms')\],

};

It resets default browser form-control styling (checkboxes, selects, etc.) to something neutral, so your utility classes control the look predictably instead of fighting inconsistent browser defaults.

**39\. How do you add the Tailwind Typography plugin, and what does it solve?**

npm install -D @tailwindcss/typography

It adds a single prose class that applies sensible, readable default styling to a block of raw HTML content (like blog content from a CMS) — useful specifically because utility-first Tailwind has no opinion on unstyled &lt;h1&gt;/&lt;p&gt;/&lt;ul&gt; tags otherwise.

**40\. Why might Tailwind CSS classes go missing in a Next.js production build?**

Almost always because the content array in tailwind.config.js doesn't actually cover every file path where classes are used — if a class name is fully dynamic (built by string concatenation, like \` text-${color}-500 ) rather than written out literally, Tailwind's scanner can't detect it at build time and drops it. The fix is either listing complete class names as literal strings (using a lookup object instead of concatenation) or widening the content\` glob to catch the missing files.

**41\. How do you build a fixed or sticky header with Tailwind CSS?**

fixed top-0 inset-x-0 pins it to the viewport regardless of scroll; sticky top-0 instead keeps it in normal document flow until the page scrolls past it, then it sticks. Both usually need a z-{n} utility too, so the header renders above the page content instead of being covered by it.

**42\. How do you achieve pixel-perfect designs when the default scale doesn't have the exact value you need?**

Arbitrary value syntax — square brackets let you specify any exact CSS value directly in a utility class, bypassing the predefined scale entirely.

&lt;div class="w-\[327px\] mt-\[13px\]"&gt;Precise sizing&lt;/div&gt;

**43\. How do you control letter spacing in Tailwind CSS?**

tracking-{size} — from tracking-tighter (more condensed) through tracking-normal (default) to tracking-widest (most spread out), mapping to the CSS letter-spacing property.

**44\. How would you build a simple card component using Tailwind utilities?**

&lt;div class="max-w-sm rounded-lg border border-gray-200 shadow-md p-6"&gt;

&lt;h2 class="text-2xl font-bold text-gray-900 mb-2"&gt;Card Title&lt;/h2&gt;

&lt;p class="text-gray-600"&gt;Card description goes here.&lt;/p&gt;

&lt;/div&gt;

The pattern is always the same: a sizing/width constraint, some padding, a border or shadow for visual separation, and rounded corners.

**45\. Can Tailwind CSS and Bootstrap be used together in the same project?**

Technically yes, but it's not recommended — both frameworks define some overlapping class names (like .container or .hidden), and whichever stylesheet loads second will silently win those conflicts, leading to confusing, hard-to-debug layout bugs.

**46\. How do you center an image using Tailwind CSS?**

Simplest is mx-auto on a block-level image (images are inline by default, which mx-auto won't affect until you make it a block element).

&lt;img class="block mx-auto" src="logo.png" /&gt;

**47\. How do you make an element resizable by the user with Tailwind CSS?**

resize (both directions), resize-x (horizontal only), resize-y (vertical only), or resize-none to explicitly disable it — these map to the CSS resize property and only have a visible effect on elements that already allow overflow, like a &lt;textarea&gt;.

**48\. What flexbox utilities does Tailwind CSS provide, and what does each control?**

flex-wrap/flex-nowrap controls whether items wrap to new lines; flex-grow/flex-shrink (or the shorthand flex-1) controls how items expand or contract to fill available space; justify-\* controls alignment along the main axis, and items-\* controls alignment along the cross axis.

**49\. How do you style elements based on interaction state in Tailwind CSS?**

State variants prefix the utility: hover:, focus:, active:, disabled:, and focus-visible: are the common ones, and they can be stacked (disabled:opacity-50 combined with hover:bg-blue-700 on the same element for different states).

**50\. What does the \`fill-current\` utility do, and when would you use it?**

It sets an SVG's fill property to match the element's current text color — useful for icon SVGs, since it means changing text-blue-500 on the wrapping element automatically recolors the icon too, without a separate color utility just for the SVG.

&lt;svg class="fill-current text-blue-500 w-6 h-6"&gt;...&lt;/svg&gt;

**51\. How do you change the cursor style on hover in Tailwind CSS?**

cursor-{type} — cursor-pointer for clickable elements, cursor-not-allowed for disabled ones, cursor-wait, cursor-move, and so on, all mapping directly to CSS cursor values.

**52\. How do you apply a translate transform to an element?**

translate-x-{amount}/translate-y-{amount} (and their negative counterparts, -translate-x-{amount}) shift an element along the x or y axis without affecting document flow — commonly combined with transition and a hover: variant for a subtle hover-lift effect.

&lt;button class="transition hover:-translate-y-1 hover:shadow-lg"&gt;Lift on hover&lt;/button&gt;

**53\. How does Tailwind CSS control transition timing?**

ease-linear, ease-in, ease-out, and ease-in-out set the easing curve, paired with duration-{ms} for how long the transition takes and transition (or transition-{property}) to specify what's being animated at all.

&lt;button class="transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-700"&gt;Smooth&lt;/button&gt;

**54\. How do you create a gradient background with Tailwind CSS?**

bg-gradient-to-{direction} sets the gradient's direction, then from-{color}, via-{color} (optional middle stop), and to-{color} define the actual color stops.

&lt;div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-24"&gt;Gradient&lt;/div&gt;

**55\. How do you set background opacity separately from an element's overall opacity?**

bg-opacity-{n} adjusts just the background color's alpha channel, leaving text and borders on the same element fully opaque — different from the plain opacity-{n} utility, which fades the entire element (including its text and children) uniformly.

&lt;div class="bg-blue-800 bg-opacity-50 text-white p-4"&gt;Semi-transparent background, solid text&lt;/div&gt;