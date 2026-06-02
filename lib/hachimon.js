/* ===== 運命の八門 共通ロジック・データ（DOM非依存・サーバ/クライアント両用） ===== */

export const GATES = {
  kai:{name:"開門",yomi:"カイモン",arche:"開拓者",elem:"木",catch:"天の扉をひらく魂",
    honshitsu:"魂は「始まり」そのもの。澱んだ気を破り、新しい流れを呼び込む先駆けの光を宿す。人が迷う場所であなたは道を視る。",
    kage:"勢いのまま突き進み、足元の縁を置き去りにしがち。",shimei:"道なき道に灯をともし、後に続く者の標になること。",
    sougo:["★★★★☆","扉がひらく開拓の年。迷いを手放し踏み出すほど運氣が満ちる。鍵＝最初の勇気。"],
    kinun:"攻めて道を拓く先行投資型。新たな収入の源泉を生む年。直感が降りた挑戦に種銭を置き、動いた分だけ流れが来る。守りに入ると停滞。落とし穴＝浪費。",
    renai:["★★★☆☆","自ら動く恋に追い風。新しい出会いの扉がひらく年。待ちの姿勢は運を逃す。"],
    shigoto:["★★★★☆","立ち上げ・改革・先陣で輝く。新規プロジェクトに縁。"],
    kenko:"頭部・熱に注意。走り続けず鎮める時間を。対人は“人を巻き込む力”が財産。",
    aisho:"最強＝生門 ／ 癒し＝休門 ／ 刺激＝傷門 ／ 試練＝杜門"},
  sei:{name:"生門",yomi:"セイモン",arche:"育成者",elem:"土",catch:"生命を育む大地の魂",
    honshitsu:"“生命を生み育てる”門。目の前のものを地道に慈しみ、時をかけて価値を最大化する大地の器。継続と複利の人。",
    kage:"石橋を叩きすぎて好機を逃す／抱え込みすぎる。",shimei:"自分と周囲を豊かに育て、実りを分かち合うこと。",
    sougo:["★★★★☆","種が芽吹く育成の年。積み上げが形になり、後半に一気に実る。鍵＝続けてきたことを捨てない。"],
    kinun:"複利で増やす“最強の財運門”。収入の柱が太くなる年。毎月“育てる枠”へ回し、長期目線の資産に置く。落とし穴＝守りすぎて増やし損ねる。年1で攻めを。",
    renai:["★★★☆☆","じっくり育てる愛。育てた関係が実る／友人から発展。尽くしすぎに注意。"],
    shigoto:["★★★★☆","育成・運用・ストック型で無双。任される領域が拡大。"],
    kenko:"胃腸・溜め込みに注意。規則正しさが運の土台。聞き役で信頼が巡る。",
    aisho:"最強＝開門 ／ 癒し＝休門 ／ 刺激＝驚門 ／ 試練＝傷門"},
  kyu:{name:"休門",yomi:"キュウモン",arche:"癒やし手",elem:"水",catch:"静寂と調和をたずさえる水の魂",
    honshitsu:"“休らぎ”の門。水のように人の心を映し、和ませ、整える。争いの中で橋をかける稀有な調停者。",
    kage:"人を優先しすぎ、自分の器が空になる。",shimei:"疲れた魂を癒し、調和の場を生むこと。",
    sougo:["★★★☆☆","整え満ちる回復の年。整えた分だけ後の飛躍が大きい。鍵＝まず自分を満たす。"],
    kinun:"人脈から巡る安定マネー。縁が富を運ぶ年。信頼関係に投資し、固定費を整える。落とし穴＝人に流され財布が緩む。",
    renai:["★★★★☆","安心と共鳴の愛。癒し合える縁が深まる。我慢の溜め込みに注意。"],
    shigoto:["★★★☆☆","調整・サポート・ケアで輝く。チームの要になる。"],
    kenko:"冷え・腎に注意。聞き上手で慕われる。",
    aisho:"最強＝生門 ／ 癒し＝景門 ／ 刺激＝開門 ／ 試練＝死門"},
  kei:{name:"景門",yomi:"ケイモン",arche:"表現者",elem:"火",catch:"光と華をまとう炎の魂",
    honshitsu:"“景色・華やぎ”の門。生まれながらの光を放ち、見られ語られる星のもとに在る。知性と表現で人を惹きつける。",
    kage:"賞賛を求めすぎ、見栄に傾く。",shimei:"才能を世に灯し、人々を魅了し勇気づけること。",
    sougo:["★★★★☆","脚光を浴びる飛躍の年。発信した分だけ運が拡がる。鍵＝出し惜しまない。"],
    kinun:"才能・発信で稼ぐ華やかマネー。注目が富に変わる年。自分を見せる場に投資し、才能を商品化。落とし穴＝華美な散財。",
    renai:["★★★★☆","惹かれ惹かれる華の恋。モテ期の波。移り気に注意。"],
    shigoto:["★★★★☆","発信・企画・人前で輝く。名が広まる転機。"],
    kenko:"心臓・目・興奮に注意。人気者ゆえ取捨選択を。",
    aisho:"最強＝驚門 ／ 癒し＝休門 ／ 刺激＝開門 ／ 試練＝杜門"},
  to:{name:"杜門",yomi:"トモン",arche:"守護者（職人）",elem:"金",catch:"秘めたる森を守る静かな魂",
    honshitsu:"“閉ざし守る”門。内に蓄えた専門性と集中。表に出ずとも、その道を極める職人の気を宿す。",
    kage:"閉じこもり、心を開くのに時を要する。",shimei:"守るべきものを守り、技を磨き継ぐこと。",
    sougo:["★★★☆☆","内に力を蓄える研鑽の年。静かに積んだ実力が次の扉を開く。鍵＝一つを極める。"],
    kinun:"スキルで堅く稼ぎ、守りで貯める職人マネー。技術・資格に投資し、固い貯蓄を。落とし穴＝守りに偏り機会損失。",
    renai:["★★★☆☆","心を開いた相手に深く一途。信頼から育つ縁。閉じすぎに注意。"],
    shigoto:["★★★★☆","専門職・研究・裏方で無双。極めた技が評価される転機。"],
    kenko:"肩こり・自律神経に注意。狭く深い人間関係が吉。",
    aisho:"最強＝死門 ／ 癒し＝生門 ／ 刺激＝景門 ／ 試練＝開門"},
  sho:{name:"傷門",yomi:"ショウモン",arche:"挑戦者",elem:"火",catch:"雷をまとう戦士の魂",
    honshitsu:"“傷つき闘う”門。雷のごとく激しく、現状を打ち破る情熱と勝負強さを宿す。痛みを糧に進む改革者。",
    kage:"衝動・闘争心が過ぎ、自他を傷つける。",shimei:"古き殻を壊し、新たな道を勝ち取ること。",
    sougo:["★★★★☆","壁を破る勝負の年。逃げず挑むほど運が燃え立つ。鍵＝恐れに踏み込む。"],
    kinun:"勝負で大きく動く荒波マネー。攻めれば大、守れば停滞。ここぞの勝負に集中し、損切りを決めておく。落とし穴＝一発狙いの暴走。",
    renai:["★★★☆☆","情熱的で一直線の恋。刺激的な縁／復活愛。衝突に注意。"],
    shigoto:["★★★★☆","競争・開拓・改革で輝く。修羅場が飛躍に変わる。"],
    kenko:"怪我・炎症・睡眠に注意。熱量で人を動かすが衝突も。",
    aisho:"最強＝驚門 ／ 癒し＝生門 ／ 刺激＝開門 ／ 試練＝休門"},
  kyo:{name:"驚門",yomi:"キョウモン",arche:"変革者",elem:"木",catch:"風を運ぶ使者の魂",
    honshitsu:"“驚き・変化”の門。風のように自在で、機転と話術で空気を一変させる。常識を覆すトリックスター。",
    kage:"移ろいやすく、口が災いを呼ぶことも。",shimei:"停滞を揺さぶり、新しい風を吹き込むこと。",
    sougo:["★★★★☆","流れが一変する転機の年。変化を恐れぬ者に味方する。鍵＝軽やかに動く。"],
    kinun:"副業・臨時収入・ひらめき投資のチャンスマネー。意外な所から富が来る年。複数の収入源を。落とし穴＝飛びつき散財・口約束の金銭。",
    renai:["★★★☆☆","刺激と意外性の恋。急展開の縁。言葉のトラブルに注意。"],
    shigoto:["★★★★☆","企画・交渉・PR・転職で輝く。環境を変える転機。"],
    kenko:"神経・喉・落ち着きに注意。広い人脈が武器、口は慎む。",
    aisho:"最強＝景門 ／ 癒し＝休門 ／ 刺激＝傷門 ／ 試練＝生門"},
  shi:{name:"死門",yomi:"シモン",arche:"再生者（不死鳥）",elem:"水",catch:"終わりと再生をつかさどる魂",
    honshitsu:"“終わりと再生”の門。最も深く、最も強い。古いものを葬り、灰の中から甦る力を宿す。痛みと再生を知る賢者。",
    kage:"停滞・執着・過去に囚われやすい。",shimei:"手放しと再生を繰り返し、魂を磨き上げること。",
    sougo:["★★★★☆","古きを脱ぎ生まれ変わる再生の年。手放した先に光が差す。鍵＝執着を捨てる。"],
    kinun:"一度失い、より大きく再起する不死鳥マネー。断捨離が富を呼ぶ年。不要な固定費・関係を清算し、ゼロから育て直す。落とし穴＝過去への執着。",
    renai:["★★★☆☆","深く再生する愛。腐れ縁の卒業／復活愛／運命的再会。執着に注意。"],
    shigoto:["★★★★☆","再建・転換・専門の深化で輝く。区切りと再出発の転機。"],
    kenko:"慢性疲労・睡眠に注意。少数の深い縁が支え。",
    aisho:"最強＝杜門 ／ 癒し＝休門 ／ 刺激＝驚門 ／ 試練＝景門"},
};
export const ORDER = ["kai","sei","kyu","kei","to","sho","kyo","shi"];

