/**
 * Real-World AI Code Generation Examples
 * 
 * This file demonstrates actual code generation scenarios where an LLM
 * uses ONLY the Button.metadata.ts to generate correct, accessible UI code.
 */

import { ButtonMetadata } from './Button.metadata';

/**
 * SCENARIO 1: User Registration Form
 * User Request: "Create a registration form with submit and cancel buttons"
 */
export const SCENARIO_1_USER_REQUEST = `
Create a registration form with a submit button and a cancel button.
The submit button should be the primary action.
`;

export const SCENARIO_1_AI_REASONING = `
Analyzing request using Button.metadata.ts:

1. Checking aiHints.selectionCriteria:
   - "Use 'primary' variant ONLY for the single most important action"
   - Submit is the main action → variant="primary"
   - Cancel is secondary → variant="neutral"

2. Checking aiHints.contextualRules:
   - "Maximum 1 primary button per logical section" ✓
   - "In forms, the submit action should typically use the primary variant" ✓

3. Checking composition.commonPatterns:
   - Pattern: "Form actions"
   - Example: "Submit (primary) + Cancel (neutral)"
   - Alignment: "Right-aligned or full-width on mobile"

4. Checking accessibility requirements:
   - type="submit" for form submission
   - Clear, action-oriented labels
   - Proper keyboard support (implicit in button element)

5. Checking antiPatterns:
   - ✓ Not using multiple primary buttons
   - ✓ Consistent sizing (both medium)
   - ✓ Clear hierarchy
`;

export const SCENARIO_1_GENERATED_CODE = `
import React from 'react';
import { Button } from './components/Button';

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export function RegistrationForm({ onSubmit, onCancel }: RegistrationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      
      {/* Button group following metadata pattern: "Form actions" */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', // From metadata: composition.commonPatterns spacing
        justifyContent: 'flex-end',
        marginTop: '24px'
      }}>
        {/* Secondary action - neutral variant per metadata guidance */}
        <Button 
          variant="neutral" 
          size="medium" 
          label="Cancel" 
          onClick={onCancel}
          type="button" // Prevent form submission
        />
        
        {/* Primary action - only one per section per aiHints.contextualRules */}
        <Button 
          variant="primary" 
          size="medium" 
          label="Create Account" 
          type="submit" // Form submission per accessibility.ariaAttributes
        />
      </div>
    </form>
  );
}
`;

/**
 * SCENARIO 2: Confirmation Modal
 * User Request: "Create a delete confirmation modal"
 */
export const SCENARIO_2_USER_REQUEST = `
Create a modal that asks the user to confirm deletion of an item.
It should have a confirm and cancel button.
`;

export const SCENARIO_2_AI_REASONING = `
Analyzing request using Button.metadata.ts:

1. Checking aiHints.selectionCriteria:
   - Confirm is the primary action in this context → variant="primary"
   - Cancel is secondary → variant="neutral"

2. Checking usage.antiPatterns:
   - Found: "Using primary variant for destructive actions"
   - Problem: "Brand color implies positive action, but deletion is destructive"
   - Solution: "Use a destructive variant (if available) or neutral with clear labeling"
   - Decision: Use neutral for delete, but make label very clear

3. Checking composition.commonPatterns:
   - Pattern: "Modal actions"
   - Example: "Confirm (primary) + Cancel (neutral/subtle)"
   - Order: "Primary on the right (in LTR layouts)"

4. Adjusting based on anti-pattern:
   - Since this is a DESTRUCTIVE action, I'll use neutral variant
   - Make the label very explicit: "Delete Item"
   - Use subtle for cancel to reduce visual weight
`;

export const SCENARIO_2_GENERATED_CODE = `
import React from 'react';
import { Button } from './components/Button';

interface DeleteConfirmationModalProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function DeleteConfirmationModal({ 
  itemName, 
  onConfirm, 
  onCancel, 
  isOpen 
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <h2 id="modal-title">Delete {itemName}?</h2>
      <p>This action cannot be undone.</p>
      
      {/* 
        Following metadata pattern: "Modal actions"
        Note: Using neutral for destructive action per antiPatterns guidance
        to avoid implying positive action with primary brand color
      */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '24px'
      }}>
        {/* Subtle variant for cancel - minimal visual weight */}
        <Button 
          variant="subtle" 
          size="medium" 
          label="Cancel" 
          onClick={onCancel}
        />
        
        {/* 
          Neutral variant for destructive action
          Following antiPattern guidance: avoid primary for destructive actions
          Clear labeling makes the action explicit
        */}
        <Button 
          variant="neutral" 
          size="medium" 
          label="Delete Item" 
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}
`;

