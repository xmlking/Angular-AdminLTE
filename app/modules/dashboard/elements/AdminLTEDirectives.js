// Enable toggles
export function toggle() {
  return {
    restrict: 'A',
    compile: function (element, attr) {
      if (attr.toggle === 'offcanvas') {
        element.click(function (e) {
          e.preventDefault();

          //If window is small enough, enable sidebar push menu
          if (angular.element(window).width() <= 992) {
            angular.element('.row-offcanvas').toggleClass('active');
            angular.element('.left-side').removeClass("collapse-left");
            angular.element(".right-side").removeClass("strech");
            angular.element('.row-offcanvas').toggleClass("relative");
          } else {
            //Else, enable content streching
            angular.element('.left-side').toggleClass("collapse-left");
            angular.element(".right-side").toggleClass("strech");
          }
        });
      }
    }
  };
}

export function treeview() {
  return {
    restrict: 'A',
    compile: function (element, attr) {
      var btn = element.children("a").first();
      var menu = element.children(".treeview-menu").first();
      var isActive = element.hasClass('active');

      //initialize already active menus
      if (isActive) {
        menu.show();
        btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
      }

      //Slide open or close the menu on link click
      btn.click((e) => {
        e.preventDefault();
        if (isActive) {
          //Slide up to close menu
          menu.slideUp();
          isActive = false;
          btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
          btn.parent("li").removeClass("active");
        } else {
          //Slide down to open menu
          menu.slideDown();
          isActive = true;
          btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
          btn.parent("li").addClass("active");
        }
      });
      return {
        post: function (scope, iElem, iAttrs) {
          scope.$watch(function () {
            return element.attr('class');
          }, function (newValue, oldValue) {
            if (!newValue.contains('active')) {
              //Slide up to close menu
              menu.slideUp();
              isActive = false;
              btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
            }
          });
        }
      }
    }
  };
}

// Add hover support for touch devices
export function btn() {
  return {
    restrict: 'C',
    compile: function (element, attr) {
      element.bind('touchstart', function () {
        element.addClass('hover');
      }).bind('touchend', function () {
        element.removeClass('hover');
      });
    }
  };
}

// Add collapse and remove events to boxes
export function widget() {
  return {
    restrict: 'A',
    compile: function (element, attr) {
      if (attr.widget === 'collapse') {
        element.click(function () {
          //Find the box parent
          let box = element.parents(".box").first();
          //Find the body and the footer
          let bf = box.find(".box-body, .box-footer");
          if (!box.hasClass("collapsed-box")) {
            box.addClass("collapsed-box");
            //Convert minus into plus
            element.children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
            bf.slideUp();
          } else {
            box.removeClass("collapsed-box");
            //Convert plus into minus
            element.children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
            bf.slideDown();
          }
        });
      } else if (attr.widget === 'remove') {
        element.click(function () {
          //Find the box parent
          let box = element.parents(".box").first();
          box.slideUp();
        });
      }
    }
  };
}
