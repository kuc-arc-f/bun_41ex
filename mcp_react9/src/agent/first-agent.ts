import AgentUtil  from '../lib/AgentUtil';

// first-agent
export function firstAgent(inputText){
  try{
    let text = "";
    const items = [
      { text: "firstGetRandom サイコロを回して欲しい 面数 6", title: "Step1: サイコロを振ります。" + "\n"} , 
      { text: "本日の 年月日を教えて欲しい", title: "Step2: 現在の 年月日を返します。" + "\n"} , 
      { text: "現在の 時間を教えて欲しい", title: "Step3: 現在の 時間を返します。" + "\n"} , 
    ];

    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , firstAgent');
  }
}