export const QUESTIONS = [
 {q:"新しい環境に入ったとき、あなたは？",o:[["自分から動いて場をつくる",{kai:2,sho:1}],["様子を見て、人と人をつなぐ",{kyu:2,sei:1}],["得意を見せて存在感を出す",{kei:2,kai:1}],["変化を楽しみ、面白い人を探す",{kyo:2,shi:1}]]},
 {q:"休日の過ごし方は？",o:[["新しい場所・イベントへ突撃",{kai:2,kyo:1}],["好きなことをコツコツ極める",{to:2,sei:1}],["大切な人とゆっくり癒される",{kyu:2,kei:1}],["ひとりで深く内省・リセット",{shi:2,sho:1}]]},
 {q:"物事で一番大事にするのは？",o:[["勢いと情熱で勝負する",{sho:2,kai:1}],["継続と積み重ね",{sei:2,to:1}],["魅せ方・表現の美しさ",{kei:2,kyu:1}],["革新と意外性",{kyo:2,shi:1}]]},
 {q:"悩んだとき、どう動く？",o:[["とにかく動いて打開する",{sho:2,kai:1}],["信頼できる人に相談し支え合う",{kyu:2,sei:1}],["ひとりで調べ抜いて答えを出す",{to:2,shi:1}],["人に話し、発想を広げる",{kei:2,kyo:1}]]},
 {q:"お金の使い方は？",o:[["チャンスに思い切って投資",{kai:2,sho:1}],["コツコツ貯めて長期で増やす",{sei:2,to:1}],["人・経験・癒しに使う",{kyu:2,kei:1}],["必要なものだけ、潔く手放す",{shi:2,kyo:1}]]},
 {q:"人からよく言われるのは？",o:[["頼れる・面倒見がいい",{sei:2,kyu:1}],["華がある・目立つ",{kei:2,kai:1}],["芯が強い・職人気質",{to:2,shi:1}],["読めない・面白い",{kyo:2,sho:1}]]},
 {q:"ピンチのときの動き方は？",o:[["真っ向から勝負を挑む",{sho:2,kai:1}],["守りを固めて耐える",{to:2,sei:1}],["一度手放して立て直す",{shi:2,kyu:1}],["機転で切り抜ける",{kyo:2,kei:1}]]},
 {q:"心惹かれる言葉は？",o:[["「道なき道を行け」",{kai:2,kyo:1}],["「育てた者が、実を得る」",{sei:2,to:1}],["「逆境こそ、燃えよ」",{sho:2,kai:1}],["「終わりは、始まり」",{shi:2,kyu:1}]]},
];

