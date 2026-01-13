/**
 * Real LLM Integration Example
 * 
 * This file shows how to integrate the structured metadata with a real LLM API
 * (Claude, GPT-4, etc.) to generate production-ready UI code.
 */

import { ButtonMetadata } from './Button.metadata';

/**
 * Example: Claude API Integration
 */
export const CLAUDE_SYSTEM_PROMPT = `
You are an expert UI code generator with deep knowledge of design systems.

You have access to structured metadata for UI components that defines:
- When and how to use each component variant
- Anti-patterns to avoid with explanations
- Accessibility requirements
- Composition rules and common patterns

CRITICAL RULES:
1. ALWAYS consult the metadata before generating code
2. NEVER violate the rules defined in aiHints.selectionCriteria
3. NEVER create patterns listed in antiPatterns
4. ALWAYS follow accessibility requirements
5. ALWAYS explain your variant selection reasoning
6. If a user requests something that violates the metadata, politely explain why and suggest the correct approach

When generating code:
1. Read the user's intent carefully
2. Check aiHints.selectionCriteria to choose the right variant
3. Check aiHints.contextualRules to ensure proper usage
4. Verify against antiPatterns to avoid common mistakes
5. Use examples as templates when applicable
6. Ensure all accessibility requirements are met
7. Provide clear comments explaining your decisions

OUTPUT FORMAT:
- Generate clean, production-ready React/TypeScript code
- Include comments explaining variant choices
- Add all required accessibility attributes
- Follow the exact prop API from metadata
- Explain your reasoning in a separate section
`;

/**
 * Example prompt for Claude API
 */
export function createClaudePrompt(userRequest: string): {
    system: string;
    messages: Array<{ role: string; content: string }>;
} {
    return {
        system: CLAUDE_SYSTEM_PROMPT,
        messages: [
            {
                role: 'user',
                content: `
Here is the Button component metadata:

\`\`\`json
${JSON.stringify(ButtonMetadata, null, 2)}
\`\`\`

USER REQUEST:
${userRequest}

Please generate the appropriate code following the metadata rules.
Include:
1. Your reasoning for variant selection
2. The generated code
3. Any warnings if the request violates best practices
        `.trim()
            }
        ]
    };
}

/**
 * Example: OpenAI GPT-4 Integration
 */
export const GPT4_SYSTEM_PROMPT = `
You are a design system expert that generates UI code using structured component metadata.

Your job is to:
1. Analyze user requests for UI components
2. Consult the provided metadata to make correct decisions
3. Generate production-ready code that follows all rules
4. Educate users when they request anti-patterns

METADATA SECTIONS YOU MUST CONSULT:
- aiHints.selectionCriteria - Rules for choosing variants
- aiHints.contextualRules - Context-specific guidelines
- antiPatterns - Common mistakes to avoid
- accessibility - Required ARIA attributes and keyboard support
- composition.commonPatterns - Standard usage patterns

DECISION PROCESS:
1. Understand the user's intent
2. Identify the context (form, modal, table, etc.)
3. Check selectionCriteria for the appropriate variant
4. Verify against antiPatterns
5. Ensure accessibility compliance
6. Generate code with explanatory comments

If the user requests something that violates the metadata:
- Politely explain the issue
- Reference the specific antiPattern
- Suggest the correct approach
- Educate them on why it matters
`;

/**
 * Example: Actual API Call (using fetch)
 */
export async function generateCodeWithClaude(
    userRequest: string,
    apiKey: string
): Promise<{
    code: string;
    reasoning: string;
    warnings: string[];
}> {
    const prompt = createClaudePrompt(userRequest);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: prompt.system,
            messages: prompt.messages
        })
    });

    const data = await response.json();
    const content = data.content[0].text;

    // Parse the response (this is simplified - real implementation would be more robust)
    return parseAIResponse(content);
}

/**
 * Parse AI response into structured format
 */
