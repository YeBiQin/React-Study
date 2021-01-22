// 引入自定义组件
import { AgendaHeader } from "./AgendaHeader";
import { AgendaBodyer } from "./AgendaBodyer";

const AgendaItem = ({ text, emoji }) => {
  return (
    <div className="Agenda-bodyer">
      <AgendaHeader/>
      <AgendaBodyer/>
    </div>
  );
};

export default AgendaItem;