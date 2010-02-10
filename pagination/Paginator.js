/*
---
description: Paginate elements in a container

license: MIT-style

authors:
- Kabari Hendrick

requires:
  core/1.2.4:
    - Class
    - Hash
    - Event
    - Element
    - Selectors
    - Element.Style
provides:
  - Paginator
  - Element.paginate
...
*/
var Paginator = new Class({
  Implements: [Options, Events],
  version: '1.2.4',
  options:{
    linkClass: "pagination-link",
    activeLinkClass: "active-page-link",
    display: 3,
    start_position: 0
    // onInitialize: $empty(),
    // onPageAhead: $lambda(from_page, to_page),
    // onPageBack: $lambda(from_page, to_page),
    onPageTurn: function(from_page, to_page){
      from_page.removeClass("active-page"); 
      to_page.addClass("active-page"); 
    }
  },
  initialize: function(element, options){
    this.setOptions(options);
    this.element = $(element);
    this.serialize();
    this.position = this.options.start_position;
    this.fireEvent('initialize');
    if(this.pages.has(this.position)){
      this.fireEvent("pageTurn", [$([]), this.pages.get(this.position)]);
    }
  },
  serialize: function(display){
    this.pages = new Hash();
    var slices = [];
    var num = (display || this.options.display);
    var els = this.element.getChildren();
    var i = -num
    // group els into pages
    while ((i += num) < els.length)
      slices.push(els.slice(i, i+num));
    // console.debug('%o', slices);
    slices.each(function(group , index){
      this.set(index, $$(group));
    }, this.pages);
    // console.log("serialize");
    // console.log(this.element.getChildren());
    // console.debug('%o', this.pages.values());
  },
  current: function(){
    this.pages.get(this.position);
  },
  goToPage: function(from_page_num, to_page_num){
    if (this.position == to_page_num) { return false; };
    this.position = to_page_num;
    var from_page = this.pages.get(from_page_num);
    var to_page = this.pages.get(to_page_num)
    this.fireEvent("pageTurn", [from_page, to_page]);
    this.fireEvent("page" + ((from_page_num < to_page_num) ? 'Ahead' : 'Back'), [from_page, to_page]);
  },
  turnPage: function(direction){
    var from_page = this.pages.get(this.position) || $$([]);
    if( direction == 'ahead' ) this.position++;
    else this.position--;
    this.fireEvent("pageTurn", [from_page, this.pages.get(this.position)]);
    this.fireEvent("page" + (direction || 'ahead').capitalize(), [from_page, this.pages.get(this.position)]);

    // display or hide links based on how many pages are left
    if(!this.position) this.prev_btn.setStyle('visibility','hidden');
    else this.prev_btn.setStyle('visibility','visible');
    if(!this.pages.get(this.position+1)) this.next_btn.setStyle('visibility','hidden');
    else this.next_btn.setStyle('visibility','visible');
  },
  paginationLinks: function(){
    this.page_links = this.pages.getKeys().map(function(page, index){
      return new Element( "a", {
            "class": this.options.linkClass,
            "href": "#",
            "events": {
              "click":function(e) {
                e.preventDefault();
                var prev_page = $$(this.page_links).filter("a[class~=" + this.options.activeLinkClass +"]");
                prev_page.removeClass(this.options.activeLinkClass);
                this.goToPage((prev_page.get('html') -1), index);
                this.page_links[index].addClass(this.options.activeLinkClass);
              }.bindWithEvent(this)
            
            }
            }).set('html', (index + 1));
    }, this);
    this.page_links[this.position].addClass(this.options.activeLinkClass);
    return this.page_links;
  },
  paginationButtons: function() {
    this.next_btn = new Element( "a", {
                "class": "next_btn " + this.options.linkClass,
                "href": "#",
                "html": "next",
                "events": {
                  "click":function(e) {
                    e.preventDefault();
                    // console.log("ahead");
                    this.turnPage("ahead");
                  }.bindWithEvent(this)
                }
                });
    if (this.pages.getKeys().length == 1) this.next_btn.setStyle("visibility","hidden");
    this.prev_btn = new Element( "a", {
                "styles": {"visibility": "hidden"},
                "class": "prev_btn " + this.options.linkClass,
                "href": "#",
                "html": "previous",
                "events": {
                  "click":function(e) {
                    e.preventDefault();
                    // console.log("back");
                    this.turnPage("back");
                  }.bindWithEvent(this)
                }
                });
    return [this.prev_btn, this.next_btn];
  }
});

// Element.implement({
//     paginate: function(options){
//     }
// });
