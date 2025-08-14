import AgentUtil  from '../lib/AgentUtil';

export function todoAgent(inputText){
  try{
    let text = "";
    const items = [
      { text: "firstGetDate 本日の 日付を返す。", title: "Step1: 現在の 日付を返します。" + "\n"} , 
      { text: "政治の勉強する をデータベースに登録する。", title: "Step2: 現在の TODO 追加します。" + "\n"} , 
      { text: "TODO一覧を、表形式で表示します。", title: "Step3: TODO一覧を表示します" + "\n"} , 
    ];

    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , firstAgent');
  }
}

