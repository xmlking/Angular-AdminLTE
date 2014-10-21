class RichTextEditor {

  constructor() {
    this.link = this.link.bind(this);

    this.restrict = "A";
    require : 'ngModel';
    transclude : true;
  }
  link(scope, element, attrs, ctrl) {

    var textarea = element.wysihtml5({"html": true});

    var editor = textarea.data('wysihtml5').editor;

    // view -> model
    editor.on( 'change', () => {
      if(editor.getValue())
        scope.$apply(function() {
          ctrl.$setViewValue(editor.getValue());
        });
    });

    // model -> view
    ctrl.$render = () => {
      textarea.html(ctrl.$viewValue);
      editor.setValue(ctrl.$viewValue);
    };

    ctrl.$render();
  }

}

export default ()=> {
  return new RichTextEditor();
}
