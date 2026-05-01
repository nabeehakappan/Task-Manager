# PROMPTS.md — Copilot Interaction Log

| Prompt / Context | Copilot Suggestion | Decision | Reasoning |
|---|---|---|---|
| // Filter tasks by title in React using search state | Suggested tasks.filter(task => task.title.includes(search)) | Modified | Added toLowerCase() for case-insensitive search |
| Handling input change for search | Suggested setSearch(e.target.value) | Accepted | Correct way to update state from input |
| Rendering filtered tasks | Suggested using tasks.map() | Modified | Replaced with filteredTasks.map() to apply search |
| Declaring filteredTasks | Suggested var filteredTasks = ... | Rejected | Used const instead of var for better practice |
| Search input UI | Suggested basic input field | Modified | Added value and onChange to make it controlled |
