import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../src/Editor'
// eslint-disable-next-line import/no-unresolved, import/extensions

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'CREATE TABLE dbo.EmployeePhoto\n' +
      '(\n' +
      '    EmployeeId INT NOT NULL PRIMARY KEY,\n' +
      '    Photo VARBINARY(MAX) FILESTREAM NULL,\n' +
      '    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL\n' +
      '                    UNIQUE DEFAULT NEWID()\n' +
      ');\n' +
      '\n' +
      'GO\n' +
      '\n' +
      '/*\n' +
      'text_of_comment\n' +
      '/* nested comment */\n' +
      '*/\n' +
      '\n' +
      '-- line comment\n' +
      '\n' +
      'CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID\n' +
      '    ON Production.WorkOrder(ProductID)\n' +
      '    WITH (FILLFACTOR = 80,\n' +
      '        PAD_INDEX = ON,\n' +
      '        DROP_EXISTING = ON);\n' +
      'GO\n' +
      '\n' +
      'WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300\n' +
      'BEGIN\n' +
      '   UPDATE Production.Product\n' +
      '      SET ListPrice = ListPrice * 2\n' +
      '   SELECT MAX(ListPrice) FROM Production.Product\n' +
      '   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500\n' +
      '      BREAK\n' +
      '   ELSE\n' +
      '      CONTINUE\n' +
      'END\n' +
      'PRINT \'Too much for the market to bear\';\n' +
      '\n' +
      'MERGE INTO Sales.SalesReason AS [Target]\n' +
      'USING (VALUES (\'Recommendation\',\'Other\'), (\'Review\', \'Marketing\'), (\'Internet\', \'Promotion\'))\n' +
      '       AS [Source] ([NewName], NewReasonType)\n' +
      'ON [Target].[Name] = [Source].[NewName]\n' +
      'WHEN MATCHED\n' +
      'THEN UPDATE SET ReasonType = [Source].NewReasonType\n' +
      'WHEN NOT MATCHED BY TARGET\n' +
      'THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)\n' +
      'OUTPUT $action INTO @SummaryOfChanges;\n' +
      '\n' +
      'SELECT ProductID, OrderQty, SUM(LineTotal) AS Total\n' +
      'FROM Sales.SalesOrderDetail\n' +
      'WHERE UnitPrice < $5.00\n' +
      'GROUP BY ProductID, OrderQty\n' +
      'ORDER BY ProductID, OrderQty\n' +
      'OPTION (HASH GROUP, FAST 10);\n',
    }
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e); // eslint-disable-line no-console
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n');
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' });
  }

  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue}>Change value</button>
          <button onClick={this.changeBySetState}>Change by setState</button>
        </div>
        <hr/>
        <Editor
          height="500"
          width="800"
          language="mysql"
          value={code}
          options={options}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
