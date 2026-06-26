import { QuizQuestion } from '@/components/Quiz';

export const quizzes: Record<string, QuizQuestion[]> = {
  'types-basic-types': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the correct way to declare a string variable in TypeScript?',
      options: [
        'let name = string("John")',
        'let name: string = "John"',
        'string name = "John"',
        'var name: String = "John"'
      ],
      correctAnswer: 1,
      explanation: 'In TypeScript, you use `: type` after the variable name to specify its type. The correct syntax is `let name: string = "John"`.'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'Which of these is NOT a valid TypeScript primitive type?',
      options: ['string', 'number', 'boolean', 'integer'],
      correctAnswer: 3,
      explanation: 'TypeScript uses `number` for all numeric values. There is no `integer` type - use `number` for both integers and floating-point numbers.'
    },
    {
      id: '3',
      type: 'code-completion',
      question: 'Complete the type annotation: let isActive: _____ = true',
      correctAnswer: 'boolean',
      explanation: 'The value `true` is a boolean, so the correct type annotation is `boolean`.',
      codeTemplate: 'let isActive: _____ = true;'
    }
  ],
  'types-arrays': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'How do you declare an array of numbers in TypeScript?',
      options: [
        'let nums: number = [1, 2, 3]',
        'let nums: number[] = [1, 2, 3]',
        'let nums: [number] = [1, 2, 3]',
        'let nums: numbers = [1, 2, 3]'
      ],
      correctAnswer: 1,
      explanation: 'Use `type[]` syntax to declare an array. `number[]` means an array of numbers.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Complete the type: let names: _____[] = ["Alice", "Bob"]',
      correctAnswer: 'string',
      explanation: 'Since the array contains strings, the type should be `string[]`.',
      codeTemplate: 'let names: _____[] = ["Alice", "Bob"];'
    }
  ],
  'types-union-types': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What symbol is used to create union types?',
      options: ['&', '|', '+', '||'],
      correctAnswer: 1,
      explanation: 'The pipe symbol `|` is used to create union types, e.g., `string | number`.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Complete the union type: let id: string __ number',
      correctAnswer: '|',
      explanation: 'Use the pipe `|` symbol to create a union type that accepts either string or number.',
      codeTemplate: 'let id: string __ number = "abc123";'
    }
  ],
  'functions-basic-functions': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Where do you specify the return type of a function?',
      options: [
        'Before the function name',
        'Inside the parentheses',
        'After the parentheses, before the curly brace',
        'At the end of the function'
      ],
      correctAnswer: 2,
      explanation: 'The return type comes after the parameters: `function add(a: number, b: number): number { ... }`'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'What return type should this function have? function sayHello(): _____ { console.log("Hello"); }',
      correctAnswer: 'void',
      explanation: 'Functions that don\'t return a value have return type `void`.',
      codeTemplate: 'function sayHello(): _____ {\n  console.log("Hello");\n}'
    }
  ],
  'objects-interface': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What keyword is used to extend an interface?',
      options: ['implements', 'extends', 'inherits', 'includes'],
      correctAnswer: 1,
      explanation: 'Use `extends` to create an interface that inherits from another: `interface Admin extends User { ... }`'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'Which is TRUE about interfaces vs type aliases?',
      options: [
        'Interfaces can only define object shapes',
        'Type aliases cannot be extended',
        'Interfaces can be merged when declared multiple times',
        'Type aliases are faster'
      ],
      correctAnswer: 2,
      explanation: 'Interfaces with the same name are automatically merged (declaration merging). Type aliases cannot be merged this way.'
    }
  ],
  'generics-basic-generics': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What does the T in generics typically represent?',
      options: [
        'The word "type"',
        'A template',
        'A type parameter (placeholder for any type)',
        'A TypeScript keyword'
      ],
      correctAnswer: 2,
      explanation: 'T is a type parameter - a placeholder that will be replaced with an actual type when the function/class is used.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Complete the generic function: function identity<__>(value: __): __ { return value; }',
      correctAnswer: 'T',
      explanation: 'Generic type parameters (like T) are used consistently throughout the function signature.',
      codeTemplate: 'function identity<__>(value: __): __ {\n  return value;\n}'
    }
  ],
  'types-any-unknown': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Which type should you prefer for a value of uncertain type?',
      options: ['any', 'unknown', 'never', 'object'],
      correctAnswer: 1,
      explanation: '`unknown` is the safe choice — it accepts any value but forces you to narrow before using it. `any` disables type checking entirely.'
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: 'What is special about the `never` type?',
      options: [
        'It accepts any value',
        'It has no values at all',
        'It is the same as void',
        'It only accepts null'
      ],
      correctAnswer: 1,
      explanation: '`never` is the empty type — it represents code that can never produce a value, like a function that always throws. It powers exhaustiveness checks.'
    }
  ],
  'types-tuples-enums': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Why are string enums often preferred over numeric enums?',
      options: [
        'They run faster',
        'Their runtime values are self-describing',
        'They use less memory',
        'They cannot be misused'
      ],
      correctAnswer: 1,
      explanation: 'String enums produce readable runtime values (e.g. "ACTIVE"), which makes logs and debugging far clearer than bare numbers.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Complete to derive a union from a const array: type S = typeof STATUS[___]',
      correctAnswer: 'number',
      explanation: 'Indexing a readonly array type with `[number]` yields the union of its element types — a lightweight alternative to enums.',
      codeTemplate: 'const STATUS = ["a", "b"] as const;\ntype S = typeof STATUS[___];'
    }
  ],
  'generics-generic-constraints': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What does `<T extends { length: number }>` mean?',
      options: [
        'T must be a number',
        'T must have a length property',
        'T must be an array',
        'T extends a class named length'
      ],
      correctAnswer: 1,
      explanation: 'The constraint requires T to be any type that has a numeric `length` property — strings and arrays qualify, plain numbers do not.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Constrain K to the keys of T: function get<T, K ______ keyof T>(o: T, k: K)',
      correctAnswer: 'extends',
      explanation: 'Use `extends keyof T` to constrain K to be one of T’s property names, enabling type-safe property access.',
      codeTemplate: 'function get<T, K ______ keyof T>(o: T, k: K) {\n  return o[k];\n}'
    }
  ],
  'advanced-keyof-typeof': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What does `keyof` produce for `type User = { id: number; name: string }`?',
      options: [
        'number | string',
        '"id" | "name"',
        'User[]',
        '{ id: string; name: string }'
      ],
      correctAnswer: 1,
      explanation: '`keyof User` is the union of the object’s property names: "id" | "name".'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Get a type from a value: type T = ______ myConfig',
      correctAnswer: 'typeof',
      explanation: 'In a type position, `typeof value` gives the type TypeScript inferred for that value — handy for deriving a type from existing data.',
      codeTemplate: 'const myConfig = { debug: true };\ntype T = ______ myConfig;'
    }
  ],
  'utility-types-partial-required': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What does `Partial<T>` do?',
      options: [
        'Removes all properties',
        'Makes all properties optional',
        'Makes all properties readonly',
        'Picks half the properties'
      ],
      correctAnswer: 1,
      explanation: '`Partial<T>` makes every property of T optional — ideal for update/patch payloads where only some fields are present.'
    }
  ],
  'modern-typescript-satisfies': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'Why use `satisfies` instead of a type annotation?',
      options: [
        'It runs validation at runtime',
        'It checks the value but keeps its precise inferred type',
        'It is faster to compile',
        'It converts the value to the target type'
      ],
      correctAnswer: 1,
      explanation: '`satisfies` validates the value against a type while preserving the narrow, literal inferred type — so you keep exact keys and values.'
    }
  ],
  'narrowing-type-predicates': [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What return type makes a function a custom type guard?',
      options: [
        'boolean',
        'value is T',
        'asserts value',
        'T | undefined'
      ],
      correctAnswer: 1,
      explanation: 'A return type of `value is T` (a type predicate) tells TypeScript to narrow the argument to T wherever the guard returns true.'
    },
    {
      id: '2',
      type: 'code-completion',
      question: 'Complete the assertion function: function assert(x: unknown): ______ x is string {}',
      correctAnswer: 'asserts',
      explanation: 'An assertion function uses `asserts x is string` and throws if the condition fails; afterward TypeScript treats x as string.',
      codeTemplate: 'function assert(x: unknown): ______ x is string {\n  if (typeof x !== "string") throw new Error();\n}'
    }
  ]
};

export function getQuizForSection(sectionId: string, subsectionId: string): QuizQuestion[] | null {
  const key = `${sectionId}-${subsectionId}`;
  return quizzes[key] || null;
}
