# 🔒 URGENT: Remove Exposed Secrets from Git History

## Problem
GitHub detected MongoDB credentials in commit history, even though we've updated the files.

## Solution: Clean Git History

### Option 1: Using BFG Repo-Cleaner (Recommended - Fastest)

1. **Download BFG**
```bash
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
# Or use: brew install bfg (Mac) or choco install bfg (Windows)
```

2. **Create a fresh clone**
```bash
cd ..
git clone --mirror https://github.com/blazecodeprakhar/ip-chat-realtime.git
cd ip-chat-realtime.git
```

3. **Remove the exposed string**
```bash
bfg --replace-text passwords.txt
```

Create `passwords.txt` with:
```
prakharyadav096_db_user
oeRPKgpcHmARicbk
cluster0.kmlkwkw.mongodb.net
```

4. **Clean and push**
```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

### Option 2: Using git filter-repo (Alternative)

1. **Install git-filter-repo**
```bash
pip install git-filter-repo
```

2. **Remove sensitive file from history**
```bash
git filter-repo --path server/.env.example --invert-paths
git filter-repo --replace-text <(echo 'prakharyadav096_db_user==>USERNAME')
git filter-repo --replace-text <(echo 'oeRPKgpcHmARicbk==>PASSWORD')
```

3. **Force push**
```bash
git push origin --force --all
```

### Option 3: Easiest - Delete & Recreate Repo

If above seems complex:

1. **Delete GitHub repo** `ip-chat-realtime`
2. **Create new repo** with same name
3. **Push fresh** (credentials already removed from files)

```bash
# In your local project
rm -rf .git
git init
git add .
git commit -m "Initial commit - clean history"
git branch -M main
git remote add origin https://github.com/blazecodeprakhar/ip-chat-realtime.git
git push -u origin main --force
```

## CRITICAL: Rotate MongoDB Credentials

**Regardless of which option you choose, you MUST:**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Database Access** → Edit user `prakharyadav096_db_user`
3. **Change password** immediately
4. Update your local `server/.env` file

## Why This Happened

The credentials were in commit `7a93739` (initial commit). Even though we updated the file, Git keeps full history. GitHub scans all commits, not just the latest.

## Verify Fix

After cleaning history:
1. Check GitHub Security tab
2. Alerts should clear within 24 hours
3. If not, the credentials are still in history

---

**Choose Option 3 (delete/recreate) if you're not familiar with Git history rewriting.**
