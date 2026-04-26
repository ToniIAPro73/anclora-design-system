# Decision Model

Use this file first.

## Goal

Decide what kind of UX/UI problem you are looking at before proposing changes.

## Step 1. Identify the real profile

Ask:

- what role does this app actually play
- is it public, internal, analytical, relational, operational, executive, or gateway
- what tier is it trying to express

If role and form disagree, classify that first.

## Step 2. Assign fit status

- `fit`
  - clearly expresses the right profile
- `partial-fit`
  - points in the right direction but mixes grammars, overreaches, or stays locally fragile
- `misaligned`
  - expresses the wrong profile or contradicts the target contract

## Step 3. Classify the gap

### Design-system gap

Use when:

- the same problem appears in multiple repos
- a primitive or shared pattern is missing
- teams keep solving the same thing locally

### Repo-local gap

Use when:

- the system already offers a reasonable answer
- the repo misuses, ignores, or dilutes it
- the issue belongs to copy, hierarchy, navigation, spacing, or local screen composition

### Final polish gap

Use when:

- structure and profile are already correct
- only finish quality is weak
- the surface needs better rhythm, priority, tension, CTA tone, or spacing

## Step 4. Correction order

Always prefer:

1. profile correction
2. structural correction
3. final polish

Never invert this order.

## Output format

For each review or intervention, produce:

- target profile
- current profile reading
- fit status
- issue list
- responsibility split
- correction path
