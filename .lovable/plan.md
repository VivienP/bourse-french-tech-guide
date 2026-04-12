

## Plan: Remove redundant GitHub Actions workflow

### What I will do
Delete the file `.github/workflows/deploy-edge-functions.yml` from the codebase. Lovable Cloud already handles edge function deployments automatically, so this workflow is unnecessary and its failure is causing error emails.

### What you need to do
Nothing. Once you approve this plan, I'll delete the file and the errors will stop on the next GitHub push.

### Files modified
- `.github/workflows/deploy-edge-functions.yml` (delete)

