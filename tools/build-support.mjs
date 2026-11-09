import { readFile, writeFile } from 'node:fs/promises';
import { questions } from '../questions.js';

const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const [index, styles, math, bank, controller, favicon] = await Promise.all(
  ['index.html', 'styles.css', 'math-text.js', 'questions.js', 'quiz.js', 'favicon.svg'].map(read)
);
const javascript = [math, bank, controller].map(source => source
  .replace(/^import .*;\r?\n/gm, '')
  .replace(/^export /gm, '')).join('\n');
const preview = index
  .replace('<link rel="icon" href="./favicon.svg" type="image/svg+xml">',
    `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}" type="image/svg+xml">`)
  .replace('<link rel="stylesheet" href="./styles.css">', `<style>\n${styles}\n</style>`)
  .replace('    <script type="module" src="./quiz.js"></script>\n', '')
  .replace('</body>', `<script>\n${javascript.replaceAll('</script', '<\\/script')}\n</script>\n  </body>`);
await writeFile(new URL('preview.html', root), preview);

const letters = 'ABCD';
let guide = '# Linear classifiers: instructor guide\n\n'
  + '18 questions; one best answer per question. All logarithms are natural.\n'
  + 'Suggested use: approximately 20–25 minutes with explanation review.\n\n'
  + 'The interactive format follows the existing Bayes and MLP quizzes.\n'
  + 'Slide references use titles so that changing slide numbers does not invalidate them.\n\n'
  + '**Instructor correction:** On “Logistic regression - gradient ascent”,\n'
  + 'the log-likelihood is concave, not convex. Its negative is convex.\n'
  + 'The quiz uses the correct statement; the course source is unchanged.\n\n'
  + '## Answer key\n\n| Question | Answer | Section |\n|---|---|---|\n';
questions.forEach((q, i) => { guide += `| ${i + 1} | ${letters[q.answer]} | ${q.section} |\n`; });
for (const [i, q] of questions.entries()) {
  guide += `\n## ${i + 1}. ${q.section} — ${q.category}\n\n${q.prompt}\n\n`;
  q.options.forEach((option, j) => { guide += `- **${letters[j]}.** ${option}\n`; });
  guide += `\n**Answer: ${letters[q.answer]}.**\n\n${q.explanation}\n\n`
    + `**Check it:** ${q.activity}\n\n**Revisit the chapter:** ${q.slides.join('; ')}.\n`;
}
await writeFile(new URL('QUESTION_GUIDE.md', root), guide);
console.log(`Built offline preview and instructor guide for ${questions.length} questions.`);
