/**
 * AI Code Generator using Structured Metadata
 * 
 * This module demonstrates how an LLM can generate code using ONLY
 * the structured metadata from Button.metadata.ts
 */

import { ButtonMetadata } from './Button.metadata';

/**
 * System Prompt for AI Code Generation
 * This is what you would send to an LLM like Claude or GPT
 */
export const AI_SYSTEM_PROMPT = `
You are an expert UI code generator that STRICTLY follows design system rules.

You have access to component metadata that defines:
- When and how to use each component variant
- Anti-patterns to avoid
- Accessibility requirements
- Composition rules

YOUR RULES:
1. ALWAYS consult the metadata before generating code
2. NEVER violate the rules defined in aiHints
3. NEVER create patterns listed in antiPatterns
4. ALWAYS follow the examples provided
5. ALWAYS ensure accessibility requirements are met
6. If unsure, choose the most conservative option

When generating code:
- Read the user's intent
- Check aiHints.selectionCriteria to choose the right variant
- Check aiHints.contextualRules to ensure proper usage
- Check antiPatterns to avoid common mistakes
- Use examples as templates
- Validate against accessibility requirements

OUTPUT FORMAT:
- Generate clean, production-ready code
- Include comments explaining variant choices
- Add accessibility attributes
- Follow the exact prop API from metadata
`;

/**
 * Example: AI Task with Metadata Context
 */
export interface AIGenerationTask {
    userIntent: string;
    metadata: typeof ButtonMetadata;
    constraints?: string[];
}

/**
 * Simulated AI Response Generator
 * In production, this would call an LLM API
 */
export class MetadataAwareCodeGenerator {
    private metadata: typeof ButtonMetadata;

    constructor(metadata: typeof ButtonMetadata) {
        this.metadata = metadata;
    }

    /**
     * Analyze user intent and select appropriate variant
     */
    private selectVariant(intent: string): 'primary' | 'neutral' | 'subtle' {
        const intentLower = intent.toLowerCase();

        // Check selection criteria from metadata
        const { selectionCriteria } = this.metadata.aiHints;

        // Primary indicators
        if (
            intentLower.includes('submit') ||
            intentLower.includes('save') ||
            intentLower.includes('create') ||
            intentLower.includes('confirm') ||
            intentLower.includes('main action') ||
            intentLower.includes('primary')
        ) {
            return 'primary';
        }

        // Subtle indicators
        if (
            intentLower.includes('tertiary') ||
            intentLower.includes('minimal') ||
            intentLower.includes('subtle') ||
            intentLower.includes('dismiss') ||
            intentLower.includes('close')
        ) {
            return 'subtle';
        }

        // Default to neutral for secondary actions
        return 'neutral';
    }

    /**
     * Validate generated code against anti-patterns
     */
    private validateAgainstAntiPatterns(code: string): {
        valid: boolean;
        violations: string[];
    } {
        const violations: string[] = [];

        // Check for multiple primary buttons
        const primaryMatches = code.match(/variant="primary"/g);
        if (primaryMatches && primaryMatches.length > 1) {
            const antiPattern = this.metadata.usage.antiPatterns.find(
                ap => ap.scenario.includes('Multiple primary buttons')
            );
            if (antiPattern) {
                violations.push(
                    `VIOLATION: ${antiPattern.scenario}\n` +
                    `Problem: ${antiPattern.problem}\n` +
                    `Solution: ${antiPattern.solution}`
                );
            }
        }

        // Check for inconsistent sizes
        const sizeMatches = code.match(/size="(small|medium)"/g);
        if (sizeMatches && new Set(sizeMatches).size > 1) {
            const antiPattern = this.metadata.usage.antiPatterns.find(
                ap => ap.scenario.includes('Inconsistent button sizes')
            );
            if (antiPattern) {
                violations.push(
                    `WARNING: ${antiPattern.scenario}\n` +
                    `Problem: ${antiPattern.problem}`
                );
            }
        }

        return {
            valid: violations.length === 0,
            violations
        };
    }

    /**
     * Generate code based on user intent
     */
    generate(task: AIGenerationTask): {
        code: string;
        explanation: string;
        validation: ReturnType<typeof this.validateAgainstAntiPatterns>;
    } {
        // This is a simplified simulation
        // In production, this would call an LLM API with the metadata

        const variant = this.selectVariant(task.userIntent);
        const variantMetadata = this.metadata.variants.type[variant];

        // Generate explanation based on metadata
        const explanation = `
Selected variant: "${variant}"
Reason: ${variantMetadata.purpose}
When to use: ${variantMetadata.whenToUse.join(', ')}
    `.trim();

        // Generate code (simplified - real LLM would be more sophisticated)
        const code = `// Generated based on intent: "${task.userIntent}"
// Variant selected: ${variant} - ${variantMetadata.purpose}

<Button 
  variant="${variant}" 
  size="medium" 
  label="${this.generateLabel(task.userIntent)}" 
  onClick={handleClick} 
/>`;

        // Validate
        const validation = this.validateAgainstAntiPatterns(code);

        return { code, explanation, validation };
    }

    private generateLabel(intent: string): string {
        // Extract action verb from intent
        const verbs = ['submit', 'save', 'create', 'cancel', 'delete', 'confirm'];
        for (const verb of verbs) {
            if (intent.toLowerCase().includes(verb)) {
                return verb.charAt(0).toUpperCase() + verb.slice(1);
            }
        }
        return 'Action';
    }
}

/**
 * Example Usage Scenarios
 */
export const exampleTasks: AIGenerationTask[] = [
    {
        userIntent: "Create a button to submit a form",
        metadata: ButtonMetadata
    },
    {
        userIntent: "Add a cancel button to go back",
        metadata: ButtonMetadata
    },
    {
        userIntent: "Create a button group for a modal with confirm and cancel",
        metadata: ButtonMetadata
    },
    {
        userIntent: "Add a subtle dismiss button",
        metadata: ButtonMetadata
    }
];

/**
 * Run example generations
 */
export function runExamples() {
    const generator = new MetadataAwareCodeGenerator(ButtonMetadata);

    console.log('='.repeat(80));
    console.log('AI CODE GENERATION USING STRUCTURED METADATA');
    console.log('='.repeat(80));
    console.log();

    exampleTasks.forEach((task, index) => {
        console.log(`\n${'─'.repeat(80)}`);
        console.log(`Example ${index + 1}: ${task.userIntent}`);
        console.log('─'.repeat(80));

        const result = generator.generate(task);

        console.log('\n📋 EXPLANATION:');
        console.log(result.explanation);

        console.log('\n💻 GENERATED CODE:');
        console.log(result.code);

        console.log('\n✅ VALIDATION:');
        if (result.validation.valid) {
            console.log('✓ Code follows all design system rules');
        } else {
            console.log('✗ Violations found:');
            result.validation.violations.forEach(v => console.log(`  - ${v}`));
        }
    });

    console.log('\n' + '='.repeat(80));
}

// Export for use in other modules
export default MetadataAwareCodeGenerator;
