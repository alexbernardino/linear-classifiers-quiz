# Linear classifiers concept check

An 18-question formative quiz for Chapter 8 of the MSc Machine Learning
course. It follows the visual style and interactions of the existing
[Bayes quiz](https://github.com/alexbernardino/bayes-quiz) and
[MLP quiz](https://github.com/alexbernardino/mlp-quiz).

Each question has four choices, one best answer, immediate explanatory
feedback, a short “Check it” activity, and references to lecture-slide
titles. The quiz includes progress, score, section results, answer review
and restart. All logarithms are natural.

## Try it

Open **preview.html** directly in a browser. This self-contained version
works offline, without a local server or package installation.

For editing and GitHub Pages, use **index.html**, **questions.js**,
**quiz.js**, **math-text.js**, **styles.css** and **favicon.svg** together.
To preview that modular version locally, serve this folder, for example
with `python3 -m http.server 8000`, then open `http://localhost:8000/`.

Responses stay in memory in the current browser tab. Refreshing starts a
new attempt. There is no account, backend, analytics, external font or
third-party runtime dependency.

## Coverage

| Questions | Section | Topics |
|---|---|---|
| 1–6 | Linear boundaries & LDA | Affine scores, generative modeling, shared covariance, priors, QDA, covariance rank and regularization |
| 7–12 | Indicators & logistic regression | Indicator means, complementary least-squares fits, transformed features, sigmoid predictions, neuron interpretation and binary cross-entropy |
| 13–18 | Learning & softmax | Gradient ascent, objective curvature, separation, softmax probabilities, gradients and identifiability |

There are 8 short calculation questions and 10 conceptual questions.
Correct-answer positions are balanced: A and B appear five times each,
C and D four times each. Allow roughly 20–25 minutes including feedback.

## Instructor guide

**QUESTION_GUIDE.md** contains the complete question bank, answer key,
explanations and follow-up activities. The live questions are in
**questions.js**; the answer field is a zero-based option index.

The bank follows the supplied Chapter 8, including its new illustrations.
It corrects the chapter's remaining wording on “Logistic regression -
gradient ascent”: the **log-likelihood is concave**, while the **negative
log-likelihood is convex**. Convexity does not guarantee a finite or unique
unregularized estimate. The course source has not been edited.

## Editing

Edit questions.js, then run `node tools/build-support.mjs` to update the
offline preview and instructor guide. No installation is required.
Keep spaces between adjacent mathematical factors, for example
`x^{T} Σ^{−1} x`. The lightweight notation renderer supports subscripts,
superscripts and Unicode symbols; it is not a full LaTeX renderer.

Run `npm test` with Node.js 22 or later to check the question structure,
notation and interactive behavior.

## GitHub Pages

Repository: https://github.com/alexbernardino/linear-classifiers-quiz

The repository was empty when these instructions were prepared. For the
first upload, open a terminal in this folder and run:

```sh
git init -b main
git add .
git commit -m "Add linear classifiers quiz"
git remote add origin https://github.com/alexbernardino/linear-classifiers-quiz.git
git push -u origin main
```

In the repository's **Settings → Pages**, choose **Deploy from a branch**,
then **main** and **/(root)**, and save. The quiz needs no build step.
All runtime asset paths are relative; `.nojekyll` is included.

After the deployment succeeds, the student quiz will be available at:
https://alexbernardino.github.io/linear-classifiers-quiz/

For subsequent updates, edit the files, regenerate the preview and guide
if needed, then commit and push the changes to `main`.

### QR codes

- `linear-classifiers-quiz-qr.png` and `.svg` link to the student quiz page
  above. This link works after GitHub Pages is enabled and deployed.
- `linear-classifiers-repository-qr.png` and `.svg` link to the GitHub
  repository containing the source files.

The PNG files have a white quiet zone and integer-sized modules. Use the
SVG versions when a scalable vector image is preferable. Both codes were
decoded to verify their exact destinations.

These files and instructions do not themselves upload the quiz or enable
GitHub Pages.

## Style reference

The layout, CSS, notation renderer and interaction structure were adapted
from the user's existing Bayes quiz. The questions, branding and chapter
illustrations are new. The three small interface illustrations are generic
context graphics and do not encode the answers to individual questions.