/**
 * SCENARIO 3: Data Table Actions
 * User Request: "Add edit and delete buttons to each row in a data table"
 */
export const SCENARIO_3_USER_REQUEST = `
I have a data table and need to add edit and delete buttons to each row.
The table is compact, so buttons should be small.
`;

export const SCENARIO_3_AI_REASONING = `
Analyzing request using Button.metadata.ts:

1. Checking aiHints.selectionCriteria:
   - "Use 'small' size in compact UIs, data tables, or when space is constrained"
   - This is a data table → size="small" ✓

2. Checking variants.size.small.whenToUse:
   - "Data tables" ✓
   - "Compact forms" ✓
   - "Space-constrained interfaces" ✓

3. Checking aiHints.selectionCriteria for variant:
   - "Use 'subtle' variant for tertiary actions or actions that should not compete for attention"
   - These are repeated actions in a table → variant="subtle"

4. Checking variants.type.subtle.whenToUse:
   - "Repeated actions in lists or tables" ✓
   - "Actions that should blend into the interface" ✓

5. Checking examples:
   - Found: "Small button in table"
   - Code shows: variant="subtle" size="small" with icon

6. Checking props.iconStart guidelines:
   - "Use to reinforce the action meaning"
   - Icons help in compact spaces
`;

export const SCENARIO_3_GENERATED_CODE = `
import React from 'react';
import { Button } from './components/Button';
import { EditIcon, DeleteIcon } from './components/Icons';

interface DataTableRowProps {
  row: {
    id: string;
    name: string;
    email: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DataTableRow({ row, onEdit, onDelete }: DataTableRowProps) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>
        {/* 
          Following metadata guidance for data tables:
          - size="small" per aiHints: "Use 'small' size in compact UIs, data tables"
          - variant="subtle" per variants.type.subtle.whenToUse: "Repeated actions in lists or tables"
          - Icons reinforce meaning in compact space
        */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button 
            variant="subtle" 
            size="small" 
            label="Edit" 
            iconStart={<EditIcon />}
            onClick={() => onEdit(row.id)}
            aria-label={\`Edit \${row.name}\`} // Accessibility: specific context
          />
          <Button 
            variant="subtle" 
            size="small" 
            label="Delete" 
            iconStart={<DeleteIcon />}
            onClick={() => onDelete(row.id)}
            aria-label={\`Delete \${row.name}\`} // Accessibility: specific context
          />
        </div>
      </td>
    </tr>
  );
}
`;

/**
 * SCENARIO 4: Multi-Step Form Navigation
 * User Request: "Create navigation buttons for a multi-step form"
 */
export const SCENARIO_4_USER_REQUEST = `
I have a 3-step form. I need:
- A "Back" button to go to the previous step
- A "Save Draft" button to save progress
- A "Continue" button to go to the next step
`;

export const SCENARIO_4_AI_REASONING = `
Analyzing request using Button.metadata.ts:

1. Identifying action hierarchy:
   - "Continue" is the primary forward action → variant="primary"
   - "Save Draft" is a secondary action → variant="neutral"
   - "Back" is a tertiary action → variant="subtle"

2. Checking aiHints.contextualRules:
   - "Maximum 1 primary button per logical section" ✓
   - Only "Continue" is primary

3. Checking usage.antiPatterns:
   - Avoiding: "Multiple primary buttons in the same section"
   - Solution shown: "Use only one primary button, others should be neutral or subtle"
   - Following the correct example with clear hierarchy ✓

4. Checking composition.commonPatterns:
   - Similar to "Form actions" pattern
   - Spacing: "8px gap between buttons"

5. Checking variants.type for each:
   - primary.whenToUse: "Continue to next step" ✓
   - neutral.whenToUse: "Secondary navigation" ✓
   - subtle.whenToUse: "Tertiary actions" ✓
`;

