const defaultTemplateUrl = 'modules/dashboard/partials/content-header.html';

class BreadcrumbsDirective {

  constructor($state) {
    this.link = this.link.bind(this);

    this.state = $state;
    this.restrict = "AE";
    this.scope = {
      displaynameProperty: '@',
      abstractProxyProperty: '@?'
    }
  }

  templateUrl(elem, attrs) {
    return attrs.templateUrl || defaultTemplateUrl;
  }

  link(scope, element, attrs) {
    scope.breadcrumbs = [];
    if (this.state.$current.name !== '') {
      this.updateBreadcrumbsArray(scope);
    }
    scope.$on('$stateChangeSuccess', () => {
      this.updateBreadcrumbsArray(scope);
    });
  }

  /**
   * Start with the current state and traverse up the path to build the
   * array of breadcrumbs that can be used in an ng-repeat in the template.
   */
  updateBreadcrumbsArray(scope) {
    let breadcrumbs = [];
    let workingState;
    let currentState = this.state.$current;
    while (currentState && currentState.name !== '') {
      workingState = this.getWorkingState(currentState);
      //Check whether the current `state` has already appeared in the current breadcrumbs array.
      // This check is necessary when using abstract states that might specify a proxy that is already there in the breadcrumbs.
      if (workingState && workingState.content && !breadcrumbs.find(crumb => crumb.route === workingState.name)) {
        breadcrumbs.push(
          angular.extend(workingState.content, {
            route: workingState.name
          })
        );
      }
      currentState = currentState.parent;
    }
    breadcrumbs.reverse();
    scope.breadcrumbs = breadcrumbs;
  }

  /**
   * Get the state to put in the breadcrumbs array, taking into account that if the current state is abstract,
   * we need to either substitute it with the state named in the `scope.abstractProxyProperty` property, or
   * set it to `false` which means this breadcrumb level will be skipped entirely.
   * @param currentState
   * @returns {*}
   */
    getWorkingState(currentState) {
    let proxyStateName;
    let workingState = currentState;
    if (currentState.abstract === true) {
      if (typeof this.scope.abstractProxyProperty !== 'undefined') {
        proxyStateName = this.getObjectValue(this.scope.abstractProxyProperty, currentState);
        if (proxyStateName) {
          workingState = this.state.get(proxyStateName);
        } else {
          workingState = false;
        }
      } else {
        workingState = false;
      }
    }
    return workingState;
  }

  /**
   * Given a string of the type 'object.property.property', traverse the given context (eg the current $state object) and return the
   * value found at that path
   */
  getObjectValue(key, obj) {
    _(key.split('.')).reduce( ((obj, key) => obj[key]), obj)
  }

}

export default ($state)=> {
  return new BreadcrumbsDirective($state);
}
