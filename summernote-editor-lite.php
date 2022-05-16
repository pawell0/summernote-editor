<?php
/**
 * Summernote Editor Lite plugin.
 *
 * It transforms all the editable areas into the Summernote inline editor.
 *
 * @author Prakai Nadee <prakai@rmuti.acth>
 * @forked by Robert Isoski @robertisoski
 * @forked by Paweł Krużel @pawell0
 */

global $Wcms;

if (defined('VERSION')) {
    $Wcms->addListener('js', 'loadSummerNoteJS');
    $Wcms->addListener('css', 'loadSummerNoteCSS');
    $Wcms->addListener('editable', 'initialSummerNoteVariables');
}

function initialSummerNoteVariables($contents) {
    global $Wcms;
    $content = $contents[0];
    $subside = $contents[1];

    $contents_path = $Wcms->getConfig('contents_path');
    if (!$contents_path) {
        $Wcms->setConfig('contents_path', $Wcms->filesPath);
        $contents_path = $Wcms->filesPath;
    }
    $contents_path_n = trim($contents_path, "/");
    if ($contents_path != $contents_path_n) {
        $contents_path = $contents_path_n;
        $Wcms->setConfig('contents_path', $contents_path);
    }
    $_SESSION['contents_path'] = $contents_path;

    return array($content, $subside);
}

function loadSummerNoteJS($args) {
    global $Wcms;
    if ($Wcms->loggedIn) {
        $script = <<<EOT
        <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.js" integrity="sha512-lVkQNgKabKsM1DA/qbhJRFQU8TuwkLF2vSN3iU/c7+iayKs08Y8GXqfFxxTZr1IcpMovXnf2N/ZZoMgmZep1YQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="{$Wcms->url('plugins/summernote-editor-lite/js/admin.js')}" type="text/javascript"></script>
        <script src="{$Wcms->url('plugins/summernote-editor-lite/js/files.js')}" type="text/javascript"></script>
EOT;
        $args[0] .= $script;
    }
    return $args;
}

function loadSummerNoteCSS($args) {
    global $Wcms;
    if ($Wcms->loggedIn) {
        $script = <<<EOT
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css" integrity="sha512-ZbehZMIlGA8CTIOtdE+M81uj3mrcgyrh6ZFeG33A4FHECakGrOsTPlPQ8ijjLkxgImrdmSVUHn1j+ApjodYZow==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="{$Wcms->url('plugins/summernote-editor-lite/css/admin.css')}" type="text/css" media="screen">
EOT;
        $args[0] .= $script;
    }
    return $args;
}