export const SCENARIO_4_GENERATED_CODE = `
import React from 'react';
import { Button } from './components/Button';
import { ArrowLeftIcon, ArrowRightIcon } from './components/Icons';

interface MultiStepFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onSaveDraft: () => void;
  onContinue: () => void;
  canGoBack: boolean;
  isSaving: boolean;
}

export function MultiStepFormNavigation({ 
  currentStep,
  totalSteps,
  onBack, 
  onSaveDraft, 
  onContinue,
  canGoBack,
  isSaving
}: MultiStepFormNavigationProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e0e0e0'
    }}>
      {/* Left side: Back button (tertiary action) */}
      <div>
        {canGoBack && (
          <Button 
            variant="subtle" // Tertiary action per metadata
            size="medium" 
            label="Back" 
            iconStart={<ArrowLeftIcon />}
            onClick={onBack}
          />
        )}
      </div>
      
      {/* Right side: Save Draft + Continue (following hierarchy) */}
      <div style={{ display: 'flex', gap: '8px' }}> {/* 8px gap per metadata */}
        {/* 
          Secondary action - neutral variant
          Following antiPattern guidance: only one primary per section
        */}
        <Button 
          variant="neutral" 
          size="medium" 
          label={isSaving ? "Saving..." : "Save Draft"}
          onClick={onSaveDraft}
          disabled={isSaving} // Following behavior.loading guidance
        />
        
        {/* 
          Primary action - the main forward progression
          Following aiHints: "Continue to next step" uses primary variant
        */}
        <Button 
          variant="primary" 
          size="medium" 
          label={currentStep === totalSteps ? "Submit" : "Continue"}
          iconEnd={currentStep < totalSteps ? <ArrowRightIcon /> : undefined}
          onClick={onContinue}
          type={currentStep === totalSteps ? "submit" : "button"}
        />
      </div>
    </div>
  );
}
`;

/**
 * SCENARIO 5: ANTI-PATTERN DETECTION
 * User Request: "Create a toolbar with multiple action buttons"
 * (This will demonstrate the AI catching and correcting an anti-pattern)
 */
export const SCENARIO_5_USER_REQUEST = `
Create a toolbar with these buttons:
- New Document
- Save
- Export
- Print
All actions are important, so make them all primary buttons.
`;

export const SCENARIO_5_AI_REASONING = `
Analyzing request using Button.metadata.ts:

⚠️ ANTI-PATTERN DETECTED!

1. User requested: "All actions are important, so make them all primary buttons"

2. Checking usage.antiPatterns:
   - Found violation: "Multiple primary buttons in the same section"
   - Problem: "Creates visual hierarchy confusion - user doesn't know which action is most important"
   - Solution: "Use only one primary button, others should be neutral or subtle"

3. Analyzing actual hierarchy:
   - "New Document" - Creates new content (high priority)
   - "Save" - Preserves work (MOST critical)
   - "Export" - Secondary action
   - "Print" - Secondary action

4. Corrected variant selection:
   - Save → variant="primary" (most critical action)
   - New Document → variant="neutral" (important but secondary)
   - Export → variant="neutral" (secondary)
   - Print → variant="neutral" (secondary)

5. Following metadata guidance:
   - aiHints.contextualRules: "Maximum 1 primary button per logical section"
   - This creates clear visual hierarchy
`;

