# Jest — Interview Q&A

1. **What is Jest?**

   Jest is a JavaScript testing framework used to run unit and integration tests.

2. **What is React Testing Library?**

   It is a library for testing React UI by interacting with the component the way a user would.

3. **What is the difference between Jest and React Testing Library?**

   Jest runs the tests. React Testing Library helps you test the UI behavior and DOM output.

4. **What does render() do?**

   It renders a React component into a test DOM so you can inspect and interact with it.

5. **What is screen used for?**

   screen gives you access to DOM queries like getByText, getByRole, and getByLabelText.

6. **What is the difference between getBy..., queryBy..., and findBy...?**

   getBy... throws an error if nothing is found. queryBy... returns null if nothing is found. findBy... waits for an element to appear asynchronously.

7. **Why do we use userEvent instead of fireEvent?**

   userEvent simulates more realistic user actions like typing, clicking, and tabbing.

8. **What is expect(...).toBeInTheDocument()?**

   It checks that an element exists in the DOM.

9. **What is a test case in Jest?**

   A test case is a single scenario you want to verify, usually written inside it().

10. **Why do we write tests for UI components?**

    To ensure the app behaves correctly, prevent regressions, and make changes safer.

11. **What is the purpose of describe() in Jest?**

    Groups related tests under one label.
    ```js
    describe('Login form', () => {
      test('shows error on empty email', () => {...});
      test('submits with valid input', () => {...});
    });
    ```

12. **How do you test a login form?**

    ```js
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText('Email'), 'a@b.com');
    await userEvent.type(screen.getByLabelText('Password'), '123456');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));
    expect(await screen.findByText('Welcome back')).toBeInTheDocument();
    ```

13. **How do you test that a button click changes the UI?**

    ```js
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    ```

14. **What is the difference between unit tests and integration tests?**

    Unit test: test just a function, e.g. `add(2,3) === 5`.
    Integration test: test a `<Cart />` component that uses `<Total />` and a mocked API together, checking the total price displays correctly after adding an item.

15. **Why should tests focus on user behavior rather than implementation details?**

    Bad (implementation): `expect(wrapper.state().isOpen).toBe(true)`
    Good (behavior): `expect(screen.getByText('Menu open')).toBeInTheDocument()`
    If you rename `isOpen` to `menuVisible` during a refactor, the bad test breaks even though the app still works. The good test doesn't care.

---

# React Testing Library — Interview Q&A

1. **What query priority does RTL recommend?**

   getByRole first, then getByLabelText, getByText, and getByTestId as a last resort. This mirrors how real users/screen readers find elements.

2. **What is `within()` used for?**

   Scopes a query to inside a specific element, useful when the same text appears in multiple places.
   ```js
   const list = screen.getByRole('list');
   within(list).getByText('Item 1');
   ```

3. **How do you test that an element is NOT present?**

   Use `queryBy`, not `getBy` (which would throw).
   ```js
   expect(screen.queryByText('Error')).not.toBeInTheDocument();
   ```

4. **How do you test conditional rendering?**

   Render with different props/state and assert what appears.
   ```js
   render(<Alert show={false} />);
   expect(screen.queryByRole('alert')).not.toBeInTheDocument();
   ```

5. **How do you test async data fetching?**

   Mock the API call, then use `findBy` to wait for the result to appear.
   ```js
   render(<UserList />);
   expect(await screen.findByText('John')).toBeInTheDocument();
   ```

6. **What does `waitFor` do?**

   Retries a callback until it passes or times out — used when waiting on async UI changes not tied to a specific element appearing.
   ```js
   await waitFor(() => expect(mockFn).toHaveBeenCalled());
   ```

7. **Do you need `cleanup()` after each test?**

   No, RTL auto-cleans the DOM after each test when using Jest/Vitest's testing environment — no manual call needed.

8. **How do you test forms with validation?**

   Submit with invalid input, assert the error message appears; submit with valid input, assert success/next state.
   ```js
   await userEvent.click(screen.getByRole('button', { name: /submit/i }));
   expect(await screen.findByText('Email is required')).toBeInTheDocument();
   ```

9. **How do you test a component that uses Context (e.g., theme, auth)?**

   Wrap it in the real Provider with test values when rendering.
   ```js
   render(
     <AuthContext.Provider value={{ user: { name: 'Jo' } }}>
       <Profile />
     </AuthContext.Provider>
   );
   ```

