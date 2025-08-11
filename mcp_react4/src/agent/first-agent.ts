import AgentUtil  from '../lib/AgentUtil';

// first-agent
export function firstAgent(inputText){
  try{
    let text = "";
    const items = [
      { text: "firstGetRandom サイコロを回して欲しい 面数 6", title: "Step1: サイコロを振ります。" + "\n"} , 
      { text: "firstGetDate 本日の 日付を返す。", title: "Step2: 現在の 日付を返します。" + "\n"} , 
      { text: "firstGetTime 現在の 時間を返す", title: "Step3: 現在の 時間を返します。" + "\n"} , 
    ];

    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , firstAgent');
  }
}

