// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use tauri::Manager;

#[tauri::command]
fn scan_system() -> Result<String, String> {
    // Call mole CLI for scanning
    let output = Command::new("mole")
        .args(["scan", "--json"])
        .output()
        .map_err(|e| format!("Failed to run mole: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn clean_system(categories: Vec<String>) -> Result<String, String> {
    let mut args = vec!["clean".to_string()];
    args.extend(categories);

    let output = Command::new("mole")
        .args(&args)
        .output()
        .map_err(|e| format!("Failed to run mole: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn get_disk_usage() -> Result<String, String> {
    let output = Command::new("mole")
        .args(["disk", "--json"])
        .output()
        .map_err(|e| format!("Failed to run mole: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn list_apps() -> Result<String, String> {
    let output = Command::new("mole")
        .args(["apps", "--json"])
        .output()
        .map_err(|e| format!("Failed to run mole: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
fn uninstall_app(app_path: String) -> Result<String, String> {
    let output = Command::new("mole")
        .args(["uninstall", &app_path])
        .output()
        .map_err(|e| format!("Failed to run mole: {}", e))?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            scan_system,
            clean_system,
            get_disk_usage,
            list_apps,
            uninstall_app
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
