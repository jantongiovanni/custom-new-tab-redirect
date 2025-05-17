# Permission Justification

This document explains why each permission in the manifest.json file is necessary for the Custom New Tab Redirect extension to function properly.

## Current Permissions

### `storage`

**Purpose**: Required to store and retrieve user preferences
**Usage**:

- Stores the custom redirect URL
- Saves user color preferences
- Enables sync across devices when user is signed into Chrome
**Why it's necessary**: Without this permission, the extension would not be able to remember user preferences between browser sessions or sync them across devices.

### `web_accessible_resources`

**Purpose**: Allows the extension to access local files
**Usage**:

- Enables the extension to work with local HTML files when set as the redirect URL
**Why it's necessary**: This permission is required to support redirecting to local files (file:// URLs) which is a core feature of the extension.

### `host_permissions`

**Purpose**: Allows the extension to access all URLs
**Usage**:

- Enables the extension to redirect to any URL, including local files and web pages
- Required for the core redirect functionality to work with any user-specified URL
**Why it's necessary**: This permission is essential for the extension's main purpose of redirecting new tabs to any URL the user specifies, whether it's a local file or a web page.

## Chrome URL Overrides

The extension uses `chrome_url_overrides` to replace the new tab page. This is not a permission but a feature that requires specific justification:

**Purpose**: Customize the new tab page
**Usage**:

- Replaces the default new tab page with the extension's redirect page
**Why it's necessary**: This is the core functionality of the extension - to redirect new tabs to a user-specified URL.

## Minimal Permission Set

The extension has been designed to use the minimum set of permissions necessary for its core functionality:

- No access to browsing history
- No access to tabs
- No access to web requests
- No access to cookies
- No access to bookmarks
- No access to downloads
- No access to notifications
- No access to geolocation
- No access to microphone or camera

This minimal permission set ensures the extension follows the principle of least privilege while still providing its intended functionality.
