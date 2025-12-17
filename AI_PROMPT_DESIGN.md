# AI Prompt Design for Decision Analysis

This document explains the prompt engineering approach used for the retrospective decision analysis in the AI Decision Justification Tracker.

## Core Principle

The AI analysis focuses on **retrospective learning** rather than predictive modeling. It compares what was expected with what actually happened to extract insights for future decision-making.

## Prompt Structure

The prompt is designed to elicit structured, actionable insights through four key analysis areas:

### 1. Comparison Analysis
Compares expected outcomes with actual outcomes to identify key differences and discrepancies.

### 2. Invalid Assumptions
Identifies which assumptions made during the decision process were proven incorrect by actual events.

### 3. Lessons Learned
Extracts generalizable lessons from the comparison of expectations and reality.

### 4. Reflective Suggestions
Provides actionable suggestions for future similar decisions based on the analysis.

## Prompt Template

```
You are an expert decision analyst. Your task is to perform a retrospective analysis of a decision 
by comparing what was expected with what actually happened. Focus on learning and reflection, 
not prediction.

DECISION DETAILS:
Title: {decision_title}
Context: {decision_context}
Reasoning: {decision_reasoning}
Assumptions Made: {assumptions_list}
Expected Outcome: {expected_outcome}
Actual Outcome: {actual_outcome}
Success Level (1-5): {success_level}
Unexpected Factors: {unexpected_factors_list}

Please provide a structured analysis with the following sections:

1. COMPARISON ANALYSIS:
   Compare the expected outcome with the actual outcome. What were the key differences?

2. INVALID ASSUMPTIONS:
   Identify which assumptions were proven incorrect or invalid based on what actually happened.

3. LESSONS LEARNED:
   What key lessons can be extracted from comparing expectations with reality?

4. REFLECTIVE SUGGESTIONS:
   Based on this analysis, what suggestions would you make for future similar decisions? 
   Focus on reflective improvements, not predictive advice.

Format your response as JSON with the following structure:
{
  "comparison": "Detailed comparison of expectation vs reality",
  "invalidAssumptions": ["List of invalid assumptions"],
  "lessonsLearned": ["List of lessons learned"],
  "suggestions": ["List of reflective suggestions"]
}

Provide concise, actionable insights focused on learning from this specific decision.
```

## Response Parsing

The system expects a JSON response with the following structure:

```json
{
  "comparison": "String describing the comparison between expected and actual outcomes",
  "invalidAssumptions": ["Array of strings identifying invalid assumptions"],
  "lessonsLearned": ["Array of strings listing lessons learned"],
  "suggestions": ["Array of strings with reflective suggestions"]
}
```

## Error Handling

If the AI response cannot be parsed as valid JSON, the system falls back to a default analysis structure to maintain functionality.

## Continuous Improvement

The prompt design can be refined based on:
- Quality of AI analyses received
- User feedback on usefulness of insights
- Domain-specific requirements for different types of decisions