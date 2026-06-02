# CalMate Harness

`./harness` is the repo-local operating surface for CalMate. Humans and agents should use it before guessing at raw project commands.

The harness wraps existing npm scripts. It does not replace the project build system.

## Commands

```bash
./harness help
./harness orient
./harness doctor
./harness lint
./harness test
./harness build
./harness boot
./harness verify
./harness status
./harness friction add
./harness friction list
```

Important commands support `--json`.

## Wrapped project commands

| Harness command | Wrapped command | Status |
|-----------------|-----------------|--------|
| `lint` | `npm run lint` | detected |
| `test` | `npm run test` | detected |
| `build` | `npm run build` | detected |
| `boot` | `npm run dev -- --host 127.0.0.1 --port 4173 --strictPort` | inferred |

`boot` is inferred from the Vite `dev` script and proves readiness by requesting the root route.

## Evidence

Important commands write evidence under:

```text
.harness/evidence/
  latest.json
  runs/
    <timestamp>/
      run.json
      doctor.json
      lint.log
      test.log
      build.log
      boot.log
      verify.json
      summary.md
```

## Friction

Record friction whenever a human or agent has to infer something the harness should have proved:

```bash
./harness friction add \
  --inference "What had to be inferred" \
  --should-prove "What the harness should prove" \
  --helped-by "What command, check, fixture, output, or error would have helped" \
  --severity medium \
  --blocked false
```

Recent entries can be listed with:

```bash
./harness friction list
```