export const KYUSEI={1:"一白水星",2:"二黒土星",3:"三碧木星",4:"四緑木星",5:"五黄土星",6:"六白金星",7:"七赤金星",8:"八白土星",9:"九紫火星"};
export const KYUSEI_ELEM={1:"水",2:"土",3:"木",4:"木",5:"土",6:"金",7:"金",8:"土",9:"火"};
export const HOUI={
  "水":{kichi:["北","西","北西"],kinun:["南"]},"木":{kichi:["北","東","南東"],kinun:["南西","北東"]},
  "火":{kichi:["東","南東","南"],kinun:["西","北西"]},"土":{kichi:["南","南西","北東"],kinun:["北"]},
  "金":{kichi:["南西","北東","西","北西"],kinun:["東","南東"]},
};
export const GEN={"木":"火","火":"土","土":"金","金":"水","水":"木"}; // 相生(生む)
export const KOKU={"木":"土","土":"水","水":"火","火":"金","金":"木"}; // 相剋(剋す)

// 2門の五行関係から相性を判定（★2〜5の振れ幅・忖度なし）
export function compatGate(aKey,bKey){
  const ga=GATES[aKey], gb=GATES[bKey], ea=ga.elem, eb=gb.elem;
  if(aKey===bKey) return {cat:"同門",stars:"★★★★☆",
    text:`同じ「${ga.name}」の魂を持つ二人。痛いほど分かり合えるが、弱点もそっくり。同じ穴に落ちないよう支え合って。`};
  if(ea===eb) return {cat:"比和",stars:"★★★☆☆",
    text:`同じ「${ea}」の気を持つ似た者同士。波長は合うが、長所も短所も重なりやすい。張り合うとこじれ、認め合えば強い。`};
  if(GEN[eb]===ea) return {cat:"育まれる相性",stars:"★★★★★",
    text:`相手の「${eb}」があなたの「${ea}」を生かす、最高の相性。一緒にいるほど運が満ち、あなたが伸びていく相手。`};
  if(GEN[ea]===eb) return {cat:"与える相性",stars:"★★★★☆",
    text:`あなたの「${ea}」が相手の「${eb}」を育てる相性。与える喜びは大きいが、一方通行になりがち。たまには甘えて。`};
  if(KOKU[ea]===eb) return {cat:"リードする相性",stars:"★★★☆☆",
    text:`あなたの「${ea}」が相手の「${eb}」を抑える相性。主導権は持てるが、相手を窮屈にさせやすい。緩めるほど長続き。`};
  // KOKU[eb]===ea
  return {cat:"試練の相性",stars:"★★☆☆☆",
    text:`相手の「${eb}」があなたの「${ea}」を抑える、刺激と試練の相性。鍛えられるが消耗も大きい。違いを認める覚悟が要る。`};
}
// その門にとって「相性◎(育まれる)」「試練」の門名（五行で算出・結果/図鑑用）
export function affinityGates(aKey){
  const ea=GATES[aKey].elem, great=[], hard=[];
  for(const b of ORDER){ if(b===aKey)continue; const eb=GATES[b].elem;
    if(GEN[eb]===ea) great.push(GATES[b].name);
    if(KOKU[eb]===ea) hard.push(GATES[b].name);
  }
  return {great, hard};
}
export const DIR_OPP={"北":"南","南":"北","東":"西","西":"東","北東":"南西","南西":"北東","北西":"南東","南東":"北西"};

