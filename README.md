# Flightcore

## Installation

### Requirements
Install required tools

| Name | Version                                  |
| ---- | ---------------------------------------- |
| node | [lts/iron](https://github.com/nvm-sh/nvm) |
| pnpm | [>=9.0.0](https://pnpm.io/installation)   |

Install dependencies `pnpm install` in root directory

## Usage

| Command                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| pnpm frontend            | Run command in the apps/frontend workspace      |
| pnpm contact-form-worker | Run command in the apps/contact-lambda workspace|
| pnpm uikit               | Run command in the libs/slack-bot workspace     |


i.e.: `pnpm frontend dev` starts development frontend server

## Repository variables

### Secrets

| Variable             | Description                                      |
|----------------------|--------------------------------------------------|
| CLOUDFLARE_API_TOKEN | Used for `apps/contact-form-cfworker` deployment |