export const SCENARIO_5_GENERATED_CODE = `
import React from 'react';
import { Button } from './components/Button';
import { NewDocIcon, SaveIcon, ExportIcon, PrintIcon } from './components/Icons';

interface ToolbarProps {
  onNewDocument: () => void;
  onSave: () => void;
  onExport: () => void;
  onPrint: () => void;
  hasUnsavedChanges: boolean;
}

export function Toolbar({ 
  onNewDocument, 
  onSave, 
  onExport, 
  onPrint,
  hasUnsavedChanges
}: ToolbarProps) {
  return (
    <div 
      role="toolbar" 
      aria-label="Document actions"
      style={{ 
        display: 'flex', 
        gap: '8px',
        padding: '12px',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      {/* 
        NOTE: User requested all primary buttons, but this violates metadata rules.
        Following antiPattern guidance: "Use only one primary button, others should be neutral"
        
        Hierarchy established:
        1. Save (primary) - Most critical action to preserve work
        2. New Document, Export, Print (neutral) - Important but secondary
      */}
      
      <Button 
        variant="neutral" // Secondary action per metadata guidance
        size="medium" 
        label="New" 
        iconStart={<NewDocIcon />}
        onClick={onNewDocument}
      />
      
      {/* 
        Primary variant reserved for the MOST important action
        Following aiHints: "Use 'primary' variant ONLY for the single most important action"
      */}
      <Button 
        variant="primary" 
        size="medium" 
        label="Save" 
        iconStart={<SaveIcon />}
        onClick={onSave}
        disabled={!hasUnsavedChanges}
      />
      
      <Button 
        variant="neutral" 
        size="medium" 
        label="Export" 
        iconStart={<ExportIcon />}
        onClick={onExport}
      />
      
      <Button 
        variant="neutral" 
        size="medium" 
        label="Print" 
        iconStart={<PrintIcon />}
        onClick={onPrint}
      />
    </div>
  );
}

/* 
  AI EXPLANATION TO USER:
  
  I noticed you requested all buttons to be primary, but the design system 
  metadata specifically warns against this pattern:
  
  Anti-pattern: "Multiple primary buttons in the same section"
  Problem: "Creates visual hierarchy confusion - user doesn't know which 
           action is most important"
  
  I've adjusted the code to follow best practices:
  - "Save" is primary (the most critical action to preserve work)
  - Other buttons are neutral (important but secondary)
  
  This creates a clear visual hierarchy that guides users to the most 
  important action while keeping all buttons accessible.
*/
`;

/**
 * Summary of AI Capabilities with Structured Metadata
 */
export const AI_CAPABILITIES_SUMMARY = `
DEMONSTRATED AI CAPABILITIES USING STRUCTURED METADATA:

✅ 1. VARIANT SELECTION
   - Analyzes user intent
   - Consults aiHints.selectionCriteria
   - Chooses appropriate variant (primary/neutral/subtle)
   - Explains reasoning based on metadata

✅ 2. SIZE SELECTION
   - Considers context (forms, tables, modals)
   - Follows size guidelines from metadata
   - Ensures consistency within sections

✅ 3. ANTI-PATTERN DETECTION
   - Identifies violations before generating code
   - Explains why pattern is problematic
   - Suggests corrections based on metadata
   - Educates user on best practices

✅ 4. ACCESSIBILITY COMPLIANCE
   - Includes proper ARIA attributes
   - Uses correct button types (submit/button)
   - Adds descriptive labels
   - Follows keyboard navigation rules

✅ 5. COMPOSITION PATTERNS
   - Follows common patterns (form actions, modals, etc.)
   - Uses correct spacing from metadata
   - Maintains visual hierarchy
   - Respects contextual rules

✅ 6. CONTEXT-AWARE DECISIONS
   - Adapts to different scenarios (forms, tables, toolbars)
   - Considers user flow and intent
   - Balances user requests with design system rules
   - Provides explanations for decisions

KEY INSIGHT:
The structured metadata transforms the AI from a "code generator" 
into a "design system expert" that not only generates code but also 
validates, educates, and enforces best practices.
`;

export default {
    SCENARIO_1_USER_REQUEST,
    SCENARIO_1_AI_REASONING,
    SCENARIO_1_GENERATED_CODE,
    SCENARIO_2_USER_REQUEST,
    SCENARIO_2_AI_REASONING,
    SCENARIO_2_GENERATED_CODE,
    SCENARIO_3_USER_REQUEST,
    SCENARIO_3_AI_REASONING,
    SCENARIO_3_GENERATED_CODE,
    SCENARIO_4_USER_REQUEST,
    SCENARIO_4_AI_REASONING,
    SCENARIO_4_GENERATED_CODE,
    SCENARIO_5_USER_REQUEST,
    SCENARIO_5_AI_REASONING,
    SCENARIO_5_GENERATED_CODE,
    AI_CAPABILITIES_SUMMARY
};
