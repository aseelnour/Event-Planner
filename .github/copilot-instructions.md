# Copilot Instructions

Apply these rules for this repository:

- Stack is TypeScript + Node.js + Mongoose.
- MongoDB `_id` is internal. Do not add explicit `id` fields to interfaces or Mongoose schemas unless explicitly requested.
- Keep edits minimal and scoped to the requested task only.
- Do not refactor unrelated files.
- Follow existing naming, folder structure, and export style.
- For new API entities, create matching files under `apps/api/src/interfaces/models` and `apps/api/src/models` when needed.
- Validate changed TypeScript files for errors after edits.
- If a requirement is ambiguous and could cause wrong changes, ask one concise clarifying question.
