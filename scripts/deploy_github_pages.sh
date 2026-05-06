#!/usr/bin/env bash
# =============================================================================
# deploy_github_pages.sh
#   将 KnowledgePipeline 项目推送到 GitHub 并部署为 GitHub Pages。
#
# 使用方式：
#   1. 推荐：通过环境变量传入 token（更安全）
#        export GH_TOKEN=ghp_xxxxxxxxxxxx
#        ./scripts/deploy_github_pages.sh
#
#   2. 或者通过命令行参数：
#        ./scripts/deploy_github_pages.sh <github_username> <repo_name> <token>
#
#   3. 全部使用默认值（需提前 export GH_TOKEN）：
#        ./scripts/deploy_github_pages.sh
#
# 幂等性：
#   - 仓库已存在时跳过创建
#   - Pages 已启用时跳过启用
#   - 已是 git 仓库时不会重新 init，只会同步 remote
#   - 可重复执行，每次推送最新代码
# =============================================================================

set -euo pipefail

# ---------- 参数 ----------
GH_USER="${1:-${GH_USER:-Yukijudaii1352}}"
GH_REPO="${2:-${GH_REPO:-KnowledgePlatform}}"
GH_TOKEN="${3:-${GH_TOKEN:-}}"
GH_BRANCH="${GH_BRANCH:-main}"

# 仓库根目录：脚本所在目录的上一级
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# ---------- 颜色输出 ----------
c_info()  { printf '\033[36m[INFO]\033[0m  %s\n' "$*"; }
c_ok()    { printf '\033[32m[ OK ]\033[0m  %s\n' "$*"; }
c_warn()  { printf '\033[33m[WARN]\033[0m  %s\n' "$*"; }
c_err()   { printf '\033[31m[FAIL]\033[0m  %s\n' "$*" >&2; }

# ---------- 前置检查 ----------
if [[ -z "${GH_TOKEN}" ]]; then
  c_err "未提供 GitHub token。请通过环境变量 GH_TOKEN 或第 3 个命令行参数传入。"
  exit 1
fi

command -v git   >/dev/null || { c_err "未找到 git";  exit 1; }
command -v curl  >/dev/null || { c_err "未找到 curl"; exit 1; }

c_info "仓库目录  : ${REPO_ROOT}"
c_info "GitHub 账户: ${GH_USER}"
c_info "目标仓库  : ${GH_USER}/${GH_REPO}"
c_info "目标分支  : ${GH_BRANCH}"

cd "${REPO_ROOT}"

# ---------- 0. 校验 token ----------
c_info "校验 GitHub token..."
auth_code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token ${GH_TOKEN}" \
  https://api.github.com/user)
if [[ "${auth_code}" != "200" ]]; then
  c_err "token 无效或权限不足（HTTP ${auth_code}）"
  exit 1