10. **How do you test a component that uses React Router?**

    Wrap it in `MemoryRouter`.
    ```js
    render(<MemoryRouter><Nav /></MemoryRouter>);
    ```

11. **What's the difference between `getByTestId` and `getByRole`?**

    `getByRole` queries by accessibility role (button, textbox) — preferred, mirrors real usage. `getByTestId` queries a custom `data-testid` attribute — a fallback when no accessible role/label exists.

12. **How do you test custom hooks?**

    Use `renderHook` from RTL.
    ```js
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    ```

13. **How do you debug a failing test?**

    `screen.debug()` prints the current DOM to the console so you can see what actually rendered.

14. **Why does RTL discourage querying by class name or component internals?**

    Class names and internals change during refactors even when behavior doesn't — tests should only break when the user-facing app actually breaks.

15. **How do you simulate typing into an input?**

    ```js
    await userEvent.type(screen.getByLabelText('Name'), 'Mohasin');
    ```

16. **What are the common getBy... queries in React Testing Library, and how are they used?**

    They find elements in the DOM during a test the way a user would interact with the UI:

    - `getByText`: finds an element by its visible text
    - `getByLabelText`: finds a form input by its label
    - `getByPlaceholderText`: finds an input by its placeholder text
    - `getByRole`: finds an element by its accessibility role — button, heading, textbox, status, etc.
    - `getByAltText`: finds an image by its alt text
    - `getByTitle`: finds an element by its title attribute
    - `getByDisplayValue`: finds an input by its current displayed value
    - `getByTestId`: finds an element by a `data-testid`

    ```js
    screen.getByText("Login");
    screen.getByLabelText(/email/i);
    screen.getByRole("button");
    screen.getByPlaceholderText("Enter name");
    ```

    Related variants: `getAllBy...` for multiple matches, `queryBy...` for optional elements that may not exist, `findBy...` for elements that appear asynchronously.

---

# Vitest — Interview Q&A

1. **What is Vitest?**

   A test runner built for Vite projects — API-compatible with Jest (describe, test, expect) but faster, using Vite's native ES module handling.

2. **How is Vitest different from Jest?**

   Vitest uses Vite's build pipeline (faster, native ESM/TS support, no extra transform config). Jest uses its own transform/config layer (often needs Babel setup for TS/ESM). Test syntax is nearly identical.

3. **Do you need to import describe/test/expect in Vitest?**

   Not if `globals: true` is set in Vite config — then they're available like in Jest. Otherwise import them explicitly:
   ```js
   import { describe, test, expect } from 'vitest';
   ```

4. **How do you run Vitest in watch mode?**

   `vitest` runs in watch mode by default; use `vitest run` for a single run (e.g., in CI).

5. **What is `vi.fn()`?**

   Vitest's equivalent of `jest.fn()` — creates a mock function you can track calls/arguments on.

6. **How do you mock a module in Vitest?**

   ```js
   vi.mock('./api', () => ({
     fetchUser: vi.fn(() => Promise.resolve({ name: 'Jo' })),
   }));
   ```

7. **What is `vi.spyOn()`?**

   Wraps an existing method so you can track/assert calls while still (optionally) calling the real implementation.
   ```js
   const spy = vi.spyOn(console, 'log');
   ```

8. **How do you mock timers in Vitest?**

   ```js
   vi.useFakeTimers();
   vi.advanceTimersByTime(1000);
   ```

9. **How do you configure Vitest?**

   Via `vite.config.ts` (or a separate `vitest.config.ts`) under a `test` key, e.g. `test: { environment: 'jsdom', globals: true }`.

10. **How do you test React components with Vitest?**

    Same as Jest — use React Testing Library. Just set `environment: 'jsdom'` in the Vitest config.

11. **How do you run a single test file or test case?**

    `vitest run path/to/file.test.ts`, or use `test.only(...)` in code to isolate one case.

12. **Does Vitest support snapshot testing?**

    Yes — `expect(value).toMatchSnapshot()` works the same as in Jest.

13. **How do you check test coverage in Vitest?**

    `vitest run --coverage` (requires `@vitest/coverage-v8` or similar installed).

14. **How do you mock an API call in Vitest?**

    Same pattern as Jest: mock the module, or use MSW to intercept the actual network request.

15. **Can Vitest and Jest tests coexist during a migration?**

    Generally yes for simple suites since the API is near-identical, but Jest-specific APIs (`jest.mock`, `jest.fn`) need to be swapped for Vitest's `vi.*` equivalents.
