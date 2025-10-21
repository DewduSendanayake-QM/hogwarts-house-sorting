Hogwarts House Sorting — UI improvements

Summary
- Polished templates and styles to create a more Hogwarts-like UI.
- Added progress bar, keyboard navigation, accessible toasts, and improved final profile badge.
- Added simple SVG crest assets in `static/img/crests/` and wired them into the final badge.

Files changed
- `templates/index.html`: semantic header, progress markup.
- `static/css/styles.css`: progress bar, toasts, focus states, result card polish.
- `static/js/multi_quiz.js`: fixed options rendering (array/object), keyboard navigation, progress updates, accessible toasts, crest injection into final badge.
- `static/img/crests/*.svg`: small SVG crest placeholders for four houses.

How to run locally
1. Install requirements (use the provided `requirements.txt` if present). Example:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt
python application.py
```

2. Open http://127.0.0.1:5000 in your browser.

Notes / next steps
- I didn't add large images (castle background and mist) — existing paths are used; add higher-res assets in `static/img` if desired.
- I left some historical commented blocks in `templates/index.html` (Jinja comments) to avoid accidentally removing possibly useful variants; I can clean them up on request.
- If you want more book-accurate crests or gold foil effects, I can add higher-fidelity SVGs and animations.