fi
real_user=$(curl -s -H "Authorization: token ${GH_TOKEN}" \
  https://api.github.com/user | sed -n 's/.*"login"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
c_ok "token 有效，当前身份：${real_user}"

if [[ "${real_user}" != "${GH_USER}" ]]; then
  c_warn "token 归属账号(${real_user}) 与传入的 GH_USER(${GH_USER}) 不一致，将使用 ${real_user}。"
  GH_USER="${real_user}"
fi

# ---------- 1. 确保远端仓库存在 ----------
c_info "检查远端仓库是否存在..."
repo_code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token ${GH_TOKEN}" \
  "https://api.github.com/repos/${GH_USER}/${GH_REPO}")

if [[ "${repo_code}" == "200" ]]; then
  c_ok "远端仓库已存在，跳过创建。"
elif [[ "${repo_code}" == "404" ]]; then
  c_info "远端仓库不存在，创建中..."
  create_resp=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Authorization: token ${GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/user/repos \
    -d "{\"name\":\"${GH_REPO}\",\"description\":\"AI Knowledge Hub · AI知识学习平台\",\"private\":false,\"auto_init\":false}")
  create_code="${create_resp##*$'\n'}"
  if [[ "${create_code}" != "201" ]]; then
    c_err "仓库创建失败 (HTTP ${create_code})"
    echo "${create_resp}" | head -5
    exit 1
  fi
  c_ok "远端仓库创建成功：${GH_USER}/${GH_REPO}"
else
  c_err "检查仓库状态异常 (HTTP ${repo_code})"
  exit 1
fi

# ---------- 2. 初始化本地 git 仓库 ----------
if [[ ! -d ".git" ]]; then
  c_info "初始化本地 git 仓库..."
  git init -q
  git checkout -q -b "${GH_BRANCH}" 2>/dev/null || git switch -q -c "${GH_BRANCH}" 2>/dev/null || true
  c_ok "git init 完成。"
else
  c_info "已是 git 仓库，跳过 init。"
  # 确保当前分支是目标分支
  current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"
  if [[ "${current_branch}" != "${GH_BRANCH}" ]]; then
    c_info "切换分支 ${current_branch} -> ${GH_BRANCH}"
    git checkout -q -B "${GH_BRANCH}"
  fi
fi

# 基本用户信息（GitHub Pages 无要求，但 commit 必须有）
git config user.name  >/dev/null 2>&1 || git config user.name  "${GH_USER}"
git config user.email >/dev/null 2>&1 || git config user.email "${GH_USER}@users.noreply.github.com"

# ---------- 3. 确保关键文件 ----------
# .nojekyll：让 GitHub Pages 直接发布静态文件，不走 Jekyll 构建
[[ -f ".nojekyll" ]] || touch .nojekyll

# ---------- 4. 配置 remote（使用 token 鉴权） ----------
REMOTE_URL="https://${GH_USER}:${GH_TOKEN}@github.com/${GH_USER}/${GH_REPO}.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "${REMOTE_URL}"
else
  git remote add origin "${REMOTE_URL}"
fi
c_ok "remote origin 已配置。"

# ---------- 5. 提交并推送 ----------
git add -A
if git diff --cached --quiet; then
  # 若无任何暂存变更，再看看工作区是否有（极少见的情况），否则直接空提交跳过
  if git log -1 >/dev/null 2>&1; then
    c_info "没有文件变更，跳过 commit。"
  else
    c_info "空仓库首次提交..."
    git commit -q --allow-empty -m "chore: initial empty commit"
  fi
else
  commit_msg="deploy: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
  git commit -q -m "${commit_msg}"
  c_ok "已提交：${commit_msg}"
fi

c_info "推送到 origin/${GH_BRANCH} ..."
# 首次推送可能需要 -u 建立 upstream；后续幂等
git push -u origin "${GH_BRANCH}"
c_ok "代码已推送。"

# ---------- 6. 启用 GitHub Pages ----------
c_info "检查 GitHub Pages 状态..."
pages_code=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${GH_USER}/${GH_REPO}/pages")

if [[ "${pages_code}" == "200" ]]; then
  c_ok "GitHub Pages 已启用。"
elif [[ "${pages_code}" == "404" ]]; then
  c_info "启用 GitHub Pages（源：${GH_BRANCH}/）..."
  enable_resp=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Authorization: token ${GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${GH_USER}/${GH_REPO}/pages" \
    -d "{\"source\":{\"branch\":\"${GH_BRANCH}\",\"path\":\"/\"}}")
  enable_code="${enable_resp##*$'\n'}"
  if [[ "${enable_code}" =~ ^(201|202|204)$ ]]; then
    c_ok "GitHub Pages 启用成功。"
  else
    c_warn "Pages 启用返回 HTTP ${enable_code}，可能需要到仓库 Settings → Pages 手动启用。"
    echo "${enable_resp}" | head -5
  fi
else
  c_warn "Pages 状态未知 (HTTP ${pages_code})，继续。"
fi

# ---------- 7. 输出结果 ----------
PAGES_URL="https://${GH_USER,,}.github.io/${GH_REPO}/"
REPO_URL="https://github.com/${GH_USER}/${GH_REPO}"

echo
c_ok  "=============================================="
c_ok  " 部署完成！"
c_ok  "=============================================="
echo  " 仓库地址 : ${REPO_URL}"
echo  " Pages 链接: ${PAGES_URL}"
echo  " 备注: Pages 首次发布可能需要 1-3 分钟才能访问。"
echo  "       可到 ${REPO_URL}/actions 查看 pages-build-deployment 进度。"
echo
