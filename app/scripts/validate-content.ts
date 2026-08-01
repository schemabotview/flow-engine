// Build-time content gate: fail the build if any beat references a scene id that doesn't
// exist (or draws a non-existent edge). Run via `npm run validate` (wired into `build`).
import { course } from '../src/content/course.ts'
import { getScene } from '../src/scenes/index.ts'
import { validateCourse } from '../src/content/validate.ts'

const errors = validateCourse(course.sections, getScene)
if (errors.length) {
  console.error(`\nContent validation FAILED (${errors.length}):`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  console.error('')
  process.exit(1)
}
console.log(`✓ content valid — ${course.sections.length} sections, all beat ids resolve to their scene`)
