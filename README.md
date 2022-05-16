# Summernote WYSIWYG editor for WonderCMS (Author: Prakai Nadee)

## Description
This WonderCMS plugin adds a What You See Is What You Get (WYSIWYG) editor to all content editable fields.

This is NOT a official version of this plugin. This is the fork made for testing purposes. 
Changes have been applied, removing the jQuery and Bootstrap libraries and the Lite version of Summernote editor was used - see to file "summernote-editor.php". Additional icons in the editor menu have been replaced with temporary SVG icons that load directly from the "/js/files.js" file. The editor still needs to adjust the stylesheets in the theme used so that all elements are properly displayed and visible. Every comments and improvements are welcome.

## Preview
![Plugin preview](/preview.jpg)

## How to use
1. Login to your WonderCMS website.
2. Click "Settings" and click "Plugins".
3. In a field "Custom module" at the bottom of the Settings modal paste the path: "https://raw.githubusercontent.com/pawell0/summernote-editor-lite/master/wcms-modules.json" and click the "Add" button. The plugin will appear in the plugin list. Then install it. Don't confuse it with an official plugin (!). The short description says " ... This is the Summernote Lite editor".
4. Plugin will be automatically activated and editor will be visible immediately.
5. Supports drag and drop images.
