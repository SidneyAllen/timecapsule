/**
 * jQuery preSubmit plugin file.
 *
 * @author Aliaksandr Astashenkau
 * @author-email dfsq.dfsq@gmail.com
 * @author-website http://dfsq.info
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 * @version 1.0
 */
;(function ($) {
    $.fn.preSubmit = function (options) {
        return this.each(function () {
            var fields;
            options = options || {};
            if (options.fields) fields = $(options.fields);
            else {
                $(this).find('input[type="text"],input[type="password"],select,textarea').addClass('_preSubmit');
                fields = $(this).find('._preSubmit')
            }
            if (options.but) {
                fields = fields.not(options.but)
            }
            $(this).submit(function (e) {
                e.preventDefault();
                var checked = 0;
                fields.each(function (k, el) {
                    if (!$.trim($(this).val()) || $(this).val() == $(this).attr('not_count')) {
                        $(this).focus();
                        if (options.errClass) {
                            $(this).addClass(options.errClass).blur(function () {
                                if ($.trim($(this).val())) {
                                    $(this).removeClass(options.errClass)
                                }
                            })
                        }
                        return false
                    }
                    if (options.errClass) $(this).removeClass(options.errClass);
                    checked++
                });
                if (fields.length == checked) {
                    if (options.submit) {
                        if (options.submit.call(this)) $(this).unbind().submit()
                    } else {
                        $(this).unbind().submit()
                    }
                }
                return false
            })
        })
    }
})(jQuery);