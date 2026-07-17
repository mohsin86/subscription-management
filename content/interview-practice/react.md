# React Interview PrepReact Fundamentals

**1\. What is React, and how is it different from other frameworks?**

A JavaScript library (not a full framework) for building UIs out of components. It only handles the view layer — for routing or global state you bring in separate libraries (React Router, Redux/Zustand), unlike Angular which ships all of that built in.

**2\. Why use React.js for front-end development?**

Component reuse, a virtual DOM that keeps updates fast, a huge ecosystem, and a job market that makes it easy to hire for. It also plays nicely with mobile via React Native, so teams can share knowledge across web and app.

**3\. Explain the concept of the Virtual DOM.**

A lightweight JS copy of the real DOM. When state changes, React builds a new virtual DOM tree, diffs it against the previous one, and only patches the actual DOM nodes that changed — instead of re-rendering the whole page.

**4\. What is JSX, and why is it used in React?**

HTML-like syntax inside JS that compiles down to React.createElement() calls. It's used because writing UI structure and logic in the same file, with real JS expressions mixed in, is far more readable than nested createElement calls.

const el = &lt;h1&gt;Hello&lt;/h1&gt;;

// compiles to: React.createElement('h1', null, 'Hello')

**5\. What is a React component?**

A reusable, self-contained piece of UI — a function (or class) that takes props and returns JSX. Today almost everyone writes function components with hooks rather than classes.

**6\. Differentiate between functional and class components.**

Function components are plain functions, use hooks (useState, useEffect) for state/lifecycle, and are the modern default. Class components extend React.Component, use this.state and lifecycle methods like componentDidMount. Functionally equivalent, but hooks are less boilerplate-y and easier to compose.

