# Ensure Chocolatey is installed
$testchoco = powershell choco -v
if (!($testchoco)) {
    Write-Output "Chocolatey is not installed. Installing now..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    Write-Output "Chocolatey is already installed. Skipping install..."
}
else {
    Write-Output "Chocolatey is already installed. Skipping install..."
}

# Install nvs using Chocolatey
Write-Output "Installing nvs..."
choco install nvs -y

# Refresh Profile and env so that I have access to nvs
$env:ChocolateyInstall = Convert-Path "$((Get-Command choco).Path)\..\.."   
Import-Module "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
refreshenv

$nodeversion = Get-Content '../.node-version'
Write-Output "Installing Node version $nodeversion using nvs..."
nvs add $nodeversion
nvs link $nodeversion
refreshenv

# Ensure node was installed successfully and accessable in this shell
$testnode = powershell node -v

if (!($testnode)) {
    Write-Output "Node was not installed successfully. Exiting..."
    Exit $LASTEXITCODE
}
else {
    Write-Output "Node version $testnode installed successfully"
}

# Install expo-cli using npm
Write-Output "Installing expo-cli..."
npm install -g expo-cli

$testexpo = powershell expo -V

if (!($testexpo)) {
    Write-Output "Expo was not installed succcessfully. You may need to manually install it. Exiting..."
    Exit $LASTEXITCODE
}
else {
    Write-Output "Expo version $testexpo installed successfully"
}