function parseAIResponse(response: string): {
    code: string;
    reasoning: string;
    warnings: string[];
} {
    // Extract code blocks
    const codeMatch = response.match(/```(?:tsx?|jsx?)?\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1] : '';

    // Extract reasoning (simplified)
    const reasoningMatch = response.match(/REASONING:([\s\S]*?)(?:CODE:|$)/i);
    const reasoning = reasoningMatch ? reasoningMatch[1].trim() : '';

    // Extract warnings
    const warnings: string[] = [];
    const warningMatches = response.matchAll(/⚠️\s*(.*?)(?:\n|$)/g);
    for (const match of warningMatches) {
        warnings.push(match[1]);
    }

    return { code, reasoning, warnings };
}

/**
 * Example Usage
 */
export const USAGE_EXAMPLES = {
    basic: `
// Basic usage with Claude API
const result = await generateCodeWithClaude(
  "Create a submit button for a registration form",
  process.env.CLAUDE_API_KEY
);

console.log("Generated Code:", result.code);
console.log("AI Reasoning:", result.reasoning);
console.log("Warnings:", result.warnings);
  `,

    withValidation: `
// With anti-pattern detection
const result = await generateCodeWithClaude(
  "Create a toolbar with 5 primary buttons",
  process.env.CLAUDE_API_KEY
);

if (result.warnings.length > 0) {
  console.log("⚠️ AI detected issues:");
  result.warnings.forEach(w => console.log("  -", w));
}
  `,

    multipleComponents: `
// Generate multiple related components
const requests = [
  "Create a login form with email, password, and submit button",
  "Create a modal for password reset confirmation",
  "Create a data table with edit and delete actions"
];

for (const request of requests) {
  const result = await generateCodeWithClaude(request, apiKey);
  console.log(\`\n=== \${request} ===\`);
  console.log(result.code);
}
  `
};

/**
 * Real-World Test Cases
 */
export const TEST_CASES = [
    {
        name: "Should select primary for form submit",
        request: "Create a button to submit a contact form",
        expectedVariant: "primary",
        expectedReasoning: "Form submission is the primary action"
    },
    {
        name: "Should detect multiple primary buttons anti-pattern",
        request: "Create 3 buttons: Save, Delete, and Export - all primary",
        shouldWarn: true,
        expectedWarning: "Multiple primary buttons in same section"
    },
    {
        name: "Should use small size for table actions",
        request: "Add edit and delete buttons to a data table row",
        expectedSize: "small",
        expectedVariant: "subtle"
    },
    {
        name: "Should avoid primary for destructive actions",
        request: "Create a delete button",
        expectedVariant: "neutral",
        expectedReasoning: "Destructive actions should not use primary variant"
    },
    {
        name: "Should create proper modal button hierarchy",
        request: "Create confirm and cancel buttons for a modal",
        expectedPattern: {
            confirm: "primary",
            cancel: "neutral" // or subtle
        }
    }
];

/**
 * Validation function to test AI responses
 */
export async function validateAIResponse(
    testCase: typeof TEST_CASES[0],
    apiKey: string
): Promise<{
    passed: boolean;
    details: string;
}> {
    const result = await generateCodeWithClaude(testCase.request, apiKey);

    let passed = true;
    const details: string[] = [];

    // Check expected variant
    if (testCase.expectedVariant) {
        const hasVariant = result.code.includes(`variant="${testCase.expectedVariant}"`);
        if (!hasVariant) {
            passed = false;
            details.push(`Expected variant="${testCase.expectedVariant}" not found`);
        }
    }

    // Check expected size
    if (testCase.expectedSize) {
        const hasSize = result.code.includes(`size="${testCase.expectedSize}"`);
        if (!hasSize) {
            passed = false;
            details.push(`Expected size="${testCase.expectedSize}" not found`);
        }
    }

    // Check warnings
    if (testCase.shouldWarn) {
        if (result.warnings.length === 0) {
            passed = false;
            details.push("Expected warning but none was generated");
        }
    }

    return {
        passed,
        details: details.join('; ') || 'All checks passed'
    };
}

/**
 * Run all test cases
 */
export async function runAllTests(apiKey: string) {
    console.log('Running AI Code Generation Tests...\n');

    for (const testCase of TEST_CASES) {
        console.log(`Testing: ${testCase.name}`);
        const result = await validateAIResponse(testCase, apiKey);

        if (result.passed) {
            console.log('✅ PASSED');
        } else {
            console.log('❌ FAILED:', result.details);
        }
        console.log();
    }
}

/**
 * Interactive CLI Example
 */
export async function interactiveCLI() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('🤖 AI Code Generator with Structured Metadata');
    console.log('Type your UI request, or "exit" to quit\n');

    const apiKey = process.env.CLAUDE_API_KEY || '';

    rl.on('line', async (input: string) => {
        if (input.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        console.log('\n🧠 Analyzing request...\n');

        try {
            const result = await generateCodeWithClaude(input, apiKey);

            console.log('📋 REASONING:');
            console.log(result.reasoning);
            console.log('\n💻 GENERATED CODE:');
            console.log(result.code);

            if (result.warnings.length > 0) {
                console.log('\n⚠️ WARNINGS:');
                result.warnings.forEach(w => console.log(`  - ${w}`));
            }

            console.log('\n✅ Done! Enter another request or "exit":\n');
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

/**
 * Export for use in other modules
 */
export default {
    CLAUDE_SYSTEM_PROMPT,
    GPT4_SYSTEM_PROMPT,
    createClaudePrompt,
    generateCodeWithClaude,
    validateAIResponse,
    runAllTests,
    interactiveCLI,
    TEST_CASES,
    USAGE_EXAMPLES
};