**7\. What is the role of \`render()\` in a class component?**

It's the method that returns the JSX to display — required in every class component, and it should be a pure function of props/state (no side effects in there).

**8\. What is the difference between state and props?**

Props are read-only data passed down from a parent — a component can't change its own props. State is data a component owns and manages internally, and changing it (via setState/useState) triggers a re-render.

**9\. How do you pass data between parent and child components?**

Parent → child: pass data as props. Child → parent: parent passes a callback function down as a prop, and the child calls it with data when something happens.

function Parent() {

const handleData = (val) => console.log(val);

return &lt;Child onSend={handleData} /&gt;;

}

function Child({ onSend }) {

return &lt;button onClick={() =&gt; onSend('hi')}>Send&lt;/button&gt;;

}

**10\. What are React keys, and why are they important?**

A unique identifier you give each item in a list so React can track which items changed, got added, or got removed between renders, instead of re-rendering the whole list. Never use array index as a key if the list can reorder — it causes subtle bugs with stale state.

**11\. How do you handle events in React?**

Pass a function to the relevant prop, camelCase style — onClick, onChange, etc. React wraps native events in a SyntheticEvent for cross-browser consistency.

&lt;button onClick={() =&gt; console.log('clicked')}>Click&lt;/button&gt;

**12\. What is two-way binding in React?**

React doesn't do two-way binding automatically (unlike Angular/Vue) — you wire it up manually: the input's value comes from state, and onChange updates that state, so the UI and state stay in sync both ways.

&lt;input value={text} onChange={(e) =&gt; setText(e.target.value)} />

**13\. What are React fragments, and why are they used?**

&lt;>...</&gt; (or React.Fragment) lets you group multiple elements without adding an extra wrapper &lt;div&gt; to the DOM — useful when a component needs to return several siblings but you don't want to mess up your CSS/layout with a needless container.

**14\. Explain controlled vs. uncontrolled components.**

Controlled: the form input's value is driven by React state (value + onChange) — React is the single source of truth. Uncontrolled: the DOM manages its own state and you read the value on demand via a ref. Controlled is more common because it's easier to validate and react to changes as they happen.

**15\. How do you implement forms in React?**

Usually controlled inputs backed by state, with a submit handler that prevents the default page reload:

function Form() {

const \[name, setName\] = useState('');

const handleSubmit = (e) => {

e.preventDefault();

console.log(name);

};

return (

&lt;form onSubmit={handleSubmit}&gt;

&lt;input value={name} onChange={(e) =&gt; setName(e.target.value)} />

&lt;button type="submit"&gt;Submit&lt;/button&gt;

&lt;/form&gt;

);

}

For anything beyond a couple of fields, a library like Formik or React Hook Form saves a lot of boilerplate.

**16\. What is \`defaultProps\`, and how is it used?**

Lets you set a fallback value for a prop if the parent doesn't pass one.

function Button({ label }) {

return &lt;button&gt;{label}&lt;/button&gt;;

}

Button.defaultProps = { label: 'Click me' };

**17\. What is \`propTypes\`, and why is it used?**

A runtime type-checking tool for props — warns you in the console during development if a component receives the wrong prop type. Mostly replaced by TypeScript in newer codebases, but still common in JS-only projects.

import PropTypes from 'prop-types';

Button.propTypes = { label: PropTypes.string };

**18\. Explain the React component lifecycle.**

Three phases: mounting (component is created and inserted — constructor, render, componentDidMount), updating (props/state change — render, componentDidUpdate), unmounting (componentWillUnmount, for cleanup). With hooks, useEffect covers all three depending on its dependency array and cleanup function.

**19\. What is \`setState\`, and how does it work?**

The method (class components) for updating state and triggering a re-render. It's asynchronous and batched — React may group multiple setState calls together for performance, so you shouldn't assume the state is updated immediately after calling it.

**20\. Why is it important to use an updater function in \`setState\`?**

Because setState calls can be batched, reading this.state directly right after calling it can give you a stale value. Passing a function instead guarantees you're working off the latest state:

this.setState((prevState) => ({ count: prevState.count + 1 }));

# Components, Rendering & Lifecycle

**21\. What are React refs, and why are they used?**

A way to directly access a DOM node or a component instance, bypassing the usual render flow — useful for things like focusing an input, measuring an element, or integrating a non-React library.

const inputRef = useRef(null);

useEffect(() => inputRef.current.focus(), \[\]);

&lt;input ref={inputRef} /&gt;

**22\. How does React handle DOM updates efficiently?**

Via the virtual DOM diffing algorithm — it compares the new tree to the previous one and computes the minimal set of real DOM operations needed, batching them together instead of touching the DOM for every single state change.

**23\. What are Higher-Order Components (HOCs)?**

A function that takes a component and returns a new, enhanced component — a pattern for reusing logic across components (like adding auth checks or a loading state) without repeating code.

function withAuth(Component) {

return function Wrapped(props) {

if (!props.user) return &lt;Login /&gt;;

return &lt;Component {...props} /&gt;;

};

}

**24\. What are CSS modules in React?**

CSS files (Component.module.css) where class names are automatically scoped locally to the component that imports them, so you never accidentally clash with class names elsewhere in the app.

import styles from './Button.module.css';

&lt;button className={styles.primary}&gt;Click&lt;/button&gt;

**25\. What is the difference between \`componentDidMount\` and \`componentWillUnmount\`?**

componentDidMount runs once, right after the component is first rendered — good for data fetching or subscriptions. componentWillUnmount runs right before the component is removed — used for cleanup (clearing timers, unsubscribing) to avoid memory leaks.

**26\. Explain the significance of \`React.StrictMode\`.**

A dev-only wrapper that helps catch bugs early — it intentionally double-invokes certain functions (like component render and some effects) to surface side effects that aren't supposed to be there, and warns about deprecated APIs. It doesn't render anything visible and has zero effect in production builds.

**27\. How does React handle conditional rendering?**

Just plain JS in JSX — ternaries, &&, or early returns, no special template syntax needed.

{isLoggedIn ? &lt;Dashboard /&gt; : &lt;Login /&gt;}

{error && &lt;ErrorBanner /&gt;}

**28\. How do you share data between sibling components?**

Lift the shared state up to their closest common parent, then pass it down as props to both — or, if it's needed in many places, use Context or a global state library instead of prop-drilling through several layers.

**29\. What is a React Portal?**

Lets you render a component's output into a DOM node outside its parent's DOM hierarchy — while it still behaves like a normal child in React's tree (events bubble normally). The classic use case is modals/tooltips that need to escape a parent's overflow: hidden or z-index stacking context.

ReactDOM.createPortal(&lt;Modal /&gt;, document.getElementById('modal-root'));

**30\. Explain lazy loading in React.**

Only load a component's code when it's actually needed, instead of bundling everything upfront — shrinks the initial bundle and speeds up first load.

const About = React.lazy(() => import('./About'));

&lt;Suspense fallback={<Spinner /&gt;}>&lt;About /&gt;&lt;/Suspense&gt;

**31\. What is \`React.memo\`, and why is it used?**

A wrapper that skips re-rendering a function component if its props haven't changed (shallow comparison) — a performance optimization for components that render often with the same props.

const Button = React.memo(({ label }) => &lt;button&gt;{label}&lt;/button&gt;);

**32\. How do you prevent unnecessary re-renders in React?**

React.memo for components, useMemo for expensive computed values, useCallback for functions passed as props (so they don't get a new reference every render), and keeping state as local as possible instead of lifting it higher than it needs to be.

**33\. How do you implement code splitting in React?**

React.lazy + Suspense for component-level splitting, or dynamic import() for splitting out non-component modules. Bundlers (Webpack/Vite) automatically create separate chunks for each dynamic import.

**34\. What is the difference between a library and a framework? Is React a library or framework?**

A library is something you call into on your own terms (you're in control of the flow); a framework calls into your code and dictates structure ("inversion of control"). React is a library — it only handles rendering, and you decide how to structure routing, state, data fetching, etc.

# Data Fetching & Routing

**35\. How do you fetch data in React applications?**

fetch or axios inside useEffect for simple cases, or a data-fetching library like React Query/SWR for anything real — they add caching, retries, and loading/error states for free instead of you hand-rolling all of it.

useEffect(() => {

fetch('/api/users').then((r) => r.json()).then(setUsers);

}, \[\]);

**36\. Explain the purpose of the \`useEffect\` hook.**

Runs side effects (data fetching, subscriptions, manually touching the DOM) after render. The dependency array controls when it re-runs — \[\] means once on mount, \[x\] means whenever x changes, no array means every render. Return a cleanup function for things like unsubscribing.

**37\. How do you use React Router?**

Wrap the app in &lt;BrowserRouter&gt;, define &lt;Routes&gt;/&lt;Route&gt; pairs mapping paths to components.

&lt;BrowserRouter&gt;

&lt;Routes&gt;

&lt;Route path="/" element={<Home /&gt;} />

&lt;Route path="/about" element={<About /&gt;} />

&lt;/Routes&gt;

&lt;/BrowserRouter&gt;

**38\. How do you manage routing for nested components?**

Nested &lt;Route&gt; elements with an &lt;Outlet /&gt; in the parent route's component marking where the child route renders.

&lt;Route path="dashboard" element={<Dashboard /&gt;}>

&lt;Route path="settings" element={<Settings /&gt;} />

&lt;/Route&gt;

**39\. What is the purpose of \`useParams\` in React Router?**

Reads dynamic segments out of the current URL — e.g. for a route like /users/:id, useParams() gives you { id: '...' } inside that component.

**40\. How do you handle redirection in React?**

&lt;Navigate to="/login" /&gt; (declarative, in JSX) or the useNavigate() hook (imperative, e.g. after a form submits successfully).

const navigate = useNavigate();

if (!user) navigate('/login');

**41\. What are dynamic routes in React Router?**

Routes with a param placeholder in the path, like /products/:productId — matches /products/1, /products/2, etc., and you read the actual value with useParams().

**42\. How do you add default routes in a React app?**

A wildcard route at the end of your route list catches anything unmatched, usually pointing to a "not found" page:

&lt;Route path="\*" element={<NotFound /&gt;} />

**43\. What is the significance of exact routes in React Router?**

In React Router v6, matching is exact by default (no more exact prop needed like v5) — a path only matches if it's a full match, not just a prefix, unless you explicitly nest routes.

**44\. How do you handle 404 pages in React?**

A catch-all route (path="\*") rendering a NotFound component, placed last so it only matches when nothing else did.

# Hooks

**45\. What are React hooks, and why were they introduced?**

Functions that let function components use state, lifecycle-like behavior, and context — introduced so you didn't need class components just to have state. They also make it much easier to reuse stateful logic (via custom hooks) without the HOC/render-props gymnastics that were common before.

**46\. What is the difference between \`useState\` and \`useReducer\`?**

useState is for simple, independent pieces of state. useReducer is better when state is complex, has multiple sub-values, or the next state depends heavily on the previous one and specific actions — it centralizes the update logic in one reducer function instead of scattering setX calls everywhere.

const \[state, dispatch\] = useReducer(reducer, { count: 0 });

dispatch({ type: 'increment' });

**47\. How does the \`useRef\` hook work in React?**

Returns a mutable object ({ current: ... }) that persists across renders without causing a re-render when it changes — used for DOM references, or just to hold onto a value (like a timer ID or previous value) between renders.

**48\. What is the difference between \`useEffect\` and \`useLayoutEffect\`?**

useEffect runs asynchronously after the browser paints — good for most side effects. useLayoutEffect runs synchronously right after DOM mutations but before the browser paints — use it when you need to measure or adjust the DOM before the user sees anything (avoiding a visible flicker).

**49\. How do you optimize performance in React applications?**

Memoize with React.memo/useMemo/useCallback where it actually matters (not everywhere — it has its own cost), virtualize long lists, code-split with lazy loading, avoid unnecessary state lifting, and use the React DevTools Profiler to find real bottlenecks instead of guessing.

**50\. What is React Context API, and how is it used?**

A way to pass data through the component tree without manually threading props through every level — good for things like theme, auth user, or locale that many components need.

const ThemeContext = createContext('light');

&lt;ThemeContext.Provider value="dark"&gt;&lt;App /&gt;&lt;/ThemeContext.Provider&gt;

const theme = useContext(ThemeContext);

**51\. How do you handle global state in React?**

Context API for simple/infrequently-changing state, or a dedicated library (Redux, Zustand, Jotai) when state is large, updates often, or you need dev tools/middleware — Context re-renders every consumer on change, which doesn't scale well for high-frequency updates.

**52\. What is Redux, and why is it used with React?**

A predictable state container — a single store, state updates only via dispatched actions and pure reducer functions. Used when app state gets complex enough that passing props/Context everywhere becomes unmanageable, and you want a clear, traceable data flow.

**53\. What are \`React.lazy\` and \`Suspense\` used for?**

React.lazy dynamically imports a component so it's only downloaded when rendered. Suspense wraps it and shows a fallback (like a spinner) while that component's code is still loading.

**54\. What are the core concepts of Redux?**

A single store holding all state, actions (plain objects describing "what happened"), reducers (pure functions computing the new state from an action), and the principle that state is read-only — never mutated directly, only replaced via reducers.

# Redux & State Management

**55\. What is an action in Redux?**

A plain JS object describing an event, with a required type field and optional payload data.

{ type: 'ADD_TODO', payload: { text: 'Learn Redux' } }

**56\. What is a reducer in Redux?**

A pure function (state, action) => newState — takes the current state and an action, returns a new state without mutating the original. Must have no side effects and be deterministic.

**57\. Explain the role of the Redux store.**

The single object holding the entire app's state tree. It exposes dispatch() to send actions, getState() to read current state, and lets you subscribe to changes.

**58\. How do you connect Redux with React components?**

The react-redux bindings — useSelector() to read a slice of state, useDispatch() to get the dispatch function.

const count = useSelector((state) => state.counter.value);

const dispatch = useDispatch();

dispatch(increment());

**59\. What is middleware in Redux?**

Code that sits between dispatching an action and it reaching the reducer — used for logging, crash reporting, or (most commonly) handling async logic like API calls, since plain reducers must stay synchronous and pure.

**60\. Explain the purpose of \`mapStateToProps\` and \`mapDispatchToProps\`.**

The older, pre-hooks way of connecting a component to Redux via the connect() HOC — mapStateToProps picks which store state becomes props, mapDispatchToProps turns dispatchable actions into props. Mostly replaced today by useSelector/useDispatch.

**61\. What are thunks in Redux?**

A middleware (redux-thunk) that lets an action creator return a function instead of a plain object — that function receives dispatch, so it can do async work (like an API call) and dispatch real actions once it resolves.

const fetchUser = () => async (dispatch) => {

const res = await fetch('/api/user');

dispatch({ type: 'SET_USER', payload: await res.json() });

};

**62\. How do you handle asynchronous actions in Redux?**

Thunks (most common, simple async functions), Redux-Saga (generator-based, good for complex flows like cancellation/race conditions), or RTK Query which handles caching and loading states for you automatically.

**63\. How do you implement error boundaries in React?**

A class component defining static getDerivedStateFromError() and/or componentDidCatch(), which catches JS errors thrown during rendering anywhere in its child tree and shows a fallback UI instead of crashing the whole app. Note: there's still no hook equivalent — error boundaries must be class components.

class ErrorBoundary extends React.Component {

state = { hasError: false };

static getDerivedStateFromError() { return { hasError: true }; }

render() {

if (this.state.hasError) return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;

return this.props.children;

}

}

**64\. What is React Fiber?**

React's internal reconciliation engine (rewritten in React 16). It breaks rendering work into small units that can be paused, resumed, or abandoned, letting React prioritize urgent updates (like typing) over less urgent ones (like a big list re-render) instead of blocking the main thread in one long synchronous pass.

**65\. Explain reconciliation in React.**

The algorithm React uses to figure out what changed between the old and new virtual DOM trees and apply the minimal real DOM updates. It assumes elements of different types produce different trees (so it tears down and rebuilds rather than diffing deeply), and uses keys to match up items in a list efficiently.

**66\. How does React handle hydration?**

When a page is rendered on the server first (SSR/SSG) and sent as static HTML, hydration is the process where React attaches its event listeners and internal state to that existing HTML on the client, instead of re-rendering everything from scratch — making the already-visible page interactive.

**67\. What is server-side rendering (SSR) in React?**

Rendering components to HTML on the server for each request and sending that fully-formed HTML to the browser (then hydrating it), instead of shipping a blank page that JS fills in. Improves SEO and perceived load time, typically done via Next.js rather than raw React.

**68\. What is static site generation (SSG) in React?**

Pages are pre-rendered to HTML once, at build time, and served as static files — fastest possible option since there's no per-request server work, best for content that's the same for every visitor.

**69\. What are React Suspense and Concurrent Mode?**

Suspense lets a component "wait" for something (data, code) before rendering, showing a fallback in the meantime. Concurrent features (renamed from "Concurrent Mode") let React interrupt, pause, and prioritize rendering work so the UI stays responsive during expensive updates — e.g. useTransition for marking updates as non-urgent.

**70\. How do you implement pagination in React?**

Track a page state, fetch/slice data based on that page number, and render prev/next controls that update it.

const \[page, setPage\] = useState(1);

useEffect(() => { fetchItems(page).then(setItems); }, \[page\]);

**71\. How do you implement infinite scrolling in React?**

An IntersectionObserver watching a sentinel element at the bottom of the list — when it comes into view, fetch and append the next page of data.

useEffect(() => {

const observer = new IntersectionObserver((\[entry\]) => {

if (entry.isIntersecting) loadMore();

});

observer.observe(bottomRef.current);

return () => observer.disconnect();

}, \[\]);

**72\. What is the purpose of the \`useCallback\` hook?**

Memoizes a function reference so it doesn't get recreated on every render — mainly useful to prevent a child wrapped in React.memo from re-rendering just because it received a "new" function prop that's actually logically the same.

**73\. How does the \`useMemo\` hook work in React?**

Memoizes the result of an expensive calculation, recomputing it only when its dependencies change — skips redoing the work on renders where the inputs haven't changed.

const sorted = useMemo(() => bigArray.sort(), \[bigArray\]);

**74\. What are custom hooks in React? Provide an example.**

A function starting with use that packages up reusable stateful logic (built from other hooks) so multiple components can share it without duplicating code.

function useWindowWidth() {

const \[width, setWidth\] = useState(window.innerWidth);

useEffect(() => {

const handler = () => setWidth(window.innerWidth);

window.addEventListener('resize', handler);

return () => window.removeEventListener('resize', handler);

}, \[\]);

return width;

}

**75\. How do you handle authentication in React?**

Typically: user logs in via an API call, server returns a token (JWT or session cookie), store it (httpOnly cookie is safest), attach it to subsequent requests, and gate routes/components based on whether a valid session exists — often via a context provider wrapping the app.

**76\. What are JWTs, and how do they work in React?**

JSON Web Tokens — a signed token containing user claims (like user ID, expiry) that the server issues on login. React stores it and sends it with API requests (usually in an Authorization header), and the server verifies the signature to confirm the request is legitimately from that user, without needing a server-side session lookup.

**77\. How do you implement role-based access control in React?**

Store the user's role (from the JWT/session), then guard routes/components by checking it — either a wrapper component that redirects if the role doesn't match, or conditionally rendering UI elements based on role.

function RequireRole({ role, children }) {

const { user } = useAuth();

if (user.role !== role) return &lt;Navigate to="/unauthorized" /&gt;;

return children;

}

**78\. How do you implement drag-and-drop in React?**

The native HTML5 drag events (onDragStart, onDragOver, onDrop) for simple cases, or a library like react-dnd or @dnd-kit for anything with reordering, nested drop zones, or touch support — rolling that all by hand gets messy fast.

**79\. How do you debug React applications?**

React DevTools for inspecting the component tree, props, and state live; browser DevTools for console/network/breakpoints; the Profiler tab to find slow renders; and just good old console.log/breakpoints inside effects and handlers for logic bugs.

**80\. What tools are commonly used to test React applications?**

Jest as the test runner/assertion library, React Testing Library for rendering components and interacting with them the way a user would, and Cypress or Playwright for end-to-end tests across the whole app in a real browser.

# Errors, Rendering Internals & SSR (recap round)

**81\. How do you implement error boundaries in React?**

Same concept as Q63 — a class component with getDerivedStateFromError/componentDidCatch that catches render errors in its subtree and shows a fallback instead of a blank white screen. Worth noting: it only catches errors during rendering, not inside event handlers or async code — those still need a plain try/catch.

**82\. What is React Fiber?**

Same as Q64 — the reworked reconciliation engine that lets rendering be split into interruptible units of work, so React can prioritize things like user input over a big background update instead of blocking the thread.

**83\. Explain reconciliation in React.**

Same as Q65 — the diffing process comparing old vs new virtual DOM trees to compute the smallest set of real DOM changes needed, using element type and keys to match nodes efficiently.

**84\. How does React handle hydration?**

Same as Q66 — React reuses the server-rendered HTML and attaches event listeners/state to it on the client rather than throwing it away and re-rendering from scratch.

**85\. What is server-side rendering (SSR) in React?**

Same as Q67 — HTML generated per-request on the server, sent already populated, then hydrated on the client.

**86\. How does SSR differ from client-side rendering (CSR)?**

SSR sends fully-rendered HTML from the server on every request — better SEO and faster first paint, but more server load. CSR sends a near-empty HTML shell and lets the browser's JS build the whole UI — cheaper to host (just static files) but slower first paint and worse for crawlers that don't execute JS well.

**87\. What is static site generation (SSG) in React?**

Same as Q68 — HTML built once at build time, served as static files, fastest option for content that doesn't change per visitor.

**88\. What are React Suspense and Concurrent Mode?**

Same as Q69 — Suspense shows fallback UI while something is loading; concurrent rendering lets React interrupt and reprioritize work instead of rendering everything in one uninterruptible block.

**89\. How do you implement pagination in React?**

Same approach as Q70 — keep a page/offset in state, fetch or slice the relevant chunk of data, and re-render controls to move between pages.

# Testing & TypeScript

**90\. How do you test React components using Jest?**

Jest runs the test files and provides expect/matchers; combined with React Testing Library you render a component and assert on what the user would actually see.

import { render, screen } from '@testing-library/react';

test('renders greeting', () => {

render(&lt;Greeting name="Sam" /&gt;);

expect(screen.getByText('Hello, Sam')).toBeInTheDocument();

});

**91\. What is the purpose of Enzyme in React testing?**

An older testing utility (Airbnb) for shallow-rendering components and inspecting internal state/props directly. It's largely fallen out of favor because React Testing Library's philosophy — test behavior, not implementation details — tends to produce more resilient tests, and Enzyme's adapter support lagged behind newer React versions.

**92\. How do you implement Snapshot testing in React?**

Jest renders the component to a serialized string and saves it as a "snapshot" file; future test runs compare the new render against that saved snapshot and fail if it changed unexpectedly, catching unintended UI regressions.

import renderer from 'react-test-renderer';

test('matches snapshot', () => {

const tree = renderer.create(&lt;Button label="Save" /&gt;).toJSON();

expect(tree).toMatchSnapshot();

});

**93\. How do you integrate TypeScript with React?**

Use .tsx files, type your props with an interface, and type hook state explicitly when it's not obvious from the initial value.

interface ButtonProps { label: string; onClick: () => void; }

function Button({ label, onClick }: ButtonProps) {

return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;

}

**94\. What are the benefits of using TypeScript in React projects?**

Catches typos and wrong prop types at compile time instead of runtime, gives you real autocomplete for props/state, makes refactors much safer (the compiler tells you everywhere a change breaks), and effectively replaces propTypes with something the whole team benefits from during development, not just at runtime.

**95\. How do you manage environment variables in React?**

Create React App / Vite both support .env files, with variables needing a specific prefix (REACT_APP_ or VITE_) to be exposed to the client bundle — anything without that prefix stays out of the browser build.

**96\. How do you implement a theme switcher (dark mode) in React?**

Store the current theme in Context (or a simple state + localStorage for persistence), toggle a class on the root element or swap CSS variables, and read the theme value wherever styling needs to branch.

const ThemeContext = createContext();

const \[theme, setTheme\] = useState(localStorage.getItem('theme') || 'light');

document.documentElement.setAttribute('data-theme', theme);

**97\. How do you handle file uploads in React?**

A file input (usually styled/hidden and triggered via a button), read the selected file from e.target.files, then send it via FormData in a POST request.

const handleUpload = async (e) => {

const formData = new FormData();

formData.append('file', e.target.files\[0\]);

await fetch('/api/upload', { method: 'POST', body: formData });

};

**98\. How do you implement routing in React applications?**

React Router is the standard: wrap the app in &lt;BrowserRouter&gt;, declare &lt;Route&gt;s mapping paths to components, and use &lt;Link&gt;/useNavigate for navigation instead of full page reloads.

**99\. What is the role of the \`&lt;Switch&gt;\` component in React Router?**

In React Router v5, &lt;Switch&gt; rendered only the first matching route instead of every route that matched. In v6 it was renamed to &lt;Routes&gt; and matching became exact-only by default, so you rarely need to think about "first match wins" explicitly anymore.

**100\. How do you implement private routes in React?**

A wrapper component that checks auth state and either renders the requested route or redirects to login.

function PrivateRoute({ children }) {

const { user } = useAuth();

return user ? children : &lt;Navigate to="/login" /&gt;;

}

&lt;Route path="/dashboard" element={<PrivateRoute&gt;&lt;Dashboard /&gt;&lt;/PrivateRoute&gt;} />

# Advanced Component Patterns

**101\. What is React StrictMode?**

Same as Q26 — a development-only wrapper that intentionally double-invokes renders/effects to help surface unsafe side effects and warns about deprecated patterns. No effect in production.

**102\. What is the difference between the \`useState\` and \`useReducer\` hooks?**

Same as Q46 — useState for simple, independent values; useReducer when updates follow clear "actions" and state logic is complex enough to benefit from being centralized in one function.

**103\. How does the \`useContext\` hook work?**

Reads the current value of a Context from the nearest matching Provider above it in the tree — no need to wrap the consumer in a render-prop or HOC like the old Context API required.

const value = useContext(MyContext);

**104\. What is a compound component pattern in React?**

Multiple components designed to work together as a set, sharing implicit state via Context, so the consumer composes them declaratively instead of passing a pile of config props.

&lt;Tabs&gt;

&lt;Tabs.List&gt;&lt;Tabs.Tab&gt;One&lt;/Tabs.Tab&gt;&lt;/Tabs.List&gt;

&lt;Tabs.Panels&gt;&lt;Tabs.Panel&gt;Content&lt;/Tabs.Panel&gt;&lt;/Tabs.Panels&gt;

&lt;/Tabs&gt;

**105\. How do you create a reusable component in React?**

Keep it focused on one job, accept configuration via props rather than hardcoding values, avoid baking in assumptions about where it'll be used (like fixed widths), and expose sensible defaults so it works out of the box but can still be customized.

**106\. How would you optimize rendering performance in React?**

Same toolkit as Q49/Q32 — React.memo, useMemo/useCallback for expensive work and stable references, virtualized lists for long data sets, and profiling first so you're optimizing the actual bottleneck instead of guessing.

**107\. How do you manage dependencies in a large React application?**

Lock versions with a lockfile, keep a monorepo or shared internal package for common components/utilities if you have multiple apps, regularly audit and update dependencies (tools like Dependabot help), and avoid pulling in a heavy library for something a few lines of code could do.

**108\. How do you implement animations in React?**

CSS transitions/keyframes for simple stuff, the react-transition-group library for enter/exit animations tied to component mount/unmount, or Framer Motion for anything richer (gestures, layout animations, spring physics) without writing raw CSS timing curves yourself.

**109\. How do you implement a drag-and-drop feature in React?**

Same as Q78 — native HTML5 drag events for basic cases, or react-dnd/@dnd-kit when you need reordering, multiple drop zones, or touch device support.

**110\. What is the role of CSS-in-JS libraries like styled-components in React?**

Let you write actual CSS inside your JS/component file, scoped automatically to that component, with full access to props for dynamic styling — avoids global class name collisions and keeps styles colocated with the component that uses them.

const Button = styled.button\`

background: ${(props) => (props.primary ? 'blue' : 'gray')};

\`;

**111\. What is the difference between \`PureComponent\` and \`React.memo\`?**

Same idea, different component types: PureComponent is the class-component version — it auto-implements a shallow prop/state comparison in shouldComponentUpdate. React.memo does the equivalent shallow comparison but for function components.

**112\. How do you use the \`useImperativeHandle\` hook?**

Lets a child component customize what a parent gets when it attaches a ref to it — instead of exposing the raw DOM node, you can expose a controlled set of methods.

const Input = forwardRef((props, ref) => {

const inputRef = useRef();

useImperativeHandle(ref, () => ({

focus: () => inputRef.current.focus(),

}));

return &lt;input ref={inputRef} /&gt;;

});

**113\. Explain the use of the \`React.forwardRef\` function.**

Lets a function component receive a ref from its parent and forward it down to one of its own children (usually a DOM node) — normally function components can't accept refs directly, this is the escape hatch.

const Input = forwardRef((props, ref) => &lt;input ref={ref} {...props} /&gt;);

**114\. What is the difference between \`React.lazy\` and loadable components?**

React.lazy is React's built-in solution but only supports default exports and doesn't work for SSR out of the box. @loadable/component (a third-party library) supports named exports, SSR, and preloading — historically the go-to choice for lazy loading in server-rendered apps before Next.js's own solutions matured.

**115\. What are some best practices for structuring a React project?**

Group by feature/domain rather than by file type once the app grows past a handful of components, keep components small and focused, colocate related styles/tests/hooks with the component, separate presentational from container/logic components, and keep a clear boundary between UI components and API/data-fetching code.

**116\. How do you optimize bundle size in React?**

Code split with lazy loading, tree-shake by using ES modules and avoiding importing whole libraries for one function (import debounce from 'lodash/debounce' instead of all of lodash), analyze the bundle (source-map-explorer/webpack-bundle-analyzer) to find what's actually bloating it, and lazy-load rarely used routes/features.

**117\. How do you handle authentication using Firebase in React?**

Firebase Auth SDK handles the heavy lifting — call signInWithEmailAndPassword or a provider method, listen to onAuthStateChanged to track the current user across the app (often stored in Context), and Firebase manages token refresh for you.

onAuthStateChanged(auth, (user) => setCurrentUser(user));

**118\. How do you set up SSR using Next.js with React?**

Next.js handles it for you — any component fetching data directly in a Server Component (App Router) or using getServerSideProps (Pages Router) gets rendered to HTML on the server per request automatically; no manual server setup needed like you'd have with raw React + Express + ReactDOMServer.

**119\. What are React error boundaries, and how do you implement them?**

Same as Q63/Q81 — a class component implementing getDerivedStateFromError/componentDidCatch to catch rendering errors in its children and show a fallback UI instead of the whole app crashing white-screen.

**120\. How do you monitor performance in a React app?**

The React DevTools Profiler for render timings during development, and in production tools like Web Vitals (web-vitals library) reporting metrics (LCP, FID/INP, CLS) to an analytics backend, plus error/performance monitoring services like Sentry.

# Errors, Anti-Patterns & UI Features

**121\. What are synthetic events in React?**

React's cross-browser wrapper around native DOM events — normalizes behavior across browsers so onClick, onChange, etc. work consistently. Since React 17+, they're attached at the root of the app rather than document, which also helps with multiple React versions coexisting on one page.

**122\. How do you avoid memory leaks in React?**

Clean up anything with an ongoing subscription in useEffect's cleanup function — event listeners, timers (clearInterval/clearTimeout), and cancel in-flight fetches/subscriptions when the component unmounts, so callbacks don't fire and try to setState on a component that no longer exists.

useEffect(() => {

const id = setInterval(tick, 1000);

return () => clearInterval(id);

}, \[\]);

**123\. What are the different lifecycle methods of React?**

Same as Q18 — mounting (constructor, render, componentDidMount), updating (render, componentDidUpdate), unmounting (componentWillUnmount), plus the less common shouldComponentUpdate and error-handling ones (getDerivedStateFromError, componentDidCatch).

**124\. What is Flux architecture?**

A pattern (from Facebook, predating Redux) for unidirectional data flow: actions flow to a dispatcher, which notifies stores, which update and notify views. Redux is essentially a simplified, more opinionated implementation of the same core idea — single direction of data flow, no direct mutation.

**125\. How is Flux different from Redux?**

Flux allows multiple stores and uses a central dispatcher; Redux consolidates everything into a single store and replaces the dispatcher with plain reducer functions. Redux is generally considered a cleaner, more testable evolution of the Flux idea rather than a wholly different concept.

**126\. How do you use hooks to manage form validation?**

Track field values and error messages in state (or use useReducer for more complex forms), validate on change/blur/submit, and surface error messages conditionally. In practice most teams reach for React Hook Form + a schema validator like Zod/Yup instead of hand-rolling it.

const { register, handleSubmit, formState: { errors } } = useForm();

**127\. How would you implement caching in a React app?**

For data fetching, a library like React Query/SWR handles this automatically (caches responses, refetches in the background, dedupes identical requests). For simpler needs, memoize expensive computations with useMemo, or cache API responses manually in state/localStorage keyed by request params.

**128\. What is the purpose of \`React.cloneElement\`?**

Clones a React element and lets you override or add props to it — used when you need to inject extra props into children without the parent explicitly knowing their shape (common inside compound components).

React.cloneElement(child, { extraProp: true });

**129\. What is the purpose of \`React.Children.map\`?**

Safely iterates over props.children, since children can be a single element, an array, or nothing at all — React.Children.map handles all those cases consistently instead of you having to check types yourself.

**130\. What is the difference between \`React.PureComponent\` and \`React.Component\`?**

React.Component re-renders whenever its parent re-renders, regardless of whether props/state actually changed. React.PureComponent adds an automatic shallow comparison of props and state, skipping the re-render if nothing meaningfully changed.

**131\. How do you manage side effects in React apps?**

useEffect for effects tied to a component's lifecycle (fetching data, subscriptions), with a proper dependency array and cleanup function. For more complex async flows shared across the app, some teams reach for Redux-Saga or RTK Query rather than juggling it all inside components.

**132\. How do you handle errors in React?**

Error boundaries for render-time errors in the component tree, try/catch around async code and event handlers (boundaries don't catch those), and a global error-tracking tool like Sentry to actually know when something breaks in production instead of finding out from a user complaint.

**133\. What are forward refs in React?**

Same as Q113 — React.forwardRef lets a function component accept a ref and pass it through to a child, typically a DOM element, since function components don't get refs by default.

**134\. How do you optimize API calls in React?**

Debounce calls tied to user input (like search-as-you-type), cache/dedupe requests with React Query or SWR, cancel stale requests when params change (AbortController), and batch or combine requests where the backend allows it instead of firing one per component.

**135\. What are the common anti-patterns in React?**

Mutating state directly instead of using setState/the updater, using array index as a list key when items can reorder, overusing useEffect for things that should just be computed during render, prop-drilling many levels instead of using Context, and putting everything in one giant component instead of breaking it up.

**136\. How do you improve SEO in React apps?**

Plain client-rendered React SPAs are weak on SEO since crawlers may not fully execute JS — the real fix is server-side rendering or static generation (Next.js), plus proper meta tags/titles per page, a sitemap, semantic HTML, and fast load times, since page speed itself is a ranking factor.

**137\. How do you implement a carousel in React?**

Track a current-index state, render the active slide (or use CSS transforms to slide between them), and wire up prev/next controls that update the index — or use a battle-tested library like swiper or react-slick for touch support, autoplay, and accessibility out of the box.

**138\. How do you handle file uploads in React?**

Same as Q97 — a file input, read from e.target.files, and send via FormData in a POST request; for large files, consider uploading directly to storage (S3 etc.) via a pre-signed URL rather than routing the file through your own server.

**139\. How do you design responsive components in React?**

CSS (media queries, flexbox/grid, relative units) handles most of it just like any web app — React's job is really just conditionally rendering different markup when layout needs to genuinely change, not just resize. A useMediaQuery-style hook can help when you need to branch logic (not just styles) based on screen size.

**140\. What are controlled and uncontrolled components in React?**

Same as Q14 — controlled inputs have their value driven by React state; uncontrolled inputs manage their own value in the DOM and you read it via a ref when needed.

**141\. How do you optimize images in React?**

Serve properly sized/compressed images, use modern formats (WebP/AVIF) with fallbacks, lazy-load offscreen images (loading="lazy"), and if you're on Next.js, just use next/image which handles all of this automatically.

**142\. How do you implement live chat in a React app?**

Either embed a third-party widget (Intercom, Crisp) for speed, or build your own using WebSockets (or a service like Socket.io/Firebase Realtime Database) for real-time message delivery, with messages held in state and appended as they arrive.

**143\. What is React PropTypes?**

Same as Q17 — a runtime prop-type checker that warns in dev if a component gets the wrong type of prop; mostly superseded by TypeScript in newer projects.

**144\. How do you integrate an API with React?**

Fetch data with fetch/axios (ideally wrapped in a data-fetching library like React Query), keep API logic in dedicated service functions/hooks rather than scattered inside components, and handle loading/error states explicitly so the UI doesn't just silently hang or break.

**145\. How do you optimize React app performance?**

Same toolkit again (Q49/106) — memoization where it matters, code splitting, virtualized lists, avoiding unnecessary re-renders by keeping state local, and profiling to confirm you're fixing a real bottleneck.

**146\. What are React Fragments?**

Same as Q13 — &lt;>...</&gt; groups sibling elements without adding an extra DOM node.

**147\. How does React handle keys in lists?**

Same as Q10 — keys let React match list items between renders so it can correctly reuse, reorder, or remove DOM nodes instead of tearing down and rebuilding the whole list on every change.

**148\. How does reconciliation work in React?**

Same as Q65/83 — diffing old vs new virtual DOM trees, using type and key to match nodes, computing the minimal real DOM changes needed.

**149\. What is the difference between \`useState\` and \`useEffect\`?**

useState declares and updates a piece of state; useEffect runs side effects in response to renders/state changes. They're often used together — state changes, and an effect reacts to that change (e.g. refetching data when a filter updates).

**149b. What are compound components in React?**

(Listed twice in the source under #149) Same as Q104 — components designed to be used together, sharing state implicitly via Context so the API reads declaratively (&lt;Tabs&gt;&lt;Tabs.Tab /&gt;&lt;/Tabs&gt;) instead of one component taking a big config object.

**150\. How do you design a reusable React component?**

Same as Q105 — single responsibility, configurable via props with sensible defaults, no hardcoded assumptions about its container/context, and a clear, minimal prop API that doesn't leak internal implementation details to the consumer.

# State, Async & Advanced UI Patterns

**151\. What are dynamic imports in React?**

import() as a function instead of a static top-level import — returns a promise, lets you load a module only when you need it. It's the underlying mechanism React.lazy uses for component-level code splitting, but you can use it for any module, not just components.

**152\. How do you manage state in React?**

Local component state (useState/useReducer) for state only that component cares about, lifted state for a few components that share it, Context for widely-needed low-frequency data, and a library (Redux Toolkit, Zustand) once state is large, shared broadly, and updates often. Pick the simplest option that solves the actual problem — don't reach for Redux by default.

**153\. What is React Profiler?**

A tool (in React DevTools, or the &lt;Profiler&gt; component in code) that measures how long each component takes to render and why it re-rendered — used to find actual performance bottlenecks instead of optimizing blindly.

&lt;Profiler id="App" onRender={(id, phase, duration) =&gt; console.log(duration)}>

&lt;App /&gt;

&lt;/Profiler&gt;

**154\. How do you create dynamic forms in React?**

Drive the form's fields from a config array/schema rather than hardcoding each input — map over the config to render fields, and store values in a single state object keyed by field name. Useful when the form shape can vary (e.g. admin-configurable forms).

{fields.map((f) => (

&lt;input key={f.name} name={f.name} onChange={handleChange} /&gt;

))}

**155\. How do you handle asynchronous code in React?**

async/await inside useEffect (wrapped in an inner function since the effect callback itself can't be async), or a data library like React Query that manages loading/error/success states for you. Always handle the error case — a silently failing fetch is a common real bug.

useEffect(() => {

(async () => {

const res = await fetch('/api/data');

setData(await res.json());

})();

}, \[\]);

**156\. How do you implement internationalization in React?**

A library like react-i18next or next-intl — store translation strings keyed by locale, wrap the app in a provider, and swap the active locale based on user preference or URL segment; components use a t('key') function instead of hardcoded text.

**157\. How do you debug React Hooks?**

React DevTools shows current hook state per component (labeled by hook order, so naming/organizing hooks clearly helps a lot when reading it), watch for the "rules of hooks" violations (conditional hooks, hooks in loops) which the ESLint plugin catches automatically, and double check dependency arrays — a huge share of hook bugs are just a missing or wrong dependency.

**158\. What are WebSockets, and how are they used in React?**

A persistent, two-way connection between client and server (unlike HTTP's request/response model) — used for real-time features like chat or live notifications. In React, you'd open the connection in a useEffect, update state as messages arrive, and close it in the cleanup function.

useEffect(() => {

const ws = new WebSocket('wss://example.com');

ws.onmessage = (e) => setMessages((m) => \[...m, e.data\]);

return () => ws.close();

}, \[\]);

**159\. How do you implement breadcrumbs in React?**

Derive the trail from the current route (splitting the pathname into segments, mapping each to a label), rather than hardcoding it per page — React Router's useLocation/useMatches gives you what you need to build the list of links dynamically.

**160\. How do you implement notifications in React?**

A toast/notification library (react-hot-toast, react-toastify) is the practical answer — you call a function to trigger a toast from anywhere, and it renders into a portal at the app root. Rolling your own means a Context provider holding a list of active notifications, rendered in a fixed-position container, auto-dismissed with a timeout.

**161\. How do you create a custom hook?**

Same idea as Q74 — extract shared logic (built from other hooks) into a function prefixed with use, so it can be reused across components without duplicating the logic or the state management around it.

**162\. What is the Context API?**

Same as Q50 — React's built-in way to share data across the tree without manual prop drilling, via createContext, a Provider, and useContext to read the value.

**163\. How do you integrate Redux with React?**

Same as Q58 — wrap the app in a &lt;Provider store={store}&gt;, then use useSelector to read state and useDispatch to dispatch actions from any connected component.

**164\. How do you handle multiple themes in React?**

Same idea as Q96 but generalized — store the active theme name in state/Context, define each theme as a set of CSS variables or a theme object, and switch which one applies (via a data attribute or a styling library's ThemeProvider) rather than writing separate stylesheets per theme.

**165\. What is the purpose of \`React.Children.toArray\`?**

Converts props.children into a flat array with stable keys automatically assigned — handy when you need to filter, reorder, or otherwise manipulate children as a real array instead of the loosely-typed structure children normally is.

**166\. What are React Design Patterns?**

Common reusable solutions to recurring UI problems: Higher-Order Components, Render Props, compound components, container/presentational split, and custom hooks (the modern favorite for sharing logic, having mostly replaced HOCs and render props for that purpose).

**167\. How do you implement modals in React?**

A Portal (ReactDOM.createPortal) to render the modal outside the normal DOM hierarchy (avoiding z-index/overflow issues), controlled by an isOpen state, with a backdrop click and Escape key both closing it, and focus trapped inside while it's open for accessibility.

**168\. How do you manage forms in React?**

Same as Q15 — controlled inputs backed by state for anything simple; React Hook Form for anything with more than a couple of fields, since it minimizes re-renders and handles validation wiring for you.

**169\. What are Render Props in React?**

A pattern where a component takes a function as a prop (often literally called render or passed as children) and calls it with some internal state/data, letting the consumer decide what to render with that data — a pre-hooks way of sharing logic, mostly replaced by custom hooks today.

&lt;DataProvider render={(data) =&gt; &lt;List items={data} /&gt;} />

**170\. How do you implement lazy loading in React?**

Same as Q30 — React.lazy(() => import('./Component')) combined with &lt;Suspense&gt; to show a fallback while the chunk downloads.

**171\. How do you handle forms in React?**

Same as Q15/168 — controlled components with state, or React Hook Form for more complex forms with less boilerplate and fewer re-renders.

**172\. How do you manage dependencies in React apps?**

Same as Q107 — lockfiles for reproducible installs, periodic audits/updates, shared internal packages for common code across multiple apps, and being deliberate about adding a new dependency versus writing a few lines yourself.

**173\. How do you debug Redux applications?**

Redux DevTools — shows every dispatched action, the state diff it caused, and lets you time-travel between past states, which makes tracking down "why did the state end up like this" dramatically easier than console-logging reducers.

**174\. What is the purpose of \`useLayoutEffect\` hook?**

Same as Q48 — runs synchronously after DOM mutations but before the browser paints, so you can measure or adjust the DOM (like fixing scroll position or measuring an element's size) without the user seeing a flash of the wrong layout.

**175\. How do you implement virtual scrolling in React?**

Only render the list items currently visible in the viewport (plus a small buffer), instead of all thousands of them — a library like react-window or react-virtualized handles the math (item heights, scroll offset, recycling DOM nodes) for you.

**176\. How do you optimize performance in large-scale React applications?**

Code splitting per route, aggressive memoization only where profiling shows it's needed, virtualizing long lists, moving heavy/shared logic into web workers when it's truly CPU-bound, using a mature data-fetching/caching layer instead of ad hoc fetches everywhere, and keeping bundle size in check by watching what gets pulled in as the app and its dependencies grow.

# Deep-Dive Performance & Architecture

**177\. What are React Fiber and its advantages over the old reconciliation algorithm?**

Fiber (Q64/82) replaced React's old "stack reconciler," which rendered the whole tree in one uninterruptible synchronous pass — a big update could block the main thread and make the page feel frozen. Fiber breaks that work into units it can pause, abort, or prioritize, so urgent updates like typing don't wait behind a big background render.

**178\. How does React's rendering mechanism work internally?**

A state change triggers a re-render, which builds a new virtual DOM tree. React's reconciler (Fiber) diffs it against the previous tree, computes the minimal set of real DOM mutations, and commits them in a single batch. React also decides, via Fiber's scheduling, which updates are urgent versus can be deferred, rather than treating every update with equal priority.

**179\. How does React handle concurrent rendering with Suspense and React Concurrent Mode?**

Same territory as Q69/88 — concurrent features let React start rendering an update, pause it if something more urgent comes in (like user input), and resume or discard it as needed. Suspense integrates with this by letting a tree "suspend" while waiting on data, so React can show a fallback for just that part instead of blocking everything else.

**180\. How do you minimize re-renders in React applications?**

Same toolbox again (Q32/106/145) — memoize components/values/functions where props are otherwise unchanged, keep state as local as possible instead of hoisting it needlessly high, split large components so a small state change doesn't force a huge subtree to re-render, and use the Profiler to confirm you're targeting a real re-render problem.

**181\. How do you handle memory leaks in React applications?**

Same as Q122 — always clean up subscriptions, timers, and listeners in your useEffect cleanup function, and cancel any in-flight async work when a component unmounts so a late-arriving response doesn't try to update unmounted state.

**182\. What is tree shaking, and how does it improve performance in React?**

A bundler optimization (Webpack/Rollup/Vite) that removes unused exports from the final bundle based on static import/export analysis — so if you only use one function from a library, the rest of that library's unused code doesn't ship to the browser. Relies on ES modules (not CommonJS) to work reliably.

**183\. What is Code Splitting, and how does it work in React?**

Same as Q33 — breaking the JS bundle into smaller chunks loaded on demand (per route or per component) instead of one giant bundle upfront, implemented via dynamic import()/React.lazy, with the bundler generating the separate chunk files automatically.

**184\. How do you handle expensive calculations efficiently in React?**

Wrap the calculation in useMemo so it only reruns when its actual inputs change, and if it's genuinely heavy (blocking the main thread for a noticeable time), consider moving it off the main thread entirely into a Web Worker.

**185\. What is a Render Prop, and how does it compare to Higher-Order Components?**

Same concept as Q169 — a component exposes internal data via a function prop instead of wrapping the consumer like an HOC does. Render props avoid some HOC pitfalls (like prop name collisions and unclear ref forwarding) but can lead to deep nesting ("wrapper hell") in their own way; both patterns have largely given way to custom hooks.

**186\. How do you implement an infinite scrolling feature in React?**

Same as Q71/186 — an IntersectionObserver on a sentinel element at the list's end triggers loading the next page of data when it scrolls into view, appending to the existing list rather than replacing it.

**187\. Best practices for \`useMemo\` and \`useCallback\` in React**

Don't wrap everything by default — they have their own overhead and only pay off when the computation is genuinely expensive or the reference is passed to a memoized child/effect dependency. Keep dependency arrays accurate (the ESLint hooks plugin catches most mistakes), and remember memoization doesn't prevent a re-render outright, it just skips recomputation/recreation of that specific value.

**188\. What is \`whyDidYouRender\`, and how can it help optimize performance?**

A dev library that patches React to log to the console whenever a component re-renders for a reason that looks avoidable (like receiving props that are equal by value but a new reference). Useful for hunting down unnecessary re-renders you wouldn't otherwise notice just by reading code.

**189\. How does \`useReducer\` differ from \`useState\` in managing complex state logic?**

Same theme as Q46/102 — useReducer centralizes all the ways state can change into one reducer function keyed by action type, which scales much better than several separate useState calls once updates start depending on each other or the previous state in non-trivial ways.

**190\. Difference between \`useRef\`, \`createRef\`, and \`forwardRef\`**

useRef (hooks) persists the same ref object across re-renders of a function component. createRef (classes, or one-off cases) creates a brand new ref object every time it's called — fine in a constructor (runs once) but wrong to call during render in a function component. forwardRef isn't a ref itself — it's what lets a function component accept a ref from its parent and forward it down to a child element.

**191\. How to persist state across page reloads in React?**

Save it to localStorage (or sessionStorage for tab-only persistence) whenever it changes, and read it back as the initial state on mount.

const \[count, setCount\] = useState(() => Number(localStorage.getItem('count')) || 0);

useEffect(() => { localStorage.setItem('count', count); }, \[count\]);

**192\. How to handle debouncing and throttling in React?**

Debounce: wait for a pause in events before acting (like search-as-you-type) — reset a timer on every call, only fire after it settles. Throttle: guarantee an action fires at most once per interval, regardless of how often it's triggered (like scroll handlers). Lodash's debounce/throttle are the common practical choice inside a useEffect or useCallback.

**193\. How to implement global state management without Redux?**

Context + useReducer for a Redux-like pattern without the library, or a lighter state library like Zustand or Jotai — much less boilerplate than Redux, no need for a Provider wrapping everything (Zustand), and often plenty for apps that don't need Redux's middleware ecosystem or dev tooling.

**194\. Differences between Redux Toolkit and traditional Redux**

Traditional Redux required a lot of hand-written boilerplate — action types, action creators, switch-statement reducers, manual immutability. Redux Toolkit (RTK) is the now-recommended way to write Redux: createSlice generates actions/reducers together, it uses Immer under the hood so you can "mutate" state directly in reducers safely, and it bundles good defaults (like thunk middleware) out of the box.

**195\. What are selectors in Redux, and how do they improve performance?**

Functions that extract a specific piece of derived data from the store, used inside useSelector. Paired with memoization (via reselect or RTK's createSelector), they avoid recomputing derived data (like a filtered/sorted list) unless its actual inputs changed, and avoid unnecessary component re-renders when unrelated parts of the store update.

**196\. How do you create dynamic forms in React?**

Same as Q154 — drive fields from a config/schema array and render them programmatically rather than hardcoding each input, keeping values in one state object keyed by field name.

**197\. How do you handle asynchronous code in React?**

Same as Q155 — async/await inside an effect (via an inner async function), or a data-fetching library that manages the loading/success/error states for you, always handling the failure path explicitly.

**198\. What is React Transition Group?**

A library for managing enter/exit animations tied to component mount/unmount — since React normally removes an unmounting component from the DOM instantly, react-transition-group delays that removal just long enough for a CSS transition/animation to actually play.

&lt;CSSTransition in={show} timeout={300} classNames="fade"&gt;

&lt;div&gt;Content&lt;/div&gt;

&lt;/CSSTransition&gt;

**199\. How do you implement internationalization (i18n) in React?**

Same as Q156 — a library like react-i18next, translation strings organized by locale/key, a provider wrapping the app, and a t() function used in components instead of hardcoded text, with the active locale switchable at runtime.

**200\. What are WebSockets, and how are they used in React?**

Same as Q158 — a persistent bidirectional connection for real-time data, opened in a useEffect, updating component state as messages arrive, and closed in the cleanup function when the component unmounts.

# Core Concepts

**RC1: useEffect vs useLayoutEffect?**
`useEffect` runs after the browser paints. `useLayoutEffect` runs before paint — only needed when you must measure/adjust the DOM before the user sees it.

**RC2: What is the virtual DOM, and why do keys matter?**
React keeps an in-memory copy of the UI, compares old vs new after a state change, and updates only what changed in the real DOM. Keys tell React which list item is which across renders.
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**RC3: Controlled vs uncontrolled components?**
Controlled = React state is the source of truth. Uncontrolled = the DOM holds the value, read via a ref.
```jsx
<input value={name} onChange={e => setName(e.target.value)} />
```

**RC4: useMemo/useCallback — when do they help?**
They cache a value/function so it isn't recreated every render — only worth it for expensive calculations or when passing stable references to a memoized child.
```jsx
const total = useMemo(() => prices.reduce((a, b) => a + b, 0), [prices]);
```

**RC5: What problem does Context solve, and its pitfall?**
Avoids passing props through many layers. Pitfall: every component reading the context re-renders whenever the value changes, even if it only needs part of it.

**RC6: What causes a re-render?**
A component's own state changes, its parent re-renders, or a context it reads changes. Debug with React DevTools' "highlight updates."

**RC7: What rule must every custom hook follow?**
Only call hooks at the top level — never inside loops/conditions — so React tracks them in the same order every render.
```jsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn(o => !o)];
}
```

**RC8: useReducer vs useState?**
`useState` is simplest for one value. `useReducer` is better when the next state depends on complex logic or several fields update together.

**RC9: What is prop drilling?**
Passing a prop through components that don't use it, just to reach a deeply nested child. Fixed with Context or a state library (this project uses Zustand).

**RC10: What do error boundaries catch?**
Render errors in child components. They do NOT catch errors in event handlers or async code (`fetch`, `setTimeout`) — those still need try/catch.

**RC11: What is React Fiber?**
React's internal engine (since v16) that can pause, split, and prioritize rendering work instead of blocking the main thread with one big synchronous render.

**RC12: What is hydration, and what causes a mismatch?**
The server sends fully-rendered HTML; React attaches event listeners to it instead of rebuilding the DOM. A mismatch happens when server HTML differs from what the client would render — e.g. using `Date.now()` during render.

**RC13: What are portals for?**
Render a component into a different DOM node than its parent — useful for modals that need to escape a parent's `overflow: hidden`.
```jsx
createPortal(<Modal />, document.getElementById('modal-root'));
```

**RC14: React.memo vs PureComponent?**
Both skip re-rendering if props haven't shallowly changed. `memo` is for function components, `PureComponent` is the class equivalent.

**RC15: What is code-splitting?**
Load a component's code only when needed instead of in the initial bundle.
```jsx
const Settings = React.lazy(() => import('./Settings'));
<Suspense fallback={<p>Loading...</p>}><Settings /></Suspense>
```
