# Add yourself some shortcuts to projects you often work on
# Example:
#
# brainstormr=/Users/robbyrussell/Projects/development/planetargon/brainstormr
#

function goto() {
  project="$1"
  environment="$2"
  platform="$3"

  if [ "" == "$environment" ]; then environment="*"; fi
  if [ "" == "$platform" ]; then platform="*"; fi

  eval "cd /usr/local/$platform/$project/$environment"
}

function services() {
  bash ~/Documents/development/bootstrap/services/run.sh "$1" "$2"
  echo -e "\n"
  docker ps
}
