import 'iCheck';
export default function ICheckDirective($timeout) {
  return {
    require: 'ngModel',
    link: function($scope, element, $attrs, ngModel) {
      return $timeout(function() {
        var value = $attrs['value'];
        $scope.$watch($attrs['ngModel'], function(newValue){
          element.iCheck('update');
        });
        return element.iCheck({
          checkboxClass: (typeof $attrs.checkboxClass === 'string') ? $attrs.checkboxClass : 'icheckbox_minimal',
          radioClass: (typeof $attrs.radioClass === 'string') ? $attrs.checkboxClass : 'iradio_minimal'
        }).on('ifChanged', function(event) {
          if (element.attr('type') === 'checkbox' && $attrs['ngModel']) {
            $scope.$apply(function() {
              return ngModel.$setViewValue(event.target.checked);
            });
          }
          if (element.attr('type') === 'radio' && $attrs['ngModel']) {
            return $scope.$apply(function() {
              return ngModel.$setViewValue(value);
            });
          }
        });
      });

    }
  };
}
