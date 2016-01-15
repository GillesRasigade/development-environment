#!/bin/bash

# Add following line to /.bashrc to show Git branch name in ssh prompt
PS1='\[\033[0;31m\]\w\[\033[0;33m\]$(__git_ps1)\[\e[0m\]$ '
