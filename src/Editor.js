/**
 * @file editor component
 * @author Dominic Ming
 */

import React from 'react'
import PropTypes from 'prop-types'
import MoracoInstace from './MonacoInstance'
import languageRegister from './languageRegister'
import './editor.custom.css'
import htmlLanguage from './html'
import sqlLanguage from './sql'

class Editor extends React.Component{
  constructor (props) {
    super(props)
    this.editor = new MoracoInstace(props);
    // languageRegister(this.editor.getMonaco(), htmlLanguage)
    languageRegister(this.editor.getMonaco(), sqlLanguage)
    // this.editor.getMonaco().languages.registerCompletionItemProvider('mysql', {
    //   provideCompletionItems () {
    //     return {
    //       items:  [
    //         {label: 'some', kind: 0}
    //       ]
    //     }
    //   },
    //   resolveCompletionItem () {
    //     console.log(arguments)
    //   }
    // })

    // this.editor.getMonaco().languages;
  }

  componentDidMount () {
    this.editor.init();
  }

  componentDidUpdate (prevProps) {
    this.editor.update(prevProps)
  }

  assignRef = (element) => this.editor.assignContainer(element)


  render() {
    const { width, height } = this.props;
    const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`;
    const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };

    return (
      <div ref={this.assignRef} style={style} id="customEditor">
      </div>
    )
  }
}

Editor.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.object,
  editorDidMount: PropTypes.func,
  editorWillMount: PropTypes.func,
  onChange: PropTypes.func
};

Editor.defaultProps = {
  width: '100%',
  height: '100%',
  language: 'html',
  options: {},
  editorDidMount: function () {},
  editorWillMount: function () {},
  onChange: function () {}
};

export default Editor;
