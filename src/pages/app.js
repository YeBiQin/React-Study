// 引入react
import React, { useEffect, useState, createRef } from "react";
// 引入自定义组件
import { NormalEditor } from "../components/normalEditor";
import { createAgendaEditorView } from "../modules/Agenda/createEditorView";

function App() {
  const [editorDom] = useState(createRef());
  const [editorView, setEditorView] = useState(null);

  useEffect(() => {
    // 存储富文本视图对象，方便后续的操作
    setEditorView(createAgendaEditorView(editorDom.current));
  }, [editorDom]);

  const handleAgendaAdd = () => {
    if (editorView) {
      const $state = editorView.state;
      editorView.dispatch(
        $state.tr.insert(
          $state.doc.content.size,
          $state.schema.nodeFromJSON({
            type: "agendaItem",
            content: [
              {
                type: "agendaTitle",
              },
              {
                type: "paragraph",
              },
            ],
          })
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="leftContainer">
        <NormalEditor />
      </div>
      <div className="rightContainer">
        <div className="richEditor-container" ref={editorDom}></div>
        <div className="richEditor-footer">
          <button className="richEditor-button" onClick={handleAgendaAdd}>
            新增Agenda
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
