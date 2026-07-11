![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Development-red)

This is the backend of the app  
> Currently in development/learning how to use Nodejs + Typescript 🚧

# Getting Started #

### Dependencies ###
- direnv
- nix

## To install direnv: ##
### [Ubuntu/Debian based distros] ###
` sudo apt install direnv `

### [Arch] ###
` sudo pacman -S direnv ` 

### [MacOS] ###
` brew install direnv `

### [Windows] ###
` winget install direnv `

## To install nix: ##
### [Linux/MacOS] ###
` curl -fsSL https://install.determinate.systems/nix | sh -s -- install `

### [Windows] ###
In WSL(Windows Subsystem For Linux) run the command below  
` curl -fsSL https://install.determinate.systems/nix | sh -s -- install `


** after install add this in your .zshrc or .bashrc **  
` eval "$(direnv hook zsh)" `

# Setup #

### Clone the backend branch from github ###
` git clone --branch backend https://github.com/tenuunee22/petspot `

Enter the cloned repository, and you might get an error  
` direnv: error /path/to/your/project/.envrc is blocked. `  
Run ` direnv allow ` to approve its content and direnv will setup the environment for you

### Run ###
` node index.ts `

### After, open your browser of choice and search ###
` localhost:3000 `
