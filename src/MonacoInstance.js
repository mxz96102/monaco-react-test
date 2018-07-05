import * as Monaco from 'monaco-editor';

export default class MonacoInstance {
  constructor (props) {
    this.container = null;
    this.instance = null;
    this.option = {
      editorDidMount: function () {},
      editorDisposed: function () {},
      onChange: function () {},
      languagePlugins: [],
      preventChangeEvent: false,
      ...props
    }
  }

  assignContainer (element) {
    this.container = element
  }

  init () {
    this.instance = Monaco.editor.create(this.container, this.option);
    this.option.theme && this.instance.setTheme(this.option.theme);
    this.option.editorDidMount(this.instance);
    this.instance.onDidChangeModelContent(event => {
      const value = this.instance.getValue()

      this.option.value = value;

      if(!this.option.preventChangeEvent) {
        this.option.onChange(value, event)
      }
    })
  }

  dispose () {
    this.instance.dispose();
    this.option.editorDisposed();
  }

  update (props) {
    let newProps = {
      ...this.option,
      ...props
    }
    const isChange = key => newProps[key] !== this.option[key];

    isChange('value') && this.instance.setValue(props.value);
    isChange('language') && this.instance.setModelLanguage(this.editor.getModel(), props.language);
    isChange('theme') && this.instance.setTheme(props.theme);

    if(isChange('width') || isChange('height')) {
      this.option.width = props.width
      this.option.height = props.height
      this.instance.layout();
    }
  }

  getStyle () {
    const {width, height} = this.option;

    return {
      width,
      height
    }
  }

  getInstance = () => this.instance

  getMonaco = () => Monaco

}