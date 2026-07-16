**SOLID** (mainly for OOP, but broadly useful):

- **S - Single Responsibility**: A class/module should do one thing and have one reason to change. Don't cram unrelated logic together.
- **O - Open/Closed**: Code should be open for extension but closed for modification. Add new behavior by adding new code, not editing existing tested code.
- **L - Liskov Substitution**: A subclass should be usable anywhere its parent class is expected, without breaking things. If Bird has a fly() method, Penguin extends Bird is going to cause trouble.
- **I - Interface Segregation**: Don't force classes to implement methods they don't need. Prefer several small, specific interfaces over one bloated one.
- **D - Dependency Inversion**: Depend on abstractions (interfaces), not concrete implementations. High-level code shouldn't be tightly coupled to low-level details.

**DRY - Don't Repeat Yourself**: Every piece of knowledge/logic should exist in one place. If you're copy-pasting the same code in three files, extract it into a function/module instead. Avoids the pain of updating the same fix in five places.

**KISS - Keep It Simple, Stupid**: Favor the simplest solution that works. Don't over-engineer, don't add abstraction layers "just in case." Simple code is easier to read, debug, and maintain.