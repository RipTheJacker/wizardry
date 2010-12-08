/*
 * jQuery Tabs v1.0 - https://github.com/RipTheJacker/wizardry/tree/master/Tabs
 *
 *
 * Semantic tabs in a very flexible plugin.
 *
 * TERMS OF USE - jQuery Tabs
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2010 RipTheJacker
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
(function($) {
  $.fn.tabMenu = function(options) {
    var defaults = {
      menu_id: "tab_menu",
      active_class: "active",
      tab_selector: ".tab_content h3:first-child",
      tab_panel_selector: ".tab_content",
      start_index: 0
    };

    var options = $.extend(defaults, options);
    var tab_ul = $('<ul id="'+ options.menu_id +'"/>').prependTo($(this));
  
    $(options.tab_selector).appendTo(tab_ul).wrap('<li/>').parent().each(function(i) {
      if (i === options.start_index) { 
        $(this).addClass(options.active_class);
        $(options.tab_panel_selector).eq(i).addClass(options.active_class);
      };
      $(this).click(function() {
        $("li", "#" + options.menu_id).removeClass(options.active_class);
        $(this).addClass(options.active_class);
        $(options.tab_panel_selector).removeClass(options.active_class).eq(i).addClass(options.active_class);
        return false;
      })
    });
  };  
})(jQuery);