export function honmeiSei(y,m,d){
  let yy=y; if(m<2||(m===2&&d<=3)) yy=y-1;
  let s=String(yy).split("").reduce((a,c)=>a+(+c),0);
  while(s>=10) s=String(s).split("").reduce((a,c)=>a+(+c),0);
  let h=11-s; if(h>=10) h-=9; return h;
}
export function hsFromBirth(bv){
  if(!bv) return null; const [y,m,d]=bv.split("-").map(Number);
  const num=honmeiSei(y,m,d); return {num,elem:KYUSEI_ELEM[num],name:KYUSEI[num],houi:HOUI[KYUSEI_ELEM[num]]};
}
export function judgeGate(answers,honmeiElem){
  const s={}; ORDER.forEach(k=>s[k]=0);
  answers.forEach((oi,qi)=>{const w=QUESTIONS[qi].o[oi][1];for(const k in w)s[k]+=w[k];});
  const max=Math.max(...ORDER.map(k=>s[k])); let tied=ORDER.filter(k=>s[k]===max);
  if(tied.length===1)return tied[0];
  const aff=k=>{const e=GATES[k].elem;return e===honmeiElem?2:(GEN[honmeiElem]===e?1:0);};
  const a=Math.max(...tied.map(aff)); let t2=tied.filter(k=>aff(k)===a);
  if(t2.length===1)return t2[0];
  const q8=QUESTIONS[7].o[answers[7]][1]; const q8k=Object.keys(q8).reduce((x,y)=>q8[x]>=q8[y]?x:y);
  if(t2.includes(q8k))return q8k;
  return ORDER.find(k=>t2.includes(k));
}

