#!/bin/bash
#
# Development environment installation script
#

{ # this ensures the entire script is downloaded #

function e() { echo -e "> $1"; }
function t() { echo -e "\n* * * $1 * * *"; }

function mkdirp() {
  if [ ! -d "$1" ]; then
    e "Creating folder: $1"
    mkdir -p "$1";
  fi
}

function cpf() {
  if [ -f "$2" ]; then
    rm -f "$2";
  fi
  cp "$1" "$2"
}

function addline_once() {
  r=$( grep "$1" "$2" )
  if [ "" == "$r" ]; then
    e "Adding line $1 to file $2"
    echo -e "\n$1" >> "$2"
  fi
}

function install_once() {
  for package in "$@"; do
    r=$( dpkg -s "$package" | grep "Package" )
    if [ "" == "$r" ]; then
      e "Installing package $package"
      sudo apt-get -yq install "$package"
    fi
  done
}

function npm_install_once() {
  for package in "$@"; do
    r=$( npm list --depth 1 --global "$package" | grep "$package" )
    if [ "" == "$r" ]; then
      e "Installing npm package $package"
      npm install -g "$package"
    fi
  done
}

USER=$( whoami )
PWD=$( pwd )

function system() {
  USER=$( whoami )
  PWD=$( pwd )
}

function init() {
  e "Checking personal configuration"

  # Git:
  t "Initializing git"
  if [ -f "/home/${USER}/.gitconfig" ]; then
    email=$( git config --global user.email );
  fi

  rm -f "/home/${USER}/.gitconfig"
  cp "${PWD}/config/git/.gitconfig" "/home/${USER}/.gitconfig"

  # Updating the user email (not stored in the gitconfig):
  git config --global user.email "${email}"

  # Sublime Text:
  if [ ! -e "~/.config/sublime-text-3/Packages/User" ]; then
    t "Initializing Sublime Text"
    mkdirp "/home/${USER}/.config/sublime-text-3/Packages"
    rm -Rf "/home/${USER}/.config/sublime-text-3/Packages/User"
    ln -fs "${PWD}/config/sublime-text-3/Packages/User" "/home/${USER}/.config/sublime-text-3/Packages/User"
  fi

  # zsh:
  t "Initializing .zshrc"
  ln -fs "${PWD}/config/zsh/.zshrc" "/home/${USER}/.zshrc"
  if [ -d "$ZSH/custom" ]; then
    mv "$ZSH/custom" "$ZSH/custom.backup"
    ln -fs "${PWD}/config/zsh/custom" "$ZSH/custom"
  fi

  # bashrc:
  t "Initializing .bashrc"
  addline_once "source ${PWD}/config/bash/.bashrc" "/home/${USER}/.bashrc"
  . "/home/${USER}/.bashrc"

  # Docker installation:
  wget -qO- https://get.docker.com/ | sh
  sudo usermod -aG docker $(whoami)
}

function installation() {
  e "Minimal packages installation"

  # Basic packages installation:
  install_once openssh-client openssh-server curl wget git zsh robomongo

  # Oh My Zsh - https://github.com/robbyrussell/oh-my-zsh
  if [ ! -d "/home/${USER}/.oh-my-zsh" ]; then
    sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
  fi

  # NodeJS minimal:
  install_once nodejs npm

  # NVM most updated version
  if [ ! -d "/home/${USER}/.nvm" ]; then
    e "NVM installation"
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
    . ~/.bashrc
  fi

  # Adding nvm
  source "/home/${USER}/.nvm/nvm.sh"

  # Installing Node 5
  r=$( nvm ls | grep $( cat .nvmrc ) );
  if [ "" == "$r" ]; then
    nvm install
  fi

  # Installing development global dependencies
  e "Installing missing npm packages"
  npm_install_once grunt-cli bower mocha istanbul nodemon node-inspector eslint express-generator newman

}

t "INSTALLATION"

e "${PWD}";
if [ ! -d "${PWD}/.git" ]; then
  e "Cloning the development-environment project"
  git clone git@github.com:GillesRasigade/development-environment.git .
else
  e "Updating"
  git fetch
  git pull
fi

system
installation
init

exit 0

} # this ensures the entire script is downloaded #
