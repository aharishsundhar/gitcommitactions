# gitcommitactions

this command to check file          commit change file options

Previous answer (by @pozil) fetches full repository and it may be slow on big repositories. My solution is to fetch with depth 1 by using actions/checkout and fetch later manually. Also my solution works for both Pull Requests and normal pushes to branches.

testing 8

on: [push, pull_request]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check for changes
        id: diff
        run: |
          if [ $GITHUB_BASE_REF ]; then
            # Pull Request
            git fetch origin $GITHUB_BASE_REF --depth=1
            export DIFF=$( git diff --name-only origin/$GITHUB_BASE_REF $GITHUB_SHA )
            echo "Diff between origin/$GITHUB_BASE_REF and $GITHUB_SHA"
          else
            # Push
            git fetch origin ${{ github.event.before }} --depth=1
            export DIFF=$( git diff --name-only ${{ github.event.before }} $GITHUB_SHA )
            echo "Diff between ${{ github.event.before }} and $GITHUB_SHA"
          fi
          echo "$DIFF"
          # Escape newlines (replace \n with %0A)
          echo "::set-output name=diff::$( echo "$DIFF" | sed ':a;N;$!ba;s/\n/%0A/g' )"
      - run: echo "${{ steps.diff.outputs.diff }}"
