// SummerNote plugin for WonderCMS, JavaScript
// The extra icons in the menu have been changed to svg loaded directly. Look at lines 145 and 158.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {

    var filetype = 'docs';

    $.extend($.summernote.plugins, {

        'files': function(context) {
            var self = this;

            self.filetype = '';
            self.file = '';
            self.range = '';

            var ui = $.summernote.ui;
            var $editor = context.layoutInfo.editor;
            var options = context.options;

            context.memo('button.files', function() {
                var button = ui.button({
                    contents: '<i class="note-icon-pencil"/>',
                    tooltip: 'files',
                    click: context.createInvokeHandler('files.showDialog', 'docs')
                });
                var $files = button.render();
                return $files;
            });

            self.initialize = function() {
                var $container = options.dialogsInBody ? $(document.body) : $editor;

                var body =  '<div class="form-group row-fluid" id="filesDialog">'+
                '<div id="filesList" style="padding-left: 10px;"></div>'+
                '<form class="form-inline" id="fileUpload" enctype="multipart/form-data">'+
                '<div id="fileUrlDiv" class="form-group" style="width: 100%; padding-top: 10px">'+
                    '<label for="fileUrl">URL of image or document</label><input type="text" class="form-control" name="fileUrl" id="fileUrl" style="width: 100%" />'+
                '</div>'+
                '</form>'+
                '</div>';
                var footer = '<button href="#" class="btn btn-primary ext-files-btn">Insert</button>';

                self.$dialog = ui.dialog({
                    title: 'Insert image or document (Copy link to file Settings -> Files)',
                    fade: options.dialogsFade,
                    body: body,
                    footer: footer
                }).render().appendTo($container);
            };

            this.destroy = function() {
                this.$dialog.remove();
                this.$dialog = null;
                this.$panel.remove();
                this.$panel = null;
            };

            self.showDialog = function(t) {
                context.invoke('editor.saveRange');

                self.$dialog.find('#file').val('');
                self.$dialog.find('#fileUrlDiv').val('');

                self
                .openDialog(t)
                .then(function(dialogData) {
                    ui.hideDialog(self.$dialog);
                    context.invoke('editor.restoreRange');
                })
                .fail(function() {
                    context.invoke('editor.restoreRange');
                });
            };

            self.openDialog = function(t) {

                self.filetype = t;
                self.file = '';
                self.range = context.invoke('editor.createRange');

                return $.Deferred(function(deferred) {
                    var $dialogBtn = self.$dialog.find('.ext-files-btn');

                    ui.onDialogShown(self.$dialog, function() {
                        context.triggerEvent('dialog.shown');

                        $dialogBtn
                        .click(function(event) {
                            event.preventDefault();

                            self.fileLocal = true;
                            if (self.file == '') {
                                if (self.$dialog.find('#fileUrl').val()!='') {
                                    self.file = self.$dialog.find('#fileUrl').val();
                                    self.fileLocal = false;
                                }
                            }
                            if (self.file != '') {
                                if (self.fileLocal) {
                                    var fileUrl = 'files/'+self.filetype+'/'+self.file;
                                } else {
                                    var fileUrl = self.file;
                                }
                                if (self.filetype=='images') {
                                    context.invoke('editor.restoreRange');
                                    context.invoke('editor.insertImage', fileUrl);
                                } else {
                                    context.invoke('editor.restoreRange');
                                    var node = document.createElement('a');
                                    $(node).attr('href', fileUrl).attr('target', '_blank').html(self.range.toString());
                                    context.invoke('editor.insertNode', node);
                                }
                                self.filetype = '';
                                self.file = '';
                                self.$dialog.find('#fileUrl').val('');
                            }
                            deferred.resolve({ action: 'Files dialog OK clicked...' });
                        });
                    });

                    ui.onDialogHidden(self.$dialog, function() {
                        $dialogBtn.off('click');
                        if (deferred.state() === 'pending') {
                            deferred.reject();
                        }
                    });

                    ui.showDialog(self.$dialog);
                });
            };
        },

        'doc': function(context) {
            var ui = $.summernote.ui;
            context.memo('button.doc', function() {
                var button = ui.button({
                    contents: '<svg height="17" viewBox="0 0 17 17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m1.347656 16.996094c-.359375 0-.671875-.128906-.941406-.382813-.269531-.253906-.40625-.550781-.40625-.890625v-14.449218c0-.339844.136719-.636719.40625-.890626.269531-.253906.582031-.382812.941406-.382812h7.644532l5.398437 5.097656v5.738282h-1.347656v-4.886719h-4.949219v-4.675781h-6.746094v14.449218h9.21875v1.273438zm14.796875.023437-2.878906-2.722656v2.65625h-1.347656v-4.84375h5.125v1.273437h-2.832031l2.878906 2.722657zm-14.796875-1.296875v-14.449218zm0 0"/></svg>',
                    tooltip: 'Document',
                    click: context.createInvokeHandler('files.showDialog', 'docs')
                });
                var $doc = button.render();
                return $doc;
            });
        },

        'image': function(context) {
            var ui = $.summernote.ui;
            context.memo('button.image', function() {
                var button = ui.button({
                    contents: '<svg height="17" viewBox="0 0 17 17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m2.703125 13.292969h11.574219l-3.480469-4.628907-3.125 4.039063-2.199219-3zm-1.328125 3.707031c-.378906 0-.710938-.140625-.992188-.425781-.2851558-.28125-.4257808-.613281-.4257808-.992188v-14.164062c0-.378907.140625-.710938.4257808-.992188.28125-.285156.613282-.425781.992188-.425781h14.203125c.378906 0 .710937.140625.996094.425781.285156.28125.425781.613281.425781.992188v14.164062c0 .378907-.140625.710938-.425781.992188-.285157.285156-.617188.425781-.996094.425781zm0-1.417969h14.203125v-14.164062h-14.203125zm0-14.164062v14.164062zm0 0"/></svg>',
                    tooltip: 'Image',
                    click: context.createInvokeHandler('files.showDialog', 'images')
                });
                var $image = button.render();
                return $image;
            });
        }
    });
}));
