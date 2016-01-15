#!/bin/bash
#
# Development environment installation script
#


function e() { echo -e "> $1"; }
function t() { echo -e "\n* * * $1 * * *"; }

function mkdirp() {
  if [ ! -d "$1" ]; then
    e "Creating folder: $1"
    mkdir -p "$1";
  fi
}

function addline_once() {
  echo "$1" "$2"
  r=$( grep "$1" "$2" )
  echo $r
  if [ "" == "$r" ]; then
    e "Adding line $1 to file $2"
    echo -e "\n$1" >> "$2"
  fi
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
  if [ ! -e "~/.gitconfig" ]; then
    t "Initializing git"
    rm -f "/home/${USER}/.gitconfig"
    cp "${PWD}/config/git/.gitconfig" "/home/${USER}/.gitconfig"
  fi

  # Sublime Text:
  if [ ! -e "~/.config/sublime-text-3/Packages/User" ]; then
    t "Initializing Sublime Text"
    mkdirp "/home/${USER}/.config/sublime-text-3/Packages"
    rm -Rf "/home/${USER}/.config/sublime-text-3/Packages/User"
    ln -fs "${PWD}/config/sublime-text-3/Packages/User" "/home/${USER}/.config/sublime-text-3/Packages/User"
  fi

  # bashrc:
  t "Initializing .bashrc"
  addline_once "source ${PWD}/config/bash/.bashrc" "/home/${USER}/.bashrc"
  source "/home/${USER}/.bashrc"
}

function installation() {
  e "Minimal packages installation"
}

t "INSTALLATION"
system
init
installation

exit 0
