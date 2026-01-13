/**
 * Button Component Metadata
 * Design System: Intelligent Design System
 * 
 * This metadata file provides structured information for AI agents
 * to understand when and how to use the Button component correctly.
 * 
 * Based on the methodology from:
 * "Design system documentation as structured metadata" by Cristian Morales Achiardi
 */

export const ButtonMetadata = {
    // ============================================
    // DISCOVERY METADATA
    // ============================================
    component: {
        name: "Button",
        category: "Actions",
        description: "Interactive element for triggering actions and navigation",
        figmaNodeId: "4185-3778",
        figmaUrl: "https://www.figma.com/design/s4Bv0Dit8BWvxawcNI07Cs/Intelligent-Design-System?node-id=4185-3778",
        path: "./components/Button.tsx",
        version: "1.0.0",
        lastUpdated: "2026-01-12"
    },

    // ============================================
    // AI HINTS - CRITICAL FOR AI DECISION MAKING
    // ============================================
    aiHints: {
        selectionCriteria: [
            "Use 'primary' variant ONLY for the single most important action in a section or view",
            "Use 'neutral' variant for secondary actions that support the primary action",
            "Use 'subtle' variant for tertiary actions or actions that should not compete for attention",
            "Choose 'medium' size as default for most interfaces",
            "Use 'small' size in compact UIs, data tables, or when space is constrained"
        ],
        contextualRules: [
            "Maximum 1 primary button per logical section or action group",
            "Primary buttons should represent the user's primary goal in the current context",
            "Avoid placing multiple primary buttons in close proximity",
            "In forms, the submit action should typically use the primary variant",
            "In modal dialogs, the confirming action uses primary, cancel uses neutral or subtle"
        ],
        commonMistakes: [
            "Using multiple primary buttons in the same view creates visual hierarchy confusion",
            "Using primary variant for destructive actions (use a destructive variant instead)",
            "Mixing button sizes inconsistently within the same interface section"
        ]
    },

    // ============================================
    // VARIANTS - PURPOSE AND USAGE
    // ============================================
    variants: {
        type: {
            primary: {
                purpose: "Highest priority action - the main call-to-action",
                visualStyle: "Solid brand color background with border",
                whenToUse: [
                    "Submit forms",
                    "Complete a flow or process",
                    "Primary navigation action",
                    "Confirm important decisions"
                ],
                examples: [
                    "Save changes",
                    "Create account",
                    "Submit order",
                    "Continue to next step"
                ],
                tokens: {
                    background: "Background/Brand/Default",
                    border: "Border/Brand/Default",
                    text: "Text/OnBrand/Default"
                }
            },
            neutral: {
                purpose: "Secondary actions that support the primary action",
                visualStyle: "Neutral gray background with subtle border",
                whenToUse: [
                    "Alternative actions to the primary",
                    "Cancel or go back actions",
                    "Secondary navigation",
                    "Actions that don't require immediate attention"
                ],
                examples: [
                    "Cancel",
                    "Go back",
                    "Skip",
                    "Learn more"
                ],
                tokens: {
                    background: "Background/Default/Default",
                    border: "Border/Default/Default",
                    text: "Text/Default/Default"
                }
            },
            subtle: {
                purpose: "Tertiary actions with minimal visual weight",
                visualStyle: "Transparent or very subtle background, ghost-like appearance",
                whenToUse: [
                    "Tertiary actions",
                    "Actions in dense interfaces",
                    "Repeated actions in lists or tables",
                    "Actions that should blend into the interface"
                ],
                examples: [
                    "View details",
                    "Edit",
                    "Dismiss",
                    "Show more"
                ],
                tokens: {
                    background: "Transparent or Background/Subtle",
                    border: "None or Border/Subtle",
                    text: "Text/Default/Default"
                }
            }
        },
        size: {
            medium: {
                purpose: "Standard size for most interfaces",
                dimensions: {
                    height: "40px",
                    paddingHorizontal: "12px",
                    paddingVertical: "12px",
                    gap: "8px"
                },
                typography: {
                    token: "Body Strong",
                    fontFamily: "Inter",
                    fontWeight: "Semi Bold (600)",
                    fontSize: "16px",
                    lineHeight: "22.4px"
                },
                whenToUse: "Default choice for most UI contexts"
            },
            small: {
                purpose: "Compact size for dense interfaces",
                dimensions: {
                    height: "32px",
                    paddingHorizontal: "10px",
                    paddingVertical: "10px",
                    gap: "6px"
                },
                typography: {
                    token: "Body Small Strong",
                    fontFamily: "Inter",
                    fontWeight: "Semi Bold (600)",
                    fontSize: "14px",
                    lineHeight: "19.6px"
                },
                whenToUse: [
                    "Data tables",
                    "Compact forms",
                    "Toolbars",
                    "Space-constrained interfaces"
                ]
            }
        }
    },

    // ============================================
    // STATES - INTERACTIVE BEHAVIOR
    // ============================================
    states: {
        default: {
            description: "Resting state, ready for interaction",
            visualChanges: "Base colors and styling"
        },
        hover: {
            description: "Mouse cursor is over the button",
            visualChanges: "Subtle darkening of background (approximately 10% darker)",
            trigger: "Mouse enter"
        },
        active: {
            description: "Button is being pressed",
            visualChanges: "Further darkening and possible scale reduction",
            trigger: "Mouse down or touch"
        },
        focus: {
            description: "Button has keyboard focus",
            visualChanges: "Focus ring or outline visible",
            trigger: "Tab navigation or programmatic focus",
            a11yNote: "Must have visible focus indicator for accessibility"
        },
        disabled: {
            description: "Button is not interactive",
            visualChanges: "Reduced opacity (approximately 40%), cursor not-allowed",
            trigger: "disabled prop set to true",
            behavior: "Does not respond to clicks or keyboard interaction"
        }
    },

    // ============================================
    // PROPS - COMPONENT API
    // ============================================
    props: {
        variant: {
            type: "'primary' | 'neutral' | 'subtle'",
            default: "'primary'",
            required: false,
            description: "Visual style variant determining the button's hierarchy"
        },
        size: {
            type: "'medium' | 'small'",
            default: "'medium'",
            required: false,
            description: "Size of the button affecting height, padding, and typography"
        },
        label: {
            type: "string",
            required: true,
            description: "Text content of the button",
            guidelines: [
                "Use action-oriented verbs (Save, Create, Delete)",
                "Keep concise (1-3 words ideally)",
                "Use sentence case",
                "Be specific about the action"
            ]
        },
        iconStart: {
            type: "IconComponent | null",
            default: "null",
            required: false,
            description: "Optional icon displayed before the label",
            guidelines: [
                "Use to reinforce the action meaning",
                "Ensure icon is recognizable at button size",
                "Don't use icon-only buttons without proper aria-label"
            ]
        },
        iconEnd: {
            type: "IconComponent | null",
            default: "null",
            required: false,
            description: "Optional icon displayed after the label",
            guidelines: [
                "Commonly used for arrows indicating navigation",
                "Use sparingly to avoid visual clutter"
            ]
        },
        disabled: {
            type: "boolean",
            default: "false",
            required: false,
            description: "Whether the button is disabled and non-interactive"
        },
        onClick: {
            type: "(event: MouseEvent) => void",
            required: true,
            description: "Handler function called when button is clicked"
        },
        type: {
            type: "'button' | 'submit' | 'reset'",
            default: "'button'",
            required: false,
            description: "HTML button type attribute"
        }
    },

    // ============================================
    // COMPOSITION - WHAT CAN GO INSIDE/ALONGSIDE
    // ============================================
    composition: {
        children: {
            allowed: false,
            reason: "Button uses a controlled label prop for consistency"
        },
        canContain: [
            "Icon (via iconStart prop)",
            "Text label (via label prop)",
            "Icon (via iconEnd prop)"
        ],
        cannotContain: [
            "Other buttons",
            "Form inputs",
            "Complex nested components"
        ],
        commonPatterns: [
            {
                pattern: "Button group",
                description: "Multiple buttons arranged horizontally",
                example: "Primary + Neutral buttons side by side",
                spacing: "8px gap between buttons",
                maxPrimaryButtons: 1
            },
            {
                pattern: "Form actions",
                description: "Buttons at the bottom of a form",
                example: "Submit (primary) + Cancel (neutral)",
                alignment: "Right-aligned or full-width on mobile"
            },
            {
                pattern: "Modal actions",
                description: "Buttons in modal footer",
                example: "Confirm (primary) + Cancel (neutral/subtle)",
                order: "Primary on the right (in LTR layouts)"
            }
        ]
    },

    // ============================================
    // USAGE - PATTERNS AND ANTI-PATTERNS
    // ============================================
    usage: {
        commonPatterns: [
            {
                name: "Form submission",
                description: "Primary button to submit form data",
                code: `<Button variant="primary" size="medium" label="Create Account" type="submit" onClick={handleSubmit} />`
            },
            {
                name: "Modal confirmation",
                description: "Primary action with neutral cancel",
                code: `
<ButtonGroup>
  <Button variant="neutral" label="Cancel" onClick={handleCancel} />
  <Button variant="primary" label="Confirm" onClick={handleConfirm} />
</ButtonGroup>`
            },
            {
                name: "Button with icon",
                description: "Icon reinforcing the action",
                code: `<Button variant="primary" label="Download" iconStart={<DownloadIcon />} onClick={handleDownload} />`
            }
        ],
        antiPatterns: [
            {
                scenario: "Multiple primary buttons in the same section",
                problem: "Creates visual hierarchy confusion - user doesn't know which action is most important",
                example: `
// ❌ WRONG - Multiple primary buttons competing for attention
<ButtonGroup>
  <Button variant="primary" label="Save Draft" />
  <Button variant="primary" label="Publish" />
  <Button variant="primary" label="Schedule" />
</ButtonGroup>`,
                solution: "Use only one primary button, others should be neutral or subtle",
                correctExample: `
// ✅ CORRECT - Clear hierarchy with one primary action
<ButtonGroup>
  <Button variant="subtle" label="Save Draft" />
  <Button variant="neutral" label="Schedule" />
  <Button variant="primary" label="Publish" />
</ButtonGroup>`
            },
            {
                scenario: "Using primary variant for destructive actions",
                problem: "Brand color implies positive action, but deletion is destructive",
                example: `
// ❌ WRONG - Destructive action with primary variant
<Button variant="primary" label="Delete Account" onClick={handleDelete} />`,
                solution: "Use a destructive variant (if available) or neutral with clear labeling",
                correctExample: `
// ✅ CORRECT - Neutral variant with clear destructive label
<Button variant="neutral" label="Delete Account" onClick={handleDelete} />`
            },
            {
                scenario: "Inconsistent button sizes in the same interface",
                problem: "Creates visual inconsistency and appears unprofessional",
                example: `
// ❌ WRONG - Mixed sizes without reason
<ButtonGroup>
  <Button size="small" label="Cancel" />
  <Button size="medium" label="Submit" />
</ButtonGroup>`,
                solution: "Use consistent sizes within the same context",
                correctExample: `
// ✅ CORRECT - Consistent sizing
<ButtonGroup>
  <Button size="medium" variant="neutral" label="Cancel" />
  <Button size="medium" variant="primary" label="Submit" />
</ButtonGroup>`
            },
            {
                scenario: "Icon-only button without accessible label",
                problem: "Screen readers cannot announce the button's purpose",
                example: `
// ❌ WRONG - No accessible label
<Button iconStart={<CloseIcon />} label="" onClick={handleClose} />`,
                solution: "Always provide aria-label for icon-only buttons",
                correctExample: `
// ✅ CORRECT - Accessible icon button
<Button 
  iconStart={<CloseIcon />} 
  label="Close" 
  aria-label="Close dialog"
  onClick={handleClose} 
/>`
            }
        ]
    },

    // ============================================
    // ACCESSIBILITY
    // ============================================
    accessibility: {
        keyboardSupport: {
            enter: "Activates the button",
            space: "Activates the button",
            tab: "Moves focus to/from the button"
        },
        ariaAttributes: {
            required: [
                "Visible text label or aria-label",
                "role='button' (implicit for <button> element)"
            ],
            optional: [
                "aria-disabled when disabled",
                "aria-pressed for toggle buttons",
                "aria-expanded for buttons that control expandable regions"
            ]
        },
        focusManagement: {
            mustHave: "Visible focus indicator",
            focusOrder: "Should be in logical tab order",
            disabledState: "Should not be focusable when disabled"
        },
        screenReader: {
            announcement: "Button label + state (if disabled or pressed)",
            guidelines: [
                "Label must clearly describe the action",
                "Avoid generic labels like 'Click here' or 'Submit'",
                "For icon-only buttons, provide aria-label"
            ]
        },
        colorContrast: {
            minimum: "4.5:1 for text against background",
            note: "All variants must meet WCAG AA standards"
        }
    },

    // ============================================
    // DESIGN TOKENS
    // ============================================
    designTokens: {
        spacing: {
            paddingHorizontalMedium: "12px",
            paddingVerticalMedium: "12px",
            paddingHorizontalSmall: "10px",
            paddingVerticalSmall: "10px",
            gap: "8px",
            gapSmall: "6px"
        },
        borderRadius: {
            value: "8px",
            token: "radius-md or Radius/200"
        },
        border: {
            width: "1px",
            style: "solid",
            position: "inside"
        },
        typography: {
            medium: {
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22.4px",
                token: "Body Strong"
            },
            small: {
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "19.6px",
                token: "Body Small Strong"
            }
        },
        colors: {
            primary: {
                background: "Background/Brand/Default",
                border: "Border/Brand/Default",
                text: "Text/OnBrand/Default"
            },
            neutral: {
                background: "Background/Default/Default",
                border: "Border/Default/Default",
                text: "Text/Default/Default"
            },
            subtle: {
                background: "Transparent or Background/Subtle",
                border: "None or Border/Subtle",
                text: "Text/Default/Default"
            }
        }
    },

    // ============================================
    // BEHAVIOR
    // ============================================
    behavior: {
        interactions: {
            click: "Triggers onClick handler and associated action",
            hover: "Shows hover state with visual feedback",
            focus: "Shows focus ring for keyboard navigation",
            disabled: "Prevents all interactions and shows disabled state"
        },
        loading: {
            recommendation: "Show loading spinner inside button and disable during async operations",
            labelChange: "Consider changing label to 'Saving...' or 'Loading...'",
            preventMultipleClicks: "Disable button immediately on click for async operations"
        },
        animations: {
            hover: "Smooth transition (150-200ms) to hover state",
            active: "Quick transition (100ms) to pressed state",
            disabled: "No animations when disabled"
        }
    },

    // ============================================
    // EXAMPLES - REAL-WORLD USAGE
    // ============================================
    examples: [
        {
            name: "Simple primary button",
            description: "Most basic usage for a primary action",
            code: `<Button 
  variant="primary" 
  size="medium" 
  label="Save Changes" 
  onClick={handleSave} 
/>`
        },
        {
            name: "Button with leading icon",
            description: "Icon reinforces the download action",
            code: `<Button 
  variant="primary" 
  size="medium" 
  label="Download Report" 
  iconStart={<DownloadIcon />}
  onClick={handleDownload} 
/>`
        },
        {
            name: "Button group with hierarchy",
            description: "Common pattern in forms and modals",
            code: `<div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
  <Button 
    variant="subtle" 
    size="medium" 
    label="Cancel" 
    onClick={handleCancel} 
  />
  <Button 
    variant="neutral" 
    size="medium" 
    label="Save Draft" 
    onClick={handleSaveDraft} 
  />
  <Button 
    variant="primary" 
    size="medium" 
    label="Publish" 
    onClick={handlePublish} 
  />
</div>`
        },
        {
            name: "Small button in table",
            description: "Compact size for dense interfaces",
            code: `<Button 
  variant="subtle" 
  size="small" 
  label="Edit" 
  iconStart={<EditIcon />}
  onClick={() => handleEdit(row.id)} 
/>`
        },
        {
            name: "Disabled button",
            description: "Button in non-interactive state",
            code: `<Button 
  variant="primary" 
  size="medium" 
  label="Submit" 
  disabled={!isFormValid}
  onClick={handleSubmit} 
/>`
        }
    ]
} as const;

export type ButtonMetadataType = typeof ButtonMetadata;
