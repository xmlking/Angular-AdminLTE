export default class HeaderController {

  constructor($scope, $window) {

    this.window = $window;

    function _fix () {
      //Get window height and the wrapper height
      let height = $window.innerHeight - angular.element('body > .header').height();

      angular.element('.wrapper').css('min-height', height + 'px');
      let content = angular.element('.wrapper').height();
      //If the wrapper height is greater than the window
      if (content > height)
      //then set sidebar height to the wrapper
        angular.element('.left-side, html, body').css('min-height', content + 'px');
      else {
        //Otherwise, set the sidebar to the height of the window
        angular.element('.left-side, html, body').css('min-height', height + 'px');
      }
    }

    function fix_sidebar() {
      //Make sure the body tag has the .fixed class
      if (!angular.element('body').hasClass('fixed')) {
        return;
      }

      //Add slimscroll //TODO use directive ?
      angular.element('.sidebar').slimscroll({
        height: ($window.innerHeight - angular.element('.header').height()) + 'px',
        color: 'rgba(0,0,0,0.2)'
      });
    }

    angular.element($window).bind('resize', function()  {
      _fix();
      fix_sidebar();
    });

    //Fire upon load
    _fix();

    //Fix the fixed layout sidebar scroll bug
    fix_sidebar();

  }

}
