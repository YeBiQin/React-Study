import { schema } from "../utils/proseMirrorSchema";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
// prosemirror其他功能
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import placeholder from "../modules/prosemirror/Plugins";
// 引入react
import React, { useEffect, useState, createRef } from 'react';
// 引入自定义组件
// import ReactNodeView, { createNodeView } from "../utils/ReactNodeView";
import { AgendaItem } from "../modules/prosemirror/AgendaItem";
import { AgendaHeader } from "../modules/prosemirror/AgendaHeader";
import { AgendaBodyer } from "../modules/prosemirror/AgendaBodyer";


class ReactNodeView {
    constructor(node) {
        this.dom = document.createElement('div');
        this.dom.classList.add(`richEditor-${node.type.name}`);
        // 判断是否是末尾节点，如果不是则证明还有子节点
        if (!node.isLeaf) {
            this.contentDOM = document.createElement('div');
            this.contentDOM.classList.add(`richEditor-content`);
            this.dom.appendChild(this.contentDOM);
        }
    }
}

function App() {
    const [agendaContainer, setAgendaContainer] = useState(createRef());
    const [agendaEditorView, setAgendaEditorView] = useState(null);

    useEffect(() => {
        // 初始化富文本状态 - 通过基础规则schema创建并保持新的state引用
        const editorState = EditorState.create({
            schema,
            plugins: [
                keymap({ "Mod-z": undo, "Mod-y": redo }),
                history(),
                placeholder({
                    agendaHeader: "Please enter the title of the agenda",
                    agendaBodyer: "Please input agenda content"
                })
            ]
        });
        // 使用状态editorState创建编辑器视图，并附加到body节点。
        const editorView = new EditorView(agendaContainer.current, {
            state: editorState,
            nodeViews: {
                agendaItem(node) {
                    return new ReactNodeView(node)
                },
                agendaHeader(node) {
                    return new ReactNodeView(node)
                },
                agendaBodyer(node) {
                    return new ReactNodeView(node)
                }
            },
            dispatchTransaction(transaction) {
                console.log(transaction)
                // 更新数据
                console.log("Document size went from：", transaction.before.content.size, "to", transaction.doc.content.size)
                editorView.updateState(editorView.state.apply(transaction));
            }
        });

        // 存储视图对象，方便后续的操作
        setAgendaEditorView(editorView);
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
            <div className="richEditor-container" ref={agendaContainer}></div>
            <button className="richEditor-button" onClick={handleAgendaAdd}>新增Agenda</button>
        </div>
    );
}

export default App;




