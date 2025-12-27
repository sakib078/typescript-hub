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
        content: `TypeScript is JavaScript with **types**. That's it.

Before TypeScript, you could write code where variables change types unexpectedly. With TypeScript, you catch these mistakes **while you're coding**, not when your users experience it.`,
        codeExamples: [
          {
            title: "JavaScript (problematic)",
            code: `let x = 5;
x = "hello";  // This is allowed in JavaScript!`,
            language: "javascript",
            description: "JavaScript allows type changes at runtime"
          },
          {
            title: "TypeScript (safe)",
            code: `let x: number = 5;
x = "hello";  // ❌ ERROR: Type 'string' is not assignable to type 'number'`,
            language: "typescript",
            description: "TypeScript catches type errors at compile time"
          }
        ]
      },
      {
        id: "why-typescript",
        title: "Why TypeScript Matters",
        content: `TypeScript provides several key benefits:

1. **Catch bugs early** - Before they reach users
2. **Better code documentation** - Types tell you what functions expect
3. **Smarter autocomplete** - VS Code knows what properties exist
4. **Refactoring safety** - Change code, see what breaks immediately
5. **Career boost** - 80% of professional JS jobs use TypeScript`
      }
    ]
  },
  {
    id: "setup",
    title: "Setup & Installation",
    icon: "Settings",
    subsections: [
      {
        id: "install-nodejs",
        title: "Install Node.js",
        content: `First, you need Node.js installed:

1. Go to https://nodejs.org
2. Download LTS version
3. Install it
4. Open terminal and verify installation`,
        codeExamples: [
          {
            title: "Verify Node.js",
            code: `node --version
# You should see something like: v20.10.0`,
            language: "bash"
          }
        ]
      },
      {
        id: "install-typescript",
        title: "Install TypeScript",
        content: `Open terminal in your project folder and run the following commands to install TypeScript and Node.js type definitions:`,
        codeExamples: [
          {
            title: "Install TypeScript",
            code: `npm install --save-dev typescript
npm install --save-dev @types/node`,
            language: "bash"
          }
        ]
      },
      {
        id: "first-file",
        title: "Your First TypeScript File",
        content: `Create a file called \`hello.ts\` and compile it:`,
        codeExamples: [
          {
            title: "hello.ts",
            code: `let message: string = "Hello, TypeScript!";
console.log(message);`,
            language: "typescript"
          },
          {
            title: "Compile & Run",
            code: `npx tsc hello.ts    # Creates hello.js
node hello.js        # Output: Hello, TypeScript!`,
            language: "bash"
          }
        ]
      }
    ]
  },
  {
    id: "types",
    title: "Type System",
    icon: "Code",
    subsections: [
      {
        id: "basic-types",
        title: "Basic Types",
        content: `TypeScript provides several fundamental types that form the foundation of type safety:`,
        codeExamples: [
          {
            title: "String",
            code: `let name: string = "Hitesh";
name = "John";      // ✅ OK
name = 123;         // ❌ ERROR`,
            language: "typescript"
          },
          {
            title: "Number",
            code: `let age: number = 25;
age = 30;           // ✅ OK
age = "thirty";     // ❌ ERROR`,
            language: "typescript"
          },
          {
            title: "Boolean",
            code: `let isActive: boolean = true;
isActive = false;   // ✅ OK
isActive = 1;       // ❌ ERROR (1 is not a boolean)`,
            language: "typescript"
          },
          {
            title: "Null & Undefined",
            code: `let empty: null = null;
let notDefined: undefined = undefined;`,
            language: "typescript"
          }
        ]
      },
      {
        id: "arrays",
        title: "Arrays",
        content: `Arrays in TypeScript can be typed to ensure all elements are of the same type:`,
        codeExamples: [
          {
            title: "Basic Array",
            code: `let numbers: number[] = [1, 2, 3];
numbers.push(4);     // ✅ OK
numbers.push("five"); // ❌ ERROR`,
            language: "typescript"
          },
          {
            title: "Alternative Syntax",
            code: `let colors: Array<string> = ["red", "green", "blue"];`,
            language: "typescript"
          }
        ]
      },
      {
        id: "union-types",
        title: "Union Types",
        content: `When a variable can be one of several types, use union types:`,
        codeExamples: [
          {
            title: "Union Types",
            code: `let id: string | number;
id = "123";     // ✅ OK
id = 123;       // ✅ OK
id = true;      // ❌ ERROR`,
            language: "typescript"
          },
          {
            title: "Literal Types",
            code: `let status: "active" | "inactive" = "active";
status = "inactive";  // ✅ OK
status = "pending";   // ❌ ERROR`,
            language: "typescript"
          }
        ]
      },
      {
        id: "any-unknown",
        title: "Any vs Unknown",
        content: `The \`any\` type disables type checking - avoid it! Use \`unknown\` instead for safer code:`,
        codeExamples: [
          {
            title: "any (AVOID!)",
            code: `let value: any = "hello";
value = 123;
value.toUpperCase();  // No error check - dangerous!`,
            language: "typescript",
            description: "You lose all type safety with 'any'"
          },
          {
            title: "unknown (BETTER!)",
            code: `let value: unknown = "hello";
value.toUpperCase();  // ❌ ERROR: value is unknown

if (typeof value === "string") {
  value.toUpperCase();  // ✅ OK: We checked it's a string
}`,
            language: "typescript",
            description: "You must check the type before using it"
          }
        ]
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    icon: "Zap",
    subsections: [
      {
        id: "basic-functions",
        title: "Basic Functions",
        content: `Functions in TypeScript have typed parameters and return types:`,
        codeExamples: [
          {
            title: "Basic Function",
            code: `function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);      // ✅ OK, returns 8
add("5", "3");  // ❌ ERROR`,
            language: "typescript",
            description: "The ': number' after parentheses is the return type"
          }
        ]
      },
      {
        id: "optional-params",
        title: "Optional & Default Parameters",
        content: `Parameters can be optional using \`?\` or have default values:`,
        codeExamples: [
          {
            title: "Optional Parameters",
            code: `function greet(name?: string): void {
  console.log(\`Hello \${name || "Guest"}\`);
}

greet();        // ✅ OK: Hello Guest
greet("John");  // ✅ OK: Hello John`,
            language: "typescript"
          },
          {
            title: "Default Values",
            code: `function logError(message: string = "Error occurred"): void {
  console.error(message);
}

logError();                 // ✅ OK: uses default
logError("Custom error");   // ✅ OK: uses custom message`,
            language: "typescript"
          }
        ]
      },
      {
        id: "rest-arrow",
        title: "Rest & Arrow Functions",
        content: `TypeScript supports rest parameters and arrow function syntax:`,
        codeExamples: [
          {
            title: "Rest Parameters",
            code: `function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);       // ✅ OK, returns 6
sum(1, 2, 3, 4, 5); // ✅ OK, returns 15`,
            language: "typescript"
          },
          {
            title: "Arrow Functions",
            code: `const multiply = (a: number, b: number): number => a * b;
const isEven = (n: number): boolean => n % 2 === 0;`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "objects",
    title: "Objects & Interfaces",
    icon: "Box",
    subsections: [
      {
        id: "type-alias",
        title: "Type Alias",
        content: `Define reusable object types using type aliases:`,
        codeExamples: [
          {
            title: "Type Alias",
            code: `type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "Hitesh",
  email: "hitesh@example.com"
};`,
            language: "typescript"
          },
          {
            title: "Optional Properties",
            code: `type User = {
  id: number;
  name: string;
  email?: string;  // Optional - can be undefined
};

const user: User = { id: 1, name: "Hitesh" };  // ✅ OK`,
            language: "typescript"
          }
        ]
      },
      {
        id: "readonly",
        title: "Readonly Properties",
        content: `Prevent properties from being reassigned:`,
        codeExamples: [
          {
            title: "Readonly",
            code: `type User = {
  readonly id: number;
  name: string;
};

const user: User = { id: 1, name: "Hitesh" };
user.id = 2;    // ❌ ERROR: Cannot assign to readonly property
user.name = "John";  // ✅ OK`,
            language: "typescript"
          }
        ]
      },
      {
        id: "interface",
        title: "Interface",
        content: `Interfaces are another way to define object shapes, especially useful for extension:`,
        codeExamples: [
          {
            title: "Basic Interface",
            code: `interface Product {
  id: number;
  title: string;
  price: number;
}

const laptop: Product = {
  id: 1,
  title: "MacBook",
  price: 999
};`,
            language: "typescript"
          },
          {
            title: "Interface Inheritance",
            code: `interface Product {
  id: number;
  title: string;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
}

const ebook: DigitalProduct = {
  id: 1,
  title: "TypeScript Guide",
  downloadUrl: "https://..."
};`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Types",
    icon: "Layers",
    subsections: [
      {
        id: "intersection",
        title: "Intersection Types",
        content: `Combine multiple types into one:`,
        codeExamples: [
          {
            title: "Intersection Types",
            code: `type User = {
  id: number;
  name: string;
};

type Admin = {
  role: string;
  permissions: string[];
};

type AdminUser = User & Admin;

const admin: AdminUser = {
  id: 1,
  name: "Hitesh",
  role: "admin",
  permissions: ["read", "write", "delete"]
};`,
            language: "typescript"
          }
        ]
      },
      {
        id: "discriminated-unions",
        title: "Discriminated Unions",
        content: `Great for handling different cases with a common property:`,
        codeExamples: [
          {
            title: "Discriminated Unions",
            code: `type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type Response = SuccessResponse | ErrorResponse;

function handleResponse(response: Response) {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.log(response.message);
  }
}`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "generics",
    title: "Generics",
    icon: "Sparkles",
    subsections: [
      {
        id: "basic-generics",
        title: "Basic Generics",
        content: `Generics let you write code that works with any type - they're a game changer!`,
        codeExamples: [
          {
            title: "Basic Generic Function",
            code: `function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");   // T is string
identity<number>(42);         // T is number
identity(true);               // T is boolean (inferred)`,
            language: "typescript"
          }
        ]
      },
      {
        id: "generic-constraints",
        title: "Generic Constraints",
        content: `Constrain generics to types that have certain properties:`,
        codeExamples: [
          {
            title: "Generic with Constraint",
            code: `function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");     // ✅ OK: strings have length
getLength([1, 2, 3]);   // ✅ OK: arrays have length
getLength(123);         // ❌ ERROR: numbers don't have length`,
            language: "typescript"
          }
        ]
      },
      {
        id: "generic-types",
        title: "Generic Types & Classes",
        content: `Create reusable type definitions and classes with generics:`,
        codeExamples: [
          {
            title: "Generic Type",
            code: `type Box<T> = {
  contents: T;
  isOpen: boolean;
};

const stringBox: Box<string> = {
  contents: "hello",
  isOpen: true
};

const numberBox: Box<number> = {
  contents: 42,
  isOpen: false
};`,
            language: "typescript"
          },
          {
            title: "Generic Class",
            code: `class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(): T | undefined {
    return this.items.pop();
  }
}

const numbers = new Container<number>();
numbers.add(1);
numbers.add(2);
const value = numbers.get();  // Type is number | undefined`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "utility-types",
    title: "Utility Types",
    icon: "Wrench",
    subsections: [
      {
        id: "partial-required",
        title: "Partial & Required",
        content: `Built-in utility types for modifying property optionality:`,
        codeExamples: [
          {
            title: "Partial<T>",
            code: `type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
// Same as: { id?: number; name?: string; email?: string; }

const update: PartialUser = { name: "John" };  // ✅ OK`,
            language: "typescript"
          },
          {
            title: "Required<T>",
            code: `type User = {
  id: number;
  name?: string;
  email?: string;
};

type CompleteUser = Required<User>;
// Same as: { id: number; name: string; email: string; }`,
            language: "typescript"
          }
        ]
      },
      {
        id: "pick-omit",
        title: "Pick & Omit",
        content: `Select or exclude specific properties from types:`,
        codeExamples: [
          {
            title: "Pick<T, K>",
            code: `type User = {
  id: number;
  name: string;
  email: string;
};

type UserPreview = Pick<User, "id" | "name">;
// Same as: { id: number; name: string; }`,
            language: "typescript"
          },
          {
            title: "Omit<T, K>",
            code: `type User = {
  id: number;
  name: string;
  email: string;
};

type UserPublic = Omit<User, "email">;
// Same as: { id: number; name: string; }`,
            language: "typescript"
          }
        ]
      },
      {
        id: "record",
        title: "Record",
        content: `Create an object type with specific keys and value types:`,
        codeExamples: [
          {
            title: "Record<K, T>",
            code: `type Status = "pending" | "complete" | "failed";
type StatusCount = Record<Status, number>;
// Same as: { pending: number; complete: number; failed: number; }

const counts: StatusCount = {
  pending: 5,
  complete: 10,
  failed: 2
};`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "narrowing",
    title: "Type Narrowing",
    icon: "Filter",
    subsections: [
      {
        id: "typeof-narrowing",
        title: "typeof Narrowing",
        content: `Use \`typeof\` to narrow types at runtime:`,
        codeExamples: [
          {
            title: "typeof Narrowing",
            code: `function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // ✅ Safe: it's a string
  } else {
    console.log(value.toFixed(2));     // ✅ Safe: it's a number
  }
}`,
            language: "typescript"
          }
        ]
      },
      {
        id: "instanceof-narrowing",
        title: "instanceof Narrowing",
        content: `Use \`instanceof\` to narrow class types:`,
        codeExamples: [
          {
            title: "instanceof Narrowing",
            code: `class User {
  name: string = "User";
}

class Admin extends User {
  permissions: string[] = [];
}

function handlePerson(person: User | Admin) {
  if (person instanceof Admin) {
    console.log(person.permissions);  // ✅ Safe: it's an Admin
  }
}`,
            language: "typescript"
          }
        ]
      },
      {
        id: "type-predicates",
        title: "Type Predicates",
        content: `Create custom type guards with type predicates:`,
        codeExamples: [
          {
            title: "Type Predicates",
            code: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // ✅ Safe: TypeScript knows it's a string
  }
}`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "react",
    title: "React & Next.js",
    icon: "Atom",
    subsections: [
      {
        id: "component-props",
        title: "Component Props",
        content: `Type your React component props for better DX:`,
        codeExamples: [
          {
            title: "Typed Component",
            code: `import { FC } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

const Button: FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled, 
  variant = "primary" 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
};`,
            language: "typescript"
          }
        ]
      },
      {
        id: "hooks",
        title: "Typed Hooks",
        content: `Type your React hooks for safety:`,
        codeExamples: [
          {
            title: "useState",
            code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("Hello");

  return (
    <div>
      <p>{message}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
            language: "typescript"
          },
          {
            title: "useRef",
            code: `import { useRef } from "react";

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}`,
            language: "typescript"
          }
        ]
      },
      {
        id: "event-types",
        title: "Event Types",
        content: `Properly type your event handlers:`,
        codeExamples: [
          {
            title: "Form Events",
            code: `import { FC, FormEvent, ChangeEvent } from "react";

type FormProps = {
  onSubmit: (email: string) => void;
};

const Form: FC<FormProps> = ({ onSubmit }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="email" />
      <button type="submit">Submit</button>
    </form>
  );
};`,
            language: "typescript"
          }
        ]
      }
    ]
  },
  {
    id: "project",
    title: "Weather Dashboard",
    icon: "Cloud",
    subsections: [
      {
        id: "project-overview",
        title: "Project Overview",
        content: `Build a real weather app using TypeScript, OpenWeatherMap API, and Zod validation. This project teaches you:

- Type-safe API calls
- Runtime validation with Zod
- Error handling patterns
- Utility functions

**Time Commitment**: ~3 hours`
      },
      {
        id: "project-setup",
        title: "Project Setup",
        content: `Set up your project with the necessary dependencies:`,
        codeExamples: [
          {
            title: "Create Project",
            code: `mkdir weather-dashboard
cd weather-dashboard
npm init -y
npm install --save-dev typescript @types/node ts-node
npm install zod axios`,
            language: "bash"
          },
          {
            title: "tsconfig.json",
            code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`,
            language: "json"
          }
        ]
      },
      {
        id: "project-types",
        title: "Define Types with Zod",
        content: `Create type-safe schemas for API responses:`,
        codeExamples: [
          {
            title: "src/types.ts",
            code: `import { z } from "zod";

export const WeatherDataSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number()
  }),
  weather: z.array(z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string()
  })),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number()
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number().optional()
  }),
  name: z.string()
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;`,
            language: "typescript"
          }
        ]
      },
      {
        id: "project-service",
        title: "Weather Service",
        content: `Create a service to fetch and validate weather data:`,
        codeExamples: [
          {
            title: "src/weatherService.ts",
            code: `import axios from "axios";
import { WeatherDataSchema, WeatherData } from "./types";

const API_KEY = "YOUR_API_KEY_HERE";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city: string): Promise<WeatherData> {
  const response = await axios.get(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric"
    }
  });

  // Validate the response matches our schema
  return WeatherDataSchema.parse(response.data);
}`,
            language: "typescript"
          }
        ]
      }
    ]
  }
];

export const learningPaths = [
  {
    id: "express",
    title: "Express Path",
    duration: "1 Hour",
    description: "Quick introduction to TypeScript basics",
    icon: "Zap",
    steps: [
      "Read Introduction section",
      "Understand basic types",
      "Skim the Quick Reference"
    ]
  },
  {
    id: "weekend",
    title: "Weekend Warrior",
    duration: "9-10 Hours",
    description: "Build your first TypeScript project",
    icon: "Calendar",
    steps: [
      "Learn fundamentals (Friday)",
      "Continue with functions & objects (Saturday)",
      "Build weather dashboard (Sunday)"
    ]
  },
  {
    id: "professional",
    title: "Professional Path",
    duration: "4 Weeks",
    description: "Master TypeScript for production",
    icon: "Award",
    steps: [
      "Week 1: Learn all fundamentals",
      "Week 2: Build weather dashboard",
      "Week 3: Learn React & Next.js",
      "Week 4: Build personal projects"
    ]
  }
];

export const stats = [
  { label: "Lines of Content", value: "6,000+" },
  { label: "Code Examples", value: "200+" },
  { label: "Topics Covered", value: "50+" },
  { label: "Projects", value: "2" }
];
