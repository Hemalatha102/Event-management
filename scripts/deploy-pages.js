import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distPath = join(projectRoot, 'dist');

function runGit(args, cwd = projectRoot) {
  return execFileSync('git', args, { cwd, stdio: 'inherit' });
}

const remoteUrl = execFileSync('git', ['remote', 'get-url', 'origin'], {
  cwd: projectRoot,
  encoding: 'utf8',
}).trim();

const remoteBranch = execFileSync(
  'git',
  ['ls-remote', '--heads', 'origin', 'refs/heads/gh-pages'],
  { cwd: projectRoot, encoding: 'utf8' }
).trim();

const publishDirectory = await mkdtemp(join(tmpdir(), 'event-management-pages-'));

try {
  if (remoteBranch) {
    runGit(
      ['clone', '--quiet', '--branch', 'gh-pages', '--single-branch', remoteUrl, publishDirectory]
    );
  } else {
    runGit(['init', '--quiet', '--initial-branch=gh-pages', publishDirectory]);
    runGit(['remote', 'add', 'origin', remoteUrl], publishDirectory);
  }

  for (const entry of await readdir(publishDirectory)) {
    if (entry !== '.git') {
      await rm(join(publishDirectory, entry), { recursive: true, force: true });
    }
  }

  await cp(distPath, publishDirectory, { recursive: true });
  runGit(['add', '--all'], publishDirectory);

  const stagedChanges = execFileSync('git', ['status', '--porcelain'], {
    cwd: publishDirectory,
    encoding: 'utf8',
  }).trim();

  if (stagedChanges) {
    runGit(['commit', '-m', 'Deploy Event Management Application'], publishDirectory);
    runGit(['push', 'origin', 'gh-pages'], publishDirectory);
  } else {
    console.log('The generated site matches the current gh-pages branch; nothing to publish.');
  }
} finally {
  await rm(publishDirectory, { recursive: true, force: true });
}
