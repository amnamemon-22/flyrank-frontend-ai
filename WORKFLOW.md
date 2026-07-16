# FE-03 Workflow Comparison

## Objective

The objective of this exercise was to compare the results of a vague AI prompt with a structured AI prompt while implementing the same feature in a React project. The chosen feature was a Settings form with client-side validation.

## Round 1 – Vague Prompt

I created a new branch named `vague-prompt` and gave the AI a very short prompt:

> Create a settings form with validation.

The AI generated a working solution, but it made several assumptions. Although it created the required files, the implementation was basic and did not fully follow the existing project structure or patterns. Some manual review was required before accepting the changes.

## Round 2 – Structured Prompt

I created another branch named `structured-prompt` from the `main` branch and provided a detailed prompt that included project context, file locations, coding style, expected behavior, accessibility requirements, and verification steps.

The AI produced a much better result. It followed the existing project structure, reused the Login page pattern, added proper validation, updated `App.jsx`, and generated cleaner React code. The output required significantly less manual correction.

## Comparison

The structured prompt produced higher quality code than the vague prompt.

Main differences included:

- Better adherence to the existing project structure.
- More consistent React coding style.
- Improved navigation and component organization.
- Better accessibility and validation.
- Less manual review and modification.

This demonstrated that providing clear instructions, constraints, and project context leads to more reliable AI-generated code.

## AI Mistake Observed

One issue I noticed was that the AI modified `App.jsx` to switch between pages using the URL hash without first confirming whether this matched the project's intended navigation approach. Although the code worked, architectural decisions should still be reviewed by the developer before acceptance.

## Lessons Learned

This exercise showed that AI works best when given detailed instructions instead of vague requests. A structured prompt reduces ambiguity, produces more maintainable code, and minimizes manual corrections. Reviewing AI-generated code before committing remains an essential part of the development workflow.