/* 今日の方角（MVP-lite: 日付で決定的に回す。本格化は九星日盤に差し替え） */
export const COLORS=["ゴールド","ホワイト","ロイヤルブルー","エメラルド","パープル","レッド","シルバー","ピンク","ターコイズ"];
export const ITEMS=["手帳","お守り","観葉植物","アロマ","新しいペン","水晶","コーヒー","花","香り袋"];
export const WORDS=["小さな一歩が後で大きく効く日。","流れに逆らわず、整える一日に。","勝負より準備が運を呼ぶ。","手放すほど新しい縁が来る。","発信が追い風になる日。","守りを固めて静かに力を蓄えて。","直感を信じて動くと吉。","人とのご縁が金運を運ぶ。","区切りをつけると道が開く。"];
export function dayIndex(date){const s=new Date(date.getFullYear(),0,0);return Math.floor((date-s)/86400000);}
export function todayInfo(hs,date){
  const di=dayIndex(date), k=hs.houi.kichi, kn=hs.houi.kinun;
  const kichi=k[di%k.length], kinun=kn[di%kn.length];
  return {
    date, kichi, kinun, avoid:DIR_OPP[kichi]||"—",
    color:COLORS[(di+hs.num)%COLORS.length], item:ITEMS[(di*2+hs.num)%ITEMS.length],
    word:WORDS[(di+hs.num)%WORDS.length]
  };
}

/* localStorage（本命星の保存・今日の方角で再利用） */
export function saveBirth(bv){try{localStorage.setItem("hachimon_birth",bv);}catch(e){}}
export function loadBirth(){try{return localStorage.getItem("hachimon_birth")||"";}catch(e){return"";}}

/* 結果カード画像（診断・相性で共用・ブラウザのcanvasで描画） */
function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();}
export function drawCard(canvas,g,hsName,houi){
  const x=canvas.getContext("2d"),W=1080,H=1080;
  const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,"#fffdf8");bg.addColorStop(1,"#f4ecdb");
  x.fillStyle=bg;x.fillRect(0,0,W,H);
  x.strokeStyle="rgba(122,92,255,0.10)";x.lineWidth=2;[300,250,200].forEach(rad=>{x.beginPath();x.arc(W/2,470,rad,0,Math.PI*2);x.stroke();});
  ["北","東","南","西"].forEach((t,i)=>{const ang=-Math.PI/2+i*Math.PI/2;x.fillStyle="rgba(184,147,47,0.55)";x.font='500 26px serif';x.textAlign="center";x.fillText(t,W/2+Math.cos(ang)*320,470+Math.sin(ang)*320+9);});
  x.strokeStyle="#c8a14a";x.lineWidth=4;rr(x,40,40,W-80,H-80,30);x.stroke();
  x.strokeStyle="#e6d6a6";x.lineWidth=1.5;rr(x,58,58,W-116,H-116,22);x.stroke();
  x.textAlign="center";
  x.fillStyle="#b8932f";x.font='600 30px "Hiragino Mincho ProN",serif';x.fillText("運 命 の 八 門   ✦   2 0 2 6",W/2,148);
  x.fillStyle="#9b8f6a";x.font='500 26px "Hiragino Mincho ProN",serif';x.fillText("あなたの正体",W/2,250);
  x.fillStyle="#33304a";x.font='700 128px "Hiragino Mincho ProN",serif';x.fillText(g.name,W/2,415);
  x.fillStyle="#7a5cff";x.font='600 50px "Hiragino Mincho ProN",serif';x.fillText(g.arche,W/2,495);
  x.fillStyle="#8a849c";x.font='italic 29px "Hiragino Mincho ProN",serif';x.fillText("― "+g.catch+" ―",W/2,553);
  x.strokeStyle="#e6d6a6";x.lineWidth=2;x.beginPath();x.moveTo(W/2-210,650);x.lineTo(W/2+210,650);x.stroke();
  x.fillStyle="#33304a";x.font='500 38px "Hiragino Mincho ProN",serif';x.fillText("本命星  "+hsName,W/2,725);
  x.fillStyle="#b8932f";x.font='600 38px "Hiragino Mincho ProN",serif';
  x.fillText("開運方位   "+houi.kichi.join(" ・ "),W/2,808);x.fillText("金運方位   "+houi.kinun.join(" ・ "),W/2,872);
  x.fillStyle="#9b8f6a";x.font='500 30px "Hiragino Mincho ProN",serif';x.fillText("#運命の八門診断",W/2,980);
  return canvas;
}
