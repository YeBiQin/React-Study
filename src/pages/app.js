// 引入react
import React, { useEffect, useState, createRef } from 'react';
// 引入自定义组件
import { NormalEditor } from "../modules/NormalEditor";
import { createEditorView } from "../modules/ProseMirror/createEditorView"

function App() {
    const [agendaContainer, setAgendaContainer] = useState(createRef());
    const [agendaEditorView, setAgendaEditorView] = useState(null);

    useEffect(() => {
        // 存储视图对象，方便后续的操作
        setAgendaEditorView(createEditorView(agendaContainer));
    }, [agendaContainer]);

    const handleAgendaAdd = () => {
        agendaEditorView.dispatch(
            agendaEditorView.state.tr.insert(
                agendaEditorView.state.doc.content.size,
                schema.nodeFromJSON({
                    type: 'agendaItem',
                    content: [
                        {
                            type: 'agendaHeader'
                        },
                        {
                            type: 'agendaBodyer'
                        }
                    ]
                }),
            )
        );
    }

    return (
        <div className="App">
            <div className="leftContainer">
                <NormalEditor/>
            </div>
            <div className="rightContainer">
                <div className="richEditor-container" ref={agendaContainer}></div>
                <button className="richEditor-button" onClick={handleAgendaAdd}>新增Agenda</button>
            </div>
        </div>
    );
}

export default App;




