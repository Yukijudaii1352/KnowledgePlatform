#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEFAULT_SOURCE="${GENERIC_AGENT_SOURCE:-${GENERIC_AGENT_ROOT:-}}"
SOURCE_DIR="${DEFAULT_SOURCE}"
TARGET_DIR="${REPO_ROOT}/tools/GenericAgent"
MODE="symlink"

usage() {
    cat <<EOF
Usage: bash scripts/setup_generic_agent.sh [--source /path/to/GenericAgent] [--mode symlink|copy]

Defaults:
  --source from env GENERIC_AGENT_SOURCE/GENERIC_AGENT_ROOT, if unavailable then auto-detect
  --mode   symlink

After setup, content/run.sh will automatically use:
  1. \$GENERIC_AGENT_ROOT
  2. ${TARGET_DIR}
  3. repo sibling ../GenericAgent (when exists)
EOF
}

while (( $# > 0 )); do
    case "$1" in
        --source)
            SOURCE_DIR="${2:?missing value for --source}"
            shift 2
            ;;
        --mode)
            MODE="${2:?missing value for --mode}"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown argument: $1" >&2
            usage >&2
            exit 1
            ;;
    esac
done

if [[ -z "${SOURCE_DIR}" ]]; then
    if [[ -f "${REPO_ROOT}/../GenericAgent/chat_single_round.py" ]]; then
        SOURCE_DIR="${REPO_ROOT}/../GenericAgent"
    fi
fi

if [[ -z "${SOURCE_DIR}" ]]; then
    echo "Error: GenericAgent source not set or found automatically." >&2
    echo "Set --source or pass env GENERIC_AGENT_SOURCE / GENERIC_AGENT_ROOT." >&2
    exit 1
fi

SOURCE_DIR="$(readlink -f "${SOURCE_DIR}")"

if [[ ! -d "${SOURCE_DIR}" ]]; then
    echo "Error: source GenericAgent directory not found: ${SOURCE_DIR}" >&2
    exit 1
fi

if [[ ! -f "${SOURCE_DIR}/chat_single_round.py" ]]; then
    echo "Error: ${SOURCE_DIR} does not look like a GenericAgent root (missing chat_single_round.py)" >&2
    exit 1
fi

mkdir -p "$(dirname "${TARGET_DIR}")"
rm -rf "${TARGET_DIR}"

case "${MODE}" in
    symlink)
        ln -s "${SOURCE_DIR}" "${TARGET_DIR}"
        ;;
    copy)
        cp -R "${SOURCE_DIR}" "${TARGET_DIR}"
        ;;
    *)
        echo "Error: unsupported mode '${MODE}', expected symlink or copy" >&2
        exit 1
        ;;
esac

echo "GenericAgent is ready:"
echo "  source: ${SOURCE_DIR}"
echo "  target: ${TARGET_DIR}"
echo
echo "You can now run:"
echo "  bash content/run.sh content/llm/llm_rl.yaml"
