import { schema } from "../utils/proseMirrorSchema";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
// prosemirror其他功能
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
// 引入react
import React, { useEffect, useState, createRef } from 'react';
// 引入自定义组件
import { AgendaHeader } from "../modules/prosemirror/AgendaHeader";
import { AgendaBodyer } from "../modules/prosemirror/AgendaBodyer";


function App() {
    const [agendaList, setAgendaList] = useState([]);
    const [num, setNum] = useState(0);
    const [agendaContainer, setAgendaContainer] = useState(createRef());
    const [agendaAditorView, setAgendaEditorView] = useState(null);

    useEffect(() => {
        // 初始化富文本状态 - 通过基础规则schema创建并保持新的state引用
        const editorState = EditorState.create({
            schema,
            plugins: [
                keymap({ "Mod-z": undo, "Mod-y": redo }),
                history()
            ]
        });
        // 使用状态editorState创建编辑器视图，并附加到body节点。
        const editorView = new EditorView(agendaContainer.current, {
            state: editorState,
            dispatchTransaction(transaction) {
                console.log("Document size went from：", transaction.before.content.size, "to", transaction.doc.content.size)
                // 更新数据
                editorView.updateState(editorView.state.apply(transaction));
            }
        })
        console.log(agendaAditorView);
        console.log(num);
        (async () => {
            await setNum(num + 1);
            await setAgendaEditorView(editorView);
        })();
        console.log(agendaAditorView);
        console.log(num);

    }, [agendaContainer])

    const handleAgendaAdd = () => {
        // view.dispatch(
        //   view.state.tr.insert(
        //     view.state.doc.content.size,
        //     ExtendedSchema.nodeFromJSON(createAgendaTemplate('template_0')),
        //   ),
        // );
    }

    return (
        <div className="App">
            <div className="Agenda-container" ref={agendaContainer}></div>
            <button onClick={handleAgendaAdd}>新增Agenda</button>
        </div>
    );
}

export default App;




