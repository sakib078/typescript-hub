export interface Section {
  id: string;
  title: string;
  icon: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  /** A short, search-friendly summary used for the page <meta description>. */
  seoDescription?: string;
  /** Comma-separated keywords for this topic's <meta keywords>. */
  keywords?: string;
  /** A dedicated, runnable example for the "Try it yourself" playground. */
  playground?: PlaygroundExample;
}

export interface PlaygroundExample {
  /** Runnable TypeScript whose console output appears when the user hits Run. */
  code: string;
  /** Optional one-line hint shown above the editor. */
  hint?: string;
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description?: string;
}

export const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "BookOpen",
    subsections: [
      {
        id: "what-is-typescript",
        title: "What is TypeScript?",
        seoDescription:
          "TypeScript is JavaScript with static types. Learn what TypeScript is, how it catches bugs before runtime, and how it compiles to plain JavaScript.",
        keywords:
          "what is typescript, typescript vs javascript, typescript definition, static types, typescript compiler",
        content: `TypeScript is **JavaScript with types**. It's a superset of JavaScript created by Microsoft: every valid \`.js\` file is already valid TypeScript, but TypeScript adds an optional **static type system** on top.

That one addition changes how you work. In plain JavaScript a variable can silently change shape — a number becomes a string, an object is missing a field, a function is called with the wrong arguments — and you only find out when the code crashes in front of a user. TypeScript checks these things **while you type**, in your editor, before the code ever runs.

## How it actually works

TypeScript is a **compile-time** tool. The TypeScript compiler (\`tsc\`) reads your typed code, checks it for errors, and then **erases the types** to produce ordinary JavaScript that runs anywhere JavaScript runs — browsers, Node.js, Deno, Bun. The types exist only during development; they add **zero runtime overhead**.

## Why people switch

- **Bugs surface earlier** — type mismatches are caught in the editor, not in production.
- **Your editor gets smarter** — accurate autocomplete, inline docs, and safe refactors.
- **Types are documentation** — a function signature tells you exactly what goes in and out.

TypeScript is now the default for most serious JavaScript projects, including React, Angular, Vue, Node back-ends, and tooling.`,
        codeExamples: [
          {
            title: "JavaScript (problematic)",
            code: `let x = 5;
x = "hello";  // Allowed in JavaScript — no warning at all
x.toFixed(2); // 💥 Runtime crash: x.toFixed is not a function`,
            language: "javascript",
            description: "JavaScript happily lets a number become a string, then breaks at runtime.",
          },
          {
            title: "TypeScript (safe)",
            code: `let x: number = 5;
x = "hello";  // ❌ Error: Type 'string' is not assignable to type 'number'`,
            language: "typescript",
            description: "TypeScript catches the mistake in your editor, before it ships.",
          },
          {
            title: "Types are erased at compile time",
            code: `// TypeScript you write:
const greet = (name: string): string => \`Hi \${name}\`;

// JavaScript that actually runs (types removed):
const greet = (name) => \`Hi \${name}\`;`,
            language: "typescript",
            description: "Types disappear after compilation — no runtime cost.",
          },
        ],
        playground: {
          hint: "Hit Run — TypeScript is compiled to JavaScript and executed in your browser.",
          code: `let message: string = "Hello, TypeScript!";
console.log(message);
console.log("Length:", message.length);

const double = (n: number): number => n * 2;
console.log("double(21) =", double(21));`,
        },
      },
      {
        id: "why-typescript",
        title: "Why TypeScript Matters",
        seoDescription:
          "The real-world benefits of TypeScript: catch bugs early, self-documenting code, smarter autocomplete, safe refactoring, and better team collaboration.",
        keywords:
          "why use typescript, typescript benefits, typescript advantages, typescript for teams",
        content: `Adding types is a small amount of extra typing for a large payoff. Here's what you get in practice.

1. **Catch bugs before users do** — typos, wrong arguments, missing properties, and \`undefined\` access are reported as you write.
2. **Self-documenting code** — types describe intent. \`getUser(id: number): Promise<User>\` tells you everything without reading the body.
3. **Autocomplete that's actually right** — your editor knows the exact shape of every value, so completions and inline docs are precise.
4. **Refactor without fear** — rename a field or change a signature and the compiler points to every place that needs updating.
5. **Scales to teams** — types are a contract between files and people, so large codebases stay maintainable.

## The honest trade-offs

TypeScript adds a build step and a learning curve, and you'll occasionally fight the type checker on tricky code. But for anything beyond a tiny script, the time saved on debugging and refactoring far outweighs the cost. You can also adopt it **gradually** — turn strictness up over time and mix typed and untyped files.`,
        codeExamples: [
          {
            title: "Self-documenting signatures",
            code: `// You instantly know the inputs and output:
function calculateTotal(prices: number[], taxRate: number): number {
  const subtotal = prices.reduce((sum, p) => sum + p, 0);
  return subtotal * (1 + taxRate);
}`,
            language: "typescript",
          },
          {
            title: "Refactoring safety",
            code: `type User = { id: number; fullName: string };

function greet(user: User) {
  return \`Hello \${user.name}\`; // ❌ 'name' does not exist on User — did you mean 'fullName'?
}`,
            language: "typescript",
            description: "Rename a property and TypeScript flags every stale usage.",
          },
        ],
        playground: {
          hint: "A typed function that's hard to misuse.",
          code: `function calculateTotal(prices: number[], taxRate: number): number {
  const subtotal = prices.reduce((sum, p) => sum + p, 0);
  return subtotal * (1 + taxRate);
}

console.log(calculateTotal([10, 20, 30], 0.08).toFixed(2));`,
        },
      },
    ],
  },
  {
    id: "setup",
    title: "Setup & Installation",
    icon: "Settings",
    subsections: [
      {
        id: "install-nodejs",
        title: "Install Node.js",
        seoDescription:
          "Install Node.js to use TypeScript. Download the LTS version, verify the install, and get npm ready for your first TypeScript project.",
        keywords: "install nodejs, nodejs lts, npm, setup typescript environment",
        content: `TypeScript's compiler runs on **Node.js**, so that's the first thing to install. Node also gives you **npm**, the package manager you'll use to install TypeScript and libraries.

1. Go to [nodejs.org](https://nodejs.org).
2. Download the **LTS** (Long-Term Support) version — it's the stable one recommended for most users.
3. Run the installer and accept the defaults.
4. Open a fresh terminal and verify it worked.

## Tip: manage versions with a version manager

If you work on multiple projects, a version manager like **nvm** (macOS/Linux) or **nvm-windows** lets you switch Node versions per project. Not required to start, but handy later.`,
        codeExamples: [
          {
            title: "Verify the install",
            code: `node --version   # e.g. v22.14.0
npm --version    # e.g. 10.9.0`,
            language: "bash",
            description: "Both commands should print a version number.",
          },
        ],
      },
      {
        id: "install-typescript",
        title: "Install TypeScript",
        seoDescription:
          "Install TypeScript with npm. Add it as a dev dependency, install Node type definitions, and create a tsconfig.json to configure the compiler.",
        keywords: "install typescript, npm install typescript, tsconfig, @types/node, tsc",
        content: `Install TypeScript **locally** (per project) rather than globally — that way every contributor uses the same compiler version.

After installing, generate a \`tsconfig.json\`. This file configures the compiler: which files to include, the JavaScript version to target, and how strict the type checking should be. Running \`npx tsc --init\` scaffolds one with sensible defaults and helpful comments.

## Why @types/node?

The \`@types/node\` package provides type definitions for Node's built-in modules (\`fs\`, \`path\`, \`process\`, …). Without it, TypeScript doesn't know those APIs exist.`,
        codeExamples: [
          {
            title: "Install as a dev dependency",
            code: `npm install --save-dev typescript
npm install --save-dev @types/node`,
            language: "bash",
          },
          {
            title: "Create tsconfig.json",
            code: `npx tsc --init    # generates tsconfig.json
npx tsc --version # confirm the compiler works`,
            language: "bash",
          },
        ],
      },
      {
        id: "first-file",
        title: "Your First TypeScript File",
        seoDescription:
          "Write, compile, and run your first TypeScript file. Learn how tsc turns a .ts file into JavaScript and how to run it with Node.",
        keywords:
          "first typescript file, compile typescript, tsc, run typescript, hello world typescript",
        content: `Let's compile a real file. Create \`hello.ts\`, write some typed code, compile it with \`tsc\`, and run the generated JavaScript with Node.

## The modern shortcut: run TypeScript directly

You no longer always need a separate compile step. Recent Node.js versions (22+) can **run TypeScript files directly** by stripping the types — \`node hello.ts\` just works for type-only syntax. Tools like **tsx** and **ts-node** do the same. We cover this in the *What's New* section, but it's great for quick scripts.`,
        codeExamples: [
          {
            title: "hello.ts",
            code: `let message: string = "Hello, TypeScript!";
console.log(message);`,
            language: "typescript",
          },
          {
            title: "Compile & run (classic)",
            code: `npx tsc hello.ts   # creates hello.js
node hello.js      # Output: Hello, TypeScript!`,
            language: "bash",
          },
          {
            title: "Run directly (Node 22+)",
            code: `node hello.ts      # runs without an explicit compile step`,
            language: "bash",
            description: "Node strips the types and runs the file.",
          },
        ],
        playground: {
          hint: "This is the kind of code that goes in hello.ts.",
          code: `let message: string = "Hello, TypeScript!";
console.log(message);

const today: Date = new Date();
console.log("It runs!", today.getFullYear());`,
        },
      },
    ],
  },
  {
    id: "types",
    title: "Type System",
    icon: "Code",
    subsections: [
      {
        id: "basic-types",
        title: "Basic Types",
        seoDescription:
          "Learn TypeScript's basic types: string, number, boolean, null, and undefined. Understand type annotations and when TypeScript can infer types for you.",
        keywords:
          "typescript basic types, string number boolean, type annotation, type inference, primitive types",
        content: `Every value in TypeScript has a type. The foundation is the same set of **primitives** JavaScript has: \`string\`, \`number\`, \`boolean\`, plus \`null\` and \`undefined\`.

You declare a type with a **type annotation** — a colon and the type after the variable name: \`let age: number = 25\`. Once a variable has a type, assigning an incompatible value is an error.

## Let inference do the work

You don't have to annotate everything. When you initialize a variable, TypeScript **infers** the type automatically. \`let name = "Ada"\` is already typed as \`string\`. A good rule: annotate function parameters and public APIs; let inference handle obvious local variables.

## Gotcha: number is just number

TypeScript has **no separate integer type** — \`number\` covers integers and floats alike (and there's a separate \`bigint\` for very large integers). Don't reach for \`Integer\` or \`int\`; they don't exist.`,
        codeExamples: [
          {
            title: "String",
            code: `let firstName: string = "Hitesh";
firstName = "John";   // ✅ OK
firstName = 123;      // ❌ Type 'number' is not assignable to type 'string'`,
            language: "typescript",
          },
          {
            title: "Number & Boolean",
            code: `let age: number = 25;       // integers and floats are both 'number'
let price: number = 9.99;
let isActive: boolean = true;
isActive = 1;               // ❌ '1' is not a boolean`,
            language: "typescript",
          },
          {
            title: "Inference — no annotation needed",
            code: `let city = "Mumbai";  // inferred as string
let count = 42;       // inferred as number
city = 7;             // ❌ still type-checked, even without an annotation`,
            language: "typescript",
          },
          {
            title: "null & undefined",
            code: `let empty: null = null;
let notSet: undefined = undefined;`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Change a value to the wrong type and hit Run to see what happens.",
          code: `let firstName: string = "Hitesh";
let age: number = 25;
let isActive: boolean = true;

console.log(\`\${firstName} is \${age} and active: \${isActive}\`);
console.log("Uppercase:", firstName.toUpperCase());`,
        },
      },
      {
        id: "arrays",
        title: "Arrays & Tuples",
        seoDescription:
          "Type arrays in TypeScript with number[] or Array<T>, and use tuples for fixed-length, fixed-type lists. Includes readonly arrays and common pitfalls.",
        keywords:
          "typescript arrays, typescript tuple, number array, Array generic, readonly array",
        content: `Arrays are typed by their **element type**, so every item must share that type. There are two equivalent syntaxes: \`number[]\` and \`Array<number>\`. The \`[]\` form is more common.

## Tuples: fixed length, fixed types

A **tuple** is an array with a known length where each position has its own type. \`[string, number]\` means "exactly two elements: a string then a number." Tuples are great for returning a pair of values (think React's \`useState\`, which returns \`[value, setter]\`).

## Readonly arrays

Mark an array \`readonly\` to prevent mutation — no \`push\`, no reassigning indexes. This is excellent for data you don't want accidentally changed.

## Gotcha

An empty array literal \`[]\` infers as \`any[]\`, which silently turns off type safety. Annotate it: \`const ids: number[] = []\`.`,
        codeExamples: [
          {
            title: "Typed arrays",
            code: `let numbers: number[] = [1, 2, 3];
numbers.push(4);       // ✅ OK
numbers.push("five");  // ❌ 'string' is not assignable to 'number'

let colors: Array<string> = ["red", "green"]; // alternative syntax`,
            language: "typescript",
          },
          {
            title: "Tuples",
            code: `let person: [string, number] = ["Ada", 36];
person[0].toUpperCase(); // ✅ knows index 0 is a string
person[1].toFixed(0);    // ✅ knows index 1 is a number
person = [36, "Ada"];    // ❌ wrong order of types`,
            language: "typescript",
          },
          {
            title: "Readonly array",
            code: `const config: readonly string[] = ["a", "b"];
config.push("c"); // ❌ Property 'push' does not exist on a readonly array`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Tuples shine when returning a pair, like a coordinate.",
          code: `function makePoint(x: number, y: number): [number, number] {
  return [x, y];
}

const [x, y] = makePoint(3, 4);
console.log(\`Point is (\${x}, \${y})\`);
console.log("Distance from origin:", Math.hypot(x, y));`,
        },
      },
      {
        id: "tuples-enums",
        title: "Enums",
        seoDescription:
          "Learn TypeScript enums for named constants, the difference between numeric and string enums, and why 'as const' unions are often a better choice.",
        keywords:
          "typescript enum, string enum, numeric enum, const enum, as const union, named constants",
        content: `An **enum** gives a set of related constants human-readable names. Instead of passing the magic number \`2\` around, you pass \`Direction.Left\`.

TypeScript has **numeric enums** (auto-numbered from 0) and **string enums** (each member has an explicit string value). String enums are usually clearer because the runtime value is self-describing.

## The modern alternative: union of literals

Enums are one of the few TypeScript features that generate real JavaScript (extra code) and have some quirks. Many teams now prefer a **union of string literals** combined with \`as const\`, which is lighter and plays better with plain data. Use whichever fits, but know both.`,
        codeExamples: [
          {
            title: "String enum (recommended)",
            code: `enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

let s: Status = Status.Active;
console.log(s); // "ACTIVE" — readable at runtime`,
            language: "typescript",
          },
          {
            title: "Numeric enum",
            code: `enum Direction { Up, Down, Left, Right } // 0, 1, 2, 3
let move: Direction = Direction.Left;    // 2`,
            language: "typescript",
          },
          {
            title: "Union of literals (lightweight alternative)",
            code: `const STATUS = ["active", "inactive", "pending"] as const;
type Status = typeof STATUS[number]; // "active" | "inactive" | "pending"

let s: Status = "active"; // ✅
s = "archived";           // ❌ not one of the allowed values`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "String enums keep runtime values readable.",
          code: `enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

function describe(s: Status): string {
  return s === Status.Active ? "user is online" : "user is away";
}

console.log(describe(Status.Active));
console.log("Raw value:", Status.Inactive);`,
        },
      },
      {
        id: "union-types",
        title: "Union & Literal Types",
        seoDescription:
          "Union types let a value be one of several types (string | number). Literal types restrict it to specific values. Learn both, with narrowing examples.",
        keywords:
          "typescript union types, literal types, string literal union, pipe type, narrowing",
        content: `A **union type** says a value can be one of several types. You write it with a pipe: \`string | number\`. This models reality — an id might come in as a string or a number, a setting might be on, off, or unset.

## Literal types

A **literal type** narrows a value to a *specific* constant, not just its general type. \`"active"\` as a type means the only allowed value is the exact string \`"active"\`. Combine literals into a union to model a fixed set of options: \`"sm" | "md" | "lg"\`. This is how you get autocomplete for string options and reject typos.

## You must narrow before using

When a value is \`string | number\`, you can only use members common to both until you **narrow** it — check which type it actually is (with \`typeof\`, etc.) before calling type-specific methods. We cover narrowing in depth in its own section.`,
        codeExamples: [
          {
            title: "Union type",
            code: `let id: string | number;
id = "abc123"; // ✅
id = 123;      // ✅
id = true;     // ❌ boolean is not part of the union`,
            language: "typescript",
          },
          {
            title: "Literal union (fixed options)",
            code: `type Size = "sm" | "md" | "lg";
function setSize(size: Size) { /* ... */ }

setSize("md");  // ✅ autocompletes the options
setSize("xl");  // ❌ '"xl"' is not assignable to type 'Size'`,
            language: "typescript",
          },
          {
            title: "Narrow before using",
            code: `function format(value: string | number): string {
  if (typeof value === "string") return value.trim();
  return value.toFixed(2); // here TypeScript knows it's a number
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Run this, then try passing an invalid size in your editor.",
          code: `type Size = "sm" | "md" | "lg";

function pixels(size: Size): number {
  switch (size) {
    case "sm": return 12;
    case "md": return 16;
    case "lg": return 24;
  }
}

console.log("md ->", pixels("md"), "px");
console.log("lg ->", pixels("lg"), "px");`,
        },
      },
      {
        id: "any-unknown",
        title: "Any vs Unknown",
        seoDescription:
          "Why 'any' disables TypeScript's safety and 'unknown' is the safe alternative. Learn to handle values of uncertain type without losing type checking.",
        keywords:
          "typescript any vs unknown, unknown type, any type, type safety, never type",
        content: `Sometimes you genuinely don't know a value's type — data from an API, \`JSON.parse\`, a third-party library. TypeScript gives you two tools, and the difference matters.

## any — the escape hatch (avoid it)

\`any\` turns **off** type checking for that value. You can do anything to it and TypeScript won't complain — which means it also won't catch your mistakes. One \`any\` can quietly spread through your code and erase safety. Treat it as a last resort.

## unknown — the safe version

\`unknown\` also accepts any value, but TypeScript **won't let you use it** until you've proven what it is by narrowing. This forces a safety check exactly where uncertainty enters your program. Prefer \`unknown\` over \`any\` every time.

## Bonus: never

\`never\` is the type with **no values** — it represents code that can't happen (a function that always throws, or the exhausted branch of a switch). It's the key to exhaustiveness checking, covered in the Narrowing section.`,
        codeExamples: [
          {
            title: "any disables safety (avoid)",
            code: `let value: any = "hello";
value = 42;
value.toUpperCase(); // no error reported — even though 42 has no toUpperCase`,
            language: "typescript",
            description: "You lose all checking — bugs slip straight through.",
          },
          {
            title: "unknown forces a check (prefer)",
            code: `let value: unknown = "hello";
value.toUpperCase(); // ❌ Object is of type 'unknown'

if (typeof value === "string") {
  value.toUpperCase(); // ✅ now safe — we proved it's a string
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Safely handle a value of unknown type.",
          code: `function describe(value: unknown): string {
  if (typeof value === "string") return \`string of length \${value.length}\`;
  if (typeof value === "number") return \`number: \${value.toFixed(1)}\`;
  return "something else";
}

console.log(describe("hello"));
console.log(describe(3.14159));
console.log(describe(true));`,
        },
      },
      {
        id: "type-assertions",
        title: "Type Assertions",
        seoDescription:
          "Use TypeScript type assertions (as) to tell the compiler a value's type when you know more than it does. Learn the risks and safer alternatives.",
        keywords:
          "typescript type assertion, as keyword, type casting, as const, non-null assertion",
        content: `A **type assertion** tells the compiler "trust me, I know this value's type." You write it with \`as\`: \`const el = document.getElementById("app") as HTMLInputElement\`.

Assertions don't convert or check anything at runtime — they only change what TypeScript *believes*. That makes them powerful but dangerous: assert the wrong type and you've reintroduced the exact bugs TypeScript exists to prevent.

## When assertions are reasonable

- Narrowing a DOM element that TypeScript types broadly (\`HTMLElement\` → \`HTMLInputElement\`).
- Telling TypeScript the shape of JSON you've validated yourself.

## Safer tools

- **\`as const\`** makes a literal deeply readonly and narrows it to its exact value — a safe, useful assertion.
- The **non-null assertion** \`value!\` says "this isn't null/undefined." Handy, but only use it when you're certain.
- Prefer **narrowing** (\`typeof\`, type guards) over assertions whenever you can — those are checked.`,
        codeExamples: [
          {
            title: "Asserting a DOM element",
            code: `const input = document.getElementById("email") as HTMLInputElement;
console.log(input.value); // 'value' exists on HTMLInputElement`,
            language: "typescript",
          },
          {
            title: "as const",
            code: `const point = { x: 1, y: 2 } as const;
// point.x is the literal 1 (not number) and the object is readonly
point.x = 5; // ❌ Cannot assign to 'x' because it is read-only`,
            language: "typescript",
          },
          {
            title: "Non-null assertion (use with care)",
            code: `function firstChar(s: string | null): string {
  return s!.charAt(0); // '!' promises s isn't null — crashes if it actually is
}`,
            language: "typescript",
            description: "The '!' silences the check; you own the consequences.",
          },
        ],
        playground: {
          hint: "as const turns a plain object into precise readonly data.",
          code: `const config = {
  mode: "dark",
  retries: 3,
} as const;

console.log("mode:", config.mode);
console.log("retries:", config.retries);
// config.retries = 5  // would be a compile error: read-only`,
        },
      },
    ],
  },
  {
    id: "functions",
    title: "Functions",
    icon: "Zap",
    subsections: [
      {
        id: "basic-functions",
        title: "Basic Functions",
        seoDescription:
          "Type function parameters and return values in TypeScript. Learn return type inference, the void type, and why typing parameters matters most.",
        keywords:
          "typescript functions, function parameter types, return type, void, arrow function types",
        content: `Functions are where types pay off most — they're the contracts between the pieces of your program. You annotate each **parameter** and, optionally, the **return type**: \`function add(a: number, b: number): number\`.

## Let return types infer (usually)

TypeScript infers the return type from what you return, so the explicit \`: number\` is often optional. Many developers still annotate return types on public functions as documentation and to catch accidental changes.

## void means "returns nothing"

A function that doesn't return a value has return type \`void\` — like a logger or an event handler.

## The golden rule

Always type your **parameters**. Inputs are where wrong values enter; typing them is the single highest-value habit in TypeScript.`,
        codeExamples: [
          {
            title: "Typed parameters and return",
            code: `function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);      // ✅ 8
add("5", "3");  // ❌ arguments must be numbers`,
            language: "typescript",
            description: "The ': number' after the parentheses is the return type.",
          },
          {
            title: "void return",
            code: `function logMessage(message: string): void {
  console.log(message);
  // nothing returned
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "A typed function is hard to call incorrectly.",
          code: `function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

console.log("3 + 4 =", add(3, 4));
greet("Ada");`,
        },
      },
      {
        id: "optional-params",
        title: "Optional & Default Parameters",
        seoDescription:
          "Make function parameters optional with ? or give them default values in TypeScript. Learn the rules for ordering and how optional differs from default.",
        keywords:
          "typescript optional parameters, default parameters, optional argument, parameter order",
        content: `Not every argument is required. TypeScript gives you two ways to handle that.

## Optional parameters with ?

Add \`?\` after the name to make a parameter optional: \`greet(name?: string)\`. Inside the function its type becomes \`string | undefined\`, so you must handle the missing case.

## Default parameters

Give a parameter a default value and callers can omit it: \`logError(message = "Error")\`. When omitted, the default is used; the type is inferred from the default.

## Rules and gotchas

- Optional parameters must come **after** required ones.
- A parameter with a default is automatically optional — don't add \`?\` too.
- An optional parameter is \`T | undefined\` inside the function, so narrow or default it before use.`,
        codeExamples: [
          {
            title: "Optional parameter",
            code: `function greet(name?: string): string {
  return \`Hello \${name ?? "Guest"}\`; // handle the undefined case
}

greet();        // "Hello Guest"
greet("John");  // "Hello John"`,
            language: "typescript",
          },
          {
            title: "Default value",
            code: `function createUser(name: string, role: string = "member") {
  return { name, role };
}

createUser("Ada");           // role defaults to "member"
createUser("Ada", "admin");  // role is "admin"`,
            language: "typescript",
          },
          {
            title: "Order matters",
            code: `function bad(name?: string, age: number) {} // ❌ required param after optional`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Try calling greet with and without an argument.",
          code: `function greet(name: string = "Guest", excited?: boolean): string {
  const punctuation = excited ? "!!!" : ".";
  return \`Hello, \${name}\${punctuation}\`;
}

console.log(greet());
console.log(greet("Ada"));
console.log(greet("Ada", true));`,
        },
      },
      {
        id: "rest-arrow",
        title: "Rest, Arrow & Function Types",
        seoDescription:
          "Type rest parameters, arrow functions, and function types in TypeScript. Learn to describe a function's signature as a reusable type.",
        keywords:
          "typescript rest parameters, arrow function types, function type, callback type, spread",
        content: `## Rest parameters

A **rest parameter** collects any number of trailing arguments into an array. Type it as an array: \`...numbers: number[]\`. Great for variadic functions like \`sum\`.

## Arrow functions

Arrow functions are typed the same way — parameters and an optional return type. They're concise for callbacks and one-liners.

## Function types

You can describe a function's **signature as a type** and reuse it. \`type BinaryOp = (a: number, b: number) => number\` says "a function taking two numbers and returning a number." This is how you type callbacks and higher-order functions precisely.`,
        codeExamples: [
          {
            title: "Rest parameters",
            code: `function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);          // 6
sum(1, 2, 3, 4, 5);    // 15`,
            language: "typescript",
          },
          {
            title: "Arrow functions",
            code: `const multiply = (a: number, b: number): number => a * b;
const isEven = (n: number): boolean => n % 2 === 0;`,
            language: "typescript",
          },
          {
            title: "Function type as a reusable contract",
            code: `type BinaryOp = (a: number, b: number) => number;

const add: BinaryOp = (a, b) => a + b;       // params inferred from the type
const subtract: BinaryOp = (a, b) => a - b;

function apply(op: BinaryOp, x: number, y: number) {
  return op(x, y);
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Function types make higher-order functions type-safe.",
          code: `type BinaryOp = (a: number, b: number) => number;

const add: BinaryOp = (a, b) => a + b;
const multiply: BinaryOp = (a, b) => a * b;

function apply(op: BinaryOp, x: number, y: number): number {
  return op(x, y);
}

console.log("add:", apply(add, 6, 7));
console.log("multiply:", apply(multiply, 6, 7));`,
        },
      },
      {
        id: "function-overloads",
        title: "Function Overloads",
        seoDescription:
          "Function overloads in TypeScript let one function present multiple typed signatures. Learn when overloads beat unions and how to write them correctly.",
        keywords:
          "typescript function overloads, overload signatures, multiple signatures, overloading",
        content: `Sometimes one function behaves differently depending on its arguments, and a plain union can't capture the relationship between input and output. **Overloads** let you list several specific call signatures above a single implementation.

You write one or more **overload signatures** (the public shapes), then one **implementation signature** (broad enough to handle all of them, but not visible to callers). Callers see only the overloads, so the editor offers exactly the right shapes.

## When to use them

Reach for overloads when the **return type depends on the argument types** in a way a union return can't express. If a union of parameters works just as well, prefer the union — it's simpler.`,
        codeExamples: [
          {
            title: "Overloaded signatures",
            code: `function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(yearOrTs: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTs, month - 1, day);
  }
  return new Date(yearOrTs);
}

makeDate(1700000000000);   // ✅ one-arg form
makeDate(2026, 6, 25);     // ✅ three-arg form
makeDate(2026, 6);         // ❌ no overload matches two arguments`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "One function, two precise call shapes.",
          code: `function repeat(value: string, times: number): string;
function repeat(value: number, times: number): number[];
function repeat(value: string | number, times: number): string | number[] {
  if (typeof value === "string") return value.repeat(times);
  return Array(times).fill(value);
}

console.log(repeat("ab", 3));   // "ababab"
console.log(repeat(7, 3));       // [7, 7, 7]`,
        },
      },
    ],
  },
  {
    id: "objects",
    title: "Objects & Interfaces",
    icon: "Box",
    subsections: [
      {
        id: "type-alias",
        title: "Type Aliases",
        seoDescription:
          "Define reusable object shapes with TypeScript type aliases. Learn optional properties, nesting, and when a type alias is the right tool.",
        keywords:
          "typescript type alias, type keyword, object type, optional properties, nested types",
        content: `A **type alias** gives a name to any type so you can reuse it. Most often you'll use one to describe the **shape of an object**: which properties it has and their types.

## Optional properties

Mark a property optional with \`?\`. The object is valid with or without it, and its type becomes \`T | undefined\`, so you handle the missing case when you read it.

## Aliases name *any* type

Type aliases aren't limited to objects — you can name a union, a tuple, a function type, anything: \`type ID = string | number\`. That reuse keeps complex types readable.`,
        codeExamples: [
          {
            title: "Object type alias",
            code: `type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "Hitesh",
  email: "hitesh@example.com",
};`,
            language: "typescript",
          },
          {
            title: "Optional properties",
            code: `type Profile = {
  id: number;
  name: string;
  bio?: string; // optional
};

const p: Profile = { id: 1, name: "Ada" }; // ✅ bio omitted
console.log(p.bio?.length);                 // safely handle undefined`,
            language: "typescript",
          },
          {
            title: "Alias any type, not just objects",
            code: `type ID = string | number;
type Coordinates = [number, number];
type Handler = (event: string) => void;`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Build and use a typed object.",
          code: `type User = { id: number; name: string; admin?: boolean };

function describe(u: User): string {
  return \`#\${u.id} \${u.name}\${u.admin ? " (admin)" : ""}\`;
}

console.log(describe({ id: 1, name: "Ada", admin: true }));
console.log(describe({ id: 2, name: "Lin" }));`,
        },
      },
      {
        id: "interface",
        title: "Interfaces",
        seoDescription:
          "Interfaces describe object shapes in TypeScript and support extension and declaration merging. Learn how interfaces compare to type aliases.",
        keywords:
          "typescript interface, interface vs type, extends, declaration merging, object shape",
        content: `An **interface** is another way to describe the shape of an object. For plain object types, interfaces and type aliases are nearly interchangeable — pick one and stay consistent. Many teams use \`interface\` for object shapes and \`type\` for unions, tuples, and function types.

## Two things interfaces do well

1. **Extension** — an interface can \`extends\` one or more others, building bigger shapes from smaller ones.
2. **Declaration merging** — declare the same interface name twice and TypeScript merges them. This is how you augment types from libraries (e.g. adding a property to the global \`Window\`).

## Interface vs type — the short version

- Need to extend, implement in a class, or merge declarations → **interface** is natural.
- Need a union, tuple, mapped, or conditional type → you need a **type alias**.`,
        codeExamples: [
          {
            title: "Basic interface",
            code: `interface Product {
  id: number;
  title: string;
  price: number;
}

const laptop: Product = { id: 1, title: "MacBook", price: 999 };`,
            language: "typescript",
          },
          {
            title: "Extending interfaces",
            code: `interface Product {
  id: number;
  title: string;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
}

const ebook: DigitalProduct = {
  id: 1,
  title: "TS Guide",
  downloadUrl: "https://...",
};`,
            language: "typescript",
          },
          {
            title: "Declaration merging",
            code: `interface Box { width: number; }
interface Box { height: number; }
// merged into: { width: number; height: number; }

const b: Box = { width: 10, height: 5 };`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Compose shapes with extends.",
          code: `interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

const d: Dog = { name: "Rex", breed: "Labrador" };
console.log(\`\${d.name} is a \${d.breed}\`);`,
        },
      },
      {
        id: "readonly",
        title: "Readonly & Index Signatures",
        seoDescription:
          "Protect object properties with readonly and model dynamic keys with index signatures in TypeScript. Learn the difference from Record and common pitfalls.",
        keywords:
          "typescript readonly property, index signature, dynamic keys, readonly object, mutable",
        content: `## Readonly properties

Mark a property \`readonly\` and TypeScript forbids reassigning it after creation. This catches accidental mutation — perfect for ids and configuration that should never change. Note it's a **compile-time** guarantee only; nothing stops mutation at runtime.

## Index signatures

When you don't know the property names ahead of time — a dictionary keyed by arbitrary strings — use an **index signature**: \`{ [key: string]: number }\` means "any string key maps to a number." It's how you type objects used as maps.

## Gotcha

With an index signature, reading any key returns the value type even for keys that don't exist. Enabling \`noUncheckedIndexedAccess\` (see the Config section) makes those reads \`T | undefined\`, which is safer.`,
        codeExamples: [
          {
            title: "Readonly property",
            code: `type User = {
  readonly id: number;
  name: string;
};

const user: User = { id: 1, name: "Hitesh" };
user.name = "John"; // ✅ OK
user.id = 2;        // ❌ Cannot assign to 'id' (read-only)`,
            language: "typescript",
          },
          {
            title: "Index signature (dictionary)",
            code: `type ScoreBoard = { [player: string]: number };

const scores: ScoreBoard = {};
scores["ada"] = 42;   // ✅ any string key, number value
scores["lin"] = 17;
scores["ada"] = "hi"; // ❌ value must be a number`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "An index signature types an object used as a map.",
          code: `type Inventory = { [item: string]: number };

const stock: Inventory = { apples: 5, pears: 2 };
stock.bananas = 9;

for (const item in stock) {
  console.log(\`\${item}: \${stock[item]}\`);
}`,
        },
      },
    ],
  },
  {
    id: "classes",
    title: "Classes",
    icon: "Box",
    subsections: [
      {
        id: "class-basics",
        title: "Classes & Access Modifiers",
        seoDescription:
          "Type classes in TypeScript with typed fields, constructors, public/private/protected modifiers, and parameter properties for concise code.",
        keywords:
          "typescript classes, access modifiers, private protected public, parameter properties, readonly field",
        content: `Classes in TypeScript are JavaScript classes plus type annotations on fields, parameters, and methods. You declare fields with their types, and the constructor initializes them.

## Access modifiers

- **public** (default) — accessible everywhere.
- **private** — only inside the class. (TypeScript also supports JavaScript's native \`#field\` private syntax, which is enforced at runtime.)
- **protected** — inside the class and its subclasses.
- **readonly** — settable in the constructor, never reassigned after.

## Parameter properties — less boilerplate

Prefix a constructor parameter with a modifier (e.g. \`private name: string\`) and TypeScript **declares and assigns the field for you**. This removes the repetitive "declare field, then assign in constructor" pattern.`,
        codeExamples: [
          {
            title: "A typed class",
            code: `class BankAccount {
  private balance: number;
  readonly owner: string;

  constructor(owner: string, initial: number) {
    this.owner = owner;
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}`,
            language: "typescript",
          },
          {
            title: "Parameter properties (shorthand)",
            code: `class Point {
  // declares + assigns this.x and this.y automatically
  constructor(public readonly x: number, public readonly y: number) {}
}

const p = new Point(3, 4);
console.log(p.x, p.y);`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "private hides balance; methods control access to it.",
          code: `class BankAccount {
  constructor(public owner: string, private balance: number) {}
  deposit(amount: number) { this.balance += amount; }
  getBalance() { return this.balance; }
}

const acct = new BankAccount("Ada", 100);
acct.deposit(50);
console.log(\`\${acct.owner}'s balance: \${acct.getBalance()}\`);`,
        },
      },
      {
        id: "abstract-implements",
        title: "Abstract Classes & implements",
        seoDescription:
          "Use abstract classes and the implements keyword in TypeScript to define base classes and enforce that classes satisfy an interface contract.",
        keywords:
          "typescript abstract class, implements interface, abstract method, inheritance, polymorphism",
        content: `## Abstract classes

An **abstract class** is a base class you can't instantiate directly — it exists to be extended. It can provide shared implementation *and* declare **abstract methods** that subclasses must implement. This is great for "every shape has an \`area()\`, but each computes it differently."

## implements

The \`implements\` keyword makes a class promise to satisfy an **interface**. If the class is missing a required member, TypeScript errors. Use it to enforce that different classes share a common contract — multiple payment providers all implementing a \`PaymentGateway\` interface, for example.

## extends vs implements

- \`extends\` — inherit behavior and fields from a base class (one base only).
- \`implements\` — promise to match an interface's shape (as many as you like). It adds no implementation.`,
        codeExamples: [
          {
            title: "Abstract class",
            code: `abstract class Shape {
  abstract area(): number;          // subclasses must implement
  describe(): string {              // shared behavior
    return \`Area is \${this.area().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(private r: number) { super(); }
  area(): number { return Math.PI * this.r ** 2; }
}

new Shape();        // ❌ cannot create an instance of an abstract class
new Circle(2).area(); // ✅`,
            language: "typescript",
          },
          {
            title: "implements an interface",
            code: `interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Polymorphism: many shapes, one describe().",
          code: `abstract class Shape {
  abstract area(): number;
  describe(): string { return \`area = \${this.area().toFixed(2)}\`; }
}
class Circle extends Shape {
  constructor(private r: number) { super(); }
  area() { return Math.PI * this.r ** 2; }
}
class Square extends Shape {
  constructor(private s: number) { super(); }
  area() { return this.s * this.s; }
}

const shapes: Shape[] = [new Circle(2), new Square(3)];
shapes.forEach(s => console.log(s.describe()));`,
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Types",
    icon: "Layers",
    subsections: [
      {
        id: "intersection",
        title: "Intersection Types",
        seoDescription:
          "Combine multiple types into one with TypeScript intersection types (&). Learn how intersections merge object shapes and differ from unions.",
        keywords:
          "typescript intersection types, ampersand type, combine types, mixin, merge types",
        content: `An **intersection type** (\`&\`) combines several types into one that has **all** of their members. Where a union is "either/or," an intersection is "all of these at once." \`A & B\` is an object that satisfies both \`A\` and \`B\`.

Intersections are how you compose small, focused types into a bigger one — adding capabilities to a base shape (a "mixin" style), or combining separately-defined concerns like \`User & Timestamps\`.

## Gotcha

Intersecting **incompatible** primitives produces \`never\` — \`string & number\` is impossible, so it collapses to the empty type. Intersections are meant for object types.`,
        codeExamples: [
          {
            title: "Combine object shapes",
            code: `type User = { id: number; name: string };
type Admin = { role: string; permissions: string[] };

type AdminUser = User & Admin;

const admin: AdminUser = {
  id: 1,
  name: "Hitesh",
  role: "admin",
  permissions: ["read", "write", "delete"],
};`,
            language: "typescript",
          },
          {
            title: "Add cross-cutting concerns",
            code: `type Timestamps = { createdAt: Date; updatedAt: Date };
type Post = { title: string } & Timestamps;`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "AdminUser must have every property of both types.",
          code: `type User = { id: number; name: string };
type WithRole = { role: "admin" | "member" };
type Member = User & WithRole;

const m: Member = { id: 1, name: "Ada", role: "admin" };
console.log(\`\${m.name} is a \${m.role}\`);`,
        },
      },
      {
        id: "discriminated-unions",
        title: "Discriminated Unions",
        seoDescription:
          "Discriminated unions model variant data safely in TypeScript using a shared literal tag. Learn the pattern for state machines and API responses.",
        keywords:
          "typescript discriminated union, tagged union, variant types, exhaustive switch, state machine",
        content: `A **discriminated union** (a.k.a. tagged union) is the single most useful pattern for modeling data that comes in distinct variants — a network request that's loading, succeeded, or failed; a shape that's a circle or a square.

The trick: every variant shares a common property — the **discriminant** — set to a unique literal (\`status: "success"\` vs \`status: "error"\`). When you check that property, TypeScript **narrows** to exactly one variant and gives you safe access to its fields.

## Why it's so good

It makes illegal states unrepresentable. A \`success\` response *has* data; an \`error\` response *has* a message — and TypeScript won't let you read \`data\` until you've proven you're in the success case. Combined with exhaustiveness checking (see Narrowing), it guarantees you handle every variant.`,
        codeExamples: [
          {
            title: "Tagged variants",
            code: `type SuccessResponse = { status: "success"; data: string };
type ErrorResponse = { status: "error"; message: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handle(res: ApiResponse) {
  if (res.status === "success") {
    console.log(res.data);    // ✅ data exists here
  } else {
    console.log(res.message); // ✅ message exists here
  }
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "The 'kind' tag tells TypeScript which fields are available.",
          code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "rect":   return s.width * s.height;
  }
}

console.log("circle:", area({ kind: "circle", radius: 2 }).toFixed(2));
console.log("rect:  ", area({ kind: "rect", width: 3, height: 4 }));`,
        },
      },
      {
        id: "keyof-typeof",
        title: "keyof & typeof",
        seoDescription:
          "Use keyof to get a union of an object's keys and typeof to derive a type from a value in TypeScript. The foundation of type-safe object utilities.",
        keywords:
          "typescript keyof, typeof operator, keyof typeof, derive type from value, key union",
        content: `Two small operators unlock a huge amount of type-level power.

## keyof

\`keyof T\` produces a **union of T's property names**. For \`type User = { id: number; name: string }\`, \`keyof User\` is \`"id" | "name"\`. This lets you write functions that accept "any key of this object" safely.

## typeof (in type position)

In a **type** position, \`typeof value\` gives you the type TypeScript inferred for a value. It's how you derive a type from existing data instead of writing it twice — define a config object once, then \`typeof config\` is its type.

## Together: typeof + keyof

The combo \`keyof typeof obj\` gives the keys of a concrete object. It's the standard way to constrain a value to "one of this object's keys."`,
        codeExamples: [
          {
            title: "keyof",
            code: `type User = { id: number; name: string; email: string };
type UserKey = keyof User; // "id" | "name" | "email"

function getProp(user: User, key: UserKey) {
  return user[key];
}`,
            language: "typescript",
          },
          {
            title: "Type-safe property access",
            code: `function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // return type is exactly the property's type
}

const user = { id: 1, name: "Ada" };
const name = prop(user, "name"); // typed as string
prop(user, "age");               // ❌ "age" is not a key of user`,
            language: "typescript",
          },
          {
            title: "typeof derives a type from a value",
            code: `const settings = { theme: "dark", retries: 3 };
type Settings = typeof settings; // { theme: string; retries: number }
type SettingKey = keyof typeof settings; // "theme" | "retries"`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "A generic getter that returns the exact property type.",
          code: `function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ada", admin: true };
console.log("name:", prop(user, "name"));
console.log("admin:", prop(user, "admin"));`,
        },
      },
      {
        id: "mapped-types",
        title: "Mapped Types",
        seoDescription:
          "Mapped types transform every property of a type in TypeScript. Learn the [K in keyof T] pattern that powers Partial, Readonly, and custom utilities.",
        keywords:
          "typescript mapped types, key remapping, in keyof, transform properties, modifiers",
        content: `A **mapped type** builds a new type by transforming **each property** of an existing one. The syntax \`{ [K in keyof T]: ... }\` says "for every key K in T, produce a property." This is the machinery behind built-in utilities like \`Partial\` and \`Readonly\` — and you can write your own.

## Property modifiers

Inside a mapped type you can add or remove the \`readonly\` and \`?\` modifiers with \`+\`/\`-\`. \`{ [K in keyof T]?: T[K] }\` makes everything optional (that's literally \`Partial<T>\`); \`-readonly\` strips readonly.

## Key remapping with as

You can even rename keys using \`as\`: \`{ [K in keyof T as \`get\${...}\`]: ... }\` to generate getter names. Powerful for deriving related types.`,
        codeExamples: [
          {
            title: "Map over every property",
            code: `type Stringify<T> = {
  [K in keyof T]: string;
};

type User = { id: number; active: boolean };
type UserStrings = Stringify<User>; // { id: string; active: string }`,
            language: "typescript",
          },
          {
            title: "Add/remove modifiers",
            code: `// Make all properties optional (this is how Partial works)
type MyPartial<T> = { [K in keyof T]?: T[K] };

// Strip readonly from all properties
type Mutable<T> = { -readonly [K in keyof T]: T[K] };`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "A mapped type makes a nullable version of any shape.",
          code: `type Nullable<T> = { [K in keyof T]: T[K] | null };

type User = { id: number; name: string };
const draft: Nullable<User> = { id: null, name: "Ada" };

console.log("id:", draft.id);
console.log("name:", draft.name);`,
        },
      },
      {
        id: "conditional-types",
        title: "Conditional & Template Literal Types",
        seoDescription:
          "Conditional types choose a type based on a condition; template literal types build string types. Learn infer, distribution, and practical uses.",
        keywords:
          "typescript conditional types, template literal types, infer keyword, extends ternary, string types",
        content: `## Conditional types

A **conditional type** is a type-level ternary: \`T extends U ? X : Y\`. It picks one type or another based on whether \`T\` is assignable to \`U\`. This is how libraries return different types depending on input. The \`infer\` keyword can **extract** a type from inside another — that's how \`ReturnType\` pulls the return type out of a function type.

## Template literal types

**Template literal types** build new string-literal types using the same backtick syntax as template strings, but in *type* position. \`\\\`on\${Capitalize<Event>}\\\`\` can generate \`"onClick" | "onHover"\` from \`"click" | "hover"\`. They're great for typing event names, route patterns, and CSS units precisely.

These features are advanced — you'll *use* them through utility types far more often than you'll *write* them, but knowing they exist demystifies the standard library.`,
        codeExamples: [
          {
            title: "Conditional type",
            code: `type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"`,
            language: "typescript",
          },
          {
            title: "infer extracts a type",
            code: `type ElementType<T> = T extends (infer U)[] ? U : never;

type A = ElementType<number[]>;   // number
type B = ElementType<string[]>;   // string`,
            language: "typescript",
          },
          {
            title: "Template literal type",
            code: `type Event = "click" | "hover";
type Handler = \`on\${Capitalize<Event>}\`; // "onClick" | "onHover"`,
            language: "typescript",
          },
        ],
      },
    ],
  },
  {
    id: "generics",
    title: "Generics",
    icon: "Sparkles",
    subsections: [
      {
        id: "basic-generics",
        title: "Basic Generics",
        seoDescription:
          "Generics let you write reusable, type-safe code that works with any type in TypeScript. Learn the <T> syntax, inference, and why generics beat 'any'.",
        keywords:
          "typescript generics, generic functions, type parameter, T, reusable types",
        content: `**Generics** let you write a function or type that works with **any** type while preserving type information — the opposite of \`any\`, which throws that information away.

The angle brackets introduce a **type parameter**, conventionally named \`T\`. It's a placeholder that gets filled in when the function is used. An \`identity<T>(value: T): T\` takes a value of some type and returns the *same* type — so calling it with a string gives back a string, not \`any\`.

## Inference

You rarely need to specify the type parameter explicitly — TypeScript **infers** it from the arguments. \`identity("hi")\` automatically sets \`T = string\`.

## Why it matters

Generics power every reusable container and helper: arrays, promises, \`Map\`, React's \`useState\`. Learn them and the standard library stops looking like magic.`,
        codeExamples: [
          {
            title: "Generic function",
            code: `function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // T = string
identity(42);              // T = number (inferred)
identity(true);            // T = boolean (inferred)`,
            language: "typescript",
          },
          {
            title: "Preserves the type (unlike any)",
            code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = first([1, 2, 3]);     // number | undefined
const s = first(["a", "b"]);    // string | undefined
n?.toFixed(2);                  // ✅ knows it's a number`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "One function, full type safety for any element type.",
          code: `function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log(lastItem([10, 20, 30]));      // 30
console.log(lastItem(["a", "b", "c"]));   // "c"`,
        },
      },
      {
        id: "generic-constraints",
        title: "Generic Constraints & Defaults",
        seoDescription:
          "Constrain generic type parameters with extends and provide default type arguments in TypeScript. Learn to require specific shapes while staying flexible.",
        keywords:
          "typescript generic constraints, extends constraint, default type parameter, bounded generics",
        content: `An unconstrained \`T\` could be *anything*, so you can't assume it has any particular property. A **constraint** narrows what \`T\` is allowed to be: \`<T extends { length: number }>\` means "T can be any type, **as long as** it has a \`length\`." Now you can safely read \`.length\` inside.

Constraints keep generics flexible *and* safe — you require just enough structure to do your job, no more.

## Default type parameters

Like default function arguments, a type parameter can have a **default**: \`<T = string>\`. If the caller doesn't supply or infer one, the default is used. Common in container types and React component props.`,
        codeExamples: [
          {
            title: "Constraint with extends",
            code: `function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");      // ✅ strings have length
getLength([1, 2, 3]);    // ✅ arrays have length
getLength(123);          // ❌ number has no 'length'`,
            language: "typescript",
          },
          {
            title: "Constrain to keys of another type",
            code: `function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
            language: "typescript",
          },
          {
            title: "Default type parameter",
            code: `type ApiResult<T = unknown> = {
  data: T;
  ok: boolean;
};

const r1: ApiResult = { data: "anything", ok: true };          // T defaults to unknown
const r2: ApiResult<number> = { data: 42, ok: true };          // T = number`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "The constraint guarantees a 'length' to read.",
          code: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("kitten", "cat"));        // "kitten"
console.log(longest([1, 2], [1, 2, 3, 4]));   // [1,2,3,4]`,
        },
      },
      {
        id: "generic-types",
        title: "Generic Types & Classes",
        seoDescription:
          "Create reusable generic types and classes in TypeScript. Learn generic interfaces, containers, and how data structures stay type-safe for any element.",
        keywords:
          "typescript generic class, generic interface, generic type alias, container, data structure",
        content: `Generics aren't just for functions — type aliases, interfaces, and classes can all take type parameters, letting you build reusable, type-safe **data structures**.

A \`Box<T>\` holds a value of some type; a \`Container<T>\` class can stack and pop items while remembering exactly what's inside. When you create one with \`new Container<number>()\`, every method is typed for numbers automatically.

This is precisely how built-in generics like \`Array<T>\`, \`Map<K, V>\`, and \`Promise<T>\` work — you've been using generic types all along.`,
        codeExamples: [
          {
            title: "Generic type alias",
            code: `type Box<T> = {
  contents: T;
  isOpen: boolean;
};

const stringBox: Box<string> = { contents: "hello", isOpen: true };
const numberBox: Box<number> = { contents: 42, isOpen: false };`,
            language: "typescript",
          },
          {
            title: "Generic class",
            code: `class Container<T> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  get size(): number { return this.items.length; }
}

const numbers = new Container<number>();
numbers.add(1);
numbers.add(2);
const value = numbers.pop(); // number | undefined`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "A type-safe stack for any element type.",
          code: `class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
}

const s = new Stack<string>();
s.push("a"); s.push("b");
console.log("peek:", s.peek());
console.log("pop: ", s.pop());
console.log("pop: ", s.pop());`,
        },
      },
    ],
  },
  {
    id: "utility-types",
    title: "Utility Types",
    icon: "Wrench",
    subsections: [
      {
        id: "partial-required",
        title: "Partial & Required",
        seoDescription:
          "Use TypeScript's Partial and Required utility types to make all properties optional or required. Perfect for updates, drafts, and config objects.",
        keywords:
          "typescript Partial, Required, utility types, optional properties, update object",
        content: `TypeScript ships a set of **utility types** — generic helpers that transform existing types so you don't rewrite shapes by hand. They're just mapped types under the hood (see Advanced Types).

## Partial<T>

Makes every property **optional**. Ideal for update functions where you only pass the fields that changed, or for building an object up gradually.

## Required<T>

The opposite — makes every property **required**, stripping all the \`?\` marks. Useful when a value has passed validation and you want to guarantee everything is present.`,
        codeExamples: [
          {
            title: "Partial<T>",
            code: `type User = { id: number; name: string; email: string };

function updateUser(id: number, changes: Partial<User>) {
  // changes can contain any subset of User's fields
}

updateUser(1, { name: "John" });        // ✅ only the changed field
updateUser(1, { email: "j@x.com" });    // ✅`,
            language: "typescript",
          },
          {
            title: "Required<T>",
            code: `type Config = { host?: string; port?: number };
type FullConfig = Required<Config>; // { host: string; port: number }

const c: FullConfig = { host: "localhost", port: 8080 }; // both required now`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Partial models a patch/update payload.",
          code: `type User = { id: number; name: string; email: string };

function applyChanges(user: User, changes: Partial<User>): User {
  return { ...user, ...changes };
}

const before: User = { id: 1, name: "Ada", email: "ada@x.com" };
const after = applyChanges(before, { name: "Ada L." });
console.log(after);`,
        },
      },
      {
        id: "pick-omit",
        title: "Pick & Omit",
        seoDescription:
          "Select or exclude properties from a type with TypeScript's Pick and Omit utility types. Build focused DTOs and view models without duplication.",
        keywords:
          "typescript Pick, Omit, select properties, exclude properties, derived types, DTO",
        content: `Often you want a **subset** of an existing type — a public view of a user without the password, or just the fields a form edits. \`Pick\` and \`Omit\` derive those subsets so the related types stay in sync with the source.

## Pick<T, K>

Keeps **only** the named properties. \`Pick<User, "id" | "name">\` is a type with just those two fields.

## Omit<T, K>

Removes the named properties, keeping everything else. \`Omit<User, "password">\` is the user without the password.

Deriving with Pick/Omit beats hand-writing a new type: change the source and the derived types update automatically.`,
        codeExamples: [
          {
            title: "Pick<T, K>",
            code: `type User = { id: number; name: string; email: string; password: string };

type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }`,
            language: "typescript",
          },
          {
            title: "Omit<T, K>",
            code: `type User = { id: number; name: string; email: string; password: string };

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Omit builds a safe, public view of a record.",
          code: `type User = { id: number; name: string; password: string };
type PublicUser = Omit<User, "password">;

function toPublic(user: User): PublicUser {
  const { password, ...pub } = user;
  return pub;
}

console.log(toPublic({ id: 1, name: "Ada", password: "secret" }));`,
        },
      },
      {
        id: "record",
        title: "Record, Readonly & More",
        seoDescription:
          "Master more TypeScript utility types: Record, Readonly, NonNullable, ReturnType, Parameters, and Awaited — with practical, runnable examples.",
        keywords:
          "typescript Record, Readonly, NonNullable, ReturnType, Parameters, Awaited, utility types",
        content: `Beyond Partial/Pick/Omit, a handful of utility types come up constantly. Knowing them saves you from reinventing type-level logic.

- **\`Record<K, T>\`** — an object type with keys \`K\` and values \`T\`. Perfect for dictionaries with a known set of keys.
- **\`Readonly<T>\`** — every property becomes \`readonly\`.
- **\`NonNullable<T>\`** — removes \`null\` and \`undefined\` from a type.
- **\`ReturnType<F>\`** — the type a function returns. Great for staying in sync with a function's output.
- **\`Parameters<F>\`** — a tuple of a function's parameter types.
- **\`Awaited<T>\`** — the type a \`Promise\` resolves to (unwraps nested promises too).

Most of these are built from the conditional and mapped types you saw earlier — they're not magic, just well-named building blocks.`,
        codeExamples: [
          {
            title: "Record<K, T>",
            code: `type Status = "pending" | "complete" | "failed";
type Counts = Record<Status, number>;

const counts: Counts = { pending: 5, complete: 10, failed: 2 };`,
            language: "typescript",
          },
          {
            title: "ReturnType & Parameters",
            code: `function createUser(name: string, age: number) {
  return { id: 1, name, age };
}

type User = ReturnType<typeof createUser>;     // { id: number; name: string; age: number }
type Args = Parameters<typeof createUser>;     // [string, number]`,
            language: "typescript",
          },
          {
            title: "NonNullable & Awaited",
            code: `type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>;            // string

type Data = Awaited<Promise<number>>;          // number`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Record gives a fully-typed lookup table.",
          code: `type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
  admin:  ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

for (const role of Object.keys(permissions) as Role[]) {
  console.log(\`\${role}: \${permissions[role].join(", ")}\`);
}`,
        },
      },
    ],
  },
  {
    id: "narrowing",
    title: "Type Narrowing",
    icon: "Filter",
    subsections: [
      {
        id: "typeof-narrowing",
        title: "typeof & truthiness Narrowing",
        seoDescription:
          "Narrow union types at runtime in TypeScript using typeof checks and truthiness guards. Learn how control flow analysis refines types automatically.",
        keywords:
          "typescript narrowing, typeof narrowing, truthiness, control flow analysis, union narrowing",
        content: `**Narrowing** is how TypeScript figures out a more specific type inside a branch of code. When you check a value, TypeScript follows your control flow and updates the type accordingly — this is called **control flow analysis**.

## typeof guards

The \`typeof\` operator distinguishes primitives at runtime (\`"string"\`, \`"number"\`, \`"boolean"\`, …). Inside an \`if (typeof x === "string")\` block, TypeScript knows \`x\` is a string and lets you call string methods safely.

## Truthiness narrowing

Checking a value for truthiness narrows away \`null\`, \`undefined\`, \`0\`, and \`""\`. \`if (value)\` followed by use is a common, safe pattern — though be careful: \`0\` and \`""\` are falsy too, which occasionally bites.`,
        codeExamples: [
          {
            title: "typeof narrowing",
            code: `function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ string here
  }
  return value.toFixed(2);      // ✅ number here
}`,
            language: "typescript",
          },
          {
            title: "Truthiness narrowing",
            code: `function greet(name: string | null) {
  if (name) {
    return \`Hi \${name.trim()}\`; // ✅ name is string (not null) here
  }
  return "Hi there";
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "TypeScript narrows the union inside each branch.",
          code: `function describe(value: string | number | boolean): string {
  if (typeof value === "string") return \`text: \${value.toUpperCase()}\`;
  if (typeof value === "number") return \`num: \${value.toFixed(1)}\`;
  return \`bool: \${value ? "yes" : "no"}\`;
}

console.log(describe("hi"));
console.log(describe(42));
console.log(describe(true));`,
        },
      },
      {
        id: "instanceof-narrowing",
        title: "instanceof & in Narrowing",
        seoDescription:
          "Narrow object and class types in TypeScript with instanceof and the in operator. Learn to safely branch on class instances and property presence.",
        keywords:
          "typescript instanceof, in operator, narrow class types, property check, object narrowing",
        content: `\`typeof\` only distinguishes primitives. For objects and classes you have two more guards.

## instanceof

\`instanceof\` checks whether an object was created from a particular class (or subclass). Inside \`if (x instanceof Admin)\`, TypeScript narrows \`x\` to \`Admin\` and exposes its members. Works with any class, including built-ins like \`Date\` and \`Error\`.

## the in operator

The \`in\` operator checks whether a **property exists** on an object, which is perfect for narrowing object unions that don't share a discriminant. \`if ("permissions" in user)\` narrows to the variant that has that property.`,
        codeExamples: [
          {
            title: "instanceof",
            code: `class User { name = "User"; }
class Admin extends User { permissions: string[] = []; }

function handle(person: User | Admin) {
  if (person instanceof Admin) {
    console.log(person.permissions); // ✅ Admin here
  }
}`,
            language: "typescript",
          },
          {
            title: "in operator",
            code: `type Dog = { bark: () => void };
type Cat = { meow: () => void };

function speak(pet: Dog | Cat) {
  if ("bark" in pet) pet.bark(); // ✅ Dog
  else pet.meow();               // ✅ Cat
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "'in' narrows a union by checking for a property.",
          code: `type Square = { side: number };
type Rect = { width: number; height: number };

function area(shape: Square | Rect): number {
  if ("side" in shape) return shape.side ** 2;
  return shape.width * shape.height;
}

console.log(area({ side: 4 }));
console.log(area({ width: 3, height: 5 }));`,
        },
      },
      {
        id: "type-predicates",
        title: "Type Guards & Assertion Functions",
        seoDescription:
          "Write custom type guards with 'value is T' predicates and assertion functions in TypeScript. Reuse narrowing logic and enforce exhaustiveness with never.",
        keywords:
          "typescript type guard, type predicate, value is, assertion function, asserts, never exhaustiveness",
        content: `When the built-in guards aren't enough, you can teach TypeScript your own.

## Custom type guards (predicates)

A function whose return type is \`value is T\` is a **type guard**. When it returns \`true\`, TypeScript narrows the argument to \`T\` at the call site. This packages reusable narrowing logic — \`isString(x)\`, \`isUser(x)\` — into named, testable functions.

## Assertion functions

An **assertion function** uses \`asserts value is T\`: instead of returning a boolean, it **throws** if the condition fails, and afterward TypeScript treats the value as \`T\`. Perfect for input validation that should abort on bad data.

## Exhaustiveness with never

Assigning a value to \`never\` only compiles if the value is \`never\` — i.e., all cases are handled. Put a \`never\` check in the \`default\` of a switch over a union and TypeScript will **error if you add a new variant** and forget to handle it. This is the safety net that makes discriminated unions bulletproof.`,
        codeExamples: [
          {
            title: "Custom type guard",
            code: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    value.toUpperCase(); // ✅ narrowed to string
  }
}`,
            language: "typescript",
          },
          {
            title: "Assertion function",
            code: `function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) throw new Error("Value is undefined");
}

function use(name?: string) {
  assertDefined(name);
  return name.toUpperCase(); // ✅ name is string after the assertion
}`,
            language: "typescript",
          },
          {
            title: "Exhaustiveness check",
            code: `type Shape = { kind: "circle" } | { kind: "square" };

function area(s: Shape) {
  switch (s.kind) {
    case "circle": return 1;
    case "square": return 2;
    default:
      const _exhaustive: never = s; // ❌ errors if a new kind is added
      return _exhaustive;
  }
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "A reusable type guard narrows unknown data safely.",
          code: `function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every(v => typeof v === "number");
}

function sum(value: unknown): number {
  if (isNumberArray(value)) return value.reduce((a, b) => a + b, 0);
  return 0;
}

console.log(sum([1, 2, 3]));     // 6
console.log(sum("not array"));   // 0`,
        },
      },
    ],
  },
  {
    id: "modern-typescript",
    title: "Modern TypeScript",
    icon: "Sparkles",
    subsections: [
      {
        id: "satisfies",
        title: "The satisfies Operator",
        seoDescription:
          "The satisfies operator (TS 4.9+) validates a value against a type while keeping its precise inferred type. Learn why it beats a plain type annotation.",
        keywords:
          "typescript satisfies operator, satisfies vs as, type validation, narrow inference, ts 4.9",
        content: `\`satisfies\` (added in TypeScript 4.9 and now everywhere) solves a subtle but common problem: you want to **check** that a value matches a type *without widening it* to that type.

With a plain annotation \`const config: Config = {...}\`, the variable's type becomes \`Config\` — you lose the specific literal information. With \`const config = {...} satisfies Config\`, TypeScript **validates** the object against \`Config\` but keeps the **precise inferred type**, so you still get exact keys and literal values for autocomplete and narrowing.

## The rule of thumb

- Use a **type annotation** when you want the value treated as the general type.
- Use **\`satisfies\`** when you want it validated *but* keep its exact shape.
- Avoid **\`as\`** here — it asserts without checking, which is less safe than both.`,
        codeExamples: [
          {
            title: "Annotation widens (loses detail)",
            code: `type Config = Record<string, string | number>;

const config: Config = { host: "localhost", port: 8080 };
config.port.toFixed(); // ❌ port is 'string | number' — detail lost`,
            language: "typescript",
          },
          {
            title: "satisfies validates AND keeps detail",
            code: `type Config = Record<string, string | number>;

const config = { host: "localhost", port: 8080 } satisfies Config;
config.port.toFixed();  // ✅ port is known to be number
config.host.toUpperCase(); // ✅ host is known to be string
// still validated: a wrong value type would error`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "satisfies keeps literal precision while checking the shape.",
          code: `type Theme = Record<"primary" | "secondary", string>;

const theme = {
  primary: "#2563eb",
  secondary: "#9333ea",
} satisfies Theme;

// exact keys are preserved for autocomplete:
console.log("primary:", theme.primary.toUpperCase());`,
        },
      },
      {
        id: "const-type-parameters",
        title: "const Type Parameters",
        seoDescription:
          "const type parameters (TS 5.0) let generic functions infer the narrowest literal types from arguments, without callers writing 'as const'.",
        keywords:
          "typescript const type parameter, const generic, as const inference, ts 5.0, literal inference",
        content: `Introduced in TypeScript 5.0, a **\`const\` type parameter** tells a generic function to infer the **narrowest, most literal** type from an argument — as if the caller had written \`as const\` — without them having to.

Normally, passing \`["a", "b"]\` to a generic infers \`string[]\`. With \`<const T>\`, it infers the readonly tuple \`readonly ["a", "b"]\`, preserving the exact values. This is invaluable for libraries that build precise types from configuration arrays (routers, form builders, state machines).`,
        codeExamples: [
          {
            title: "Without const: widened",
            code: `function makeTuple<T>(values: T[]): T[] {
  return values;
}
const t = makeTuple(["a", "b"]); // string[] — literals lost`,
            language: "typescript",
          },
          {
            title: "With const: precise literals",
            code: `function makeTuple<const T>(values: readonly T[]): readonly T[] {
  return values;
}
const t = makeTuple(["a", "b"]); // readonly ["a", "b"] — literals kept`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "The const parameter preserves exact string literals.",
          code: `function defineRoutes<const T extends readonly string[]>(routes: T): T {
  return routes;
}

const routes = defineRoutes(["/home", "/about", "/contact"]);
console.log("first route:", routes[0]);
console.log("count:", routes.length);`,
        },
      },
      {
        id: "using-resource-management",
        title: "using & Resource Management",
        seoDescription:
          "TypeScript 5.2's 'using' and 'await using' declarations automatically dispose resources via Symbol.dispose — a built-in try/finally for cleanup.",
        keywords:
          "typescript using, await using, Symbol.dispose, explicit resource management, disposable, cleanup",
        content: `TypeScript 5.2 added the **explicit resource management** syntax from a TC39 proposal: the \`using\` declaration. A resource declared with \`using\` is **automatically disposed** when it goes out of scope — like a built-in \`try/finally\` for cleanup.

Any object with a \`[Symbol.dispose]()\` method is "disposable." When the block ends, its dispose method runs automatically — closing files, releasing locks, ending DB connections — even if an error is thrown. For async cleanup, \`await using\` calls \`[Symbol.asyncDispose]()\`.

This is newer syntax and needs a runtime/polyfill that supports the dispose symbols, but it elegantly removes a whole class of "forgot to clean up" bugs.`,
        codeExamples: [
          {
            title: "A disposable resource",
            code: `function openFile(name: string) {
  console.log(\`opening \${name}\`);
  return {
    read: () => "file contents",
    [Symbol.dispose]: () => console.log(\`closing \${name}\`),
  };
}

function process() {
  using file = openFile("data.txt");
  console.log(file.read());
  // file is disposed automatically here — "closing data.txt" logs
}`,
            language: "typescript",
          },
          {
            title: "Async disposal",
            code: `async function getConnection() {
  return {
    query: async () => [],
    [Symbol.asyncDispose]: async () => console.log("connection closed"),
  };
}

async function run() {
  await using conn = await getConnection();
  await conn.query();
  // [Symbol.asyncDispose] awaited automatically at scope end
}`,
            language: "typescript",
          },
        ],
      },
      {
        id: "decorators",
        title: "Decorators & Metadata",
        seoDescription:
          "Modern standard decorators in TypeScript 5+ add reusable behavior to classes and members. Learn the new syntax and stabilized decorator metadata.",
        keywords:
          "typescript decorators, standard decorators, class decorator, method decorator, decorator metadata, ts 5",
        content: `**Decorators** are functions that add reusable behavior to classes and their members using the \`@\` syntax. TypeScript 5.0 adopted the **standard (TC39 Stage 3) decorators**, replacing the old experimental ones — so today's decorators match where JavaScript itself is heading.

A decorator is just a function that receives the thing it decorates plus a context object, and can wrap, replace, or observe it. Frameworks use them for logging, validation, dependency injection, and ORM mapping.

## Decorator metadata

TypeScript 6.0 stabilized **decorator metadata** (\`Symbol.metadata\`), letting decorators attach and read type/configuration information at runtime — the foundation for DI containers and validation libraries to work with full type safety.`,
        codeExamples: [
          {
            title: "A method decorator (logs calls)",
            code: `function log(originalMethod: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log(\`calling \${String(context.name)}\`);
    return originalMethod.call(this, ...args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) { return a + b; }
}

new Calculator().add(2, 3); // logs "calling add", returns 5`,
            language: "typescript",
          },
        ],
      },
    ],
  },
  {
    id: "modules",
    title: "Modules & Declarations",
    icon: "Layers",
    subsections: [
      {
        id: "esm-cjs",
        title: "Modules: ESM, CJS & import type",
        seoDescription:
          "Understand ES modules vs CommonJS in TypeScript, plus 'import type' and verbatimModuleSyntax for clean, correct imports that don't leak into runtime.",
        keywords:
          "typescript modules, esm vs commonjs, import type, export type, verbatimModuleSyntax, type-only import",
        content: `JavaScript has two module systems: modern **ES Modules** (\`import\`/\`export\`, the standard everywhere now) and older **CommonJS** (\`require\`/\`module.exports\`, classic Node). TypeScript understands both, and your \`tsconfig\` \`module\` setting controls what it emits. New projects should target ESM.

## import type

When you import something **only for its type**, use \`import type\`. This tells TypeScript the import is type-only, so it's fully erased from the output and never accidentally pulls a module into the runtime bundle. It also prevents circular-import surprises.

## verbatimModuleSyntax

This compiler flag makes TypeScript emit imports/exports exactly as written (only dropping \`import type\`). It removes ambiguity about what's elided, and it's the recommended modern setting for predictable module output.`,
        codeExamples: [
          {
            title: "ESM import/export",
            code: `// math.ts
export function add(a: number, b: number) { return a + b; }
export const PI = 3.14159;

// app.ts
import { add, PI } from "./math";`,
            language: "typescript",
          },
          {
            title: "Type-only import",
            code: `import type { User } from "./types";   // erased from output entirely
import { saveUser } from "./api";

function persist(user: User) {          // User used only as a type
  return saveUser(user);
}`,
            language: "typescript",
          },
          {
            title: "Mixed: inline type specifier",
            code: `import { createUser, type User } from "./users";`,
            language: "typescript",
            description: "Mark individual specifiers as type-only inline.",
          },
        ],
      },
      {
        id: "declaration-files",
        title: "Declaration Files & @types",
        seoDescription:
          "Learn what .d.ts declaration files are, how DefinitelyTyped @types packages add types to JS libraries, and how to declare types for untyped modules.",
        keywords:
          "typescript declaration files, .d.ts, @types, DefinitelyTyped, ambient declarations, declare module",
        content: `A **declaration file** (\`.d.ts\`) contains **types only — no implementation**. It describes the shape of code that exists elsewhere, like a plain-JavaScript library or a global variable. This is how TypeScript knows the types of code it can't see the source of.

## @types packages

Many JS libraries ship without types. The community maintains type definitions on **DefinitelyTyped**, published as \`@types/<package>\`. Install \`@types/node\`, \`@types/lodash\`, etc., and TypeScript suddenly understands those libraries. Modern libraries increasingly bundle their own \`.d.ts\` files, so you don't always need a separate \`@types\` package.

## Declaring untyped modules

If a module has no types at all, you can write a small \`declare module "name"\` block to silence errors and provide whatever types you need.`,
        codeExamples: [
          {
            title: "A declaration file",
            code: `// shapes.d.ts — types only, no runtime code
export interface Point { x: number; y: number; }
export function distance(a: Point, b: Point): number;`,
            language: "typescript",
          },
          {
            title: "Install community types",
            code: `npm install --save-dev @types/lodash
# now: import debounce from "lodash/debounce"  is fully typed`,
            language: "bash",
          },
          {
            title: "Declare an untyped module",
            code: `// globals.d.ts
declare module "legacy-lib" {
  export function doThing(input: string): number;
}`,
            language: "typescript",
          },
        ],
      },
    ],
  },
  {
    id: "config-strictness",
    title: "Config & Strictness",
    icon: "Settings",
    subsections: [
      {
        id: "tsconfig",
        title: "tsconfig.json Essentials",
        seoDescription:
          "Understand the key tsconfig.json options: target, module, lib, outDir, strict, and more. Configure the TypeScript compiler with confidence.",
        keywords:
          "typescript tsconfig, compiler options, target, module, strict, lib, esModuleInterop",
        content: `\`tsconfig.json\` is the control panel for the compiler. You don't need to memorize every option — a handful matter most.

- **\`target\`** — the JavaScript version to emit (e.g. \`ES2020\`, \`ESNext\`). Newer targets emit smaller, more modern code.
- **\`module\`** — the module system for output (\`ESNext\`, \`NodeNext\`, \`CommonJS\`).
- **\`lib\`** — which built-in APIs to assume exist (DOM, ES2023, …).
- **\`outDir\` / \`rootDir\`** — where compiled files go and where sources live.
- **\`strict\`** — the master switch for type-safety checks (see the next topic — keep it on!).
- **\`esModuleInterop\`** — smooths importing CommonJS modules with ESM syntax.
- **\`skipLibCheck\`** — skip type-checking \`.d.ts\` files for faster builds.

Run \`npx tsc --init\` to generate a well-commented starter, then adjust.`,
        codeExamples: [
          {
            title: "A solid modern tsconfig.json",
            code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2023", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`,
            language: "json",
          },
        ],
      },
      {
        id: "strict-flags",
        title: "Strict Mode & Safety Flags",
        seoDescription:
          "Why TypeScript's strict mode matters and what its flags do: strictNullChecks, noImplicitAny, noUncheckedIndexedAccess, and more for maximum safety.",
        keywords:
          "typescript strict mode, strictNullChecks, noImplicitAny, noUncheckedIndexedAccess, exactOptionalPropertyTypes",
        content: `The single most important setting is **\`strict: true\`**. It enables a family of checks that turn TypeScript from "types as suggestions" into "types that actually protect you." Always start new projects with it on.

Key members of the strict family:

- **\`strictNullChecks\`** — \`null\` and \`undefined\` are their own types, so you must handle them explicitly. Eliminates a huge category of "cannot read property of undefined" crashes.
- **\`noImplicitAny\`** — errors when TypeScript would silently fall back to \`any\`, forcing you to be explicit.
- **\`strictFunctionTypes\`**, **\`strictBindCallApply\`** — stricter function compatibility checks.

## Worth enabling beyond strict

- **\`noUncheckedIndexedAccess\`** — array/index access returns \`T | undefined\`, reflecting reality (the element might not exist). Prevents a sneaky class of bugs.
- **\`exactOptionalPropertyTypes\`** — distinguishes "property absent" from "property set to undefined."
- **\`noImplicitReturns\`**, **\`noFallthroughCasesInSwitch\`** — catch incomplete control flow.

In **TypeScript 6.0**, \`strict\` is on by **default** — the ecosystem has firmly settled on strict being the right baseline.`,
        codeExamples: [
          {
            title: "strictNullChecks in action",
            code: `function firstChar(s: string | null): string {
  return s.charAt(0); // ❌ 's' is possibly null
}

// fixed:
function safe(s: string | null): string {
  return s ? s.charAt(0) : "";
}`,
            language: "typescript",
          },
          {
            title: "noUncheckedIndexedAccess",
            code: `const items = ["a", "b"];
const x = items[10]; // type is string | undefined (with the flag on)
x.toUpperCase();     // ❌ forces you to check for undefined first`,
            language: "typescript",
          },
        ],
      },
    ],
  },
  {
    id: "async",
    title: "Async & Error Handling",
    icon: "Zap",
    subsections: [
      {
        id: "typing-promises",
        title: "Typing Promises & async/await",
        seoDescription:
          "Type asynchronous code in TypeScript: Promise<T>, async functions, await, and the Awaited utility type. Write type-safe data fetching.",
        keywords:
          "typescript promise type, async await types, Promise<T>, Awaited, asynchronous typescript",
        content: `Asynchronous code is fully typed in TypeScript. A promise that resolves to a value of type \`T\` has type \`Promise<T>\`. An \`async\` function **always** returns a promise, so its return type is \`Promise<whatever-you-return>\`.

When you \`await\` a \`Promise<T>\`, you get a \`T\` — TypeScript unwraps it for you. The \`Awaited<T>\` utility type does the same at the type level (and handles nested promises).

## Best practice

Annotate the resolved type on functions that fetch data — \`async function getUser(id: number): Promise<User>\` — so every caller knows exactly what they'll receive. Pair this with runtime validation (e.g. Zod) for data crossing your app's boundary, since types alone don't check values at runtime.`,
        codeExamples: [
          {
            title: "Typed async function",
            code: `type User = { id: number; name: string };

async function getUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as Promise<User>;
}

const user = await getUser(1); // user is User`,
            language: "typescript",
          },
          {
            title: "Awaited<T>",
            code: `async function load() { return 42; }
type Result = Awaited<ReturnType<typeof load>>; // number`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "async/await is fully typed — run this Promise example.",
          code: `function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function main() {
  console.log("start");
  const result = await delay("done!", 200);
  console.log(result.toUpperCase());
}

main();`,
        },
      },
      {
        id: "error-handling",
        title: "Error Handling Patterns",
        seoDescription:
          "Handle errors safely in TypeScript: why caught errors are 'unknown', how to narrow them, and the Result type pattern as an alternative to throwing.",
        keywords:
          "typescript error handling, catch unknown, useUnknownInCatchVariables, result type, try catch types",
        content: `In modern TypeScript, the variable in a \`catch\` block is typed \`unknown\` — because **anything** can be thrown, not just \`Error\` objects. That forces you to **narrow** before using it, which prevents assuming a shape that might not be there.

## Narrowing caught errors

Check \`if (err instanceof Error)\` before reading \`err.message\`. For thrown non-Error values, handle the fallback.

## The Result pattern

Instead of throwing, some codebases return a **discriminated union** representing success or failure — a "Result" type. Callers must check which case they got before accessing data, making error handling explicit and impossible to forget. It pairs perfectly with the discriminated-union and exhaustiveness patterns you've learned.`,
        codeExamples: [
          {
            title: "Caught errors are unknown",
            code: `try {
  riskyOperation();
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message); // ✅ safe after narrowing
  } else {
    console.error("Unknown error", err);
  }
}`,
            language: "typescript",
          },
          {
            title: "Result type (no throwing)",
            code: `type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (Number.isNaN(n)) return { ok: false, error: "not a number" };
  return { ok: true, value: n };
}`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "The Result pattern makes failure a value you must handle.",
          code: `type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function divide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: "divide by zero" };
  return { ok: true, value: a / b };
}

for (const [a, b] of [[10, 2], [5, 0]] as const) {
  const r = divide(a, b);
  console.log(r.ok ? \`= \${r.value}\` : \`error: \${r.error}\`);
}`,
        },
      },
    ],
  },
  {
    id: "react",
    title: "React & Next.js",
    icon: "Atom",
    subsections: [
      {
        id: "component-props",
        title: "Component Props",
        seoDescription:
          "Type React component props with TypeScript. Learn typed props, children, default values, and union props for safe, self-documenting components.",
        keywords:
          "react typescript props, typed component, children type, FC, react props interface",
        content: `Typing **props** is where TypeScript pays off most in React — your components become self-documenting and impossible to misuse. Define a type (or interface) for the props and annotate the component's parameter.

## children and defaults

For components that wrap content, type \`children: React.ReactNode\`. Give optional props sensible defaults in the destructure. Union props (\`variant?: "primary" | "secondary"\`) give consumers autocomplete and reject invalid values.

## A note on FC

You can annotate a component as \`React.FC<Props>\` or simply type the props parameter directly (\`function Button(props: ButtonProps)\`). The direct style is increasingly preferred — it's explicit and avoids some \`FC\` quirks.`,
        codeExamples: [
          {
            title: "Typed props",
            code: `type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

function Button({ label, onClick, disabled, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={\`btn btn-\${variant}\`}>
      {label}
    </button>
  );
}`,
            language: "typescript",
          },
          {
            title: "Props with children",
            code: `type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}`,
            language: "typescript",
          },
        ],
      },
      {
        id: "hooks",
        title: "Typed Hooks",
        seoDescription:
          "Type React hooks with TypeScript: useState generics, useRef for DOM elements, useReducer, and custom hooks. Get inference and safety in your components.",
        keywords:
          "react hooks typescript, useState generic, useRef, useReducer types, custom hook types",
        content: `React's hooks are generic, so they work smoothly with TypeScript.

- **\`useState\`** infers the type from the initial value. Pass an explicit type parameter when the initial value doesn't tell the full story (e.g. state that starts \`null\` but becomes a \`User\`).
- **\`useRef\`** is typed by what it points at — \`useRef<HTMLInputElement>(null)\` for a DOM element. Access \`.current\` with optional chaining since it can be null.
- **Custom hooks** are just functions; type their parameters and return value (often a tuple, like \`useState\`'s) and consumers get full safety.`,
        codeExamples: [
          {
            title: "useState",
            code: `const [count, setCount] = useState(0);          // inferred number
const [user, setUser] = useState<User | null>(null); // explicit when needed`,
            language: "typescript",
          },
          {
            title: "useRef for a DOM node",
            code: `function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const focus = () => inputRef.current?.focus();
  return <input ref={inputRef} />;
}`,
            language: "typescript",
          },
          {
            title: "A typed custom hook",
            code: `function useToggle(initial = false): [boolean, () => void] {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(o => !o);
  return [on, toggle];
}`,
            language: "typescript",
          },
        ],
      },
      {
        id: "event-types",
        title: "Event Types",
        seoDescription:
          "Type React event handlers with TypeScript: ChangeEvent, FormEvent, MouseEvent, and the element generics that give you precise event targets.",
        keywords:
          "react event types typescript, ChangeEvent, FormEvent, MouseEvent, event handler types",
        content: `React provides typed event objects so your handlers know exactly what they're working with. The pattern is \`SomeEvent<HTMLElement>\` — the generic says which element fired it, which types \`event.currentTarget\` precisely.

Common ones:

- **\`ChangeEvent<HTMLInputElement>\`** — input/select changes; read \`e.currentTarget.value\`.
- **\`FormEvent<HTMLFormElement>\`** — form submit; call \`e.preventDefault()\`.
- **\`MouseEvent<HTMLButtonElement>\`** — clicks.

If you let React infer the handler from a JSX prop (e.g. \`onChange={e => ...}\`), \`e\` is already typed for you — you only annotate when defining the handler separately.`,
        codeExamples: [
          {
            title: "Form & change events",
            code: `function SignupForm({ onSubmit }: { onSubmit: (email: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    onSubmit(input.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} />
      <button type="submit">Sign up</button>
    </form>
  );
}`,
            language: "typescript",
          },
        ],
      },
    ],
  },
  {
    id: "whats-new",
    title: "What's New in TypeScript",
    icon: "Sparkles",
    subsections: [
      {
        id: "ts-5-to-6",
        title: "TypeScript 5.x → 6.0",
        seoDescription:
          "What's new in recent TypeScript: the satisfies operator, const type parameters, using declarations, decorators, and TS 6.0 making strict mode the default.",
        keywords:
          "typescript 5.9, typescript 6.0, new typescript features, strict by default, decorator metadata, es2025",
        content: `TypeScript moves fast — roughly a release each quarter. Here's the recent arc you should know.

## The 5.x highlights

- **5.0** — standard (TC39) **decorators** and **\`const\` type parameters**.
- **5.2** — **\`using\`** declarations for explicit resource management.
- **5.4–5.6** — better inference, the \`NoInfer\` utility, and stricter checks for safer code.
- **5.9** — stabilized **decorator metadata** work and build-performance gains.

## TypeScript 6.0 (March 2026)

The **last release built on the original JavaScript codebase**, and a milestone for defaults:

- **\`strict\` is on by default** — the ecosystem has fully embraced strict typing.
- Default **\`target\` moved to ES2025** and module defaults modernized.
- Significantly faster incremental rebuilds and lower memory use.

The throughline: TypeScript keeps tracking JavaScript's evolution and nudging projects toward safer defaults.`,
        codeExamples: [
          {
            title: "Modern features at a glance",
            code: `// satisfies (5.x)
const theme = { primary: "#000" } satisfies Record<string, string>;

// const type parameter (5.0)
function tuple<const T>(...args: T[]) { return args; }

// using (5.2)
// using resource = getResource();`,
            language: "typescript",
          },
        ],
      },
      {
        id: "ts-7-native",
        title: "TypeScript 7 & the Native Compiler",
        seoDescription:
          "TypeScript 7.0 is a native compiler rewritten in Go (tsgo) delivering roughly 10x faster type-checking, plus Node.js running TypeScript files directly.",
        keywords:
          "typescript 7, native compiler, tsgo, go typescript, 10x faster, node native typescript, strip types",
        content: `The biggest change in TypeScript's history is underway: a **native compiler**.

## TypeScript 7.0 — "tsgo"

Microsoft is porting the TypeScript compiler from JavaScript to **Go**, producing a native binary that's roughly **10× faster** at type-checking and uses far less memory — while preserving the exact same type-checking behavior. Announced as a beta in April 2026 with a release candidate in mid-2026, it dramatically shortens editor feedback and CI times on large codebases. You opt in today via the preview tooling; existing code is expected to "just work."

## Node.js runs TypeScript natively

In parallel, the runtimes caught up. **Node.js 22+** can execute \`.ts\` files directly by **stripping types** (no separate compile step for type-only syntax), and newer Node versions enable this by default. **Deno** and **Bun** have run TypeScript natively for a while. The result: for scripts and many apps, you can just \`node app.ts\` and go.

The takeaway for learners: the language is stable and the tooling is getting dramatically faster and simpler. What you learn here applies directly to TS 5, 6, and 7.`,
        codeExamples: [
          {
            title: "Run TypeScript directly",
            code: `# Node 22+ strips types and runs the file
node script.ts

# Deno and Bun run TypeScript natively too
deno run script.ts
bun run script.ts`,
            language: "bash",
          },
        ],
      },
    ],
  },
  {
    id: "project",
    title: "Project: Weather App",
    icon: "Cloud",
    subsections: [
      {
        id: "project-overview",
        title: "Project Overview",
        seoDescription:
          "Build a type-safe weather dashboard in TypeScript using a public API and Zod for runtime validation. A hands-on project tying the concepts together.",
        keywords:
          "typescript project, weather app typescript, zod validation, type-safe api, typescript tutorial project",
        content: `Time to put it together. You'll build a small **weather dashboard** that fetches live data and validates it — applying types, generics, async, and error handling in a realistic setting.

What this project teaches:

- **Type-safe API calls** with \`async/await\` and \`Promise<T>\`
- **Runtime validation** with **Zod** — because types alone don't check values that arrive at runtime
- **Error handling** with the patterns from the Async section
- Organizing types and services in a small codebase

**Time:** ~2–3 hours. You'll need a free [OpenWeatherMap](https://openweathermap.org/api) API key.

This is a **build-along**: every step below has a runnable "Try it yourself" checkpoint. Hit **Run** on each one to see that piece work before moving on — by the last step you'll have run the whole flow end-to-end. Run the first checkpoint now to see exactly what you're building toward.`,
        playground: {
          hint: "The end goal — a typed Weather object turned into a display line. Run it.",
          code: `// The shape of data your app will display
type Weather = {
  city: string;
  temp: number;
  description: string;
  humidity: number;
};

function formatWeather(w: Weather): string {
  return \`\${w.city}: \${w.temp}°C, \${w.description} (humidity \${w.humidity}%)\`;
}

const sample: Weather = {
  city: "London",
  temp: 18,
  description: "light rain",
  humidity: 72,
};

console.log(formatWeather(sample));`,
        },
      },
      {
        id: "project-setup",
        title: "Project Setup",
        seoDescription:
          "Set up a TypeScript project for the weather app: initialize npm, install TypeScript, Zod, and configure tsconfig.json with strict mode.",
        keywords:
          "typescript project setup, npm init, install zod, tsconfig strict, ts-node",
        content: `Create the project and install dependencies. We use **Zod** for runtime validation and **tsx** to run TypeScript directly during development.

Notice \`"strict": true\` in the config below — that's the setting that makes TypeScript pull its weight. Run the checkpoint to see how strictness forces you to handle the "no API key" case up front instead of crashing later.`,
        codeExamples: [
          {
            title: "Create the project",
            code: `mkdir weather-dashboard && cd weather-dashboard
npm init -y
npm install zod
npm install --save-dev typescript tsx @types/node
npx tsc --init`,
            language: "bash",
          },
          {
            title: "tsconfig.json",
            code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}`,
            language: "json",
          },
        ],
        playground: {
          hint: "Strict mode in action: the API key might be undefined, so you must handle it.",
          code: `// process.env.API_KEY is typed string | undefined.
// Under "strict", you can't use it as a string until you've checked it.
function requireApiKey(key: string | undefined): string {
  if (!key) {
    throw new Error("Set API_KEY in your environment first");
  }
  return key; // narrowed to string here
}

console.log("Using key:", requireApiKey("demo-key-123"));

// Try it: pass undefined instead and re-run to see it throw early.
// console.log(requireApiKey(undefined));`,
        },
      },
      {
        id: "project-types",
        title: "Validate with Zod",
        seoDescription:
          "Define a Zod schema for the weather API and infer a TypeScript type from it. Get one source of truth for both runtime validation and static types.",
        keywords:
          "zod schema, z.infer, runtime validation typescript, api types, schema validation",
        content: `Here's the key idea: define a **Zod schema** once, then **infer** the TypeScript type from it with \`z.infer\`. You get runtime validation *and* a static type from a single source of truth — if the API shape changes, you update one place.

When the response arrives, \`schema.parse(data)\` checks it at runtime and returns a fully-typed, trusted value (or throws if the data is malformed).

The checkpoint below is a hand-rolled version of what \`parse\` does, so you can see the idea run with no dependencies. Run it, then change \`temp\` to a string (\`"18"\`) and re-run — watch it reject the bad data.`,
        codeExamples: [
          {
            title: "src/types.ts",
            code: `import { z } from "zod";

export const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(z.object({
    main: z.string(),
    description: z.string(),
  })),
  wind: z.object({ speed: z.number() }),
});

// One source of truth for runtime + compile time:
export type Weather = z.infer<typeof WeatherSchema>;`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "Zod does this for you — here's the same validate-or-throw idea by hand (no network).",
          code: `type Weather = { city: string; temp: number };

// A hand-rolled version of what Zod's schema.parse() does:
function parseWeather(data: unknown): Weather {
  if (
    typeof data === "object" && data !== null &&
    "city" in data && typeof (data as any).city === "string" &&
    "temp" in data && typeof (data as any).temp === "number"
  ) {
    return data as Weather; // validated — safe to trust
  }
  throw new Error("Invalid weather data");
}

const ok = parseWeather({ city: "London", temp: 18 });
console.log("Valid:", ok);

// Try it: change temp to "18" (a string) and re-run — it throws.`,
        },
      },
      {
        id: "project-service",
        title: "The Weather Service",
        seoDescription:
          "Write a type-safe weather service in TypeScript that fetches data and validates it with Zod, returning a fully-typed Weather object with error handling.",
        keywords:
          "typescript fetch api, zod parse, async service, type-safe fetch, error handling",
        content: `Finally, the service that ties it together: fetch the data, validate it with the schema, and return a typed \`Weather\`. Because we \`parse\` the response, everything downstream is guaranteed to match our type — no \`any\`, no surprises.

Notice how the concepts compound: async typing, a generic schema, runtime validation, and error handling all in a dozen lines. That's idiomatic, production-style TypeScript.

The capstone checkpoint below runs the **whole flow** end-to-end — fetch → validate → display — using a mocked response so it works with no API key or network. Run it to see your app produce its final output.`,
        codeExamples: [
          {
            title: "src/weatherService.ts",
            code: `import { WeatherSchema, type Weather } from "./types";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city: string, apiKey: string): Promise<Weather> {
  const url = \`\${API_URL}?q=\${encodeURIComponent(city)}&appid=\${apiKey}&units=metric\`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(\`Weather request failed: \${res.status}\`);
  }

  const data: unknown = await res.json();
  return WeatherSchema.parse(data); // validates at runtime, returns typed Weather
}`,
            language: "typescript",
          },
          {
            title: "src/index.ts — use it",
            code: `import { getWeather } from "./weatherService";

async function main() {
  try {
    const weather = await getWeather("London", process.env.API_KEY!);
    console.log(\`\${weather.name}: \${weather.main.temp}°C, \${weather.weather[0].description}\`);
  } catch (err) {
    console.error(err instanceof Error ? err.message : "Unknown error");
  }
}

main();`,
            language: "typescript",
          },
        ],
        playground: {
          hint: "The whole flow end-to-end with a mocked response — fetch → validate → display.",
          code: `type Weather = { city: string; temp: number; description: string };

// Pretend this is the JSON the OpenWeatherMap API sends back:
function mockFetchWeather(city: string): unknown {
  return {
    name: city,
    main: { temp: 18 },
    weather: [{ description: "light rain" }],
  };
}

// Validate the unknown response into a trusted Weather (Zod does this for real):
function parseWeather(raw: any): Weather {
  return {
    city: raw.name,
    temp: raw.main.temp,
    description: raw.weather[0].description,
  };
}

function formatWeather(w: Weather): string {
  return \`\${w.city}: \${w.temp}°C, \${w.description}\`;
}

// The full pipeline:
const raw = mockFetchWeather("London");
const weather = parseWeather(raw);
console.log(formatWeather(weather));`,
        },
      },
    ],
  },
];

export const learningPaths = [
  {
    id: "express",
    title: "Express Path",
    duration: "1–2 Hours",
    description: "The essentials to start writing TypeScript today",
    icon: "Zap",
    steps: [
      "Read the Introduction",
      "Learn Basic Types & Unions",
      "Type your first Functions",
    ],
  },
  {
    id: "weekend",
    title: "Weekend Warrior",
    duration: "8–10 Hours",
    description: "Go from basics to building a real project",
    icon: "Calendar",
    steps: [
      "Fundamentals: types, functions, objects (Day 1)",
      "Generics, utility types & narrowing (Day 2)",
      "Build the Weather App project (Day 3)",
    ],
  },
  {
    id: "professional",
    title: "Professional Path",
    duration: "4 Weeks",
    description: "Master TypeScript for production codebases",
    icon: "Award",
    steps: [
      "Week 1: All fundamentals + classes",
      "Week 2: Advanced types & generics",
      "Week 3: Modern TS, modules & config",
      "Week 4: React patterns + ship a project",
    ],
  },
];

// Truthful stats, derived from the content above so they never drift.
const totalSubsections = sections.reduce((sum, s) => sum + s.subsections.length, 0);
const totalExamples = sections.reduce(
  (sum, s) => sum + s.subsections.reduce((n, sub) => n + (sub.codeExamples?.length ?? 0), 0),
  0,
);

export const stats = [
  { label: "Lessons", value: `${totalSubsections}` },
  { label: "Code Examples", value: `${totalExamples}+` },
  { label: "Sections", value: `${sections.length}` },
  { label: "Practice", value: "Playground + Quizzes" },
];
