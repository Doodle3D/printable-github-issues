#!/bin/sh

# Local Environment Variables

# 1) Save this file as 'env.sh' (it is protected by .gitignore)
# 2) Type 'source env.sh' into your terminal to export all the variables

export NODE_ENV=development

# Github repo's owner / organisation
export ISSUES_OWNER='electron'
# Github repo's name
export ISSUES_REPO='electron'

# AUTHENTICATION
# Only required for private repo's
# Github user with access
export GITHUB_USER=''
# Github user access token
# https://github.com/settings/tokens/new
export GITHUB_TOKEN=''
