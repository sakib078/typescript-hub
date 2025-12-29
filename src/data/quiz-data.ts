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
  ]
};

export function getQuizForSection(sectionId: string, subsectionId: string): QuizQuestion[] | null {
  const key = `${sectionId}-${subsectionId}`;
  return quizzes[key] || null;
}
