export const BATTLE_QUIZ_DATA = {
  "metadata": {
    "title": "对日IT全场景实战刷题对决题库 (Cross-Scene Battle Drill Pool)",
    "subtitle": "跨越单课界限 · 覆盖全场景5大实战战力维度 · 模拟日本客户现场交锋与心理拆解",
    "lastUpdated": "2026-09-09",
    "totalQuestions": 60,
    "categories": [
      {
        "id": "objection",
        "name": "🛡️ 异议化解",
        "badge": "异议化解",
        "desc": "应对日本客户顾虑、安全担忧与一线抵触阻力"
      },
      {
        "id": "pitfall",
        "name": "🚫 避坑防雷",
        "badge": "避坑防雷",
        "desc": "纠正中国工程师高频职场失礼与NG思维误区"
      },
      {
        "id": "elicitation",
        "name": "🔍 需求下钻",
        "badge": "需求下钻",
        "desc": "运用5W1H深挖非功能指标与定量业务边界"
      },
      {
        "id": "scope",
        "name": "📐 范围把控",
        "badge": "范围把控",
        "desc": "分期交付(Phasing)与需求变更(CR)谈判艺术"
      },
      {
        "id": "keigo",
        "name": "👔 高阶敬语",
        "badge": "高阶敬语",
        "desc": "日企IT顾问地道谦敬、缓冲语与公关实战选用"
      }
    ]
  },
  "questions": [
    {
      "id": "q_obj_01",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 1: SFA业务调研",
      "sceneId": "scene-1",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長 (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "客户田中部长对SFA引入AI自动生成商谈纪要与商机预测表示强烈抵触，担心加重一线销售负担。",
      "dialogue": "「現場の営業は今のシステムでも入力が面倒だと愚痴を言っているのに、AIなんか入れたら余計に現場が混乱して負担が増えるんじゃないですか？」",
      "prompt": "作为负责该SFA导入的项目经理，以下哪一种回应在日企商务交锋中最为得体且具备说服力？",
      "options": [
        {
          "label": "A",
          "text": "最新のAIですのでUIは極めて直感的ですし、どなたでも問題なくすぐにお使いいただけます。",
          "analysis": "【NG】空洞的主观打包票（「どなたでもすぐにお使いいただけます」），既无数据支撑，也完全无视了部长对一线反弹的现实顾虑，显得极其轻浮推销。",
          "textWithRuby": "<ruby>最新<rt>さいしん</rt></ruby>のAIですのでUIは<ruby>極めて<rt>きわめて</rt></ruby><ruby>直感<rt>ちょっかん</rt></ruby><ruby>的<rt>てき</rt></ruby>ですし、どなたでも<ruby>問題<rt>もんだい</rt></ruby>なくすぐにお<ruby>使い<rt>つかい</rt></ruby>いただけます。"
        },
        {
          "label": "B",
          "text": "田中部長のおっしゃる懸念はごもっともです。まずは既存の手入力を増やすのではなく、スマホでの音声メモ自動要約など『負担を減らす部分』から限定的に試行し、現場の実感値を計測してはいかがでしょうか。",
          "analysis": "【正解】先以「ごもっともです」同理倾听接纳部长情绪；明确指出AI不是增加输入，而是用于「减轻现有负担（音声要約）」；并提出「限定的试行+指标衡量」的小步快跑推进策略。",
          "textWithRuby": "<ruby>田中<rt>たなか</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>のおっしゃる<ruby>懸念<rt>けねん</rt></ruby>はごもっともです。まずは<ruby>既存<rt>きそん</rt></ruby>の<ruby>手<rt>て</rt></ruby><ruby>入力<rt>にゅうりょく</rt></ruby>を<ruby>増やす<rt>ふやす</rt></ruby>のではなく、スマホでの<ruby>音声<rt>おんせい</rt></ruby>メモ<ruby>自動<rt>じどう</rt></ruby><ruby>要約<rt>ようやく</rt></ruby>など『<ruby>負担<rt>ふたん</rt></ruby>を<ruby>減らす<rt>へらす</rt></ruby><ruby>部分<rt>ぶぶん</rt></ruby>』から<ruby>限定<rt>げんてい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>試行<rt>しこう</rt></ruby>し、<ruby>現場<rt>げんば</rt></ruby>の<ruby>実感<rt>じっかん</rt></ruby><ruby>値<rt>ち</rt></ruby>を<ruby>計測<rt>けいそく</rt></ruby>してはいかがでしょうか。"
        },
        {
          "label": "C",
          "text": "現場の負担が増えるかどうかは現場の意識次第ですので、まず部長から現場への社内周知と教育を徹底していただけますか。",
          "analysis": "【NG】把系统导入的阻力责任甩锅给客户内部（「現場の意識次第」），甚至教客户部长怎么管员工，极其失礼且引发对立情绪。",
          "textWithRuby": "<ruby>現場<rt>げんば</rt></ruby>の<ruby>負担<rt>ふたん</rt></ruby>が<ruby>増える<rt>ふえる</rt></ruby>かどうかは<ruby>現場<rt>げんば</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby><ruby>次第<rt>しだい</rt></ruby>ですので、まず<ruby>部長<rt>ぶちょう</rt></ruby>から<ruby>現場<rt>げんば</rt></ruby>への<ruby>社内<rt>しゃない</rt></ruby><ruby>周知<rt>しゅうち</rt></ruby>と<ruby>教育<rt>きょういく</rt></ruby>を<ruby>徹底<rt>てってい</rt></ruby>していただけますか。"
        },
        {
          "label": "D",
          "text": "AIを導入しないと他社との競争に負けてしまいますので、ここは多少混乱が生じても推進すべきかと存じます。",
          "analysis": "【NG】制造焦虑并轻视混乱（「多少混乱が生じても」），客户高管最重视的是业务连续性与组织稳定，强行施压只会招致直接否决。",
          "textWithRuby": "AIを<ruby>導入<rt>どうにゅう</rt></ruby>しないと<ruby>他社<rt>たしゃ</rt></ruby>との<ruby>競争<rt>きょうそう</rt></ruby>に<ruby>負け<rt>まけ</rt></ruby>てしまいますので、ここは<ruby>多少<rt>たしょう</rt></ruby><ruby>混乱<rt>こんらん</rt></ruby>が<ruby>生じ<rt>しょうじ</rt></ruby>ても<ruby>推進<rt>すいしん</rt></ruby>すべきかと<ruby>存じ<rt>ぞんじ</rt></ruby>ます。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "采用『倾听受容（ごもっともです） ➜ 重新定义价值（負担増加ではなく定常業務削減） ➜ 低风险试点（限定的試行＋効果測定）』的黄金三部曲。",
        "clientSubtext": "部长并不反感先进技术，他真正害怕的是：系统上线后一线员工怨声载道、录入数据质量极差，导致他在董事会上无法向社长交代ROI。",
        "keyPhrases": [
          {
            "jp": "おっしゃる懸念はごもっともです",
            "zh": "您的担忧完全在理（极高级的受容共情表达）",
            "jpWithRuby": "おっしゃる<ruby>懸念<rt>けねん</rt></ruby>はごもっともです"
          },
          {
            "jp": "負担を減らす部分から限定的に試行する",
            "zh": "从切实减轻负担的局部展开限定性试点",
            "jpWithRuby": "<ruby>負担<rt>ふたん</rt></ruby>を<ruby>減らす<rt>へらす</rt></ruby><ruby>部分<rt>ぶぶん</rt></ruby>から<ruby>限定<rt>げんてい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>試行<rt>しこう</rt></ruby>する"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 4 轮对话（李：まずは定常業務の負担軽減からスモールスタートし...）"
      },
      "dialogueWithRuby": "「<ruby>現場<rt>げんば</rt></ruby>の<ruby>営業<rt>えいぎょう</rt></ruby>は<ruby>今<rt>いま</rt></ruby>のシステムでも<ruby>入力<rt>にゅうりょく</rt></ruby>が<ruby>面倒<rt>めんどう</rt></ruby>だと<ruby>愚痴<rt>ぐち</rt></ruby>を<ruby>言っ<rt>いっ</rt></ruby>ているのに、AIなんか<ruby>入れ<rt>いれ</rt></ruby>たら<ruby>余計<rt>よけい</rt></ruby>に<ruby>現場<rt>げんば</rt></ruby>が<ruby>混乱<rt>こんらん</rt></ruby>して<ruby>負担<rt>ふたん</rt></ruby>が<ruby>増える<rt>ふえる</rt></ruby>んじゃないですか？」"
    },
    {
      "id": "q_obj_02",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 11: CS客服系统改善",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "高橋 カスタマーサポート長",
      "speakerRole": "CS部 統括責任者 (クライアント側)",
      "speakerAvatar": "👩‍💼",
      "context": "在讨论客服引入AI聊天机器人(Chatbot)自动应答时，高桥主管担心AI回答错误会导致重大客诉与品牌信誉受损。",
      "dialogue": "「チャットボットがもしお客様に対して的外れな回答や誤った規約案内をしてしまったら、会社の信用問題になります。やはりAIに任せるのはリスクが高すぎるのでは？」",
      "prompt": "作为对日IT系统架构师，如何从技术防线与运营流程两方面化解高桥主管的恐惧？",
      "options": [
        {
          "label": "A",
          "text": "当社のAIモデルは正答率99.9%を誇っておりますので、誤回答が生じる可能性は極めてゼロに近いです。",
          "analysis": "【NG】在日企商谈中给出绝对数字承诺（「正答率99.9%」「ゼロに近い」）是大忌，一旦遇到边缘案例出现客诉，乙方将被判定为虚假陈述或重大违约。",
          "textWithRuby": "<ruby>当社<rt>とうしゃ</rt></ruby>のAIモデルは<ruby>正答<rt>せいとう</rt></ruby><ruby>率<rt>りつ</rt></ruby>99.9%を<ruby>誇っ<rt>ほこっ</rt></ruby>ておりますので、<ruby>誤<rt>ご</rt></ruby><ruby>回答<rt>かいとう</rt></ruby>が<ruby>生じる<rt>しょうじる</rt></ruby><ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>は<ruby>極めて<rt>きわめて</rt></ruby>ゼロに<ruby>近い<rt>ちかい</rt></ruby>です。"
        },
        {
          "label": "B",
          "text": "万が一誤案内があった場合でも、チャット画面上に『回答は参考情報です』という免責事項を表示しておけば法的には問題ございません。",
          "analysis": "【NG】从冰冷的法律免责角度敷衍（「免責事項を出せば法的問題ない」），彻底违背了日企注重客户满意度（CS）和商誉的根本诉求，会显得极为冷血且不负责任。",
          "textWithRuby": "<ruby>万が一<rt>まんがいち</rt></ruby><ruby>誤<rt>ご</rt></ruby><ruby>案内<rt>あんない</rt></ruby>があった<ruby>場合<rt>ばあい</rt></ruby>でも、チャット<ruby>画面<rt>がめん</rt></ruby><ruby>上<rt>じょう</rt></ruby>に『<ruby>回答<rt>かいとう</rt></ruby>は<ruby>参考<rt>さんこう</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>です』という<ruby>免責<rt>めんせき</rt></ruby><ruby>事項<rt>じこう</rt></ruby>を<ruby>表示<rt>ひょうじ</rt></ruby>しておけば<ruby>法的<rt>ほうてき</rt></ruby>には<ruby>問題<rt>もんだい</rt></ruby>ございません。"
        },
        {
          "label": "C",
          "text": "ご懸念は非常に重要です。AIは定型的なFAQのみに絞り、確信度が一定値を下回った場合やクレーム兆候を検知した際は即座にオペレーターへ有人エスカレーションする2重の安全設計をご提案しております。",
          "analysis": "【正解】高度认同客户对品牌风控的重视；提出「范围限定（定型FAQ）＋置信度阈值监控＋即时人工转接（有人エスカレーション）」的人机协同双重安全防线，彻底打消风控疑虑。",
          "textWithRuby": "ご<ruby>懸念<rt>けねん</rt></ruby>は<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>重要<rt>じゅうよう</rt></ruby>です。AIは<ruby>定型<rt>ていけい</rt></ruby><ruby>的<rt>てき</rt></ruby>なFAQのみに<ruby>絞り<rt>しぼり</rt></ruby>、<ruby>確信<rt>かくしん</rt></ruby><ruby>度<rt>ど</rt></ruby>が<ruby>一定<rt>いってい</rt></ruby><ruby>値<rt>ち</rt></ruby>を<ruby>下回っ<rt>したまわっ</rt></ruby>た<ruby>場合<rt>ばあい</rt></ruby>やクレーム<ruby>兆候<rt>ちょうこう</rt></ruby>を<ruby>検知<rt>けんち</rt></ruby>した<ruby>際<rt>さい</rt></ruby>は<ruby>即座<rt>そくざ</rt></ruby>にオペレーターへ<ruby>有人<rt>ゆうじん</rt></ruby>エスカレーションする2<ruby>重<rt>え</rt></ruby>の<ruby>安全<rt>あんぜん</rt></ruby><ruby>設計<rt>せっけい</rt></ruby>をご<ruby>提案<rt>ていあん</rt></ruby>しております。"
        },
        {
          "label": "D",
          "text": "誤回答を完全に防ぐことは不可能ですので、リスクを許容できないのであればボットの導入は見送った方が賢明です。",
          "analysis": "【NG】消极退缩与赌气式建议（「見送った方が賢明」），放弃了顾问为客户提供可行解决方案的专业职责。",
          "textWithRuby": "<ruby>誤<rt>ご</rt></ruby><ruby>回答<rt>かいとう</rt></ruby>を<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>防ぐ<rt>ふせぐ</rt></ruby>ことは<ruby>不<rt>ふ</rt></ruby><ruby>可能<rt>かのう</rt></ruby>ですので、リスクを<ruby>許容<rt>きょよう</rt></ruby>できないのであればボットの<ruby>導入<rt>どうにゅう</rt></ruby>は<ruby>見送っ<rt>みおくっ</rt></ruby>た<ruby>方<rt>ほう</rt></ruby>が<ruby>賢明<rt>けんめい</rt></ruby>です。"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "明确界定人机边界：『AI担当一审（定型案内）＋ 置信度熔断机制 ＋ 无缝人工兜底（有人対応連携）』。",
        "clientSubtext": "高桥作为客服负责人，考核第一指标就是客诉率和客户满意度。她绝不容许失控的黑盒算法直接代表公司向VIP客户发声。",
        "keyPhrases": [
          {
            "jp": "確信度が一定値を下回る",
            "zh": "置信度低于特定阈值",
            "jpWithRuby": "<ruby>確信<rt>かくしん</rt></ruby><ruby>度<rt>ど</rt></ruby>が<ruby>一定<rt>いってい</rt></ruby><ruby>値<rt>ち</rt></ruby>を<ruby>下回る<rt>したまわる</rt></ruby>"
          },
          {
            "jp": "有人エスカレーション",
            "zh": "即时升级转接人工坐席",
            "jpWithRuby": "<ruby>有人<rt>ゆうじん</rt></ruby>エスカレーション"
          },
          {
            "jp": "2重の安全設計（フェイルセーフ）",
            "zh": "双重安全设计（故障保护机制）",
            "jpWithRuby": "2<ruby>重<rt>え</rt></ruby>の<ruby>安全<rt>あんぜん</rt></ruby><ruby>設計<rt>せっけい</rt></ruby>（フェイルセーフ）"
          }
        ],
        "referenceDialogue": "场景 11: CS客服系统第 6 轮对话（李：FAQ自動化と有人対応のシームレスな切り替え設計）"
      },
      "dialogueWithRuby": "「チャットボットがもしお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>に<ruby>対し<rt>たいし</rt></ruby>て<ruby>的外れ<rt>まとはずれ</rt></ruby>な<ruby>回答<rt>かいとう</rt></ruby>や<ruby>誤っ<rt>あやまっ</rt></ruby>た<ruby>規約<rt>きやく</rt></ruby><ruby>案内<rt>あんない</rt></ruby>をしてしまったら、<ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>信用<rt>しんよう</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>になります。やはりAIに<ruby>任せる<rt>まかせる</rt></ruby>のはリスクが<ruby>高<rt>たか</rt></ruby>すぎるのでは？」"
    },
    {
      "id": "q_obj_03",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 21: WMS物流仓库管理",
      "sceneId": "scene-21",
      "difficulty": "中级",
      "speaker": "松井 センター長",
      "speakerRole": "物流倉庫統括センター長",
      "speakerAvatar": "👷‍♂️",
      "context": "松井中心长对将传统的纸质出库单换成移动手持终端（ハンディターミナル/RFID）抱有疑虑，认为仓库兼职打工人员年纪偏大学不会。",
      "dialogue": "「うちの倉庫は年配のパートさんも多いんですよ。こんなハイテクな機械、操作を覚えるのに時間がかかって、かえって出荷が遅れちゃうんじゃないの？」",
      "prompt": "为了打消松井中心长对工人学习成本与发货延误的担忧，哪种答对策略最专业？",
      "options": [
        {
          "label": "A",
          "text": "若手スタッフだけを集めてハンディ専任チームを編成していただければ、年配の方に無理に使わせる必要はございません。",
          "analysis": "【NG】粗暴干涉客户人员调度与用工制度（「若手だけ集めて...」），仓库调配有其既定人手约束，这种建议脱离实际且有年龄歧视嫌疑。",
          "textWithRuby": "<ruby>若手<rt>わかて</rt></ruby>スタッフだけを<ruby>集め<rt>あつめ</rt></ruby>てハンディ<ruby>専任<rt>せんにん</rt></ruby>チームを<ruby>編成<rt>へんせい</rt></ruby>していただければ、<ruby>年配<rt>ねんぱい</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>に<ruby>無理<rt>むり</rt></ruby>に<ruby>使わ<rt>つかわ</rt></ruby>せる<ruby>必要<rt>ひつよう</rt></ruby>はございません。"
        },
        {
          "label": "B",
          "text": "画面の文字サイズ拡大やバーコードをかざすだけの『1タップ操作』にUIを特化させております。実際に他社様でも60代のパートの方が半日の研修で習得された実績がございますので、モックアップで一度お試しになりませんか。",
          "analysis": "【正解】针对老年工人的特点展示适老化UI设计（大文字、1-tap扫码）；提供同行业同年龄段的成功落地数据支撑（他社実績）；并主动提出用原型机（Mockup）现场试操作，以事实化解疑虑。",
          "textWithRuby": "<ruby>画面<rt>がめん</rt></ruby>の<ruby>文字<rt>もじ</rt></ruby>サイズ<ruby>拡大<rt>かくだい</rt></ruby>やバーコードをかざすだけの『1タップ<ruby>操作<rt>そうさ</rt></ruby>』にUIを<ruby>特化<rt>とっか</rt></ruby>させております。<ruby>実際<rt>じっさい</rt></ruby>に<ruby>他社<rt>たしゃ</rt></ruby><ruby>様<rt>さま</rt></ruby>でも60<ruby>代<rt>だい</rt></ruby>のパートの<ruby>方<rt>ほう</rt></ruby>が<ruby>半日<rt>はんにち</rt></ruby>の<ruby>研修<rt>けんしゅう</rt></ruby>で<ruby>習得<rt>しゅうとく</rt></ruby>された<ruby>実績<rt>じっせき</rt></ruby>がございますので、モックアップで<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>お<ruby>試し<rt>ためし</rt></ruby>になりませんか。"
        },
        {
          "label": "C",
          "text": "最初は紙の伝票と手持端末を全く同じ手順で両方入力するようにすれば、誰も困らないと思います。",
          "analysis": "【NG】双重输入（二重入力）会导致工作量翻倍，极大地导致发货延误和数据冲突，完全违背了引入WMS提高效率的初衷。",
          "textWithRuby": "<ruby>最初<rt>さいしょ</rt></ruby>は<ruby>紙<rt>かみ</rt></ruby>の<ruby>伝票<rt>でんぴょう</rt></ruby>と<ruby>手持<rt>てもち</rt></ruby><ruby>端末<rt>たんまつ</rt></ruby>を<ruby>全く<rt>まったく</rt></ruby><ruby>同じ<rt>おなじ</rt></ruby><ruby>手順<rt>てじゅん</rt></ruby>で<ruby>両方<rt>りょうほう</rt></ruby><ruby>入力<rt>にゅうりょく</rt></ruby>するようにすれば、<ruby>誰<rt>だれ</rt></ruby>も<ruby>困ら<rt>こまら</rt></ruby>ないと<ruby>思い<rt>おもい</rt></ruby>ます。"
        },
        {
          "label": "D",
          "text": "今の時代、紙の伝票のままでは業界のDXから完全に取り残されてしまいますよ。",
          "analysis": "【NG】傲慢的说教与大帽子恐吓（「業界のDXから取り残される」），只会引发现场管理者的反感与排斥。",
          "textWithRuby": "<ruby>今<rt>いま</rt></ruby>の<ruby>時代<rt>じだい</rt></ruby>、<ruby>紙<rt>かみ</rt></ruby>の<ruby>伝票<rt>でんぴょう</rt></ruby>のままでは<ruby>業界<rt>ぎょうかい</rt></ruby>のDXから<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>取り残さ<rt>とりのこさ</rt></ruby>れてしまいますよ。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "消除现场人员恐惧三大法宝：『适老化极端简化UI ＋ 他社同类用户背书 ＋ 拿实物Mockup低成本上手体验』。",
        "clientSubtext": "现场负责人深知仓库工人流动率高、平均年龄大，最害怕培训周期长导致发货爆仓，被大客户罚款。",
        "keyPhrases": [
          {
            "jp": "モックアップでお試しいただく",
            "zh": "请您用实体交互原型试用体验一下",
            "jpWithRuby": "モックアップでお<ruby>試し<rt>ためし</rt></ruby>いただく"
          },
          {
            "jp": "習得された実績がございます",
            "zh": "有切实快速上手的落地前例",
            "jpWithRuby": "<ruby>習得<rt>しゅうとく</rt></ruby>された<ruby>実績<rt>じっせき</rt></ruby>がございます"
          }
        ],
        "referenceDialogue": "场景 21: WMS短文第 2 篇（ハンディターミナル導入による誤出荷ゼロ化と操作性検証）"
      },
      "dialogueWithRuby": "「うちの<ruby>倉庫<rt>そうこ</rt></ruby>は<ruby>年配<rt>ねんぱい</rt></ruby>のパートさんも<ruby>多い<rt>おおい</rt></ruby>んですよ。こんなハイテクな<ruby>機械<rt>きかい</rt></ruby>、<ruby>操作<rt>そうさ</rt></ruby>を<ruby>覚える<rt>おぼえる</rt></ruby>のに<ruby>時間<rt>じかん</rt></ruby>がかかって、かえって<ruby>出荷<rt>しゅっか</rt></ruby>が<ruby>遅れ<rt>おくれ</rt></ruby>ちゃうんじゃないの？」"
    },
    {
      "id": "q_obj_04",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 2: SFA系统与移动集成",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情報システム部 課長",
      "speakerAvatar": "🧑‍💻",
      "context": "山田课长对SFA系统调用既存基干ERP数据时的网络性能和稳定性产生严厉质询。",
      "dialogue": "「外出先のモバイル回線から社内の基幹ERPにリアルタイムで直接クエリを投げられたら、基幹系側の負荷が高すぎてサーバーが落ちる危険がありますよ。」",
      "prompt": "作为SE，如何向情统山田课长给出既保护基干系统又满足移动端体验的专业架构级回应？",
      "options": [
        {
          "label": "A",
          "text": "基幹サーバーのスペックを現行の2倍に増強していただければ、落ちる心配は一切ございません。",
          "analysis": "【NG】不讲架构合理性，直接甩锅让客户加钱买硬件服务器，完全暴露了缺乏软件性能优化意识。",
          "textWithRuby": "<ruby>基幹<rt>きかん</rt></ruby>サーバーのスペックを<ruby>現行<rt>げんこう</rt></ruby>の2<ruby>倍<rt>ばい</rt></ruby>に<ruby>増強<rt>ぞうきょう</rt></ruby>していただければ、<ruby>落ちる<rt>おちる</rt></ruby><ruby>心配<rt>しんぱい</rt></ruby>は<ruby>一切<rt>いっさい</rt></ruby>ございません。"
        },
        {
          "label": "B",
          "text": "山田課長のご指摘の通り、基幹系への直アクセスは避けるべきです。モバイル側は中継APIサーバーのキャッシュデータを参照し、更新分はキューイングしてオフピーク時に差分同期する非同期アーキテクチャで基幹負荷を極小化いたします。",
          "analysis": "【正解】首先高度认同情统主管的架构安全常识（「直アクセスは避けるべき」）；紧接着清晰给出专业解决方案：『中继API缓存 ＋ 消息队列异步排队 ＋ 离峰差分同步』，彻底解除基干崩溃风险。",
          "textWithRuby": "<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>のご<ruby>指摘<rt>してき</rt></ruby>の<ruby>通り<rt>とおり</rt></ruby>、<ruby>基幹<rt>きかん</rt></ruby><ruby>系<rt>けい</rt></ruby>への<ruby>直<rt>じか</rt></ruby>アクセスは<ruby>避ける<rt>さける</rt></ruby>べきです。モバイル<ruby>側<rt>がわ</rt></ruby>は<ruby>中継<rt>ちゅうけい</rt></ruby>APIサーバーのキャッシュデータを<ruby>参照<rt>さんしょう</rt></ruby>し、<ruby>更新<rt>こうしん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>はキューイングしてオフピーク<ruby>時<rt>じ</rt></ruby>に<ruby>差分<rt>さぶん</rt></ruby><ruby>同期<rt>どうき</rt></ruby>する<ruby>非<rt>ひ</rt></ruby><ruby>同期<rt>どうき</rt></ruby>アーキテクチャで<ruby>基幹<rt>きかん</rt></ruby><ruby>負荷<rt>ふか</rt></ruby>を<ruby>極小<rt>きょくしょう</rt></ruby><ruby>化<rt>か</rt></ruby>いたします。"
        },
        {
          "label": "C",
          "text": "もしサーバーが落ちたときは、当社の保守チームが24時間体制で再起動対応いたします。",
          "analysis": "【NG】把设计缺陷当做运维补救，核心基干宕机是重大生产事故，重启不仅会丢失数据，更会导致业务瘫痪。",
          "textWithRuby": "もしサーバーが<ruby>落ち<rt>おち</rt></ruby>たときは、<ruby>当社<rt>とうしゃ</rt></ruby>の<ruby>保守<rt>ほしゅ</rt></ruby>チームが24<ruby>時間<rt>じかん</rt></ruby><ruby>体制<rt>たいせい</rt></ruby>で<ruby>再<rt>さい</rt></ruby><ruby>起動<rt>きどう</rt></ruby><ruby>対応<rt>たいおう</rt></ruby>いたします。"
        },
        {
          "label": "D",
          "text": "今のクラウド環境であれば、負荷分散（ロードバランサー）が自動で効きますので問題ございません。",
          "analysis": "【NG】概念混淆，客户担心的是旧有内部オンプレミス（本地部署）基干ERP数据库的死锁与瓶颈，公有云LB无法解决内部遗留系统连接数被占满的问题。",
          "textWithRuby": "<ruby>今<rt>いま</rt></ruby>のクラウド<ruby>環境<rt>かんきょう</rt></ruby>であれば、<ruby>負荷<rt>ふか</rt></ruby><ruby>分散<rt>ぶんさん</rt></ruby>（ロードバランサー）が<ruby>自動<rt>じどう</rt></ruby>で<ruby>効き<rt>きき</rt></ruby>ますので<ruby>問題<rt>もんだい</rt></ruby>ございません。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "与情统IT专业人士沟通，必须用专业的系统架构词汇（API中継、キャッシュ、キューイング、差分非同期同期）建立技术信任感。",
        "clientSubtext": "情统课长是背锅位。只要基干ERP宕机10分钟，工厂停线、财务结账停滞，他的年终奖甚至职位都会不保，因此他的防御心理极高。",
        "keyPhrases": [
          {
            "jp": "非同期アーキテクチャ",
            "zh": "异步系统架构",
            "jpWithRuby": "<ruby>非<rt>ひ</rt></ruby><ruby>同期<rt>どうき</rt></ruby>アーキテクチャ"
          },
          {
            "jp": "基幹負荷を極小化する",
            "zh": "将核心基干系统负荷降至最低限度",
            "jpWithRuby": "<ruby>基幹<rt>きかん</rt></ruby><ruby>負荷<rt>ふか</rt></ruby>を<ruby>極小<rt>きょくしょう</rt></ruby><ruby>化<rt>か</rt></ruby>する"
          },
          {
            "jp": "キューイングによる差分同期",
            "zh": "基于队列技术的增量差异同步",
            "jpWithRuby": "キューイングによる<ruby>差分<rt>さぶん</rt></ruby><ruby>同期<rt>どうき</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 2: 教材核心课文第 5 轮对话（李：基幹データの中継サーバー連携と負荷軽減策）"
      },
      "dialogueWithRuby": "「<ruby>外出<rt>がいしゅつ</rt></ruby><ruby>先<rt>さき</rt></ruby>のモバイル<ruby>回線<rt>かいせん</rt></ruby>から<ruby>社内<rt>しゃない</rt></ruby>の<ruby>基幹<rt>きかん</rt></ruby>ERPにリアルタイムで<ruby>直接<rt>ちょくせつ</rt></ruby>クエリを<ruby>投げ<rt>なげ</rt></ruby>られたら、<ruby>基幹<rt>きかん</rt></ruby><ruby>系<rt>けい</rt></ruby><ruby>側<rt>がわ</rt></ruby>の<ruby>負荷<rt>ふか</rt></ruby>が<ruby>高<rt>たか</rt></ruby>すぎてサーバーが<ruby>落ちる<rt>おちる</rt></ruby><ruby>危険<rt>きけん</rt></ruby>がありますよ。」"
    },
    {
      "id": "q_obj_05",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 12: 运维体制与SLA",
      "sceneId": "scene-12",
      "difficulty": "高级",
      "speaker": "渡辺 部長",
      "speakerRole": "情報システム本部長",
      "speakerAvatar": "👨‍💼",
      "context": "渡边部长对于将部分运维服务放在离岸海外团队（中国大连/上海）表现出对沟通效率与日本商习惯理解的顾虑。",
      "dialogue": "「オフショア体制を一部使うと伺いましたが、夜間障害などの緊急時に日本語での意思疎通や日本の商習慣に合わせた柔軟な判断が滞るのではないかと心配です。」",
      "prompt": "以下哪一种体制说明与承诺最能打消日本客户本部长对离岸运维可靠性的顾虑？",
      "options": [
        {
          "label": "A",
          "text": "ご安心ください。大連チームのスタッフは全員日本語能力試験N1を持っておりますので、日本人と全く同じです。",
          "analysis": "【NG】仅凭N1证书不能等同于懂日本复杂IT现场商习惯，这种简单粗暴的断言在日企高管眼中非常缺乏说服力。",
          "textWithRuby": "ご<ruby>安心<rt>あんしん</rt></ruby>ください。<ruby>大連<rt>だいれん</rt></ruby>チームのスタッフは<ruby>全員<rt>ぜんいん</rt></ruby><ruby>日本<rt>にっぽん</rt></ruby><ruby>語<rt>ご</rt></ruby><ruby>能力<rt>のうりょく</rt></ruby><ruby>試験<rt>しけん</rt></ruby>N1を<ruby>持っ<rt>もっ</rt></ruby>ておりますので、<ruby>日本<rt>にっぽん</rt></ruby><ruby>人<rt>にん</rt></ruby>と<ruby>全く<rt>まったく</rt></ruby><ruby>同じ<rt>おなじ</rt></ruby>です。"
        },
        {
          "label": "B",
          "text": "オフショアが不安でしたら、費用は1.5倍になりますがすべて日本国内オンサイト要員のみで契約を結び直しますか。",
          "analysis": "【NG】以反问或加价威胁客户，把原本由乙方推荐的混编降本方案直接踢回给客户，显得极其不专业且缺乏诚意。",
          "textWithRuby": "オフショアが<ruby>不安<rt>ふあん</rt></ruby>でしたら、<ruby>費用<rt>ひよう</rt></ruby>は1.5<ruby>倍<rt>ばい</rt></ruby>になりますがすべて<ruby>日本<rt>にっぽん</rt></ruby><ruby>国内<rt>こくない</rt></ruby>オンサイト<ruby>要員<rt>よういん</rt></ruby>のみで<ruby>契約<rt>けいやく</rt></ruby>を<ruby>結び直し<rt>むすびなおし</rt></ruby>ますか。"
        },
        {
          "label": "C",
          "text": "渡辺部長のご懸念を十分に踏まえ、一次受付および判断の窓口は東京常駐の日本人バイリンガルPMが直接担当いたします。標準手順に基づく夜間定常監視や一次切り分けのみをオフショアが担い、判断を伴うエスカレーションは国内窓口で統制するハイブリッド体制を取らせていただきます。",
          "analysis": "【正解】明确界定职责边界：『国内东京驻场PM做唯一前置责任人与判断窗口 ＋ 离岸团队严格按照SOP做夜间定常轮巡与一次分流』，既实现成本与时区覆盖优势，又为客户保留了100%原汁原味的本地沟通保障。",
          "textWithRuby": "<ruby>渡辺<rt>わたなべ</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>のご<ruby>懸念<rt>けねん</rt></ruby>を<ruby>十分<rt>じゅうぶん</rt></ruby>に<ruby>踏まえ<rt>ふまえ</rt></ruby>、<ruby>一<rt>いち</rt></ruby><ruby>次<rt>じ</rt></ruby><ruby>受付<rt>うけつけ</rt></ruby>および<ruby>判断<rt>はんだん</rt></ruby>の<ruby>窓口<rt>まどぐち</rt></ruby>は<ruby>東京<rt>とうきょう</rt></ruby><ruby>常駐<rt>じょうちゅう</rt></ruby>の<ruby>日本<rt>にっぽん</rt></ruby><ruby>人<rt>にん</rt></ruby>バイリンガルPMが<ruby>直接<rt>ちょくせつ</rt></ruby><ruby>担当<rt>たんとう</rt></ruby>いたします。<ruby>標準<rt>ひょうじゅん</rt></ruby><ruby>手順<rt>てじゅん</rt></ruby>に<ruby>基づく<rt>もとづく</rt></ruby><ruby>夜間<rt>やかん</rt></ruby><ruby>定常<rt>ていじょう</rt></ruby><ruby>監視<rt>かんし</rt></ruby>や<ruby>一<rt>いち</rt></ruby><ruby>次<rt>じ</rt></ruby><ruby>切り分け<rt>きりわけ</rt></ruby>のみをオフショアが<ruby>担い<rt>にない</rt></ruby>、<ruby>判断<rt>はんだん</rt></ruby>を<ruby>伴う<rt>ともなう</rt></ruby>エスカレーションは<ruby>国内<rt>こくない</rt></ruby><ruby>窓口<rt>まどぐち</rt></ruby>で<ruby>統制<rt>とうせい</rt></ruby>するハイブリッド<ruby>体制<rt>たいせい</rt></ruby>を<ruby>取ら<rt>とら</rt></ruby>せていただきます。"
        },
        {
          "label": "D",
          "text": "夜間は滅多に障害は起きませんので、そこまで過剰にご心配なさらなくても大丈夫かと存じます。",
          "analysis": "【NG】“夜间很少出故障所以不用担心”是极其不负责任的发言，完全违背了ITIL安全运维与SLA防灾预案的基本底线。",
          "textWithRuby": "<ruby>夜間<rt>やかん</rt></ruby>は<ruby>滅多<rt>めった</rt></ruby>に<ruby>障害<rt>しょうがい</rt></ruby>は<ruby>起き<rt>おき</rt></ruby>ませんので、そこまで<ruby>過剰<rt>かじょう</rt></ruby>にご<ruby>心配<rt>しんぱい</rt></ruby>なさらなくても<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>かと<ruby>存じ<rt>ぞんじ</rt></ruby>ます。"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "采用『Onsite-Offshore Hybrid 模型』解释：前端责任不缺位（东京常驻窗），后端按照严密SOP标准化作业，以制度防范风险。",
        "clientSubtext": "客户本部长害怕的是半夜出故障打电话过去鸡同鸭讲，或者对方无法准确理解日本客户的紧迫感和礼仪规则导致投诉升级。",
        "keyPhrases": [
          {
            "jp": "判断を伴うエスカレーション",
            "zh": "涉及业务决策与权衡的问题升级汇报",
            "jpWithRuby": "<ruby>判断<rt>はんだん</rt></ruby>を<ruby>伴う<rt>ともなう</rt></ruby>エスカレーション"
          },
          {
            "jp": "ハイブリッド体制で統制する",
            "zh": "以本地+离岸混合编队体制进行全局管控",
            "jpWithRuby": "ハイブリッド<ruby>体制<rt>たいせい</rt></ruby>で<ruby>統制<rt>とうせい</rt></ruby>する"
          }
        ],
        "referenceDialogue": "场景 12: 教材核心课文第 8 轮（李：オンサイトPMとオフショア保守の役割分担表）"
      },
      "dialogueWithRuby": "「オフショア<ruby>体制<rt>たいせい</rt></ruby>を<ruby>一部<rt>いちぶ</rt></ruby><ruby>使う<rt>つかう</rt></ruby>と<ruby>伺い<rt>うかがい</rt></ruby>ましたが、<ruby>夜間<rt>やかん</rt></ruby><ruby>障害<rt>しょうがい</rt></ruby>などの<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>時<rt>じ</rt></ruby>に<ruby>日本<rt>にっぽん</rt></ruby><ruby>語<rt>ご</rt></ruby>での<ruby>意思<rt>いし</rt></ruby><ruby>疎通<rt>そつう</rt></ruby>や<ruby>日本<rt>にっぽん</rt></ruby>の<ruby>商<rt>しょう</rt></ruby><ruby>習慣<rt>しゅうかん</rt></ruby>に<ruby>合わせ<rt>あわせ</rt></ruby>た<ruby>柔軟<rt>じゅうなん</rt></ruby>な<ruby>判断<rt>はんだん</rt></ruby>が<ruby>滞る<rt>とどこおる</rt></ruby>のではないかと<ruby>心配<rt>しんぱい</rt></ruby>です。」"
    },
    {
      "id": "q_obj_06",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 1: SFA系统商机阶段管理",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "佐々木 営業リーダー",
      "speakerRole": "営業第1チーム リーダー",
      "speakerAvatar": "🧑‍💼",
      "context": "一线业务骨干佐佐木抱怨：每个销售谈单方式都不一样，把商谈硬分成5个阶段只会束缚手脚，甚至造假数据。",
      "dialogue": "「商談の進め方は顧客や案件によって千差万別ですよ。型にはめたパイプライン管理なんてやったら、数字を合わせるための形骸化した入力が増えるだけです。」",
      "prompt": "作为需求顾问，如何回应佐佐木组长，既维护パイプライン（销售漏斗）的标准化价值，又尊重一线灵活性？",
      "options": [
        {
          "label": "A",
          "text": "営業の属人化を排除することが社長直属のプロジェクトの目的ですので、例外なく全員ルール通りに入力していただきます。",
          "analysis": "【NG】拿“社长命令”强压一线骨干，只会激起消极怠工和软抵抗，导致系统内充斥虚假应付数据。",
          "textWithRuby": "<ruby>営業<rt>えいぎょう</rt></ruby>の<ruby>属人<rt>ぞくじん</rt></ruby><ruby>化<rt>か</rt></ruby>を<ruby>排除<rt>はいじょ</rt></ruby>することが<ruby>社長<rt>しゃちょう</rt></ruby><ruby>直属<rt>ちょくぞく</rt></ruby>のプロジェクトの<ruby>目的<rt>もくてき</rt></ruby>ですので、<ruby>例外<rt>れいがい</rt></ruby>なく<ruby>全員<rt>ぜんいん</rt></ruby>ルール<ruby>通り<rt>とおり</rt></ruby>に<ruby>入力<rt>にゅうりょく</rt></ruby>していただきます。"
        },
        {
          "label": "B",
          "text": "確かに個々の商談の機微はマニュアル化できませんね。ではパイプラインのフェーズ管理は廃止して自由記述欄だけにしましょう。",
          "analysis": "【NG】毫无原则地向抱怨妥协，废弃阶段管理将导致无法进行全公司的销售漏斗预测与商机汇总，SFA核心价值荡然无存。",
          "textWithRuby": "<ruby>確か<rt>たしか</rt></ruby>に<ruby>個々<rt>ここ</rt></ruby>の<ruby>商談<rt>しょうだん</rt></ruby>の<ruby>機微<rt>きび</rt></ruby>はマニュアル<ruby>化<rt>か</rt></ruby>できませんね。ではパイプラインのフェーズ<ruby>管理<rt>かんり</rt></ruby>は<ruby>廃止<rt>はいし</rt></ruby>して<ruby>自由<rt>じゆう</rt></ruby><ruby>記述<rt>きじゅつ</rt></ruby><ruby>欄<rt>らん</rt></ruby>だけにしましょう。"
        },
        {
          "label": "C",
          "text": "佐々木リーダーのご指摘通り、現場の柔軟な営業活動を縛るべきではありません。今回のフェーズ定義は『縛るためのルール』ではなく、『失注要因をチームで早期に察知し、上長が支援に入りやすくするための共通言語』として設計しております。必須項目も3つに絞り込んでおります。",
          "analysis": "【正解】巧妙转化视角：将“管理约束”重新诠释为“团队支持与求助的共通语言”；并给出一线最在意的减负承诺（必填项缩减至3项）。",
          "textWithRuby": "<ruby>佐々木<rt>ささき</rt></ruby>リーダーのご<ruby>指摘<rt>してき</rt></ruby><ruby>通り<rt>とおり</rt></ruby>、<ruby>現場<rt>げんば</rt></ruby>の<ruby>柔軟<rt>じゅうなん</rt></ruby>な<ruby>営業<rt>えいぎょう</rt></ruby><ruby>活動<rt>かつどう</rt></ruby>を<ruby>縛る<rt>しばる</rt></ruby>べきではありません。<ruby>今回<rt>こんかい</rt></ruby>のフェーズ<ruby>定義<rt>ていぎ</rt></ruby>は『<ruby>縛る<rt>しばる</rt></ruby>ためのルール』ではなく、『<ruby>失注<rt>しっちゅう</rt></ruby><ruby>要因<rt>よういん</rt></ruby>をチームで<ruby>早期<rt>そうき</rt></ruby>に<ruby>察知<rt>さっち</rt></ruby>し、<ruby>上長<rt>じょうちょう</rt></ruby>が<ruby>支援<rt>しえん</rt></ruby>に<ruby>入り<rt>はいり</rt></ruby>やすくするための<ruby>共通<rt>きょうつう</rt></ruby><ruby>言語<rt>げんご</rt></ruby>』として<ruby>設計<rt>せっけい</rt></ruby>しております。<ruby>必須<rt>ひっす</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>も3つに<ruby>絞り込ん<rt>しぼりこん</rt></ruby>でおります。"
        },
        {
          "label": "D",
          "text": "形骸化するかどうかは佐々木さんのマネジメント力にかかっていますので、リーダーとしてしっかり指導してください。",
          "analysis": "【NG】反唇相讥，攻击对方的管理能力（「マネジメント力にかかっている」），瞬间激化矛盾。",
          "textWithRuby": "<ruby>形骸<rt>けいがい</rt></ruby><ruby>化<rt>か</rt></ruby>するかどうかは<ruby>佐々木<rt>ささき</rt></ruby>さんのマネジメント<ruby>力<rt>りょく</rt></ruby>にかかっていますので、リーダーとしてしっかり<ruby>指導<rt>しどう</rt></ruby>してください。"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "将『被管（監視・束縛）』的负面认知，重构为『获得支持（支援・共通言語）』的正面收益，大幅降低一线阻力。",
        "clientSubtext": "优秀的王牌销售往往反感繁琐的过程汇报，他们认为系统是管理层用来抓小辫子的监视工具。",
        "keyPhrases": [
          {
            "jp": "共通言語として再定義する",
            "zh": "重新定义为团队协作的共同语言",
            "jpWithRuby": "<ruby>共通<rt>きょうつう</rt></ruby><ruby>言語<rt>げんご</rt></ruby>として<ruby>再<rt>さい</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>する"
          },
          {
            "jp": "属人化から組織的ナレッジ共有へ",
            "zh": "从个人经验主义迈向组织化知识共享",
            "jpWithRuby": "<ruby>属人<rt>ぞくじん</rt></ruby><ruby>化<rt>か</rt></ruby>から<ruby>組織<rt>そしき</rt></ruby><ruby>的<rt>てき</rt></ruby>ナレッジ<ruby>共有<rt>きょうゆう</rt></ruby>へ"
          }
        ],
        "referenceDialogue": "场景 1: SFA练习第 3 篇（商談プロセス標準化とナレッジ共有）"
      },
      "dialogueWithRuby": "「<ruby>商談<rt>しょうだん</rt></ruby>の<ruby>進め<rt>すすめ</rt></ruby><ruby>方<rt>かた</rt></ruby>は<ruby>顧客<rt>こきゃく</rt></ruby>や<ruby>案件<rt>あんけん</rt></ruby>によって<ruby>千差<rt>せんさ</rt></ruby><ruby>万別<rt>ばんべつ</rt></ruby>ですよ。<ruby>型<rt>かた</rt></ruby>にはめたパイプライン<ruby>管理<rt>かんり</rt></ruby>なんてやったら、<ruby>数字<rt>すうじ</rt></ruby>を<ruby>合わせる<rt>あわせる</rt></ruby>ための<ruby>形骸<rt>けいがい</rt></ruby><ruby>化<rt>か</rt></ruby>した<ruby>入力<rt>にゅうりょく</rt></ruby>が<ruby>増える<rt>ふえる</rt></ruby>だけです。」"
    },
    {
      "id": "q_obj_07",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 11: CS呼叫中心与个人信息",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "法務・コンプライアンス室 担当",
      "speakerRole": "合规与风控法务官",
      "speakerAvatar": "🧑‍💼",
      "context": "法务部提出：AI训练如果使用了真实客户的历史咨询录音与聊天记录，存在违反日本《个人信息保护法》的合规隐患。",
      "dialogue": "「過去のお客様の通話履歴やクレーム記録をそのままAIの学習データに使ったら、個人情報保護法や秘密保持契約（NDA）に抵触する恐れがあります。法務としては承認できません。」",
      "prompt": "在严谨的法务合规谈判中，作为技术负责人，哪一种回复最具法务与架构可行性？",
      "options": [
        {
          "label": "A",
          "text": "クラウド事業者の利用規約に『AI学習には安全に使用される』と書いてありますので、法律上は何の心配もございません。",
          "analysis": "【NG】轻信并转述外部服务商条款，对日本法务而言不仅苍白无力，且显示出自己完全不懂企业级合规审计机制。",
          "textWithRuby": "クラウド<ruby>事業<rt>じぎょう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>の<ruby>利用<rt>りよう</rt></ruby><ruby>規約<rt>きやく</rt></ruby>に『AI<ruby>学習<rt>がくしゅう</rt></ruby>には<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>使用<rt>しよう</rt></ruby>される』と<ruby>書い<rt>かい</rt></ruby>てありますので、<ruby>法律<rt>ほうりつ</rt></ruby><ruby>上<rt>じょう</rt></ruby>は<ruby>何<rt>なん</rt></ruby>の<ruby>心配<rt>しんぱい</rt></ruby>もございません。"
        },
        {
          "label": "B",
          "text": "ご指摘は誠に的確でございます。学習・チューニングに投入する前に、顧客の氏名・電話番号・住所・企業名を正規表現および専用NER（固有表現抽出）アルゴリズムで完全不可逆マスキング（匿名加工化）する前処理パイプラインを構築し、その監査ログを法務室様にご確認いただける仕様といたします。",
          "analysis": "【正解】高度赞同法务的敏锐度（「誠に的確」）；拿出坚实的技术与工程实施方案：『前置不可逆脱敏/匿名化处理管道 ＋ 完整合规审计日志供法务随时查验』，精准符合法规要求。",
          "textWithRuby": "ご<ruby>指摘<rt>してき</rt></ruby>は<ruby>誠<rt>まこと</rt></ruby>に<ruby>的確<rt>てきかく</rt></ruby>でございます。<ruby>学習<rt>がくしゅう</rt></ruby>・チューニングに<ruby>投入<rt>とうにゅう</rt></ruby>する<ruby>前<rt>まえ</rt></ruby>に、<ruby>顧客<rt>こきゃく</rt></ruby>の<ruby>氏名<rt>しめい</rt></ruby>・<ruby>電話<rt>でんわ</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>・<ruby>住所<rt>じゅうしょ</rt></ruby>・<ruby>企業<rt>きぎょう</rt></ruby><ruby>名<rt>めい</rt></ruby>を<ruby>正規<rt>せいき</rt></ruby><ruby>表現<rt>ひょうげん</rt></ruby>および<ruby>専用<rt>せんよう</rt></ruby>NER（<ruby>固有<rt>こゆう</rt></ruby><ruby>表現<rt>ひょうげん</rt></ruby><ruby>抽出<rt>ちゅうしゅつ</rt></ruby>）アルゴリズムで<ruby>完全<rt>かんぜん</rt></ruby><ruby>不<rt>ふ</rt></ruby><ruby>可逆<rt>かぎゃく</rt></ruby>マスキング（<ruby>匿名<rt>とくめい</rt></ruby><ruby>加工<rt>かこう</rt></ruby><ruby>化<rt>か</rt></ruby>）する<ruby>前<rt>ぜん</rt></ruby><ruby>処理<rt>しょり</rt></ruby>パイプラインを<ruby>構築<rt>こうちく</rt></ruby>し、その<ruby>監査<rt>かんさ</rt></ruby>ログを<ruby>法務<rt>ほうむ</rt></ruby><ruby>室<rt>しつ</rt></ruby><ruby>様<rt>さま</rt></ruby>にご<ruby>確認<rt>かくにん</rt></ruby>いただける<ruby>仕様<rt>しよう</rt></ruby>といたします。"
        },
        {
          "label": "C",
          "text": "個人情報を含めないとAIの賢さが著しく落ちてしまいますので、何とか今回は特例で承認していただけないでしょうか。",
          "analysis": "【NG】向法务合规人员请求“特例”，法务绝不可能拿法律风险和公司声誉开玩笑，这种乞求式的表达只会让对方彻底关闭谈判大门。",
          "textWithRuby": "<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>を<ruby>含め<rt>ふくめ</rt></ruby>ないとAIの<ruby>賢<rt>かしこ</rt></ruby>さが<ruby>著しく<rt>いちじるしく</rt></ruby><ruby>落ち<rt>おち</rt></ruby>てしまいますので、<ruby>何<rt>なん</rt></ruby>とか<ruby>今回<rt>こんかい</rt></ruby>は<ruby>特例<rt>とくれい</rt></ruby>で<ruby>承認<rt>しょうにん</rt></ruby>していただけないでしょうか。"
        },
        {
          "label": "D",
          "text": "万が一情報が漏洩した場合は、当社が加入しているサイバーセキュリティ保険から全額賠償いたします。",
          "analysis": "【NG】提事故赔偿是下策，日企法务最重视的是防患于未然，一旦公信力受损，任何保险赔偿都挽回不了社会信用。",
          "textWithRuby": "<ruby>万が一<rt>まんがいち</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>が<ruby>漏洩<rt>ろうえい</rt></ruby>した<ruby>場合<rt>ばあい</rt></ruby>は、<ruby>当社<rt>とうしゃ</rt></ruby>が<ruby>加入<rt>かにゅう</rt></ruby>しているサイバーセキュリティ<ruby>保険<rt>ほけん</rt></ruby>から<ruby>全額<rt>ぜんがく</rt></ruby><ruby>賠償<rt>ばいしょう</rt></ruby>いたします。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "与法务沟通讲究『闭环证据链』：提出明确的『匿名加工情報（Anonymized Data）＋ 監査ログ（Audit Trail）』标准流程。",
        "clientSubtext": "法务的职责是挑刺和防守。给法务提供他们能够向上级和外部监管机构证明“已尽到严格安全防护义务”的书面证据是通关钥匙。",
        "keyPhrases": [
          {
            "jp": "匿名加工情報の前処理パイプライン",
            "zh": "匿名化加工数据的前置处理流水线",
            "jpWithRuby": "<ruby>匿名<rt>とくめい</rt></ruby><ruby>加工<rt>かこう</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>の<ruby>前<rt>まえ</rt></ruby><ruby>処理<rt>しょり</rt></ruby>パイプライン"
          },
          {
            "jp": "監査ログの提示",
            "zh": "提供可追溯的合规审计日志",
            "jpWithRuby": "<ruby>監査<rt>かんさ</rt></ruby>ログの<ruby>提示<rt>ていじ</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 11: CS短文第 4 篇（個人情報マスキングとコンプライアンス担保）"
      },
      "dialogueWithRuby": "「<ruby>過去<rt>かこ</rt></ruby>のお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>の<ruby>通話<rt>つうわ</rt></ruby><ruby>履歴<rt>りれき</rt></ruby>やクレーム<ruby>記録<rt>きろく</rt></ruby>をそのままAIの<ruby>学習<rt>がくしゅう</rt></ruby>データに<ruby>使っ<rt>つかっ</rt></ruby>たら、<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby><ruby>保護<rt>ほご</rt></ruby><ruby>法<rt>ほう</rt></ruby>や<ruby>秘密<rt>ひみつ</rt></ruby><ruby>保持<rt>ほじ</rt></ruby><ruby>契約<rt>けいやく</rt></ruby>（NDA）に<ruby>抵触<rt>ていしょく</rt></ruby>する<ruby>恐れ<rt>おそれ</rt></ruby>があります。<ruby>法務<rt>ほうむ</rt></ruby>としては<ruby>承認<rt>しょうにん</rt></ruby>できません。」"
    },
    {
      "id": "q_obj_08",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 21: WMS与ERP对接",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "財務経理部 課長",
      "speakerRole": "財務経理部 責任者",
      "speakerAvatar": "👩‍💼",
      "context": "财务课长指出：仓库出入库如果实时更新，月结关账（月次決算）时万一有库存数据不一致，会直接影响资产负债表与税务审计。",
      "dialogue": "「リアルタイムで在庫データが動くと、月末の棚卸確定の瞬間に数字が狂って月次決算が締まらなくなるリスクがあります。経理としてはバッチ処理での確定でないと困ります。」",
      "prompt": "如何协调仓库“即时掌握真实库存”与财务“月结报表锁定期账实相符”的矛盾？",
      "options": [
        {
          "label": "A",
          "text": "経理の月次決算のために倉庫のリアルタイム化を諦めるのは本末転倒ではないでしょうか。",
          "analysis": "【NG】指责客户财务是“本末倒置”，严重侵犯财务部门的核心业务红线，在任何企业都会被立即赶出会场。",
          "textWithRuby": "<ruby>経理<rt>けいり</rt></ruby>の<ruby>月次<rt>げつじ</rt></ruby><ruby>決算<rt>けっさん</rt></ruby>のために<ruby>倉庫<rt>そうこ</rt></ruby>のリアルタイム<ruby>化<rt>か</rt></ruby>を<ruby>諦める<rt>あきらめる</rt></ruby>のは<ruby>本末<rt>ほんまつ</rt></ruby><ruby>転倒<rt>てんとう</rt></ruby>ではないでしょうか。"
        },
        {
          "label": "B",
          "text": "財務経理部様の月次締めの重要性を完全に理解しております。そのため、通常運用時はリアルタイムに実在庫を追跡しつつ、月末締めの指定時刻において『在庫スナップショット（締め断面）』を自動固定する機能を備えております。確定後の差異調整伝票も連動可能ですが、この方式はいかがでしょうか。",
          "analysis": "【正解】兼顾双方诉求的双模设计：平时满足仓库业务的即时性，月结节点采用『时间戳快照锁定（スナップショット固定）＋ 财务差异调整凭证联动』，完美兼顾。",
          "textWithRuby": "<ruby>財務<rt>ざいむ</rt></ruby><ruby>経理<rt>けいり</rt></ruby><ruby>部<rt>ぶ</rt></ruby><ruby>様<rt>さま</rt></ruby>の<ruby>月次<rt>げつじ</rt></ruby><ruby>締め<rt>しめ</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>理解<rt>りかい</rt></ruby>しております。そのため、<ruby>通常<rt>つうじょう</rt></ruby><ruby>運用<rt>うんよう</rt></ruby><ruby>時<rt>じ</rt></ruby>はリアルタイムに<ruby>実在<rt>じつざい</rt></ruby><ruby>庫<rt>こ</rt></ruby>を<ruby>追跡<rt>ついせき</rt></ruby>しつつ、<ruby>月末<rt>げつまつ</rt></ruby><ruby>締め<rt>しめ</rt></ruby>の<ruby>指定<rt>してい</rt></ruby><ruby>時刻<rt>じこく</rt></ruby>において『<ruby>在庫<rt>ざいこ</rt></ruby>スナップショット（<ruby>締め<rt>しめ</rt></ruby><ruby>断面<rt>だんめん</rt></ruby>）』を<ruby>自動<rt>じどう</rt></ruby><ruby>固定<rt>こてい</rt></ruby>する<ruby>機能<rt>きのう</rt></ruby>を<ruby>備え<rt>そなえ</rt></ruby>ております。<ruby>確定<rt>かくてい</rt></ruby><ruby>後<rt>ご</rt></ruby>の<ruby>差異<rt>さい</rt></ruby><ruby>調整<rt>ちょうせい</rt></ruby><ruby>伝票<rt>でんぴょう</rt></ruby>も<ruby>連動<rt>れんどう</rt></ruby><ruby>可能<rt>かのう</rt></ruby>ですが、この<ruby>方式<rt>ほうしき</rt></ruby>はいかがでしょうか。"
        },
        {
          "label": "C",
          "text": "もし数字が合わなかったときは、手動で数値を上書き修正すれば問題ありません。",
          "analysis": "【NG】财务审计严禁任意手动修改数据，提出手写覆写数据意味着内部控制（J-SOX）重大缺陷，会被审计师判定违规。",
          "textWithRuby": "もし<ruby>数字<rt>すうじ</rt></ruby>が<ruby>合わ<rt>あわ</rt></ruby>なかったときは、<ruby>手動<rt>しゅどう</rt></ruby>で<ruby>数値<rt>すうち</rt></ruby>を<ruby>上書き<rt>うわがき</rt></ruby><ruby>修正<rt>しゅうせい</rt></ruby>すれば<ruby>問題<rt>もんだい</rt></ruby>ありません。"
        },
        {
          "label": "D",
          "text": "リアルタイム連携をやめて、すべて昔通りの月1回のバッチ処理に戻しましょう。",
          "analysis": "【NG】退回老旧模式，直接使WMS实时库存监控的核心设计价值归零。",
          "textWithRuby": "リアルタイム<ruby>連携<rt>れんけい</rt></ruby>をやめて、すべて<ruby>昔<rt>むかし</rt></ruby><ruby>通り<rt>とおり</rt></ruby>の<ruby>月<rt>つき</rt></ruby>1<ruby>回<rt>かい</rt></ruby>のバッチ<ruby>処理<rt>しょり</rt></ruby>に<ruby>戻し<rt>もどし</rt></ruby>ましょう。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "在跨部门需求冲突中，严禁拉一派打一派。必须提出『业务运行实时态 ＋ 财务会计断面态（スナップショット）』的双轨制架构解法。",
        "clientSubtext": "财务最怕审计师质疑内控制度（J-SOX）。保证账面可溯源、月结可锁定、调整有凭证是财务的底线生命线。",
        "keyPhrases": [
          {
            "jp": "在庫スナップショットの自動固定",
            "zh": "自动锁定库存时间戳快照断面",
            "jpWithRuby": "<ruby>在庫<rt>ざいこ</rt></ruby>スナップショットの<ruby>自動<rt>じどう</rt></ruby><ruby>固定<rt>こてい</rt></ruby>"
          },
          {
            "jp": "月次締めの業務統制（内部統制）",
            "zh": "月结业务内部控制与审计合规",
            "jpWithRuby": "<ruby>月次<rt>げつじ</rt></ruby><ruby>締め<rt>しめ</rt></ruby>の<ruby>業務<rt>ぎょうむ</rt></ruby><ruby>統制<rt>とうせい</rt></ruby>（<ruby>内部<rt>ないぶ</rt></ruby><ruby>統制<rt>とうせい</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 21: WMS核心课文第 7 轮（基幹ERP在庫勘定との締め処理連携）"
      },
      "dialogueWithRuby": "「リアルタイムで<ruby>在庫<rt>ざいこ</rt></ruby>データが<ruby>動く<rt>うごく</rt></ruby>と、<ruby>月末<rt>げつまつ</rt></ruby>の<ruby>棚卸<rt>たなおろし</rt></ruby><ruby>確定<rt>かくてい</rt></ruby>の<ruby>瞬間<rt>しゅんかん</rt></ruby>に<ruby>数字<rt>すうじ</rt></ruby>が<ruby>狂っ<rt>くるっ</rt></ruby>て<ruby>月次<rt>げつじ</rt></ruby><ruby>決算<rt>けっさん</rt></ruby>が<ruby>締まら<rt>しまら</rt></ruby>なくなるリスクがあります。<ruby>経理<rt>けいり</rt></ruby>としてはバッチ<ruby>処理<rt>しょり</rt></ruby>での<ruby>確定<rt>かくてい</rt></ruby>でないと<ruby>困り<rt>こまり</rt></ruby>ます。」"
    },
    {
      "id": "q_obj_09",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 12: 系统版本升级与停机",
      "sceneId": "scene-12",
      "difficulty": "高级",
      "speaker": "運用保守担当 鈴木",
      "speakerRole": "情シス 運用保守マネージャー",
      "speakerAvatar": "🧑‍💻",
      "context": "铃木经理对于系统版本大升级需要全站停机（メンテナンス停止）4小时表示极难接受，因为部分海外分支机构有时差。",
      "dialogue": "「4時間もシステムを全面停止するなんて認められませんよ。海外拠点からもアクセスがあるのに、業務を止めろと言うんですか？」",
      "prompt": "面对客户对系统停服的严词拒绝，作为负责版本发布的架构师，如何提供既有技术高度又具实施可行性的替代方案？",
      "options": [
        {
          "label": "A",
          "text": "システムのメジャーアップデートですので、4時間の停止は業界の常識です。海外拠点の方にも我慢していただくしかありません。",
          "analysis": "【NG】傲慢地搬出所谓的“行业常识（業界の常識）”，并要求海外客户忍耐，完全没有以客户业务连续性为中心的顾问姿态。",
          "textWithRuby": "システムのメジャーアップデートですので、4<ruby>時間<rt>じかん</rt></ruby>の<ruby>停止<rt>ていし</rt></ruby>は<ruby>業界<rt>ぎょうかい</rt></ruby>の<ruby>常識<rt>じょうしき</rt></ruby>です。<ruby>海外<rt>かいがい</rt></ruby><ruby>拠点<rt>きょてん</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>にも<ruby>我慢<rt>がまん</rt></ruby>していただくしかありません。"
        },
        {
          "label": "B",
          "text": "鈴木様のご指摘の通り、グローバル拠点の稼働を止める影響は最小化すべきです。そこで新旧バージョンを並行稼働させる『ブルーグリーンデプロイメント（Blue-Green）』を採用し、切り替え瞬断を数分以内に抑え、ロールバックも即座に可能な手順へ改定いたします。",
          "analysis": "【正解】接纳客户对全球业务不可中断的关切；提出业界标准的无停机发布技术方案：『蓝绿部署（Blue-Green Deployment）＋ 几分钟内瞬间切换 ＋ 随时极速回滚机制』，彻底解决停机矛盾。",
          "textWithRuby": "<ruby>鈴木<rt>すずき</rt></ruby><ruby>様<rt>さま</rt></ruby>のご<ruby>指摘<rt>してき</rt></ruby>の<ruby>通り<rt>とおり</rt></ruby>、グローバル<ruby>拠点<rt>きょてん</rt></ruby>の<ruby>稼働<rt>かどう</rt></ruby>を<ruby>止める<rt>とめる</rt></ruby><ruby>影響<rt>えいきょう</rt></ruby>は<ruby>最小<rt>さいしょう</rt></ruby><ruby>化<rt>か</rt></ruby>すべきです。そこで<ruby>新旧<rt>しんきゅう</rt></ruby>バージョンを<ruby>並行<rt>へいこう</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>させる『ブルーグリーンデプロイメント（Blue-Green）』を<ruby>採用<rt>さいよう</rt></ruby>し、<ruby>切り替え<rt>きりかえ</rt></ruby><ruby>瞬断<rt>しゅんだん</rt></ruby>を<ruby>数<rt>すう</rt></ruby><ruby>分<rt>ふん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に<ruby>抑え<rt>おさえ</rt></ruby>、ロールバックも<ruby>即座<rt>そくざ</rt></ruby>に<ruby>可能<rt>かのう</rt></ruby>な<ruby>手順<rt>てじゅん</rt></ruby>へ<ruby>改定<rt>かいてい</rt></ruby>いたします。"
        },
        {
          "label": "C",
          "text": "それなら、アップデート自体を中止して、今の古いバージョンのまま永久に使い続けますか。",
          "analysis": "【NG】赌气式回怼客户，把正经的技术方案沟通演变为人身情绪对立，极不成熟。",
          "textWithRuby": "それなら、アップデート<ruby>自体<rt>じたい</rt></ruby>を<ruby>中止<rt>ちゅうし</rt></ruby>して、<ruby>今<rt>いま</rt></ruby>の<ruby>古い<rt>ふるい</rt></ruby>バージョンのまま<ruby>永久<rt>えいきゅう</rt></ruby>に<ruby>使い<rt>つかい</rt></ruby><ruby>続け<rt>つづけ</rt></ruby>ますか。"
        },
        {
          "label": "D",
          "text": "では停止時間を内緒で1時間ずつ4日間に分割してこっそり実施しましょう。",
          "analysis": "【NG】“内緒で（隐瞒客户）”“こっそり（偷偷）”，严重破坏信任基石，日企一旦发现欺瞒将立即解除合同甚至起诉。",
          "textWithRuby": "では<ruby>停止<rt>ていし</rt></ruby><ruby>時間<rt>じかん</rt></ruby>を<ruby>内緒<rt>ないしょ</rt></ruby>で1<ruby>時間<rt>じかん</rt></ruby>ずつ4<ruby>日間<rt>かかん</rt></ruby>に<ruby>分割<rt>ぶんかつ</rt></ruby>してこっそり<ruby>実施<rt>じっし</rt></ruby>しましょう。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "从传统的『长时间冷停机部署』升级为现代微服务与云原生的『无中断部署方案（Blue-Green / Canary Releases）』，用技术实力征服情统客户。",
        "clientSubtext": "铃木真正担心的是海外分社社长被系统停机激怒后，越级向总公司役员告发情统部门失职。",
        "keyPhrases": [
          {
            "jp": "ブルーグリーンデプロイメント",
            "zh": "蓝绿部署（零停机切换架构）"
          },
          {
            "jp": "切り替えの瞬断を数分に抑える",
            "zh": "将切换中断时间压缩在数分钟之内",
            "jpWithRuby": "<ruby>切り替え<rt>きりかえ</rt></ruby>の<ruby>瞬断<rt>しゅんだん</rt></ruby>を<ruby>数<rt>すう</rt></ruby><ruby>分<rt>ふん</rt></ruby>に<ruby>抑える<rt>おさえる</rt></ruby>"
          },
          {
            "jp": "即座にロールバック可能な手順",
            "zh": "具备即时无损回滚能力的部署流程",
            "jpWithRuby": "<ruby>即座<rt>そくざ</rt></ruby>にロールバック<ruby>可能<rt>かのう</rt></ruby>な<ruby>手順<rt>てじゅん</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 12: 保守短文第 3 篇（ゼロダウンタイムリリースと段階的移行計画）"
      },
      "dialogueWithRuby": "「4<ruby>時間<rt>じかん</rt></ruby>もシステムを<ruby>全面<rt>ぜんめん</rt></ruby><ruby>停止<rt>ていし</rt></ruby>するなんて<ruby>認め<rt>みとめ</rt></ruby>られませんよ。<ruby>海外<rt>かいがい</rt></ruby><ruby>拠点<rt>きょてん</rt></ruby>からもアクセスがあるのに、<ruby>業務<rt>ぎょうむ</rt></ruby>を<ruby>止めろ<rt>とめろ</rt></ruby>と<ruby>言う<rt>いう</rt></ruby>んですか？」"
    },
    {
      "id": "q_obj_10",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 2: SFA移动端离线录入",
      "sceneId": "scene-2",
      "difficulty": "中级",
      "speaker": "地方営業所 所長",
      "speakerRole": "地方営業統括",
      "speakerAvatar": "👨‍💼",
      "context": "地方分公司所长反映很多偏远工厂客户和地下停车场根本没有信号，移动版如果必须联网，在当地完全就是废铁。",
      "dialogue": "「うちの担当エリアは電波の届かない山間部の工場やビルの地下駐車場が多いんです。通信前提のアプリなんて作られても、圏外では全く使い物になりませんよ。」",
      "prompt": "如何向地方所长清晰阐明移动应用的离线同步能力，消除其实用性担忧？",
      "options": [
        {
          "label": "A",
          "text": "圏外の場所ではメモ帳に手書きでメモしておいて、電波がつながる場所に出てから入力し直していただければ問題ございません。",
          "analysis": "【NG】让销售重新在记事本手写出来再录一遍，属于重复输入（二重入力），完全没解决所长提出的痛点。",
          "textWithRuby": "<ruby>圏外<rt>けんがい</rt></ruby>の<ruby>場所<rt>ばしょ</rt></ruby>ではメモ<ruby>帳<rt>ちょう</rt></ruby>に<ruby>手書き<rt>てがき</rt></ruby>でメモしておいて、<ruby>電波<rt>でんぱ</rt></ruby>がつながる<ruby>場所<rt>ばしょ</rt></ruby>に<ruby>出<rt>で</rt></ruby>てから<ruby>入力<rt>にゅうりょく</rt></ruby>し<ruby>直し<rt>なおし</rt></ruby>ていただければ<ruby>問題<rt>もんだい</rt></ruby>ございません。"
        },
        {
          "label": "B",
          "text": "所長、ご安心ください。本アプリはローカルストレージ（端末内保存）による『オフラインキャッシュ＆自動同期機能』を標準搭載しております。電波のない場所でも商談入力や閲覧が通常通り可能で、通信が復帰した瞬間にバックグラウンドで自動同期されます。",
          "analysis": "【正解】直击痛点，明确阐明架构：『本地缓存（Offline Cache）＋ 后台自动静默同步（バックグラウンド同期）』，保证地下室离线也能流畅录入和查询，信号恢复自动同步。",
          "textWithRuby": "<ruby>所長<rt>しょちょう</rt></ruby>、ご<ruby>安心<rt>あんしん</rt></ruby>ください。<ruby>本<rt>ほん</rt></ruby>アプリはローカルストレージ（<ruby>端末<rt>たんまつ</rt></ruby><ruby>内<rt>ない</rt></ruby><ruby>保存<rt>ほぞん</rt></ruby>）による『オフラインキャッシュ＆<ruby>自動<rt>じどう</rt></ruby><ruby>同期<rt>どうき</rt></ruby><ruby>機能<rt>きのう</rt></ruby>』を<ruby>標準<rt>ひょうじゅん</rt></ruby><ruby>搭載<rt>とうさい</rt></ruby>しております。<ruby>電波<rt>でんぱ</rt></ruby>のない<ruby>場所<rt>ばしょ</rt></ruby>でも<ruby>商談<rt>しょうだん</rt></ruby><ruby>入力<rt>にゅうりょく</rt></ruby>や<ruby>閲覧<rt>えつらん</rt></ruby>が<ruby>通常<rt>つうじょう</rt></ruby><ruby>通り<rt>とおり</rt></ruby><ruby>可能<rt>かのう</rt></ruby>で、<ruby>通信<rt>つうしん</rt></ruby>が<ruby>復帰<rt>ふっき</rt></ruby>した<ruby>瞬間<rt>しゅんかん</rt></ruby>にバックグラウンドで<ruby>自動<rt>じどう</rt></ruby><ruby>同期<rt>どうき</rt></ruby>されます。"
        },
        {
          "label": "C",
          "text": "電波の届かないエリアのお客様は訪問対象から除外して、オンライン商談に切り替えていただくのが合理的です。",
          "analysis": "【NG】教客户放弃偏远地区客户，荒谬至极，严重脱离销售业务现实。",
          "textWithRuby": "<ruby>電波<rt>でんぱ</rt></ruby>の<ruby>届か<rt>とどか</rt></ruby>ないエリアのお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>は<ruby>訪問<rt>ほうもん</rt></ruby><ruby>対象<rt>たいしょう</rt></ruby>から<ruby>除外<rt>じょがい</rt></ruby>して、オンライン<ruby>商談<rt>しょうだん</rt></ruby>に<ruby>切り替え<rt>きりかえ</rt></ruby>ていただくのが<ruby>合理<rt>ごうり</rt></ruby><ruby>的<rt>てき</rt></ruby>です。"
        },
        {
          "label": "D",
          "text": "5Gの基地局が全国に整備されるまで、そのエリアでの導入は待った方がよろしいかと思います。",
          "analysis": "【NG】把问题推给电信运营商的5G基建，消极避事，毫无解决问题的担当。",
          "textWithRuby": "5Gの<ruby>基地<rt>きち</rt></ruby><ruby>局<rt>きょく</rt></ruby>が<ruby>全国<rt>ぜんこく</rt></ruby>に<ruby>整備<rt>せいび</rt></ruby>されるまで、そのエリアでの<ruby>導入<rt>どうにゅう</rt></ruby>は<ruby>待っ<rt>まっ</rt></ruby>た<ruby>方<rt>ほう</rt></ruby>がよろしいかと<ruby>思い<rt>おもい</rt></ruby>ます。"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "在移动应用调研中，『オフライン耐性（离线容灾韧性）』是一线高频痛点。必须用明确的本地缓存与静默冲突解决机制打消顾虑。",
        "clientSubtext": "地方所长害怕总部制定的“华丽方案”在艰苦的一线水土不服，最后变成逼迫一线销售在路边找WiFi的鸡肋系统。",
        "keyPhrases": [
          {
            "jp": "オフラインキャッシュ＆自動同期",
            "zh": "离线缓存与自动同步机制",
            "jpWithRuby": "オフラインキャッシュ＆<ruby>自動<rt>じどう</rt></ruby><ruby>同期<rt>どうき</rt></ruby>"
          },
          {
            "jp": "通信が復帰した瞬間にバックグラウンドで同期",
            "zh": "一旦网络恢复即在后台静默同步",
            "jpWithRuby": "<ruby>通信<rt>つうしん</rt></ruby>が<ruby>復帰<rt>ふっき</rt></ruby>した<ruby>瞬間<rt>しゅんかん</rt></ruby>にバックグラウンドで<ruby>同期<rt>どうき</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 2: SFA核心课文第 3 轮（オフライン入力とローカル一時保存の仕様）"
      },
      "dialogueWithRuby": "「うちの<ruby>担当<rt>たんとう</rt></ruby>エリアは<ruby>電波<rt>でんぱ</rt></ruby>の<ruby>届か<rt>とどか</rt></ruby>ない<ruby>山間<rt>さんかん</rt></ruby><ruby>部<rt>ぶ</rt></ruby>の<ruby>工場<rt>こうじょう</rt></ruby>やビルの<ruby>地下<rt>ちか</rt></ruby><ruby>駐車<rt>ちゅうしゃ</rt></ruby><ruby>場<rt>じょう</rt></ruby>が<ruby>多い<rt>おおい</rt></ruby>んです。<ruby>通信<rt>つうしん</rt></ruby><ruby>前提<rt>ぜんてい</rt></ruby>のアプリなんて<ruby>作ら<rt>つくら</rt></ruby>れても、<ruby>圏外<rt>けんがい</rt></ruby>では<ruby>全く<rt>まったく</rt></ruby><ruby>使い物<rt>つかいもの</rt></ruby>になりませんよ。」"
    },
    {
      "id": "q_pit_01",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "全场景通用: 客户联络与应答",
      "sceneId": "cross",
      "difficulty": "初级",
      "speaker": "日本側 プロジェクトマネージャー",
      "speakerRole": "相手先PM (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "客户通过Teams或邮件向你发送了今天会议的日程安排与议题确认。",
      "dialogue": "「本日の要件定義ミーティングのアジェンダを添付にてお送りいたしました。ご確認のほどよろしくお願いいたします。」",
      "prompt": "收到客户正式业务联络时，中国工程师最容易出现以下哪种失礼的回复？",
      "options": [
        {
          "label": "A",
          "text": "「了解しました。」",
          "analysis": "【NG致命雷区】中国工程师极高频失礼错误！「了解しました/了解です」是上级对下级、同级之间使用的词，对客户或长辈使用属于严重的不敬失礼。必须使用「かしこまりました」或「承知いたしました」。",
          "textWithRuby": "「<ruby>了解<rt>りょうかい</rt></ruby>しました。」"
        },
        {
          "label": "B",
          "text": "「承知いたしました。内容を拝見し、準備を整えて参加させていただきます。」",
          "analysis": "【正解】标准商务典范：「承知いたしました」得体应答 ＋ 谦让语「拝見し」 ＋ 表达积极准备态度。",
          "textWithRuby": "「<ruby>承知<rt>しょうち</rt></ruby>いたしました。<ruby>内容<rt>ないよう</rt></ruby>を<ruby>拝見<rt>はいけん</rt></ruby>し、<ruby>準備<rt>じゅんび</rt></ruby>を<ruby>整え<rt>ととのえ</rt></ruby>て<ruby>参加<rt>さんか</rt></ruby>させていただきます。」"
        },
        {
          "label": "C",
          "text": "「かしこまりました。アジェンダを確認いたしましたら、改めてご連絡申し上げます。」",
          "analysis": "【正解】规范典雅：「かしこまりました」敬语到位，符合日企联络闭环规范。",
          "textWithRuby": "「かしこまりました。アジェンダを<ruby>確認<rt>かくにん</rt></ruby>いたしましたら、<ruby>改めて<rt>あらためて</rt></ruby>ご<ruby>連絡<rt>れんらく</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。」"
        },
        {
          "label": "D",
          "text": "「受領いたしました。本日の打ち合わせ、何卒よろしくお願い申し上げます。」",
          "analysis": "【正解】干练商务表达：使用「受領いたしました」确认收到材料，礼数周全。",
          "textWithRuby": "「<ruby>受領<rt>じゅりょう</rt></ruby>いたしました。<ruby>本日<rt>ほんじつ</rt></ruby>の<ruby>打ち合わせ<rt>うちあわせ</rt></ruby>、<ruby>何卒<rt>なにとぞ</rt></ruby>よろしくお<ruby>願い<rt>ねがい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "在日企商务交往中，「了解しました」被视作上对下的用语。对客户必须严格使用「承知いたしました」或「かしこまりました」。",
        "clientSubtext": "虽然许多日本客户表面上不会当场发怒斥责，但在内心已对你的商务成熟度打上扣分标签，认为你缺乏正规商务礼仪培训。",
        "keyPhrases": [
          {
            "jp": "承知いたしました / かしこまりました",
            "zh": "我已获悉/遵命（对客户、上级的标配）",
            "jpWithRuby": "<ruby>承知<rt>しょうち</rt></ruby>いたしました / かしこまりました"
          },
          {
            "jp": "了解しました（NG: 上から目線）",
            "zh": "知道了（上级对下级用语，对客户是大忌）",
            "jpWithRuby": "<ruby>了解<rt>りょうかい</rt></ruby>しました（NG: <ruby>上<rt>うえ</rt></ruby>から<ruby>目線<rt>めせん</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 1: 职场实战诊所（文化避雷指南：NG词汇汇总）"
      },
      "dialogueWithRuby": "「<ruby>本日<rt>ほんじつ</rt></ruby>の<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>ミーティングのアジェンダを<ruby>添付<rt>てんぷ</rt></ruby>にてお<ruby>送り<rt>おくり</rt></ruby>いたしました。ご<ruby>確認<rt>かくにん</rt></ruby>のほどよろしくお<ruby>願い<rt>ねがい</rt></ruby>いたします。」"
    },
    {
      "id": "q_pit_02",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 1: 需求探讨与提问方式",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "田中 部長",
      "speakerRole": "クライアント側 統括部長",
      "speakerAvatar": "👨‍💼",
      "context": "客户田中部长提出了一个看似与现有业务流程有些矛盾的定制要求，你想探究其背后的真实原因。",
      "dialogue": "「この画面では、承認ルートを固定せず、担当者が毎回自由に承認者を選べるようにしてほしいんだよね。」",
      "prompt": "你想深挖客户提出该要求的背景原因，以下哪种日语提问方式会显得刺耳、具有质问攻击性（NG）？",
      "options": [
        {
          "label": "A",
          "text": "「どのような背景やご事情から、そのようにご希望されているのかお伺いできますでしょうか。」",
          "analysis": "【得体】柔和探寻背景，使用缓冲语「お伺いできますでしょうか」，非常优雅专业。",
          "textWithRuby": "「どのような<ruby>背景<rt>はいけい</rt></ruby>やご<ruby>事情<rt>じじょう</rt></ruby>から、そのようにご<ruby>希望<rt>きぼう</rt></ruby>されているのかお<ruby>伺い<rt>うかがい</rt></ruby>できますでしょうか。」"
        },
        {
          "label": "B",
          "text": "「差し支えなければ、毎回自由選択とされる業務上の運用意図を詳しくご教示いただけますと幸いです。」",
          "analysis": "【得体】前置垫话「差し支えなければ」，将提问落脚在「業務上の運用意図」，职业感极强。",
          "textWithRuby": "「<ruby>差し支え<rt>さしつかえ</rt></ruby>なければ、<ruby>毎回<rt>まいかい</rt></ruby><ruby>自由<rt>じゆう</rt></ruby><ruby>選択<rt>せんたく</rt></ruby>とされる<ruby>業務<rt>ぎょうむ</rt></ruby><ruby>上<rt>じょう</rt></ruby>の<ruby>運用<rt>うんよう</rt></ruby><ruby>意図<rt>いと</rt></ruby>を<ruby>詳しく<rt>くわしく</rt></ruby>ご<ruby>教示<rt>きょうじ</rt></ruby>いただけますと<ruby>幸い<rt>さいわい</rt></ruby>です。」"
        },
        {
          "label": "C",
          "text": "「なぜ毎回選ぶ必要があるんですか？ ガバナンス上、普通は固定ルートにするのが一般的ですが。」",
          "analysis": "【NG致命雷区】中国工程师高频误区：直球使用「なぜですか（为什么）」，带有强烈的审问和质疑色彩；再加上「普通は〜一般的ですが（常理来说通常是...）」，直接暗讽客户不合常理、缺乏常识，极易激怒客户高管。",
          "textWithRuby": "「なぜ<ruby>毎回<rt>まいかい</rt></ruby><ruby>選ぶ<rt>えらぶ</rt></ruby><ruby>必要<rt>ひつよう</rt></ruby>があるんですか？ ガバナンス<ruby>上<rt>じょう</rt></ruby>、<ruby>普通<rt>ふつう</rt></ruby>は<ruby>固定<rt>こてい</rt></ruby>ルートにするのが<ruby>一般<rt>いっぱん</rt></ruby><ruby>的<rt>てき</rt></ruby>ですが。」"
        },
        {
          "label": "D",
          "text": "「案件の性質によって決裁権限者が流動的になるケースを想定されていらっしゃるのでしょうか。」",
          "analysis": "【得体】用假设式封闭提问主动帮客户找合理的业务解释，体贴且高效。",
          "textWithRuby": "「<ruby>案件<rt>あんけん</rt></ruby>の<ruby>性質<rt>せいしつ</rt></ruby>によって<ruby>決裁<rt>けっさい</rt></ruby><ruby>権限<rt>けんげん</rt></ruby><ruby>者<rt>しゃ</rt></ruby>が<ruby>流動<rt>りゅうどう</rt></ruby><ruby>的<rt>てき</rt></ruby>になるケースを<ruby>想定<rt>そうてい</rt></ruby>されていらっしゃるのでしょうか。」"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "探询理由绝不能用「なぜですか（审讯感）」，必须替换为『どのような背景・ご事情がございましょうか』或『運用上の意図をご教示いただけますか』。",
        "clientSubtext": "听到「なぜ」的瞬间，日本人的心理防御机制会本能开启，认为对方在评判、非难自己，接下来会演变成强硬的对峙。",
        "keyPhrases": [
          {
            "jp": "どのような背景がございましょうか",
            "zh": "请问是出于什么样的背景考量呢（优雅深挖原因）",
            "jpWithRuby": "どのような<ruby>背景<rt>はいけい</rt></ruby>がございましょうか"
          },
          {
            "jp": "差し支えなければ",
            "zh": "如果不便请包涵 / 在方便的前提下（万能缓冲语）",
            "jpWithRuby": "<ruby>差し支え<rt>さしつかえ</rt></ruby>なければ"
          }
        ],
        "referenceDialogue": "场景 1: 教材第 3 轮（深掘り質問のクッション言葉）"
      },
      "dialogueWithRuby": "「この<ruby>画面<rt>がめん</rt></ruby>では、<ruby>承認<rt>しょうにん</rt></ruby>ルートを<ruby>固定<rt>こてい</rt></ruby>せず、<ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>が<ruby>毎回<rt>まいかい</rt></ruby><ruby>自由<rt>じゆう</rt></ruby>に<ruby>承認<rt>しょうにん</rt></ruby><ruby>者<rt>しゃ</rt></ruby>を<ruby>選べる<rt>えらべる</rt></ruby>ようにしてほしいんだよね。」"
    },
    {
      "id": "q_pit_03",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 12: 进度延误与坏消息报送 (報連相)",
      "sceneId": "scene-12",
      "difficulty": "高级",
      "speaker": "自社PM (自分)",
      "speakerRole": "開発側 プロジェクトマネージャー",
      "speakerAvatar": "🧑‍💻",
      "context": "在开发联调中发现第三方支付网关接口有未预期的缺陷，原定周五的验收测试（UAT）大概率需要延期2天。",
      "dialogue": "（開発内部で障害が発覚し、このままでは金曜の受入テスト開始が2日遅れる見込みとなった。）",
      "prompt": "在对日项目『報連相（Hou-Ren-So）』原则中，以下哪种处理方式是最致命的踩坑行为（最悪の対応）？",
      "options": [
        {
          "label": "A",
          "text": "週末の残業で何とか挽回できるかもしれないと考え、顧客には何も言わず金曜日の夕方になって初めて『実は間に合いませんでした』と報告した。",
          "analysis": "【NG致命雷区！日企最深恶痛绝的行为】瞒报拖延，直到最后一刻才把既成事实的烂摊子砸给客户。日企最看重可预测性与风险前置，拖到Deadline爆雷将彻底摧毁信任，甚至引发索赔与换供应商。",
          "textWithRuby": "<ruby>週末<rt>しゅうまつ</rt></ruby>の<ruby>残業<rt>ざんぎょう</rt></ruby>で<ruby>何<rt>なん</rt></ruby>とか<ruby>挽回<rt>ばんかい</rt></ruby>できるかもしれないと<ruby>考え<rt>かんがえ</rt></ruby>、<ruby>顧客<rt>こきゃく</rt></ruby>には<ruby>何<rt>なん</rt></ruby>も<ruby>言わ<rt>いわ</rt></ruby>ず<ruby>金曜<rt>きんよう</rt></ruby><ruby>日<rt>ひ</rt></ruby>の<ruby>夕方<rt>ゆうがた</rt></ruby>になって<ruby>初めて<rt>はじめて</rt></ruby>『<ruby>実<rt>じつ</rt></ruby>は<ruby>間に合い<rt>まにあい</rt></ruby>ませんでした』と<ruby>報告<rt>ほうこく</rt></ruby>した。"
        },
        {
          "label": "B",
          "text": "遅延の可能性を検知した当日のうちに、『事象・影響範囲・挽回リカバリー策2案』を揃えて顧客PMに第一報（バッドニュースファースト）を入れた。",
          "analysis": "【正解】最佳对日职业实践：Bad News First！带方案向上汇报，给客户留出调整下游工序的宝贵窗口期。",
          "textWithRuby": "<ruby>遅延<rt>ちえん</rt></ruby>の<ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>検知<rt>けんち</rt></ruby>した<ruby>当日<rt>とうじつ</rt></ruby>のうちに、『<ruby>事象<rt>じしょう</rt></ruby>・<ruby>影響<rt>えいきょう</rt></ruby><ruby>範囲<rt>はんい</rt></ruby>・<ruby>挽回<rt>ばんかい</rt></ruby>リカバリー<ruby>策<rt>さく</rt></ruby>2<ruby>案<rt>あん</rt></ruby>』を<ruby>揃え<rt>そろえ</rt></ruby>て<ruby>顧客<rt>こきゃく</rt></ruby>PMに<ruby>第<rt>だい</rt></ruby><ruby>一報<rt>いっぽう</rt></ruby>（バッドニュースファースト）を<ruby>入れ<rt>いれ</rt></ruby>た。"
        },
        {
          "label": "C",
          "text": "遅延影響を最小化するため、決済機能以外のモジュールを予定通り先行テストしていただく『段階受入プラン』を作成して顧客に打診した。",
          "analysis": "【正解】积极的业务保护措施：拆分交付物先行测试，化被动为主动。",
          "textWithRuby": "<ruby>遅延<rt>ちえん</rt></ruby><ruby>影響<rt>えいきょう</rt></ruby>を<ruby>最小<rt>さいしょう</rt></ruby><ruby>化<rt>か</rt></ruby>するため、<ruby>決済<rt>けっさい</rt></ruby><ruby>機能<rt>きのう</rt></ruby><ruby>以外<rt>いがい</rt></ruby>のモジュールを<ruby>予定<rt>よてい</rt></ruby><ruby>通り<rt>とおり</rt></ruby><ruby>先行<rt>せんこう</rt></ruby>テストしていただく『<ruby>段階<rt>だんかい</rt></ruby><ruby>受入<rt>うけいれ</rt></ruby>プラン』を<ruby>作成<rt>さくせい</rt></ruby>して<ruby>顧客<rt>こきゃく</rt></ruby>に<ruby>打診<rt>だしん</rt></ruby>した。"
        },
        {
          "label": "D",
          "text": "外部決済ゲートウェイ側の問題であっても、自社の調査結果とログ証跡を整理し、当事者意識を持った報告書を提出した。",
          "analysis": "【正解】不甩锅第三方，以完整的日志证据链体现高度的专业负责精神。",
          "textWithRuby": "<ruby>外部<rt>がいぶ</rt></ruby><ruby>決済<rt>けっさい</rt></ruby>ゲートウェイ<ruby>側<rt>がわ</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby>であっても、<ruby>自社<rt>じしゃ</rt></ruby>の<ruby>調査<rt>ちょうさ</rt></ruby><ruby>結果<rt>けっか</rt></ruby>とログ<ruby>証跡<rt>しょうせき</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>し、<ruby>当事<rt>とうじ</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>意識<rt>いしき</rt></ruby>を<ruby>持っ<rt>もっ</rt></ruby>た<ruby>報告<rt>ほうこく</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>提出<rt>ていしゅつ</rt></ruby>した。"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "日企项目管理的第一铁律是『Bad News First（坏消息第一时间报告）』。哪怕只有30%延期概率，也要提前打招呼（事前のアラート）。",
        "clientSubtext": "客户PM也有他的直接领导和下游各业务部门。你提前3天告诉他，他可以调剂安排；你到周五下班才说，等于直接把他在整个公司推上刑场。",
        "keyPhrases": [
          {
            "jp": "バッドニュースファースト",
            "zh": "坏消息第一原则（报连相之精髓）"
          },
          {
            "jp": "リカバリー策（挽回策）",
            "zh": "弥补挽回措施方案",
            "jpWithRuby": "リカバリー<ruby>策<rt>さく</rt></ruby>（<ruby>挽回<rt>ばんかい</rt></ruby><ruby>策<rt>さく</rt></ruby>）"
          },
          {
            "jp": "事前のアラートを上げる",
            "zh": "提前拉响风险预警",
            "jpWithRuby": "<ruby>事前<rt>じぜん</rt></ruby>のアラートを<ruby>上げる<rt>あげる</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 12: 职场诊所（報連相と遅延発生時のリカバリー報告手順）"
      },
      "dialogueWithRuby": "（<ruby>開発<rt>かいはつ</rt></ruby><ruby>内部<rt>ないぶ</rt></ruby>で<ruby>障害<rt>しょうがい</rt></ruby>が<ruby>発覚<rt>はっかく</rt></ruby>し、このままでは<ruby>金曜<rt>きんよう</rt></ruby>の<ruby>受入<rt>うけいれ</rt></ruby>テスト<ruby>開始<rt>かいし</rt></ruby>が2<ruby>日<rt>か</rt></ruby><ruby>遅れる<rt>おくれる</rt></ruby><ruby>見込み<rt>みこみ</rt></ruby>となった。）"
    },
    {
      "id": "q_pit_04",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 2: 拒绝客户非合理需求",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "クライアント 業務リーダー",
      "speakerRole": "業務側リーダー",
      "speakerAvatar": "👨‍💼",
      "context": "在基本设计（UI/UX）冻结后，业务负责人突然在走廊随口提出想在主界面增加一个超复杂的3D动画大屏展示。",
      "dialogue": "「やっぱりトップ画面にリアルタイムで動く3Dアニメーショングラフを入れたいんだけど、明日までにサクッと追加しておいてくれない？」",
      "prompt": "当必须拒绝或制止客户不合理的随口变更时，以下哪种中国开发者的常见回答是严重踩坑？",
      "options": [
        {
          "label": "A",
          "text": "「できません。もう仕様凍結（フリーズ）しましたので、規約上不可能です。」",
          "analysis": "【NG致命雷区】中国工程师常见生硬生冷拒绝！直球抛出「できません」「不可能です」，虽然技术规则上没错，但态度极其冷酷生硬，在日企沟通中会被认为缺乏协作诚意与情商，极易激化矛盾。",
          "textWithRuby": "「できません。もう<ruby>仕様<rt>しよう</rt></ruby><ruby>凍結<rt>とうけつ</rt></ruby>（フリーズ）しましたので、<ruby>規約<rt>きやく</rt></ruby><ruby>上<rt>じょう</rt></ruby><ruby>不<rt>ふ</rt></ruby><ruby>可能<rt>かのう</rt></ruby>です。」"
        },
        {
          "label": "B",
          "text": "「3Dアニメーションによる可視化は非常に魅力的なアイデアですね。あいにく現行の納期と基本設計の範囲内では即座の実装が難しゅうございます。もしよろしければ、Phase 2の拡張要望として影響工数とお見積りを正式に整理いたしましょうか。」",
          "analysis": "【正解】日企教科书级拒绝法：『肯定创意价值 ＋ 缓冲语（あいにく）委婉表达困难 ＋ 提出Phase 2评估追加工数替代方案』。",
          "textWithRuby": "「3Dアニメーションによる<ruby>可視<rt>かし</rt></ruby><ruby>化<rt>か</rt></ruby>は<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>魅力<rt>みりょく</rt></ruby><ruby>的<rt>てき</rt></ruby>なアイデアですね。あいにく<ruby>現行<rt>げんこう</rt></ruby>の<ruby>納期<rt>のうき</rt></ruby>と<ruby>基本<rt>きほん</rt></ruby><ruby>設計<rt>せっけい</rt></ruby>の<ruby>範囲<rt>はんい</rt></ruby><ruby>内<rt>ない</rt></ruby>では<ruby>即座<rt>そくざ</rt></ruby>の<ruby>実装<rt>じっそう</rt></ruby>が<ruby>難しゅう<rt>むずかしゅう</rt></ruby>ございます。もしよろしければ、Phase 2の<ruby>拡張<rt>かくちょう</rt></ruby><ruby>要望<rt>ようぼう</rt></ruby>として<ruby>影響<rt>えいきょう</rt></ruby><ruby>工数<rt>こうすう</rt></ruby>とお<ruby>見積り<rt>みつもり</rt></ruby>を<ruby>正式<rt>せいしき</rt></ruby>に<ruby>整理<rt>せいり</rt></ruby>いたしましょうか。」"
        },
        {
          "label": "C",
          "text": "「ご要望ありがとうございます。明日までの追加となりますと他の重要機能の検証がストップしてしまいます。仕様変更（CR）手続きとして一度PM間で優先順位を協議させていただけますでしょうか。」",
          "analysis": "【正解】理智客观指出挤占当前验收测试的代价，引导回到正规的变更流程。",
          "textWithRuby": "「ご<ruby>要望<rt>ようぼう</rt></ruby>ありがとうございます。<ruby>明日<rt>あす</rt></ruby>までの<ruby>追加<rt>ついか</rt></ruby>となりますと<ruby>他<rt>ほか</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>機能<rt>きのう</rt></ruby>の<ruby>検証<rt>けんしょう</rt></ruby>がストップしてしまいます。<ruby>仕様<rt>しよう</rt></ruby><ruby>変更<rt>へんこう</rt></ruby>（CR）<ruby>手続き<rt>てつづき</rt></ruby>として<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>PM<ruby>間<rt>かん</rt></ruby>で<ruby>優先<rt>ゆうせん</rt></ruby><ruby>順位<rt>じゅんい</rt></ruby>を<ruby>協議<rt>きょうぎ</rt></ruby>させていただけますでしょうか。」"
        },
        {
          "label": "D",
          "text": "「大変魅力的なご提案ですが、モバイル端末の描画パフォーマンスに負荷がかかる懸念がございます。代替案として軽量なSVGグラフの採用をご検討いただけますでしょうか。」",
          "analysis": "【正解】从保护系统性能角度提出轻量级替代案（Alternative）。",
          "textWithRuby": "「<ruby>大変<rt>たいへん</rt></ruby><ruby>魅力<rt>みりょく</rt></ruby><ruby>的<rt>てき</rt></ruby>なご<ruby>提案<rt>ていあん</rt></ruby>ですが、モバイル<ruby>端末<rt>たんまつ</rt></ruby>の<ruby>描画<rt>びょうが</rt></ruby>パフォーマンスに<ruby>負荷<rt>ふか</rt></ruby>がかかる<ruby>懸念<rt>けねん</rt></ruby>がございます。<ruby>代替<rt>だいたい</rt></ruby><ruby>案<rt>あん</rt></ruby>として<ruby>軽量<rt>けいりょう</rt></ruby>なSVGグラフの<ruby>採用<rt>さいよう</rt></ruby>をご<ruby>検討<rt>けんとう</rt></ruby>いただけますでしょうか。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "在日企决不能直接说「できません」。必须使用『クッション言葉 ＋ 代替案（Alternative）の提示 ＋ 追加フェーズ（CR）への誘導』。",
        "clientSubtext": "日企客户并不是不讲理，他们反感的是被供应商像甩包袱一样直接回怼一句“不行”。给予尊重的婉拒反而能彰显专业风范。",
        "keyPhrases": [
          {
            "jp": "現行の枠組みでは難しゅうございますが",
            "zh": "在现行框架下恐难以实现，但是...",
            "jpWithRuby": "<ruby>現行<rt>げんこう</rt></ruby>の<ruby>枠組み<rt>わくぐみ</rt></ruby>では<ruby>難しゅう<rt>むずかしゅう</rt></ruby>ございますが"
          },
          {
            "jp": "代替案をご検討いただけますと幸甚です",
            "zh": "若能考虑替代方案将不胜感激",
            "jpWithRuby": "<ruby>代替<rt>だいたい</rt></ruby><ruby>案<rt>あん</rt></ruby>をご<ruby>検討<rt>けんとう</rt></ruby>いただけますと<ruby>幸甚<rt>こうじん</rt></ruby>です"
          }
        ],
        "referenceDialogue": "场景 2: 职场诊所（「できません」と言わない断り方の極意）"
      },
      "dialogueWithRuby": "「やっぱりトップ<ruby>画面<rt>がめん</rt></ruby>にリアルタイムで<ruby>動く<rt>うごく</rt></ruby>3Dアニメーショングラフを<ruby>入れ<rt>いれ</rt></ruby>たいんだけど、<ruby>明日<rt>あす</rt></ruby>までにサクッと<ruby>追加<rt>ついか</rt></ruby>しておいてくれない？」"
    },
    {
      "id": "q_pit_05",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 1: 会议应答与不确定事项",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "山田 課長",
      "speakerRole": "情報システム課長",
      "speakerAvatar": "🧑‍💻",
      "context": "山田课长在现场突然问了一个极为冷僻的旧版Oracle数据库版本兼容性问题，你手头没有确切的验证数据。",
      "dialogue": "「この新モジュール、うちの古いOracle 11g R2の特定パッチ環境でも文字化けせずに動くかな？」",
      "prompt": "面对客户突然发难且自己手头缺乏100%把握的技术问题，以下哪种回答是严重NG陷阱？",
      "options": [
        {
          "label": "A",
          "text": "「はい、たぶん大丈夫だと思います。動くはずです。」",
          "analysis": "【NG致命雷区】中国工程师极高频踩坑！为了面子或怕冷场，随口用「たぶん（大概）」「〜はずです（应该没问题）」口头打包票。在日企，口头承诺等同于合同义务，一旦后面测出文字乱码，客户会认定你欺骗！",
          "textWithRuby": "「はい、たぶん<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>だと<ruby>思い<rt>おもい</rt></ruby>ます。<ruby>動く<rt>うごく</rt></ruby>はずです。」"
        },
        {
          "label": "B",
          "text": "「恐れ入ります、該当パッチとの厳密な文字コード互換性については即答いたしかねます。誤ったご案内を避けるため、持ち帰って当社の検証環境で実機テストを実施し、明日の正午までに確実な回答をご連絡申し上げてもよろしいでしょうか。」",
          "analysis": "【正解】日企专业顾问的标准模范回答：承认不确定（「即答いたしかねます」）＋ 说明原因（「誤ったご案内を避けるため」）＋ 明确后续行动与严格截止时间（「明日の正午までに」）。",
          "textWithRuby": "「<ruby>恐れ入り<rt>おそれいり</rt></ruby>ます、<ruby>該当<rt>がいとう</rt></ruby>パッチとの<ruby>厳密<rt>げんみつ</rt></ruby>な<ruby>文字<rt>もじ</rt></ruby>コード<ruby>互換<rt>ごかん</rt></ruby><ruby>性<rt>せい</rt></ruby>については<ruby>即答<rt>そくとう</rt></ruby>いたしかねます。<ruby>誤っ<rt>あやまっ</rt></ruby>たご<ruby>案内<rt>あんない</rt></ruby>を<ruby>避ける<rt>さける</rt></ruby>ため、<ruby>持ち帰っ<rt>もちかえっ</rt></ruby>て<ruby>当社<rt>とうしゃ</rt></ruby>の<ruby>検証<rt>けんしょう</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>で<ruby>実機<rt>じっき</rt></ruby>テストを<ruby>実施<rt>じっし</rt></ruby>し、<ruby>明日<rt>あす</rt></ruby>の<ruby>正午<rt>しょうご</rt></ruby>までに<ruby>確実<rt>かくじつ</rt></ruby>な<ruby>回答<rt>かいとう</rt></ruby>をご<ruby>連絡<rt>れんらく</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>てもよろしいでしょうか。」"
        },
        {
          "label": "C",
          "text": "「念のため、該当のOracle環境のパッチ適用リストとキャラクターセット定義をご共有いただけますでしょうか。当方にて検証のうえ確答いたします。」",
          "analysis": "【正解】索取环境清单带回验证，严谨可靠。",
          "textWithRuby": "「<ruby>念<rt>ねん</rt></ruby>のため、<ruby>該当<rt>がいとう</rt></ruby>のOracle<ruby>環境<rt>かんきょう</rt></ruby>のパッチ<ruby>適用<rt>てきよう</rt></ruby>リストとキャラクターセット<ruby>定義<rt>ていぎ</rt></ruby>をご<ruby>共有<rt>きょうゆう</rt></ruby>いただけますでしょうか。<ruby>当方<rt>とうほう</rt></ruby>にて<ruby>検証<rt>けんしょう</rt></ruby>のうえ<ruby>確答<rt>かくとう</rt></ruby>いたします。」"
        },
        {
          "label": "D",
          "text": "「現在手元に実証データがございませんので、確かな事実を確認のうえ、本日夕刻の議事録と合わせてご報告いたします。」",
          "analysis": "【正解】承诺与会议纪要一并严谨向客户澄清。",
          "textWithRuby": "「<ruby>現在<rt>げんざい</rt></ruby><ruby>手元<rt>てもと</rt></ruby>に<ruby>実証<rt>じっしょう</rt></ruby>データがございませんので、<ruby>確か<rt>たしか</rt></ruby>な<ruby>事実<rt>じじつ</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>のうえ、<ruby>本日<rt>ほんじつ</rt></ruby><ruby>夕刻<rt>ゆうこく</rt></ruby>の<ruby>議事<rt>ぎじ</rt></ruby><ruby>録<rt>ろく</rt></ruby>と<ruby>合わせ<rt>あわせ</rt></ruby>てご<ruby>報告<rt>ほうこく</rt></ruby>いたします。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "在日企技术商谈中，『不懂装懂、模糊承诺（たぶん・はず）』是头等大罪。诚实地『持ち帰り確認』并约定精确承诺期限（Deadline）才是最高分表现。",
        "clientSubtext": "山田课长作为情シス主管，问这个其实是在测试你的严谨度。如果你随口说没问题，他反而会认为你是个嘴上跑火车的不可靠乙方。",
        "keyPhrases": [
          {
            "jp": "即答いたしかねます",
            "zh": "请恕我手头现无法即刻作答",
            "jpWithRuby": "<ruby>即答<rt>そくとう</rt></ruby>いたしかねます"
          },
          {
            "jp": "持ち帰って検証のうえ",
            "zh": "待我带回团队严格验证之后...",
            "jpWithRuby": "<ruby>持ち帰っ<rt>もちかえっ</rt></ruby>て<ruby>検証<rt>けんしょう</rt></ruby>のうえ"
          },
          {
            "jp": "誤ったご案内を避けるため",
            "zh": "为避免提供不准确的信息误导贵方",
            "jpWithRuby": "<ruby>誤っ<rt>あやまっ</rt></ruby>たご<ruby>案内<rt>あんない</rt></ruby>を<ruby>避ける<rt>さける</rt></ruby>ため"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 7 轮（李：持ち帰り検討のビジネス定型句）"
      },
      "dialogueWithRuby": "「この<ruby>新<rt>しん</rt></ruby>モジュール、うちの<ruby>古い<rt>ふるい</rt></ruby>Oracle 11g R2の<ruby>特定<rt>とくてい</rt></ruby>パッチ<ruby>環境<rt>かんきょう</rt></ruby>でも<ruby>文字<rt>もじ</rt></ruby><ruby>化け<rt>ばけ</rt></ruby>せずに<ruby>動く<rt>うごく</rt></ruby>かな？」"
    },
    {
      "id": "q_pit_06",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 11: 问题归因与甩锅 (他責NG)",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "高橋 カスタマーサポート長",
      "speakerRole": "CS部 統括責任者",
      "speakerAvatar": "👩‍💼",
      "context": "在联调过程中，客户提供的测试数据格式严重缺失必填字段，导致批量导入任务失败并报错。",
      "dialogue": "「テストデータのインポートがエラーで止まっていると聞きましたが、何が原因なんですか？」",
      "prompt": "向客户说明问题原因时，以下哪种表述属于典型的“甩锅/自责失衡（他責の罠）”？",
      "options": [
        {
          "label": "A",
          "text": "「御社からいただいたテストデータの作り方が間違っていました。必須項目が抜けているのでインポートできるわけがありません。」",
          "analysis": "【NG致命雷区】典型的攻击性他责发言（「作り方が間違っていた」「できるわけがない」）！直接把手指向客户“你们做错了”，瞬间摧毁合作互信，极度失礼。",
          "textWithRuby": "「<ruby>御社<rt>おんしゃ</rt></ruby>からいただいたテストデータの<ruby>作り<rt>つくり</rt></ruby><ruby>方<rt>かた</rt></ruby>が<ruby>間違っ<rt>まちがっ</rt></ruby>ていました。<ruby>必須<rt>ひっす</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>が<ruby>抜け<rt>ぬけ</rt></ruby>ているのでインポートできるわけがありません。」"
        },
        {
          "label": "B",
          "text": "「原因を調査いたしましたところ、インポート仕様書に記載の必須項目『顧客ID』が一部のレコードで空欄となっており、バリデーションで弾かれていた状況でございました。当方からのデータ仕様の事前アナウンスが不十分で恐縮でございます。該当箇所の修正フォーマットを作成いたしましたのでご確認いただけますでしょうか。」",
          "analysis": "【正解】顶级顾问说话艺术：摆客观事实（字段空值）而不下道德指责；先自省己方指引不充分（「アナウンスが不十分で恐縮」）；立即附带修正好的模板帮助客户解决问题。",
          "textWithRuby": "「<ruby>原因<rt>げんいん</rt></ruby>を<ruby>調査<rt>ちょうさ</rt></ruby>いたしましたところ、インポート<ruby>仕様<rt>しよう</rt></ruby><ruby>書<rt>しょ</rt></ruby>に<ruby>記載<rt>きさい</rt></ruby>の<ruby>必須<rt>ひっす</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>『<ruby>顧客<rt>こきゃく</rt></ruby>ID』が<ruby>一部<rt>いちぶ</rt></ruby>のレコードで<ruby>空欄<rt>くうらん</rt></ruby>となっており、バリデーションで<ruby>弾か<rt>ひか</rt></ruby>れていた<ruby>状況<rt>じょうきょう</rt></ruby>でございました。<ruby>当方<rt>とうほう</rt></ruby>からのデータ<ruby>仕様<rt>しよう</rt></ruby>の<ruby>事前<rt>じぜん</rt></ruby>アナウンスが<ruby>不<rt>ふ</rt></ruby><ruby>十分<rt>じゅうぶん</rt></ruby>で<ruby>恐縮<rt>きょうしゅく</rt></ruby>でございます。<ruby>該当<rt>がいとう</rt></ruby><ruby>箇所<rt>かしょ</rt></ruby>の<ruby>修正<rt>しゅうせい</rt></ruby>フォーマットを<ruby>作成<rt>さくせい</rt></ruby>いたしましたのでご<ruby>確認<rt>かくにん</rt></ruby>いただけますでしょうか。」"
        },
        {
          "label": "C",
          "text": "「エラーログを確認した結果、フォーマットの不整合を検出いたしました。御社側でのデータ再作成をスムーズに進めていただけるよう、自動チェックツールをご用意いたしました。」",
          "analysis": "【正解】提供自动化排错小工具，展现伙伴式协助精神。",
          "textWithRuby": "「エラーログを<ruby>確認<rt>かくにん</rt></ruby>した<ruby>結果<rt>けっか</rt></ruby>、フォーマットの<ruby>不<rt>ふ</rt></ruby><ruby>整合<rt>せいごう</rt></ruby>を<ruby>検出<rt>けんしゅつ</rt></ruby>いたしました。<ruby>御社<rt>おんしゃ</rt></ruby><ruby>側<rt>がわ</rt></ruby>でのデータ<ruby>再<rt>さい</rt></ruby><ruby>作成<rt>さくせい</rt></ruby>をスムーズに<ruby>進め<rt>すすめ</rt></ruby>ていただけるよう、<ruby>自動<rt>じどう</rt></ruby>チェックツールをご<ruby>用意<rt>ようい</rt></ruby>いたしました。」"
        },
        {
          "label": "D",
          "text": "「受領データと取り込みインターフェースの項目定義に差異がございました。サンプル修正データを1件作成いたしましたので、こちらに合わせて更新をお願いできますでしょうか。」",
          "analysis": "【正解】用客观的“定义差异”中性词汇，并提供修改好的Demo示例。",
          "textWithRuby": "「<ruby>受領<rt>じゅりょう</rt></ruby>データと<ruby>取り込み<rt>とりこみ</rt></ruby>インターフェースの<ruby>項目<rt>こうもく</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>に<ruby>差異<rt>さい</rt></ruby>がございました。サンプル<ruby>修正<rt>しゅうせい</rt></ruby>データを1<ruby>件<rt>けん</rt></ruby><ruby>作成<rt>さくせい</rt></ruby>いたしましたので、こちらに<ruby>合わせ<rt>あわせ</rt></ruby>て<ruby>更新<rt>こうしん</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>できますでしょうか。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "在日企沟通中，哪怕100%是客户数据填错了，也不能直言『御社が間違った』。必须用『フォーマットの差異』等客观中性词，并先礼貌自谦表达支持。",
        "clientSubtext": "客户并不瞎，看到字段空了心里明白是自己人填漏了。如果你当众大肆宣扬客户犯错，让高管面子挂不住，他后续会在验收和商务上处处刁难你。",
        "keyPhrases": [
          {
            "jp": "事前の共有が不十分で恐縮ですが",
            "zh": "恕我方事前沟通解释仍不够详尽（先承担半步）",
            "jpWithRuby": "<ruby>事前<rt>じぜん</rt></ruby>の<ruby>共有<rt>きょうゆう</rt></ruby>が<ruby>不<rt>ふ</rt></ruby><ruby>十分<rt>じゅうぶん</rt></ruby>で<ruby>恐縮<rt>きょうしゅく</rt></ruby>ですが"
          },
          {
            "jp": "項目の不整合を検出いたしました",
            "zh": "系统检测到字段定义存在不一致",
            "jpWithRuby": "<ruby>項目<rt>こうもく</rt></ruby>の<ruby>不<rt>ふ</rt></ruby><ruby>整合<rt>せいごう</rt></ruby>を<ruby>検出<rt>けんしゅつ</rt></ruby>いたしました"
          }
        ],
        "referenceDialogue": "场景 11: 职场诊所（障害・エラー報告における「他責」回避の言い回し）"
      },
      "dialogueWithRuby": "「テストデータのインポートがエラーで<ruby>止まっ<rt>とまっ</rt></ruby>ていると<ruby>聞き<rt>きき</rt></ruby>ましたが、<ruby>何<rt>なん</rt></ruby>が<ruby>原因<rt>げんいん</rt></ruby>なんですか？」"
    },
    {
      "id": "q_pit_07",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 21: 变更管理与随意承诺 (スコープクリープ)",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "松井 センター長",
      "speakerRole": "物流倉庫センター長",
      "speakerAvatar": "👷‍♂️",
      "context": "在现地调研闲聊时，松井中心长拉着你说：“既然都做了手持扫描，顺便帮我们把隔壁冷冻库的叉车防撞传感器也一起接进来吧，不费事吧？”",
      "dialogue": "「ついでにさ、フォークリフトのセンサーデータも画面にパパッと表示できるようにしといてよ。ちょっとコード書き換えるだけで簡単でしょ？」",
      "prompt": "面对客户非正式场合的“顺便加个功能”诱惑，开发人员最严重的踩坑行为是什么？",
      "options": [
        {
          "label": "A",
          "text": "「センター長、せっかくの現場のお声ですし、簡単なセンサーならサービスでついでに組み込んでおきますよ！」と口頭で即諾した。",
          "analysis": "【NG致命雷区！范围失控之源】严重违反对日交付铁律！私自口头允诺“免费顺便做（サービス）”。一旦后续传感器协议不兼容、引发总线阻塞或拖慢交付，既无法追加预算，还必须承担延期违约责任，且在PM之间造成巨大的信息黑洞。",
          "textWithRuby": "「センター<ruby>長<rt>ちょう</rt></ruby>、せっかくの<ruby>現場<rt>げんば</rt></ruby>のお<ruby>声<rt>こえ</rt></ruby>ですし、<ruby>簡単<rt>かんたん</rt></ruby>なセンサーならサービスでついでに<ruby>組み込ん<rt>くみこん</rt></ruby>でおきますよ！」と<ruby>口頭<rt>こうとう</rt></ruby>で<ruby>即諾<rt>そくだく</rt></ruby>した。"
        },
        {
          "label": "B",
          "text": "「フォークリフトの安全管理は素晴らしい着眼点ですね。ただセンサー連携はハードウェア規格や通信検証を伴うため、まずは本プロジェクトのPMである山田様にもご報告し、スコープと工数を正式に精査させていただきます。」",
          "analysis": "【正解】得体接纳客户痛点，同时坚决守住项目变更界限，明确说明硬件联调风险并引导至正规PM评审路径。",
          "textWithRuby": "「フォークリフトの<ruby>安全<rt>あんぜん</rt></ruby><ruby>管理<rt>かんり</rt></ruby>は<ruby>素晴らしい<rt>すばらしい</rt></ruby><ruby>着眼<rt>ちゃくがん</rt></ruby><ruby>点<rt>てん</rt></ruby>ですね。ただセンサー<ruby>連携<rt>れんけい</rt></ruby>はハードウェア<ruby>規格<rt>きかく</rt></ruby>や<ruby>通信<rt>つうしん</rt></ruby><ruby>検証<rt>けんしょう</rt></ruby>を<ruby>伴う<rt>ともなう</rt></ruby>ため、まずは<ruby>本<rt>ほん</rt></ruby>プロジェクトのPMである<ruby>山田<rt>やまだ</rt></ruby><ruby>様<rt>さま</rt></ruby>にもご<ruby>報告<rt>ほうこく</rt></ruby>し、スコープと<ruby>工数<rt>こうすう</rt></ruby>を<ruby>正式<rt>せいしき</rt></ruby>に<ruby>精査<rt>せいさ</rt></ruby>させていただきます。」"
        },
        {
          "label": "C",
          "text": "「大変意義深いご要望と存じます。現行スプリントの範囲外となりますため、要望バックログに登録のうえ、次期フェーズの課題検討シートに記載させていただきます。」",
          "analysis": "【正解】标准敏捷/对日规范：录入Backlog与次期课题管理表，不私自承诺。",
          "textWithRuby": "「<ruby>大変<rt>たいへん</rt></ruby><ruby>意義<rt>いぎ</rt></ruby><ruby>深い<rt>ふかい</rt></ruby>ご<ruby>要望<rt>ようぼう</rt></ruby>と<ruby>存じ<rt>ぞんじ</rt></ruby>ます。<ruby>現行<rt>げんこう</rt></ruby>スプリントの<ruby>範囲<rt>はんい</rt></ruby><ruby>外<rt>がい</rt></ruby>となりますため、<ruby>要望<rt>ようぼう</rt></ruby>バックログに<ruby>登録<rt>とうろく</rt></ruby>のうえ、<ruby>次期<rt>じき</rt></ruby>フェーズの<ruby>課題<rt>かだい</rt></ruby><ruby>検討<rt>けんとう</rt></ruby>シートに<ruby>記載<rt>きさい</rt></ruby>させていただきます。」"
        },
        {
          "label": "D",
          "text": "「ご提案感謝いたします。通信帯域とバッテリー消費への影響度調査が必要ですので、影響調査票を作成のうえ正式にご相談させてください。」",
          "analysis": "【正解】用科学的技术评估流程抵御随意变更。",
          "textWithRuby": "「ご<ruby>提案<rt>ていあん</rt></ruby><ruby>感謝<rt>かんしゃ</rt></ruby>いたします。<ruby>通信<rt>つうしん</rt></ruby><ruby>帯域<rt>たいいき</rt></ruby>とバッテリー<ruby>消費<rt>しょうひ</rt></ruby>への<ruby>影響<rt>えいきょう</rt></ruby><ruby>度<rt>ど</rt></ruby><ruby>調査<rt>ちょうさ</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>ですので、<ruby>影響<rt>えいきょう</rt></ruby><ruby>調査<rt>ちょうさ</rt></ruby><ruby>票<rt>ひょう</rt></ruby>を<ruby>作成<rt>さくせい</rt></ruby>のうえ<ruby>正式<rt>せいしき</rt></ruby>にご<ruby>相談<rt>そうだん</rt></ruby>させてください。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "必须严防『スコープクリープ（Scope Creep 范围潜变蔓延）』。在现场严禁任何单兵作战私自许诺，所有需求必须通过统一的『課題管理表 / 仕様変更管理（CR）』。",
        "clientSubtext": "很多客户现场领导并不懂技术深浅，往往觉得“随便搞搞很容易”。如果你轻易答应，不仅抬高了客户不切实际的期望，还会把自己团队推入加班苦海。",
        "keyPhrases": [
          {
            "jp": "スコープクリープの防止",
            "zh": "防止范围蠕变蔓延",
            "jpWithRuby": "スコープクリープの<ruby>防止<rt>ぼうし</rt></ruby>"
          },
          {
            "jp": "仕様変更（CR: Change Request）手続き",
            "zh": "正规需求变更申请流程",
            "jpWithRuby": "<ruby>仕様<rt>しよう</rt></ruby><ruby>変更<rt>へんこう</rt></ruby>（CR: Change Request）<ruby>手続き<rt>てつづき</rt></ruby>"
          },
          {
            "jp": "影響度調査（工数・費用・納期）",
            "zh": "影响度评估（工时/费用/纳期）",
            "jpWithRuby": "<ruby>影響<rt>えいきょう</rt></ruby><ruby>度<rt>ど</rt></ruby><ruby>調査<rt>ちょうさ</rt></ruby>（<ruby>工数<rt>こうすう</rt></ruby>・<ruby>費用<rt>ひよう</rt></ruby>・<ruby>納期<rt>のうき</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 21: 职场诊所（勝手な口頭約束の禁止と変更管理ルール）"
      },
      "dialogueWithRuby": "「ついでにさ、フォークリフトのセンサーデータも<ruby>画面<rt>がめん</rt></ruby>にパパッと<ruby>表示<rt>ひょうじ</rt></ruby>できるようにしといてよ。ちょっとコード<ruby>書き換える<rt>かきかえる</rt></ruby>だけで<ruby>簡単<rt>かんたん</rt></ruby>でしょ？」"
    },
    {
      "id": "q_pit_08",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 1: 会议沟通与技术术语黑话",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "自社SE (自分)",
      "speakerRole": "要件定義担当SE",
      "speakerAvatar": "🧑‍💻",
      "context": "在面向非技术背景的营业统括部长田中汇报系统改造思路时，如何选择语言体系？",
      "dialogue": "（田中部長をはじめ、営業サイドのステークホルダーが多数参加する要件定義セッション）",
      "prompt": "以下哪种发言属于典型的“技术黑话堆砌、不顾及客户接受度”的踩坑表达？",
      "options": [
        {
          "label": "A",
          "text": "「当機能はマイクロサービス化されており、k8sクラスタ上のPodがオートスケールしてKafkaのメッセージキューからイベントを非同期デキューしますので、レイテンシはマイクロ秒単位に収束します。」",
          "analysis": "【NG致命雷区】严重脱离受众！面向业务部门和管理层狂抛k8s、Pod、Kafka、非同期デキュー等极客底层黑话，客户完全听不懂，不仅无法达成共识，还会让客户产生“这帮技术人员根本不懂做生意、无法沟通”的疏离感。",
          "textWithRuby": "「<ruby>当<rt>とう</rt></ruby><ruby>機能<rt>きのう</rt></ruby>はマイクロサービス<ruby>化<rt>か</rt></ruby>されており、k8sクラスタ<ruby>上<rt>じょう</rt></ruby>のPodがオートスケールしてKafkaのメッセージキューからイベントを<ruby>非<rt>ひ</rt></ruby><ruby>同期<rt>どうき</rt></ruby>デキューしますので、レイテンシはマイクロ<ruby>秒<rt>びょう</rt></ruby><ruby>単位<rt>たんい</rt></ruby>に<ruby>収束<rt>しゅうそく</rt></ruby>します。」"
        },
        {
          "label": "B",
          "text": "「営業の皆様が月末に一斉にアクセスされても、裏側のサーバーが自動で処理能力を増強いたします。そのため、画面がフリーズして商談入力が止まる心配はございません。」",
          "analysis": "【正解】将底层高并发弹性伸缩，翻译为业务人员听得懂的价值：「月末集中访问不卡顿、商谈录入不中断」。",
          "textWithRuby": "「<ruby>営業<rt>えいぎょう</rt></ruby>の<ruby>皆<rt>みな</rt></ruby><ruby>様<rt>さま</rt></ruby>が<ruby>月末<rt>げつまつ</rt></ruby>に<ruby>一斉<rt>いっせい</rt></ruby>にアクセスされても、<ruby>裏側<rt>うらがわ</rt></ruby>のサーバーが<ruby>自動<rt>じどう</rt></ruby>で<ruby>処理<rt>しょり</rt></ruby><ruby>能力<rt>のうりょく</rt></ruby>を<ruby>増強<rt>ぞうきょう</rt></ruby>いたします。そのため、<ruby>画面<rt>がめん</rt></ruby>がフリーズして<ruby>商談<rt>しょうだん</rt></ruby><ruby>入力<rt>にゅうりょく</rt></ruby>が<ruby>止まる<rt>とまる</rt></ruby><ruby>心配<rt>しんぱい</rt></ruby>はございません。」"
        },
        {
          "label": "C",
          "text": "「システムの内部構造といたしましては、大量のデータ要求を交通整理する仕組みを採用しており、急激なアクセス集中時にも安定した表示速度を維持いたします。」",
          "analysis": "【正解】用“交通整理”生动打比方，通俗易懂。",
          "textWithRuby": "「システムの<ruby>内部<rt>ないぶ</rt></ruby><ruby>構造<rt>こうぞう</rt></ruby>といたしましては、<ruby>大量<rt>たいりょう</rt></ruby>のデータ<ruby>要求<rt>ようきゅう</rt></ruby>を<ruby>交通<rt>こうつう</rt></ruby><ruby>整理<rt>せいり</rt></ruby>する<ruby>仕組み<rt>しくみ</rt></ruby>を<ruby>採用<rt>さいよう</rt></ruby>しており、<ruby>急激<rt>きゅうげき</rt></ruby>なアクセス<ruby>集中<rt>しゅうちゅう</rt></ruby><ruby>時<rt>じ</rt></ruby>にも<ruby>安定<rt>あんてい</rt></ruby>した<ruby>表示<rt>ひょうじ</rt></ruby><ruby>速度<rt>そくど</rt></ruby>を<ruby>維持<rt>いじ</rt></ruby>いたします。」"
        },
        {
          "label": "D",
          "text": "「万が一通信が途切れた際も、入力中の商談メモが消えないよう自動下書き保存機能を備えております。」",
          "analysis": "【正解】聚焦业务场景用户痛点，表达极其接地气。",
          "textWithRuby": "「<ruby>万が一<rt>まんがいち</rt></ruby><ruby>通信<rt>つうしん</rt></ruby>が<ruby>途切れ<rt>とぎれ</rt></ruby>た<ruby>際<rt>さい</rt></ruby>も、<ruby>入力<rt>にゅうりょく</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>の<ruby>商談<rt>しょうだん</rt></ruby>メモが<ruby>消え<rt>きえ</rt></ruby>ないよう<ruby>自動<rt>じどう</rt></ruby><ruby>下書き<rt>したがき</rt></ruby><ruby>保存<rt>ほぞん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を<ruby>備え<rt>そなえ</rt></ruby>ております。」"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "与日企业务部门开会，必须完成『技術用語からビジネス価値への翻訳（把技术术语翻译为商业价值）』。讲客户的语言，是顶级顾问的核心素养。",
        "clientSubtext": "田中部长关心的是销售员能不能快点把单子做完、系统稳不稳定。你跟他说k8s和Kafka，他不仅觉得无聊，更会觉得你在炫技和掩饰真正的问题。",
        "keyPhrases": [
          {
            "jp": "ビジネス価値への翻訳",
            "zh": "将技术语言转化为业务价值语言",
            "jpWithRuby": "ビジネス<ruby>価値<rt>かち</rt></ruby>への<ruby>翻訳<rt>ほんやく</rt></ruby>"
          },
          {
            "jp": "平易な表現（かみ砕いた説明）",
            "zh": "通俗浅显的生动表达",
            "jpWithRuby": "<ruby>平易<rt>へいい</rt></ruby>な<ruby>表現<rt>ひょうげん</rt></ruby>（<ruby>かみ砕い<rt>かみくだい</rt></ruby>た<ruby>説明<rt>せつめい</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 1: 职场诊所（非ITステークホルダーとの対話術）"
      },
      "dialogueWithRuby": "（<ruby>田中<rt>たなか</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>をはじめ、<ruby>営業<rt>えいぎょう</rt></ruby>サイドのステークホルダーが<ruby>多数<rt>たすう</rt></ruby><ruby>参加<rt>さんか</rt></ruby>する<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>セッション）"
    },
    {
      "id": "q_pit_09",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 12: 邮件沟通与抄送礼仪",
      "sceneId": "scene-12",
      "difficulty": "初级",
      "speaker": "顧客側 担当者",
      "speakerRole": "情シス部 担当",
      "speakerAvatar": "🧑‍💼",
      "context": "客户担当发了一封询问SLA指标计算公式的正式业务邮件，抄送（CC）了双方的本部长、项目总监及外部法务人员共8人。",
      "dialogue": "（相手先担当者より、両社重役がCCに多数入った重要問い合わせメールが届いた）",
      "prompt": "在回复此类商务邮件时，以下哪种操作属于中国新人高频出现的严重失礼行为？",
      "options": [
        {
          "label": "A",
          "text": "返信時、CCに入っていた双方の重役や役職者を勝手に全員削除し、メール差出人の担当者だけに1対1で「返信」して済ませた。",
          "analysis": "【NG致命雷区】严重违反对日邮件基本礼仪！日本商务极重信息对称与上级共有。对方特意CC重役是为了全链条知情与存证，你单方面删掉CC只回复个人，不仅剥夺了领导的知情权，更让客户担当无法向其上级交差。",
          "textWithRuby": "<ruby>返信<rt>へんしん</rt></ruby><ruby>時<rt>じ</rt></ruby>、CCに<ruby>入っ<rt>はいっ</rt></ruby>ていた<ruby>双方<rt>そうほう</rt></ruby>の<ruby>重役<rt>じゅうやく</rt></ruby>や<ruby>役職<rt>やくしょく</rt></ruby><ruby>者<rt>しゃ</rt></ruby>を<ruby>勝手<rt>かって</rt></ruby>に<ruby>全員<rt>ぜんいん</rt></ruby><ruby>削除<rt>さくじょ</rt></ruby>し、メール<ruby>差出<rt>さしだし</rt></ruby><ruby>人<rt>にん</rt></ruby>の<ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>だけに1<ruby>対<rt>たい</rt></ruby>1で「<ruby>返信<rt>へんしん</rt></ruby>」して<ruby>済ま<rt>すま</rt></ruby>せた。"
        },
        {
          "label": "B",
          "text": "「全員に返信（Reply All）」を選択し、CCの宛先順序を崩さず、宛名にも適切に敬称をつけて公式に回答文を送付した。",
          "analysis": "【正解】标准日企邮件规范：默认全員に返信，保持CC原样，确保各方信息绝对透明同步。",
          "textWithRuby": "「<ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>返信<rt>へんしん</rt></ruby>（Reply All）」を<ruby>選択<rt>せんたく</rt></ruby>し、CCの<ruby>宛先<rt>あてさき</rt></ruby><ruby>順序<rt>じゅんじょ</rt></ruby>を<ruby>崩さ<rt>くずさ</rt></ruby>ず、<ruby>宛名<rt>あてな</rt></ruby>にも<ruby>適切<rt>てきせつ</rt></ruby>に<ruby>敬称<rt>けいしょう</rt></ruby>をつけて<ruby>公式<rt>こうしき</rt></ruby>に<ruby>回答<rt>かいとう</rt></ruby><ruby>文<rt>ぶん</rt></ruby>を<ruby>送付<rt>そうふ</rt></ruby>した。"
        },
        {
          "label": "C",
          "text": "自社側のPMに事前に回答案をチャットで確認・レビューしてもらったうえで、全員へ送信した。",
          "analysis": "【正解】严谨的对日内审机制，防止对外发出不一致声音。",
          "textWithRuby": "<ruby>自社<rt>じしゃ</rt></ruby><ruby>側<rt>がわ</rt></ruby>のPMに<ruby>事前<rt>じぜん</rt></ruby>に<ruby>回答<rt>かいとう</rt></ruby><ruby>案<rt>あん</rt></ruby>をチャットで<ruby>確認<rt>かくにん</rt></ruby>・レビューしてもらったうえで、<ruby>全員<rt>ぜんいん</rt></ruby>へ<ruby>送信<rt>そうしん</rt></ruby>した。"
        },
        {
          "label": "D",
          "text": "回答に添付する計算根拠エクセルにパスワードをかけ、送付先とCCの整合性を確認した上で送信した。",
          "analysis": "【正解】高规格安全保密意识。",
          "textWithRuby": "<ruby>回答<rt>かいとう</rt></ruby>に<ruby>添付<rt>てんぷ</rt></ruby>する<ruby>計算<rt>けいさん</rt></ruby><ruby>根拠<rt>こんきょ</rt></ruby>エクセルにパスワードをかけ、<ruby>送付<rt>そうふ</rt></ruby><ruby>先<rt>さき</rt></ruby>とCCの<ruby>整合<rt>せいごう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>した<ruby>上<rt>うえ</rt></ruby>で<ruby>送信<rt>そうしん</rt></ruby>した。"
        }
      ],
      "correct": 0,
      "explanation": {
        "strategy": "对日商务邮件铁律：除非对方特别指示，否则一律『全員に返信（Reply to All）』！随意剔除CC在日企被视作极其不成熟甚至蓄意隐瞒上级的行为。",
        "clientSubtext": "在日企，CC不仅是抄送，更是『責任共有（Shared Responsibility）』的背书。把上级拿掉，等于破坏了日本企业运转赖以生存的环形决裁机制。",
        "keyPhrases": [
          {
            "jp": "全員に返信（CCの保持）",
            "zh": "全部回复（严格保留原有抄送人员）",
            "jpWithRuby": "<ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>返信<rt>へんしん</rt></ruby>（CCの<ruby>保持<rt>ほじ</rt></ruby>）"
          },
          {
            "jp": "関係者間の情報共有と透明性",
            "zh": "保持相关利益方间的信息绝对透明",
            "jpWithRuby": "<ruby>関係<rt>かんけい</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>間<rt>かん</rt></ruby>の<ruby>情報<rt>じょうほう</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>と<ruby>透明<rt>とうめい</rt></ruby><ruby>性<rt>せい</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 12: 实战邮件模板库（宛名・CCマナーと挨拶の黄金原則）"
      },
      "dialogueWithRuby": "（<ruby>相手<rt>あいて</rt></ruby><ruby>先<rt>さき</rt></ruby><ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>より、<ruby>両社<rt>りょうしゃ</rt></ruby><ruby>重役<rt>じゅうやく</rt></ruby>がCCに<ruby>多数<rt>たすう</rt></ruby><ruby>入っ<rt>はいっ</rt></ruby>た<ruby>重要<rt>じゅうよう</rt></ruby><ruby>問い合わせ<rt>といあわせ</rt></ruby>メールが<ruby>届い<rt>とどい</rt></ruby>た）"
    },
    {
      "id": "q_pit_10",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 2: 面对客户失误的指出技巧",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情報システム課長",
      "speakerAvatar": "🧑‍💻",
      "context": "山田课长在给你的系统架构图草案中，把一个核心数据流向的箭头画反了，逻辑上完全不通。",
      "dialogue": "「李さん、この構成図のデータフロー、これで問題ないか確認してくれる？」",
      "prompt": "为了指正山田课长的架构图错误，同时最大限度保全课长的面子与权威，哪种表达情商最高？",
      "options": [
        {
          "label": "A",
          "text": "「山田課長、矢印の向きが完全に逆ですよ。これだとデータが取れなくてシステムが動かないので直してください。」",
          "analysis": "【NG】中国工程师直男发言！「完全に逆ですよ」「直してください」，居高临下公开打脸客户主管，即使你是对的，也会让对方恼羞成怒。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>、<ruby>矢印<rt>やじるし</rt></ruby>の<ruby>向き<rt>むき</rt></ruby>が<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>逆<rt>ぎゃく</rt></ruby>ですよ。これだとデータが<ruby>取れ<rt>とれ</rt></ruby>なくてシステムが<ruby>動か<rt>うごか</rt></ruby>ないので<ruby>直し<rt>なおし</rt></ruby>てください。」"
        },
        {
          "label": "B",
          "text": "「課長のおまとめいただいた図は全体の骨子が大変わかりやすいです。1点だけ私の理解不足でしたら大変恐縮なのですが、こちらのマスター同期の矢印の向きについて、念のためご確認させていただいてもよろしいでしょうか。」",
          "analysis": "【正解】日企顶尖情商：先肯定大局（「骨子が大変わかりやすい」） ➜ 归因为自己可能理解不足（「私の理解不足でしたら大変恐縮」） ➜ 用柔和确认（「ご確認させていただいてもよろしいでしょうか」）给对方台阶下。",
          "textWithRuby": "「<ruby>課長<rt>かちょう</rt></ruby>のおまとめいただいた<ruby>図<rt>ず</rt></ruby>は<ruby>全体<rt>ぜんたい</rt></ruby>の<ruby>骨子<rt>こっし</rt></ruby>が<ruby>大変<rt>たいへん</rt></ruby>わかりやすいです。1<ruby>点<rt>てん</rt></ruby>だけ<ruby>私<rt>わたくし</rt></ruby>の<ruby>理解<rt>りかい</rt></ruby><ruby>不足<rt>ふそく</rt></ruby>でしたら<ruby>大変<rt>たいへん</rt></ruby><ruby>恐縮<rt>きょうしゅく</rt></ruby>なのですが、こちらのマスター<ruby>同期<rt>どうき</rt></ruby>の<ruby>矢印<rt>やじるし</rt></ruby>の<ruby>向き<rt>むき</rt></ruby>について、<ruby>念<rt>ねん</rt></ruby>のためご<ruby>確認<rt>かくにん</rt></ruby>させていただいてもよろしいでしょうか。」"
        },
        {
          "label": "C",
          "text": "「山田課長は基本をご存じないようなので、正しい構成図を私がゼロから描き直しておきます。」",
          "analysis": "【NG】极具侮辱性的语言（「基本をご存じない」），会引发严重的职业危机。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>は<ruby>基本<rt>きほん</rt></ruby>をご<ruby>存じ<rt>ぞんじ</rt></ruby>ないようなので、<ruby>正しい<rt>ただしい</rt></ruby><ruby>構成<rt>こうせい</rt></ruby><ruby>図<rt>ず</rt></ruby>を<ruby>私<rt>わたくし</rt></ruby>がゼロから<ruby>描き直し<rt>かきなおし</rt></ruby>ておきます。」"
        },
        {
          "label": "D",
          "text": "「間違っている箇所を赤ペンで修正して、情シス部全員に一斉送信しておきました。」",
          "analysis": "【NG】公开处刑客户，彻底触犯职场底线。",
          "textWithRuby": "「<ruby>間違っ<rt>まちがっ</rt></ruby>ている<ruby>箇所<rt>かしょ</rt></ruby>を<ruby>赤<rt>あか</rt></ruby>ペンで<ruby>修正<rt>しゅうせい</rt></ruby>して、<ruby>情<rt>じょう</rt></ruby>シス<ruby>部<rt>ぶ</rt></ruby><ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>一斉<rt>いっせい</rt></ruby><ruby>送信<rt>そうしん</rt></ruby>しておきました。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "指出对方错误时的『クッション言葉 ＋ 自己反省話法』：把“你画错了”包装为“是不是我理解有出入，想向您确认一下”。对方心领神会，立刻顺着台阶修改，并对你的体贴心怀感激。",
        "clientSubtext": "中层管理干部最在乎在下属和外部供应商面前的专业威信。给对方体面的退路，是维系长期合作关系的最高智慧。",
        "keyPhrases": [
          {
            "jp": "私の理解不足でしたら大変恐縮ですが",
            "zh": "若是我理解有出入还请您见谅（顶级台阶话术）",
            "jpWithRuby": "<ruby>私<rt>わたくし</rt></ruby>の<ruby>理解<rt>りかい</rt></ruby><ruby>不足<rt>ふそく</rt></ruby>でしたら<ruby>大変<rt>たいへん</rt></ruby><ruby>恐縮<rt>きょうしゅく</rt></ruby>ですが"
          },
          {
            "jp": "念のためご確認させていただきたく",
            "zh": "为稳妥起见想与您做一次确认",
            "jpWithRuby": "<ruby>念<rt>ねん</rt></ruby>のためご<ruby>確認<rt>かくにん</rt></ruby>させていただきたく"
          }
        ],
        "referenceDialogue": "场景 2: 职场诊所（相手の誤りを正す「顔を立てる」敬語表現）"
      },
      "dialogueWithRuby": "「<ruby>李<rt>り</rt></ruby>さん、この<ruby>構成<rt>こうせい</rt></ruby><ruby>図<rt>ず</rt></ruby>のデータフロー、これで<ruby>問題<rt>もんだい</rt></ruby>ないか<ruby>確認<rt>かくにん</rt></ruby>してくれる？」"
    },
    {
      "id": "q_eli_01",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 1: SFA并发与非功能指标",
      "sceneId": "scene-1",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長",
      "speakerAvatar": "👨‍💼",
      "context": "田中部长在提出SFA访问量要求时只说了定性模糊的描述：“全公司的销售在月末都要高频使用，必须保证很快”。",
      "dialogue": "「月末になると全国の営業が一斉に見積もりや日報を上げるからさ、とにかく絶対に重くならずにサクサク動くようにしてよ。」",
      "prompt": "为了将部长的定性模糊愿望（「サクサク」）转化为精确的非功能要件（Non-Functional Requirements），SE应当如何进行下钻提问？",
      "options": [
        {
          "label": "A",
          "text": "「サクサク動くようにサーバーのCPUを最大にしておきますね。」",
          "analysis": "【NG】未做定量分析直接拍脑袋盲目做承诺，既不科学也无法制定性能测试准则。",
          "textWithRuby": "「サクサク<ruby>動く<rt>うごく</rt></ruby>ようにサーバーのCPUを<ruby>最大<rt>さいだい</rt></ruby>にしておきますね。」"
        },
        {
          "label": "B",
          "text": "「具体的に定義させていただきますと、全国の想定利用者数の中で、月末ピーク時に同時アクセスされる最大ユーザー数は何名程度でしょうか。また、お求めになる画面応答速度の目標値（例：95%のリクエストで1.5秒以内）のご希望はございますか。」",
          "analysis": "【正解】将模糊的「サクサク」下钻拆解为标准量化指标：『ピーク時同時アクセス数（并发数）』＋『目標応答速度（95th percentile latency 延迟 SLA）』。",
          "textWithRuby": "「<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>定義<rt>ていぎ</rt></ruby>させていただきますと、<ruby>全国<rt>ぜんこく</rt></ruby>の<ruby>想定<rt>そうてい</rt></ruby><ruby>利用<rt>りよう</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>数<rt>すう</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で、<ruby>月末<rt>げつまつ</rt></ruby>ピーク<ruby>時<rt>じ</rt></ruby>に<ruby>同時<rt>どうじ</rt></ruby>アクセスされる<ruby>最大<rt>さいだい</rt></ruby>ユーザー<ruby>数<rt>すう</rt></ruby>は<ruby>何<rt>なん</rt></ruby><ruby>名<rt>めい</rt></ruby><ruby>程度<rt>ていど</rt></ruby>でしょうか。また、お<ruby>求め<rt>もとめ</rt></ruby>になる<ruby>画面<rt>がめん</rt></ruby><ruby>応答<rt>おうとう</rt></ruby><ruby>速度<rt>そくど</rt></ruby>の<ruby>目標<rt>もくひょう</rt></ruby><ruby>値<rt>ち</rt></ruby>（<ruby>例<rt>れい</rt></ruby>：95%のリクエストで1.5<ruby>秒<rt>びょう</rt></ruby><ruby>以内<rt>いない</rt></ruby>）のご<ruby>希望<rt>きぼう</rt></ruby>はございますか。」"
        },
        {
          "label": "C",
          "text": "「月末だけ遅くなるのはインターネット回線のせいですので、回線業者様にご相談ください。」",
          "analysis": "【NG】未做任何调研直接推卸责任给网络运营商，极度缺乏技术专业性。",
          "textWithRuby": "「<ruby>月末<rt>げつまつ</rt></ruby>だけ<ruby>遅く<rt>おそく</rt></ruby>なるのはインターネット<ruby>回線<rt>かいせん</rt></ruby>のせいですので、<ruby>回線<rt>かいせん</rt></ruby><ruby>業<rt>ぎょう</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>様<rt>さま</rt></ruby>にご<ruby>相談<rt>そうだん</rt></ruby>ください。」"
        },
        {
          "label": "D",
          "text": "「営業の皆様が月末の同じ時間帯にアクセスするのをやめて、分散してアクセスするようにルール化できませんか。」",
          "analysis": "【NG】要求客户业务迁就系统的脆弱，完全本末倒置。",
          "textWithRuby": "「<ruby>営業<rt>えいぎょう</rt></ruby>の<ruby>皆<rt>みな</rt></ruby><ruby>様<rt>さま</rt></ruby>が<ruby>月末<rt>げつまつ</rt></ruby>の<ruby>同じ<rt>おなじ</rt></ruby><ruby>時間<rt>じかん</rt></ruby><ruby>帯<rt>たい</rt></ruby>にアクセスするのをやめて、<ruby>分散<rt>ぶんさん</rt></ruby>してアクセスするようにルール<ruby>化<rt>か</rt></ruby>できませんか。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "非功能需求下钻核心：『定性（サクサク）から定量（ピーク同時接続数・レスポンス秒数・SLA目標値）への変換』。",
        "clientSubtext": "业务主管不懂什么TPS和P99延迟，他需要技术专家用启发式的数值选项（如1.5秒内、200人并发）帮他建立量化认知。",
        "keyPhrases": [
          {
            "jp": "ピーク時同時アクセス数",
            "zh": "高峰期并发访问人数",
            "jpWithRuby": "ピーク<ruby>時<rt>じ</rt></ruby><ruby>同時<rt>どうじ</rt></ruby>アクセス<ruby>数<rt>すう</rt></ruby>"
          },
          {
            "jp": "画面応答速度（レスポンスタイム）目標値",
            "zh": "界面响应时间目标值",
            "jpWithRuby": "<ruby>画面<rt>がめん</rt></ruby><ruby>応答<rt>おうとう</rt></ruby><ruby>速度<rt>そくど</rt></ruby>（レスポンスタイム）<ruby>目標<rt>もくひょう</rt></ruby><ruby>値<rt>ち</rt></ruby>"
          },
          {
            "jp": "非機能要件定義",
            "zh": "非功能需求定义",
            "jpWithRuby": "<ruby>非<rt>ひ</rt></ruby><ruby>機能<rt>きのう</rt></ruby><ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 5 轮（李：同時アクセス数とレスポンス目標の定量化）"
      },
      "dialogueWithRuby": "「<ruby>月末<rt>げつまつ</rt></ruby>になると<ruby>全国<rt>ぜんこく</rt></ruby>の<ruby>営業<rt>えいぎょう</rt></ruby>が<ruby>一斉<rt>いっせい</rt></ruby>に<ruby>見積もり<rt>みつもり</rt></ruby>や<ruby>日報<rt>にっぽう</rt></ruby>を<ruby>上げる<rt>あげる</rt></ruby>からさ、とにかく<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>重く<rt>おもく</rt></ruby>ならずにサクサク<ruby>動く<rt>うごく</rt></ruby>ようにしてよ。」"
    },
    {
      "id": "q_eli_02",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 2: 数据迁移与历史数据清洗",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情シス課長",
      "speakerAvatar": "🧑‍💻",
      "context": "山田课长提出新SFA上线时，要把过去旧系统的所有客户和商谈数据统统迁过来。",
      "dialogue": "「過去の営業データも全部新システムに移行して、過去10年分いつでも検索できるようにしたいんだよね。」",
      "prompt": "面对客户“全部迁移10年数据”的宽泛设想，SE应从哪些维度进行边界厘清与成本风险下钻？",
      "options": [
        {
          "label": "A",
          "text": "「山田課長のおっしゃる通り、10年分全部スクリプトで流し込めばすぐ終わりますのでお任せください。」",
          "analysis": "【NG】低估数据迁移风险的大坑！旧系统10年间必然经历多次表结构变更、脏数据、缺失值、离职员工关联失效，盲目承诺全部迁移必然导致导入爆仓崩溃。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>のおっしゃる<ruby>通り<rt>とおり</rt></ruby>、10<ruby>年<rt>ねん</rt></ruby><ruby>分<rt>ぶん</rt></ruby><ruby>全部<rt>ぜんぶ</rt></ruby>スクリプトで<ruby>流し込め<rt>ながしこめ</rt></ruby>ばすぐ<ruby>終わり<rt>おわり</rt></ruby>ますのでお<ruby>任せ<rt>まかせ</rt></ruby>ください。」"
        },
        {
          "label": "B",
          "text": "「過去10年分となりますと、データクレンジング工数や移行後のDBストレージコストが膨大になる懸念がございます。例えば『直近3年分をホットデータとして新SFAに完全移行』し、『4年以前の過去ログは参照用アーカイブ（静的ファイル/別DB）として保持する』という2段階のデータライフサイクル設計はいかがでしょうか。」",
          "analysis": "【正解】专家级拆解！指明数据清洗工时与存储成本现实；提出『冷热数据分层（Hot/Cold Tiering）』架构：近3年热数据平滑迁移，早期数据归档供调阅，既节约百万级清洗成本又满足合规检索需求。",
          "textWithRuby": "「<ruby>過去<rt>かこ</rt></ruby>10<ruby>年<rt>ねん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>となりますと、データクレンジング<ruby>工数<rt>こうすう</rt></ruby>や<ruby>移行<rt>いこう</rt></ruby><ruby>後<rt>ご</rt></ruby>のDBストレージコストが<ruby>膨大<rt>ぼうだい</rt></ruby>になる<ruby>懸念<rt>けねん</rt></ruby>がございます。<ruby>例えば<rt>たとえば</rt></ruby>『<ruby>直近<rt>ちょっきん</rt></ruby>3<ruby>年<rt>ねん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>をホットデータとして<ruby>新<rt>しん</rt></ruby>SFAに<ruby>完全<rt>かんぜん</rt></ruby><ruby>移行<rt>いこう</rt></ruby>』し、『4<ruby>年<rt>ねん</rt></ruby><ruby>以前<rt>いぜん</rt></ruby>の<ruby>過去<rt>かこ</rt></ruby>ログは<ruby>参照<rt>さんしょう</rt></ruby><ruby>用<rt>よう</rt></ruby>アーカイブ（<ruby>静的<rt>せいてき</rt></ruby>ファイル/<ruby>別<rt>べつ</rt></ruby>DB）として<ruby>保持<rt>ほじ</rt></ruby>する』という2<ruby>段階<rt>だんかい</rt></ruby>のデータライフサイクル<ruby>設計<rt>せっけい</rt></ruby>はいかがでしょうか。」"
        },
        {
          "label": "C",
          "text": "「10年前のデータなんて誰も見ませんので、移行するのは絶対に無駄です。やめましょう。」",
          "analysis": "【NG】断然否定客户设想，缺乏对法规合规（如日本法条要求的账簿凭证保存年限）的了解。",
          "textWithRuby": "「10<ruby>年<rt>ねん</rt></ruby><ruby>前<rt>まえ</rt></ruby>のデータなんて<ruby>誰<rt>だれ</rt></ruby>も<ruby>見<rt>み</rt></ruby>ませんので、<ruby>移行<rt>いこう</rt></ruby>するのは<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>無駄<rt>むだ</rt></ruby>です。やめましょう。」"
        },
        {
          "label": "D",
          "text": "「手動でエクセルにコピペして1件ずつ手入力で移していただけますか。」",
          "analysis": "【NG】荒诞的操作建议，丧失工程师专业尊严。",
          "textWithRuby": "「<ruby>手動<rt>しゅどう</rt></ruby>でエクセルにコピペして1<ruby>件<rt>けん</rt></ruby>ずつ<ruby>手<rt>て</rt></ruby><ruby>入力<rt>にゅうりょく</rt></ruby>で<ruby>移し<rt>うつし</rt></ruby>ていただけますか。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "数据迁移下钻三原则：『クレンジング範囲の画定 ＋ データライフサイクル（ホット/コールド分割） ＋ 法定保存年限の考慮』。",
        "clientSubtext": "山田课长提出10年往往是因为害怕某些老客户突然有官司或审计时查不到数据。只要给出归档可查的兜底方案，他完全同意只迁移近3年有效数据。",
        "keyPhrases": [
          {
            "jp": "データクレンジング工数",
            "zh": "数据清洗与对齐工时",
            "jpWithRuby": "データクレンジング<ruby>工数<rt>こうすう</rt></ruby>"
          },
          {
            "jp": "データライフサイクル（ホット/コールド）",
            "zh": "数据生命周期管理（冷热分层）"
          },
          {
            "jp": "参照用アーカイブとして保持する",
            "zh": "作为只读归档单独持久化保留",
            "jpWithRuby": "<ruby>参照<rt>さんしょう</rt></ruby><ruby>用<rt>よう</rt></ruby>アーカイブとして<ruby>保持<rt>ほじ</rt></ruby>する"
          }
        ],
        "referenceDialogue": "场景 2: 教材核心课文第 8 轮（李：データ移行範囲の線引きとクレンジング計画）"
      },
      "dialogueWithRuby": "「<ruby>過去<rt>かこ</rt></ruby>の<ruby>営業<rt>えいぎょう</rt></ruby>データも<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>新<rt>しん</rt></ruby>システムに<ruby>移行<rt>いこう</rt></ruby>して、<ruby>過去<rt>かこ</rt></ruby>10<ruby>年<rt>ねん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>いつでも<ruby>検索<rt>けんさく</rt></ruby>できるようにしたいんだよね。」"
    },
    {
      "id": "q_eli_03",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 11: CS客服工单与SLA分类",
      "sceneId": "scene-11",
      "difficulty": "中级",
      "speaker": "高橋 カスタマーサポート長",
      "speakerRole": "CS統括責任者",
      "speakerAvatar": "👩‍💼",
      "context": "高桥主管希望新系统能自动给用户咨询分类，并设定响应时间，但只含糊说了“尽快处理”。",
      "dialogue": "「お客様からのクレームやお困りごとは、内容に応じてなるべく早く担当者に振り分けて、スピーディーに対応を完了させたいの。」",
      "prompt": "为了将“尽快分流、快速搞定”细化为可落地的系统工单路由逻辑，SE应如何下钻？",
      "options": [
        {
          "label": "A",
          "text": "「なるべく早くできるように、AIの処理スピードを最大に設定しておきます。」",
          "analysis": "【NG】空话套话，没有提炼出任何业务规则。",
          "textWithRuby": "「なるべく<ruby>早く<rt>はやく</rt></ruby>できるように、AIの<ruby>処理<rt>しょり</rt></ruby>スピードを<ruby>最大<rt>さいだい</rt></ruby>に<ruby>設定<rt>せってい</rt></ruby>しておきます。」"
        },
        {
          "label": "B",
          "text": "「スピーディーな対応の実現に向け、具体的に『重要度・緊急度』のクライテリアを定義いたしましょう。例えば【緊急度S：システム停止・課金トラブル】は15分以内一次回答、【緊急度A：機能障害】は1時間以内、【緊急度B：操作質問】は当日中、といったSLA目標をチケット自動分類ルールと連動させますか。」",
          "analysis": "【正解】将模糊诉求下钻落地为工单矩阵：『优先级别矩阵（S/A/B）＋ 各级别量化SLA时间 ＋ 自动化智能路由规则』。",
          "textWithRuby": "「スピーディーな<ruby>対応<rt>たいおう</rt></ruby>の<ruby>実現<rt>じつげん</rt></ruby>に<ruby>向け<rt>むけ</rt></ruby>、<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に『<ruby>重要<rt>じゅうよう</rt></ruby><ruby>度<rt>ど</rt></ruby>・<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>度<rt>ど</rt></ruby>』のクライテリアを<ruby>定義<rt>ていぎ</rt></ruby>いたしましょう。<ruby>例えば<rt>たとえば</rt></ruby>【<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>度<rt>ど</rt></ruby>S：システム<ruby>停止<rt>ていし</rt></ruby>・<ruby>課金<rt>かきん</rt></ruby>トラブル】は15<ruby>分<rt>ふん</rt></ruby><ruby>以内<rt>いない</rt></ruby><ruby>一<rt>いち</rt></ruby><ruby>次<rt>じ</rt></ruby><ruby>回答<rt>かいとう</rt></ruby>、【<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>度<rt>ど</rt></ruby>A：<ruby>機能<rt>きのう</rt></ruby><ruby>障害<rt>しょうがい</rt></ruby>】は1<ruby>時間<rt>じかん</rt></ruby><ruby>以内<rt>いない</rt></ruby>、【<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>度<rt>ど</rt></ruby>B：<ruby>操作<rt>そうさ</rt></ruby><ruby>質問<rt>しつもん</rt></ruby>】は<ruby>当日<rt>とうじつ</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>、といったSLA<ruby>目標<rt>もくひょう</rt></ruby>をチケット<ruby>自動<rt>じどう</rt></ruby><ruby>分類<rt>ぶんるい</rt></ruby>ルールと<ruby>連動<rt>れんどう</rt></ruby>させますか。」"
        },
        {
          "label": "C",
          "text": "「早さを求めるなら、オペレーターを今の倍の人数に増員してください。」",
          "analysis": "【NG】直接越权干涉客户人力预算，缺乏系统解决方案价值。",
          "textWithRuby": "「<ruby>早<rt>はや</rt></ruby>さを<ruby>求める<rt>もとめる</rt></ruby>なら、オペレーターを<ruby>今<rt>いま</rt></ruby>の<ruby>倍<rt>ばい</rt></ruby>の<ruby>人数<rt>にんずう</rt></ruby>に<ruby>増員<rt>ぞういん</rt></ruby>してください。」"
        },
        {
          "label": "D",
          "text": "「すべての問い合わせを一律3分以内に回答するルールを現場に課しましょう。」",
          "analysis": "【NG】脱离实际的极端指标，不仅会导致客服团队崩溃辞职，且完全忽略了问题复杂度的客观差异。",
          "textWithRuby": "「すべての<ruby>問い合わせ<rt>といあわせ</rt></ruby>を<ruby>一律<rt>いちりつ</rt></ruby>3<ruby>分<rt>ふん</rt></ruby><ruby>以内<rt>いない</rt></ruby>に<ruby>回答<rt>かいとう</rt></ruby>するルールを<ruby>現場<rt>げんば</rt></ruby>に<ruby>課し<rt>かし</rt></ruby>ましょう。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "客服工单下钻模型：『問い合わせ種別 ✕ 緊急度マトリクス ＝ SLA目標時間 ＆ 自動エスカレーション条件』。",
        "clientSubtext": "高桥主管饱受“该紧急的被压在堆底，无关紧要的却占着坐席”之苦。量化矩阵是解决她管理混乱的对症良药。",
        "keyPhrases": [
          {
            "jp": "緊急度・重要度のクライテリア（判定基準）",
            "zh": "紧急度与重要度判定准则",
            "jpWithRuby": "<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>度<rt>ど</rt></ruby>・<ruby>重要<rt>じゅうよう</rt></ruby><ruby>度<rt>ど</rt></ruby>のクライテリア（<ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>）"
          },
          {
            "jp": "チケット自動分類ルール",
            "zh": "工单自动化分类与路由规则",
            "jpWithRuby": "チケット<ruby>自動<rt>じどう</rt></ruby><ruby>分類<rt>ぶんるい</rt></ruby>ルール"
          },
          {
            "jp": "SLA目標（一次回答時間・完了時間）",
            "zh": "SLA目标（首响时间与办结时间）",
            "jpWithRuby": "SLA<ruby>目標<rt>もくひょう</rt></ruby>（<ruby>一<rt>いち</rt></ruby><ruby>次<rt>じ</rt></ruby><ruby>回答<rt>かいとう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>・<ruby>完了<rt>かんりょう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 11: CS核心课文第 3 轮（李：インシデント重大度別のエスカレーションフロー）"
      },
      "dialogueWithRuby": "「お<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>からのクレームやお<ruby>困りごと<rt>こまりごと</rt></ruby>は、<ruby>内容<rt>ないよう</rt></ruby>に<ruby>応じ<rt>おうじ</rt></ruby>てなるべく<ruby>早く<rt>はやく</rt></ruby><ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>に<ruby>振り分け<rt>ふりわけ</rt></ruby>て、スピーディーに<ruby>対応<rt>たいおう</rt></ruby>を<ruby>完了<rt>かんりょう</rt></ruby>させたいの。」"
    },
    {
      "id": "q_eli_04",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 21: WMS盘点与差异容差率",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "松井 センター長",
      "speakerRole": "物流倉庫センター長",
      "speakerAvatar": "👷‍♂️",
      "context": "松井中心长要求：“仓库扫码盘点一定要绝对精准，账面库存和实物库存绝不能有哪怕1个的差错。”",
      "dialogue": "「日々の棚卸しで理論在庫と実在庫に1個でもズレが出たら困るんだよ。絶対に差異ゼロになる仕組みにしてくれないか。」",
      "prompt": "面对客户“绝对差异为零”的理想化要求，SE应当如何引导客户挖掘真实业务原因并设计容错审核下钻闭环？",
      "options": [
        {
          "label": "A",
          "text": "「人間が作業する以上、差異ゼロなんて物理的に不可能です。無理な要求はやめてください。」",
          "analysis": "【NG】直接回绝客户愿望，毫无建设性且态度生硬。",
          "textWithRuby": "「<ruby>人間<rt>にんげん</rt></ruby>が<ruby>作業<rt>さぎょう</rt></ruby>する<ruby>以上<rt>いじょう</rt></ruby>、<ruby>差異<rt>さい</rt></ruby>ゼロなんて<ruby>物理<rt>ぶつり</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>不<rt>ふ</rt></ruby><ruby>可能<rt>かのう</rt></ruby>です。<ruby>無理<rt>むり</rt></ruby>な<ruby>要求<rt>ようきゅう</rt></ruby>はやめてください。」"
        },
        {
          "label": "B",
          "text": "「差異ゼロを目指すセンター長のご方針に深く共感いたします。システム的な入力ミスはバーコード照合で極小化できますが、現品の破損や紛失といった物理的要因も想定されます。そこで『差異が検知された瞬間に自動で二重カウント（再検品）タスクを発行』し、『許容範囲外の乖離が生じた場合の上長承認ワークフロー』を設ける実用的な統制設計はいかがでしょうか。」",
          "analysis": "【正解】共情客户的零差异追求；理智区分“系统防呆（バーコード照合）”与“物理损耗/破损”；并提出『自动触发复核任务 ＋ 差异超标审批工作流』的严谨落地防线。",
          "textWithRuby": "「<ruby>差異<rt>さい</rt></ruby>ゼロを<ruby>目指す<rt>めざす</rt></ruby>センター<ruby>長<rt>ちょう</rt></ruby>のご<ruby>方針<rt>ほうしん</rt></ruby>に<ruby>深く<rt>ふかく</rt></ruby><ruby>共感<rt>きょうかん</rt></ruby>いたします。システム<ruby>的<rt>てき</rt></ruby>な<ruby>入力<rt>にゅうりょく</rt></ruby>ミスはバーコード<ruby>照合<rt>しょうごう</rt></ruby>で<ruby>極小<rt>きょくしょう</rt></ruby><ruby>化<rt>か</rt></ruby>できますが、<ruby>現品<rt>げんぴん</rt></ruby>の<ruby>破損<rt>はそん</rt></ruby>や<ruby>紛失<rt>ふんしつ</rt></ruby>といった<ruby>物理<rt>ぶつり</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>要因<rt>よういん</rt></ruby>も<ruby>想定<rt>そうてい</rt></ruby>されます。そこで『<ruby>差異<rt>さい</rt></ruby>が<ruby>検知<rt>けんち</rt></ruby>された<ruby>瞬間<rt>しゅんかん</rt></ruby>に<ruby>自動<rt>じどう</rt></ruby>で<ruby>二<rt>に</rt></ruby><ruby>重<rt>じゅう</rt></ruby>カウント（<ruby>再検<rt>さいけん</rt></ruby><ruby>品<rt>ひん</rt></ruby>）タスクを<ruby>発行<rt>はっこう</rt></ruby>』し、『<ruby>許容<rt>きょよう</rt></ruby><ruby>範囲<rt>はんい</rt></ruby><ruby>外<rt>がい</rt></ruby>の<ruby>乖離<rt>かいり</rt></ruby>が<ruby>生じ<rt>しょうじ</rt></ruby>た<ruby>場合<rt>ばあい</rt></ruby>の<ruby>上長<rt>じょうちょう</rt></ruby><ruby>承認<rt>しょうにん</rt></ruby>ワークフロー』を<ruby>設ける<rt>もうける</rt></ruby><ruby>実用<rt>じつよう</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>統制<rt>とうせい</rt></ruby><ruby>設計<rt>せっけい</rt></ruby>はいかがでしょうか。」"
        },
        {
          "label": "C",
          "text": "「差が出たときは、システムが自動で帳簿の数字を実在庫の数字に書き換えて合致させます。」",
          "analysis": "【NG】私自抹平账实差异，属于重大会计舞弊隐患。",
          "textWithRuby": "「<ruby>差<rt>さ</rt></ruby>が<ruby>出<rt>で</rt></ruby>たときは、システムが<ruby>自動<rt>じどう</rt></ruby>で<ruby>帳簿<rt>ちょうぼ</rt></ruby>の<ruby>数字<rt>すうじ</rt></ruby>を<ruby>実在<rt>じつざい</rt></ruby><ruby>庫<rt>こ</rt></ruby>の<ruby>数字<rt>すうじ</rt></ruby>に<ruby>書き換え<rt>かきかえ</rt></ruby>て<ruby>合致<rt>がっち</rt></ruby>させます。」"
        },
        {
          "label": "D",
          "text": "「作業員にペナルティ（罰金）を課せば、誰もミスをしなくなりますよ。」",
          "analysis": "【NG】荒谬违法的管理建议，严重违反劳工法规。",
          "textWithRuby": "「<ruby>作業<rt>さぎょう</rt></ruby><ruby>員<rt>いん</rt></ruby>にペナルティ（<ruby>罰金<rt>ばっきん</rt></ruby>）を<ruby>課せ<rt>かせ</rt></ruby>ば、<ruby>誰<rt>だれ</rt></ruby>もミスをしなくなりますよ。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "面对『絶対ゼロ（绝对零误差）』的需求，技术人员不能简单说不可能，而应提供『予防（ポカヨケ・防呆） ＋ 早期検知（自動再検品） ＋ 例外是正（承認フロー）』的体系化业务闭环。",
        "clientSubtext": "中心长最怕到月末大盘点时突然爆出几十万日元的巨额账实差，被总部追究责任。提供日常小步快跑的自动纠偏流程，正中其下怀。",
        "keyPhrases": [
          {
            "jp": "二重カウント（再検品）タスクの自動発行",
            "zh": "自动发起二次复核盘点任务",
            "jpWithRuby": "<ruby>二<rt>に</rt></ruby><ruby>重<rt>じゅう</rt></ruby>カウント（<ruby>再検<rt>さいけん</rt></ruby><ruby>品<rt>ひん</rt></ruby>）タスクの<ruby>自動<rt>じどう</rt></ruby><ruby>発行<rt>はっこう</rt></ruby>"
          },
          {
            "jp": "差異許容範囲と承認ワークフロー",
            "zh": "差异容差阈值与上级审批工作流",
            "jpWithRuby": "<ruby>差異<rt>さい</rt></ruby><ruby>許容<rt>きょよう</rt></ruby><ruby>範囲<rt>はんい</rt></ruby>と<ruby>承認<rt>しょうにん</rt></ruby>ワークフロー"
          }
        ],
        "referenceDialogue": "场景 21: WMS短文第 3 篇（リアルタイム棚卸と在庫差異管理の要件）"
      },
      "dialogueWithRuby": "「<ruby>日々<rt>ひび</rt></ruby>の<ruby>棚卸し<rt>たなおろし</rt></ruby>で<ruby>理論<rt>りろん</rt></ruby><ruby>在庫<rt>ざいこ</rt></ruby>と<ruby>実<rt>じつ</rt></ruby><ruby>在庫<rt>ざいこ</rt></ruby>に1<ruby>個<rt>こ</rt></ruby>でもズレが<ruby>出<rt>で</rt></ruby>たら<ruby>困る<rt>こまる</rt></ruby>んだよ。<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>差異<rt>さい</rt></ruby>ゼロになる<ruby>仕組み<rt>しくみ</rt></ruby>にしてくれないか。」"
    },
    {
      "id": "q_eli_05",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 1: 权限控制与组织架构变更",
      "sceneId": "scene-1",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情シス課長",
      "speakerAvatar": "🧑‍💻",
      "context": "山田课长对SFA的权限只提了一句：“不同职务的人能看的东西不一样，按我们公司组织图来就行。”",
      "dialogue": "「社員の役職や所属部署によって見られる顧客データや売上金額の範囲をきっちり分けたいんだ。うちの組織図通りにしてくれればいいよ。」",
      "prompt": "为了避免在系统实现时权限逻辑崩溃，SE必须对“组织架构与权限矩阵”做哪一深度的关键下钻？",
      "options": [
        {
          "label": "A",
          "text": "「組織図のPDFを1枚いただければ、それに合わせてベタ書きで権限をハードコードしておきます。」",
          "analysis": "【NG】权限硬编码（ハードコード）是大忌，日企每年4月和10月有大规模人事变动与组织改组，硬编码会导致系统每半年崩溃一次。",
          "textWithRuby": "「<ruby>組織<rt>そしき</rt></ruby><ruby>図<rt>ず</rt></ruby>のPDFを1<ruby>枚<rt>まい</rt></ruby>いただければ、それに<ruby>合わせ<rt>あわせ</rt></ruby>てベタ<ruby>書き<rt>かき</rt></ruby>で<ruby>権限<rt>けんげん</rt></ruby>をハードコードしておきます。」"
        },
        {
          "label": "B",
          "text": "「承知いたしました。権限の厳密な設計に向け、3点深掘りさせてください。①役職（ロール）ごとの『閲覧・作成・承認・エクスポート』のCRUD権限マトリクス、②兼務・マトリクス組織やプロジェクト横断時の例外アクセス権、③4月の定期人事異動に伴う『組織改編予約と権限の自動一括切り替え』の要否について、詳細をお伺いできますでしょうか。」",
          "analysis": "【正解】直击日企命脉的专家级下钻：①标准RBAC矩阵（细分到导出权）；②兼务/项目跨部门例外；③日企特有的4月组织架构改组预约（未来生效）。",
          "textWithRuby": "「<ruby>承知<rt>しょうち</rt></ruby>いたしました。<ruby>権限<rt>けんげん</rt></ruby>の<ruby>厳密<rt>げんみつ</rt></ruby>な<ruby>設計<rt>せっけい</rt></ruby>に<ruby>向け<rt>むけ</rt></ruby>、3<ruby>点<rt>てん</rt></ruby><ruby>深<rt>しん</rt></ruby><ruby>掘り<rt>ほり</rt></ruby>させてください。①<ruby>役職<rt>やくしょく</rt></ruby>（ロール）ごとの『<ruby>閲覧<rt>えつらん</rt></ruby>・<ruby>作成<rt>さくせい</rt></ruby>・<ruby>承認<rt>しょうにん</rt></ruby>・エクスポート』のCRUD<ruby>権限<rt>けんげん</rt></ruby>マトリクス、②<ruby>兼務<rt>けんむ</rt></ruby>・マトリクス<ruby>組織<rt>そしき</rt></ruby>やプロジェクト<ruby>横断<rt>おうだん</rt></ruby><ruby>時<rt>じ</rt></ruby>の<ruby>例外<rt>れいがい</rt></ruby>アクセス<ruby>権<rt>けん</rt></ruby>、③4<ruby>月<rt>がつ</rt></ruby>の<ruby>定期<rt>ていき</rt></ruby><ruby>人事<rt>じんじ</rt></ruby><ruby>異動<rt>いどう</rt></ruby>に<ruby>伴う<rt>ともなう</rt></ruby>『<ruby>組織<rt>そしき</rt></ruby><ruby>改編<rt>かいへん</rt></ruby><ruby>予約<rt>よやく</rt></ruby>と<ruby>権限<rt>けんげん</rt></ruby>の<ruby>自動<rt>じどう</rt></ruby><ruby>一括<rt>いっかつ</rt></ruby><ruby>切り替え<rt>きりかえ</rt></ruby>』の<ruby>要否<rt>ようひ</rt></ruby>について、<ruby>詳細<rt>しょうさい</rt></ruby>をお<ruby>伺い<rt>うかがい</rt></ruby>できますでしょうか。」"
        },
        {
          "label": "C",
          "text": "「全員に管理者権限を渡しておいて、見ちゃいけないデータは見ないように誓約書を書かせましょう。」",
          "analysis": "【NG】完全丧失系统权限控制意义，内控为零。",
          "textWithRuby": "「<ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>管理<rt>かんり</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>権限<rt>けんげん</rt></ruby>を<ruby>渡し<rt>わたし</rt></ruby>ておいて、<ruby>見<rt>み</rt></ruby>ちゃいけないデータは<ruby>見<rt>み</rt></ruby>ないように<ruby>誓約<rt>せいやく</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>書か<rt>かか</rt></ruby>せましょう。」"
        },
        {
          "label": "D",
          "text": "「組織図の変更はシステムでは対応できませんので、今後は組織改編を一切行わないようにしてください。」",
          "analysis": "【NG】倒反天罡，要求客户公司永远不调整组织架构。",
          "textWithRuby": "「<ruby>組織<rt>そしき</rt></ruby><ruby>図<rt>ず</rt></ruby>の<ruby>変更<rt>へんこう</rt></ruby>はシステムでは<ruby>対応<rt>たいおう</rt></ruby>できませんので、<ruby>今後<rt>こんご</rt></ruby>は<ruby>組織<rt>そしき</rt></ruby><ruby>改編<rt>かいへん</rt></ruby>を<ruby>一切<rt>いっさい</rt></ruby><ruby>行わ<rt>おこなわ</rt></ruby>ないようにしてください。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "日企权限下钻三张王牌：『ロール権限マトリクス（CRUD+出力） ✕ 兼務・プロジェクト横断 ✕ 組織改編の未来日予約（4月異動）』。",
        "clientSubtext": "情统课长每年3月底为了调整几千人的系统权限常常通宵加班。如果你主动提出“支持未来日生效的一键自动切换”，他会视你为神级救星。",
        "keyPhrases": [
          {
            "jp": "権限マトリクス（CRUD権限定義）",
            "zh": "角色权限矩阵（增删改查及导出权限）",
            "jpWithRuby": "<ruby>権限<rt>けんげん</rt></ruby>マトリクス（CRUD<ruby>権限<rt>けんげん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>）"
          },
          {
            "jp": "人事異動に伴う組織改編の未来日予約",
            "zh": "配合人事调动的组织架构改组未来日生效预约",
            "jpWithRuby": "<ruby>人事<rt>じんじ</rt></ruby><ruby>異動<rt>いどう</rt></ruby>に<ruby>伴う<rt>ともなう</rt></ruby><ruby>組織<rt>そしき</rt></ruby><ruby>改編<rt>かいへん</rt></ruby>の<ruby>未<rt>み</rt></ruby><ruby>来日<rt>らいにち</rt></ruby><ruby>予約<rt>よやく</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 6 轮（李：ロール別アクセス権限と兼務対応）"
      },
      "dialogueWithRuby": "「<ruby>社員<rt>しゃいん</rt></ruby>の<ruby>役職<rt>やくしょく</rt></ruby>や<ruby>所属<rt>しょぞく</rt></ruby><ruby>部署<rt>ぶしょ</rt></ruby>によって<ruby>見<rt>み</rt></ruby>られる<ruby>顧客<rt>こきゃく</rt></ruby>データや<ruby>売上<rt>うりあげ</rt></ruby><ruby>金額<rt>きんがく</rt></ruby>の<ruby>範囲<rt>はんい</rt></ruby>をきっちり<ruby>分け<rt>わけ</rt></ruby>たいんだ。うちの<ruby>組織<rt>そしき</rt></ruby><ruby>図<rt>ず</rt></ruby><ruby>通り<rt>とおり</rt></ruby>にしてくれればいいよ。」"
    },
    {
      "id": "q_eli_06",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 12: 灾难恢复 (BCP / DR) 与 RTO/RPO",
      "sceneId": "scene-12",
      "difficulty": "专家级",
      "speaker": "渡辺 本部長",
      "speakerRole": "情報システム本部長",
      "speakerAvatar": "👨‍💼",
      "context": "渡边本部长强调：“大地震或数据中心着火等不可抗力发生时，业务系统绝对不能丢数据，必须尽快恢复。”",
      "dialogue": "「万が一大地震などでクラウドのデータセンターが被災した場合でも、事業継続（BCP）の観点からデータは絶対に守りたいし、すぐに復旧させたい。」",
      "prompt": "作为方案架构师，如何将“不丢数据、立刻恢复”的BCP愿景，下钻为国际标准的容灾量化指标？",
      "options": [
        {
          "label": "A",
          "text": "「地震が起きない地域にサーバーを置けば万全ですので、安心してください。」",
          "analysis": "【NG】缺乏常识，日本全国均在地震带，没有所谓“绝不发生地震的区域”。",
          "textWithRuby": "「<ruby>地震<rt>じしん</rt></ruby>が<ruby>起き<rt>おき</rt></ruby>ない<ruby>地域<rt>ちいき</rt></ruby>にサーバーを<ruby>置け<rt>おけ</rt></ruby>ば<ruby>万全<rt>ばんぜん</rt></ruby>ですので、<ruby>安心<rt>あんしん</rt></ruby>してください。」"
        },
        {
          "label": "B",
          "text": "「BCP対策の策定に向け、具体的な『RPO（目標復旧時点：データ損失許容時間）』と『RTO（目標復旧時間：システム再稼働までの目標時間）』の目標値を合意させていただけますでしょうか。例えば『RPO=0（東西リージョン間リアルタイム同期）』を目指すか、『RPO=1時間（差分バックアップ）』とするかでインフラ構築費が大きく変動いたします。」",
          "analysis": "【正解】用专业行业标准指标RPO与RTO进行下钻，并清晰揭示技术方案与成本投入的权衡（Trade-off），帮助客户本部长做出理性的商业决策。",
          "textWithRuby": "「BCP<ruby>対策<rt>たいさく</rt></ruby>の<ruby>策定<rt>さくてい</rt></ruby>に<ruby>向け<rt>むけ</rt></ruby>、<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>な『RPO（<ruby>目標<rt>もくひょう</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby><ruby>時点<rt>じてん</rt></ruby>：データ<ruby>損失<rt>そんしつ</rt></ruby><ruby>許容<rt>きょよう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>）』と『RTO（<ruby>目標<rt>もくひょう</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>：システム<ruby>再<rt>さい</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>までの<ruby>目標<rt>もくひょう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>）』の<ruby>目標<rt>もくひょう</rt></ruby><ruby>値<rt>ち</rt></ruby>を<ruby>合意<rt>ごうい</rt></ruby>させていただけますでしょうか。<ruby>例えば<rt>たとえば</rt></ruby>『RPO=0（<ruby>東西<rt>とうざい</rt></ruby>リージョン<ruby>間<rt>かん</rt></ruby>リアルタイム<ruby>同期<rt>どうき</rt></ruby>）』を<ruby>目指す<rt>めざす</rt></ruby>か、『RPO=1<ruby>時間<rt>じかん</rt></ruby>（<ruby>差分<rt>さぶん</rt></ruby>バックアップ）』とするかでインフラ<ruby>構築<rt>こうちく</rt></ruby><ruby>費<rt>ひ</rt></ruby>が<ruby>大きく<rt>おおきく</rt></ruby><ruby>変動<rt>へんどう</rt></ruby>いたします。」"
        },
        {
          "label": "C",
          "text": "「バックアップは毎日手動でUSBメモリに保存しておけば安上がりです。」",
          "analysis": "【NG】荒唐的技术方案，在企业级BCP防灾中提到USB手工备份是对客户智商的侮辱。",
          "textWithRuby": "「バックアップは<ruby>毎日<rt>まいにち</rt></ruby><ruby>手動<rt>しゅどう</rt></ruby>でUSBメモリに<ruby>保存<rt>ほぞん</rt></ruby>しておけば<ruby>安上がり<rt>やすあがり</rt></ruby>です。」"
        },
        {
          "label": "D",
          "text": "「被災した際は全社員で祈るしかありません。」",
          "analysis": "【NG】荒谬消极。",
          "textWithRuby": "「<ruby>被災<rt>ひさい</rt></ruby>した<ruby>際<rt>さい</rt></ruby>は<ruby>全<rt>ぜん</rt></ruby><ruby>社員<rt>しゃいん</rt></ruby>で<ruby>祈る<rt>いのる</rt></ruby>しかありません。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "BCP/灾备下钻黄金准则：『RPO（何時のデータまで巻き戻せるか） ✕ RTO（何時間で業務再開できるか） ＝ コストとのトレードオフ提示』。",
        "clientSubtext": "本部长在董事会上要作BCP报告。他需要明确的量化指标和成本对比表（例如：RTO 2小时 vs RTO 24小时的预算差），以便向社长要预算。",
        "keyPhrases": [
          {
            "jp": "RPO（目標復旧時点: Recovery Point Objective）",
            "zh": "恢复点目标（允许丢失的数据时间范围）",
            "jpWithRuby": "RPO（<ruby>目標<rt>もくひょう</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby><ruby>時点<rt>じてん</rt></ruby>: Recovery Point Objective）"
          },
          {
            "jp": "RTO（目標復旧時間: Recovery Time Objective）",
            "zh": "恢复时间目标（系统停机至恢复的最长耗时）",
            "jpWithRuby": "RTO（<ruby>目標<rt>もくひょう</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>: Recovery Time Objective）"
          },
          {
            "jp": "東西マルチリージョン冗長化",
            "zh": "东西日本多地域双活跨区容灾冗余",
            "jpWithRuby": "<ruby>東西<rt>とうざい</rt></ruby>マルチリージョン<ruby>冗長<rt>じょうちょう</rt></ruby><ruby>化<rt>か</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 12: 保守短文第 4 篇（BCP事業継続計画とDRサイト冗長化）"
      },
      "dialogueWithRuby": "「<ruby>万が一<rt>まんがいち</rt></ruby><ruby>大<rt>だい</rt></ruby><ruby>地震<rt>じしん</rt></ruby>などでクラウドのデータセンターが<ruby>被災<rt>ひさい</rt></ruby>した<ruby>場合<rt>ばあい</rt></ruby>でも、<ruby>事業<rt>じぎょう</rt></ruby><ruby>継続<rt>けいぞく</rt></ruby>（BCP）の<ruby>観点<rt>かんてん</rt></ruby>からデータは<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>守り<rt>まもり</rt></ruby>たいし、すぐに<ruby>復旧<rt>ふっきゅう</rt></ruby>させたい。」"
    },
    {
      "id": "q_eli_07",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 2: 移动端设备兼容性与版本支持",
      "sceneId": "scene-2",
      "difficulty": "中级",
      "speaker": "営業企画 担当",
      "speakerRole": "営業推進担当",
      "speakerAvatar": "👩‍💼",
      "context": "客户提出希望营业员在外面可以用手机、iPad查看SFA，但没有说明设备型号和操作系统分布。",
      "dialogue": "「営業マンが持っているスマートフォンやタブレットからいつでもどこでもアクセスできるようにしてほしいです。」",
      "prompt": "为了避免在前端开发完成后陷入海量机型适配的泥潭，SE必须在需求定义阶段进行哪项下钻？",
      "options": [
        {
          "label": "A",
          "text": "「世の中のすべてのスマホとタブレットで動作保証いたしますので、機種の調査は不要です。」",
          "analysis": "【NG】对所有机型和系统全量保全是不可能的，Android碎片化严重，不划定边界将导致UI测试工时失控暴增。",
          "textWithRuby": "「<ruby>世の中<rt>よのなか</rt></ruby>のすべてのスマホとタブレットで<ruby>動作<rt>どうさ</rt></ruby><ruby>保証<rt>ほしょう</rt></ruby>いたしますので、<ruby>機種<rt>きしゅ</rt></ruby>の<ruby>調査<rt>ちょうさ</rt></ruby>は<ruby>不要<rt>ふよう</rt></ruby>です。」"
        },
        {
          "label": "B",
          "text": "「端末の動作保証要件を明確化するため、会社支給端末の【OS種別（iOS/Androidのバージョン範囲）】、【画面解像度・推奨インチ数】、【MDM（端末管理ソフト）導入有無】の3点を特定させていただけますでしょうか。サポート対象を『最新から過去2世代まで』と定義することで開発検証工数を最適化できます。」",
          "analysis": "【正解】专业明确划定测试矩阵：OS范围（最新2代）、屏幕尺寸、企业MDM策略，既有效控制工数，又确保主流设备平稳运行。",
          "textWithRuby": "「<ruby>端末<rt>たんまつ</rt></ruby>の<ruby>動作<rt>どうさ</rt></ruby><ruby>保証<rt>ほしょう</rt></ruby><ruby>要件<rt>ようけん</rt></ruby>を<ruby>明確<rt>めいかく</rt></ruby><ruby>化<rt>か</rt></ruby>するため、<ruby>会社<rt>かいしゃ</rt></ruby><ruby>支給<rt>しきゅう</rt></ruby><ruby>端末<rt>たんまつ</rt></ruby>の【OS<ruby>種別<rt>しゅべつ</rt></ruby>（iOS/Androidのバージョン<ruby>範囲<rt>はんい</rt></ruby>）】、【<ruby>画面<rt>がめん</rt></ruby><ruby>解像<rt>かいぞう</rt></ruby><ruby>度<rt>ど</rt></ruby>・<ruby>推奨<rt>すいしょう</rt></ruby>インチ<ruby>数<rt>すう</rt></ruby>】、【MDM（<ruby>端末<rt>たんまつ</rt></ruby><ruby>管理<rt>かんり</rt></ruby>ソフト）<ruby>導入<rt>どうにゅう</rt></ruby><ruby>有無<rt>うむ</rt></ruby>】の3<ruby>点<rt>てん</rt></ruby>を<ruby>特定<rt>とくてい</rt></ruby>させていただけますでしょうか。サポート<ruby>対象<rt>たいしょう</rt></ruby>を『<ruby>最新<rt>さいしん</rt></ruby>から<ruby>過去<rt>かこ</rt></ruby>2<ruby>世代<rt>せだい</rt></ruby>まで』と<ruby>定義<rt>ていぎ</rt></ruby>することで<ruby>開発<rt>かいはつ</rt></ruby><ruby>検証<rt>けんしょう</rt></ruby><ruby>工数<rt>こうすう</rt></ruby>を<ruby>最適<rt>さいてき</rt></ruby><ruby>化<rt>か</rt></ruby>できます。」"
        },
        {
          "label": "C",
          "text": "「最新のiPhone 15以外はすべてサポート対象外とさせていただきます。」",
          "analysis": "【NG】过度狭隘，许多日企出于预算考虑使用的是旧款公司手机或iPad，一刀切会遭到客户抵制。",
          "textWithRuby": "「<ruby>最新<rt>さいしん</rt></ruby>のiPhone 15<ruby>以外<rt>いがい</rt></ruby>はすべてサポート<ruby>対象<rt>たいしょう</rt></ruby><ruby>外<rt>がい</rt></ruby>とさせていただきます。」"
        },
        {
          "label": "D",
          "text": "「スマホ用には作らず、PC用のWeb画面をそのままスマホのブラウザでピンチズームして見てもらえば十分です。」",
          "analysis": "【NG】拒绝移动端自适应UI设计，严重损害用户体验。",
          "textWithRuby": "「スマホ<ruby>用<rt>よう</rt></ruby>には<ruby>作ら<rt>つくら</rt></ruby>ず、PC<ruby>用<rt>よう</rt></ruby>のWeb<ruby>画面<rt>がめん</rt></ruby>をそのままスマホのブラウザでピンチズームして<ruby>見<rt>み</rt></ruby>てもらえば<ruby>十分<rt>じゅうぶん</rt></ruby>です。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "移动适配下钻三部曲：『OSバージョン境界線の画定 ＋ 社給端末（MDM）セキュリティ要件 ＋ 動作検証端末マトリクス合意』。",
        "clientSubtext": "客户业务人员并不清楚Android版本碎片化的灾难，明确给出一份支持机型白名单能帮客户省下数十万日元的无谓测试支出。",
        "keyPhrases": [
          {
            "jp": "動作保証環境（OSバージョン範囲）",
            "zh": "运行环境保障范围（操作系统版本白名单）",
            "jpWithRuby": "<ruby>動作<rt>どうさ</rt></ruby><ruby>保証<rt>ほしょう</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>（OSバージョン<ruby>範囲<rt>はんい</rt></ruby>）"
          },
          {
            "jp": "MDM（モバイル端末管理）連携",
            "zh": "企业级移动设备管理系统集成",
            "jpWithRuby": "MDM（モバイル<ruby>端末<rt>たんまつ</rt></ruby><ruby>管理<rt>かんり</rt></ruby>）<ruby>連携<rt>れんけい</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 2: 教材核心课文第 2 轮（李：モバイル対応端末とブラウザ検証範囲）"
      },
      "dialogueWithRuby": "「<ruby>営業<rt>えいぎょう</rt></ruby>マンが<ruby>持っ<rt>もっ</rt></ruby>ているスマートフォンやタブレットからいつでもどこでもアクセスできるようにしてほしいです。」"
    },
    {
      "id": "q_eli_08",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 11: 客服满意度指标 (CSAT / NPS)",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "経営企画 役員",
      "speakerRole": "取締役 経営企画担当",
      "speakerAvatar": "👨‍💼",
      "context": "董事会要求本次CS系统改造后，“必须显著提升客户满意度”，并纳入年终考核。",
      "dialogue": "「今回のシステム投資で顧客満足度がどれだけ上がったのか、取締役会で定量的に示せる仕組みを作ってくれ。」",
      "prompt": "为了让“提升客户满意度”这一抽象经营目标在系统中可采集、可计算、可追溯，SE应如何下钻设计？",
      "options": [
        {
          "label": "A",
          "text": "「役員会で『みんな喜んでいました』と口頭で報告すれば伝わります。」",
          "analysis": "【NG】董事会只认量化经营数据，口头主观陈述完全通不过审计与投资回报率考核。",
          "textWithRuby": "「<ruby>役員<rt>やくいん</rt></ruby><ruby>会<rt>かい</rt></ruby>で『みんな<ruby>喜ん<rt>よろこん</rt></ruby>でいました』と<ruby>口頭<rt>こうとう</rt></ruby>で<ruby>報告<rt>ほうこく</rt></ruby>すれば<ruby>伝わり<rt>つたわり</rt></ruby>ます。」"
        },
        {
          "label": "B",
          "text": "「投資対効果（ROI）を客観的に可視化するため、対応完了直後の【1タップアンケート（CSATスコア：5段階評価）】、半年ごとの【NPS（顧客推奨度）測定】、および【初回問い合わせ解決率（FCR: First Contact Resolution）】の自動集計ダッシュボードを標準装備する要件はいかがでしょうか。」",
          "analysis": "【正解】将抽象的满意度转化为国际通用的三大标准量化指标：『CSAT（满意度评分） ＋ NPS（净推荐值） ＋ FCR（首次解决率）』，并提供开箱即用的高管仪表盘。",
          "textWithRuby": "「<ruby>投資<rt>とうし</rt></ruby><ruby>対<rt>たい</rt></ruby><ruby>効果<rt>こうか</rt></ruby>（ROI）を<ruby>客観<rt>きゃっかん</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>可視<rt>かし</rt></ruby><ruby>化<rt>か</rt></ruby>するため、<ruby>対応<rt>たいおう</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby><ruby>直後<rt>ちょくご</rt></ruby>の【1タップアンケート（CSATスコア：5<ruby>段階<rt>だんかい</rt></ruby><ruby>評価<rt>ひょうか</rt></ruby>）】、<ruby>半年<rt>はんとし</rt></ruby>ごとの【NPS（<ruby>顧客<rt>こきゃく</rt></ruby><ruby>推奨<rt>すいしょう</rt></ruby><ruby>度<rt>ど</rt></ruby>）<ruby>測定<rt>そくてい</rt></ruby>】、および【<ruby>初回<rt>しょかい</rt></ruby><ruby>問い合わせ<rt>といあわせ</rt></ruby><ruby>解決<rt>かいけつ</rt></ruby><ruby>率<rt>りつ</rt></ruby>（FCR: First Contact Resolution）】の<ruby>自動<rt>じどう</rt></ruby><ruby>集計<rt>しゅうけい</rt></ruby>ダッシュボードを<ruby>標準<rt>ひょうじゅん</rt></ruby><ruby>装備<rt>そうび</rt></ruby>する<ruby>要件<rt>ようけん</rt></ruby>はいかがでしょうか。」"
        },
        {
          "label": "C",
          "text": "「クレームを入れてきた顧客には全員に商品券を配る機能を実装しましょう。」",
          "analysis": "【NG】荒唐的行贿式设想，脱离IT系统范畴。",
          "textWithRuby": "「クレームを<ruby>入れ<rt>いれ</rt></ruby>てきた<ruby>顧客<rt>こきゃく</rt></ruby>には<ruby>全員<rt>ぜんいん</rt></ruby>に<ruby>商品<rt>しょうひん</rt></ruby><ruby>券<rt>けん</rt></ruby>を<ruby>配る<rt>くばる</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を<ruby>実装<rt>じっそう</rt></ruby>しましょう。」"
        },
        {
          "label": "D",
          "text": "「満足度アンケートは回答率が低いので、最初から実装しない方が良いです。」",
          "analysis": "【NG】直接放弃客户核心考核需求，违背顾问职责。",
          "textWithRuby": "「<ruby>満足<rt>まんぞく</rt></ruby><ruby>度<rt>ど</rt></ruby>アンケートは<ruby>回答<rt>かいとう</rt></ruby><ruby>率<rt>りつ</rt></ruby>が<ruby>低い<rt>ひくい</rt></ruby>ので、<ruby>最初<rt>さいしょ</rt></ruby>から<ruby>実装<rt>じっそう</rt></ruby>しない<ruby>方<rt>ほう</rt></ruby>が<ruby>良い<rt>よい</rt></ruby>です。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "经营级诉求下钻落地：『抽象ゴール（満足度向上） ➜ KPI分解（FCR・応答時間・放棄呼率） ➜ 計測手段（CSAT/NPS自動収集） ➜ 経営ダッシュボード』。",
        "clientSubtext": "董事关心的是投入了几千万日元，能在决算报告上写出怎样光鲜的业绩数字。提供现成的可视化图表指标，等于帮他做好了向上汇报的PPT。",
        "keyPhrases": [
          {
            "jp": "初回解決率（FCR: First Contact Resolution）",
            "zh": "首次致电即解决率（客服质量黄金指标）",
            "jpWithRuby": "<ruby>初回<rt>ちゅう へぅい́</rt></ruby><ruby>解決<rt>かいけつ</rt></ruby><ruby>率<rt>りつ</rt></ruby>（FCR: First Contact Resolution）"
          },
          {
            "jp": "CSAT（顧客満足度） / NPS（推奨意向度）",
            "zh": "客户满意度评分 / 净推荐值",
            "jpWithRuby": "CSAT（<ruby>顧客<rt>こきゃく</rt></ruby><ruby>満足<rt>まんぞく</rt></ruby><ruby>度<rt>ど</rt></ruby>） / NPS（<ruby>推奨<rt>すいしょう</rt></ruby><ruby>意向<rt>いこう</rt></ruby><ruby>度<rt>ど</rt></ruby>）"
          },
          {
            "jp": "経営ダッシュボードでの可視化",
            "zh": "在经营层仪表盘上进行动态可视化呈现",
            "jpWithRuby": "<ruby>経営<rt>けいえい</rt></ruby>ダッシュボードでの<ruby>可視<rt>かし</rt></ruby><ruby>化<rt>か</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 11: CS短文第 5 篇（KPIダッシュボードとCSATスコア算出ロジック）"
      },
      "dialogueWithRuby": "「<ruby>今回<rt>こんかい</rt></ruby>のシステム<ruby>投資<rt>とうし</rt></ruby>で<ruby>顧客<rt>こきゃく</rt></ruby><ruby>満足<rt>まんぞく</rt></ruby><ruby>度<rt>ど</rt></ruby>がどれだけ<ruby>上がっ<rt>あがっ</rt></ruby>たのか、<ruby>取締<rt>とりしまり</rt></ruby><ruby>役<rt>やく</rt></ruby><ruby>会<rt>かい</rt></ruby>で<ruby>定量<rt>ていりょう</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>示せる<rt>しめせる</rt></ruby><ruby>仕組み<rt>しくみ</rt></ruby>を<ruby>作っ<rt>つくっ</rt></ruby>てくれ。」"
    },
    {
      "id": "q_eli_09",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 21: 进货验收与批次溯源 (Lot Traceability)",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "品質管理部 責任者",
      "speakerRole": "品質保証部長",
      "speakerAvatar": "👩‍💼",
      "context": "食品与医药客户的品控部长要求：“一旦发生质量召回，必须能够一秒钟查清某个批次发给了哪些客户。”",
      "dialogue": "「万が一商品に不具合が見つかったとき、そのロットがいつ入荷し、どの賞味期限のものがどの納品先に届いたか、即座に追跡（リコール対応）できなければ死活問題です。」",
      "prompt": "为了满足严苛的召回追溯需求，在设计WMS商品主数据与出入库流向时，SE必须下钻哪些关键字段与流程？",
      "options": [
        {
          "label": "A",
          "text": "「ロット番号や賞味期限の管理は現場が大変になるので、商品名だけの管理にしておきましょう。」",
          "analysis": "【NG】直接省略关键追溯字段，严重违反食品卫生法和医药流通法规（GMP）。",
          "textWithRuby": "「ロット<ruby>番号<rt>ばんごう</rt></ruby>や<ruby>賞味<rt>しょうみ</rt></ruby><ruby>期限<rt>きげん</rt></ruby>の<ruby>管理<rt>かんり</rt></ruby>は<ruby>現場<rt>げんば</rt></ruby>が<ruby>大変<rt>たいへん</rt></ruby>になるので、<ruby>商品<rt>しょうひん</rt></ruby><ruby>名<rt>めい</rt></ruby>だけの<ruby>管理<rt>かんり</rt></ruby>にしておきましょう。」"
        },
        {
          "label": "B",
          "text": "「確実なトレーサビリティの実現に向け、【ロット番号（製造Lot）】、【消費・賞味期限】、【入庫日・仕入先コード】、【出庫先顧客ID】を1対1で紐づけるシリアル・ロット管理要件を定義いたします。また、先入れ先出し（FIFO: First-In First-Out）を強制する引当ロジックも標準機能として組み込みますか。」",
          "analysis": "【正解】完整串联追溯链条：『生产Lot ＋ 保质期 ＋ 入库批次 ＋ 出库客户』，并配套『先进先出（FIFO）』智能预配算法，无懈可击。",
          "textWithRuby": "「<ruby>確実<rt>かくじつ</rt></ruby>なトレーサビリティの<ruby>実現<rt>じつげん</rt></ruby>に<ruby>向け<rt>むけ</rt></ruby>、【ロット<ruby>番号<rt>ばんごう</rt></ruby>（<ruby>製造<rt>せいぞう</rt></ruby>Lot）】、【<ruby>消費<rt>しょうひ</rt></ruby>・<ruby>賞味<rt>しょうみ</rt></ruby><ruby>期限<rt>きげん</rt></ruby>】、【<ruby>入庫<rt>にゅうこ</rt></ruby><ruby>日<rt>にち</rt></ruby>・<ruby>仕入先<rt>しいれさき</rt></ruby>コード】、【<ruby>出庫<rt>しゅっこ</rt></ruby><ruby>先<rt>さき</rt></ruby><ruby>顧客<rt>こきゃく</rt></ruby>ID】を1<ruby>対<rt>たい</rt></ruby>1で<ruby>紐<rt>ひも</rt></ruby>づけるシリアル・ロット<ruby>管理<rt>かんり</rt></ruby><ruby>要件<rt>ようけん</rt></ruby>を<ruby>定義<rt>ていぎ</rt></ruby>いたします。また、<ruby>先入れ<rt>さきいれ</rt></ruby><ruby>先出し<rt>さきだし</rt></ruby>（FIFO: First-In First-Out）を<ruby>強制<rt>きょうせい</rt></ruby>する<ruby>引当<rt>ひきあて</rt></ruby>ロジックも<ruby>標準<rt>ひょうじゅん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>として<ruby>組み込み<rt>くみこみ</rt></ruby>ますか。」"
        },
        {
          "label": "C",
          "text": "「リコールが起きたときは、倉庫の中を社員総出で1箱ずつ目視で確認すれば解決します。」",
          "analysis": "【NG】用肉眼手工盘查应对突发召回，效率极低且会造成严重违规与诉讼风险。",
          "textWithRuby": "「リコールが<ruby>起き<rt>おき</rt></ruby>たときは、<ruby>倉庫<rt>そうこ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>を<ruby>社員<rt>しゃいん</rt></ruby><ruby>総出<rt>そうで</rt></ruby>で1<ruby>箱<rt>ばこ</rt></ruby>ずつ<ruby>目視<rt>もくし</rt></ruby>で<ruby>確認<rt>かくにん</rt></ruby>すれば<ruby>解決<rt>かいけつ</rt></ruby>します。」"
        },
        {
          "label": "D",
          "text": "「賞味期限切れの警告機能は、画面が赤くなるだけで音は出ない仕様で十分ですね。」",
          "analysis": "【NG】枝节问题，未抓住追溯体系的根本逻辑。",
          "textWithRuby": "「<ruby>賞味<rt>しょうみ</rt></ruby><ruby>期限<rt>きげん</rt></ruby><ruby>切れ<rt>きれ</rt></ruby>の<ruby>警告<rt>けいこく</rt></ruby><ruby>機能<rt>きのう</rt></ruby>は、<ruby>画面<rt>がめん</rt></ruby>が<ruby>赤く<rt>あかく</rt></ruby>なるだけで<ruby>音<rt>おと</rt></ruby>は<ruby>出<rt>で</rt></ruby>ない<ruby>仕様<rt>しよう</rt></ruby>で<ruby>十分<rt>じゅうぶん</rt></ruby>ですね。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "追溯体系（Traceability）下钻模型：『ユニークLot識別 ＋ 賞味期限・保管ロケーション ＋ 先入れ先出し（FIFO）自動引当 ＋ 前後双方向トレーサビリティ検索』。",
        "clientSubtext": "品控部长最怕政府监管机构（如厚生劳动省、消费者厅）发起突击检查。能在一分钟内打印出完整流向追溯报表，是保住生产许可证的救命稻草。",
        "keyPhrases": [
          {
            "jp": "トレーサビリティ（追跡可能性）の担保",
            "zh": "保障全链路端到端追溯能力",
            "jpWithRuby": "トレーサビリティ（<ruby>追跡<rt>ついせき</rt></ruby><ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>）の<ruby>担保<rt>たんぽ</rt></ruby>"
          },
          {
            "jp": "先入れ先出し（FIFO: First-In, First-Out）",
            "zh": "先进先出库存自动分配调度逻辑",
            "jpWithRuby": "<ruby>先入れ<rt>くせぃああん る̀れ</rt></ruby>（FIFO: First-In, First-Out）"
          },
          {
            "jp": "製造ロットと賞味期限の厳密管理",
            "zh": "生产批次号与保质期严格精细化管理",
            "jpWithRuby": "<ruby>製造<rt>せいぞう</rt></ruby>ロットと<ruby>賞味<rt>しょうみ</rt></ruby><ruby>期限<rt>きげん</rt></ruby>の<ruby>厳密<rt>げんみつ</rt></ruby><ruby>管理<rt>かんり</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 21: WMS核心课文第 9 轮（李：ロット別賞味期限管理とリコール追跡性）"
      },
      "dialogueWithRuby": "「<ruby>万が一<rt>まんがいち</rt></ruby><ruby>商品<rt>しょうひん</rt></ruby>に<ruby>不<rt>ふ</rt></ruby><ruby>具合<rt>ぐあい</rt></ruby>が<ruby>見つかっ<rt>みつかっ</rt></ruby>たとき、そのロットがいつ<ruby>入荷<rt>にゅうか</rt></ruby>し、どの<ruby>賞味<rt>しょうみ</rt></ruby><ruby>期限<rt>きげん</rt></ruby>のものがどの<ruby>納品<rt>のうひん</rt></ruby><ruby>先<rt>さき</rt></ruby>に<ruby>届い<rt>とどい</rt></ruby>たか、<ruby>即座<rt>そくざ</rt></ruby>に<ruby>追跡<rt>ついせき</rt></ruby>（リコール<ruby>対応<rt>たいおう</rt></ruby>）できなければ<ruby>死活<rt>しかつ</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>です。」"
    },
    {
      "id": "q_eli_10",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 1: 邮件与日历外部联动 (Exchange / Google)",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "営業推進 課長",
      "speakerRole": "営業企画担当",
      "speakerAvatar": "🧑‍💼",
      "context": "营业推进课长提出：“销售人员平时都在用Outlook日历，SFA里面也能看日程，希望这两边能同步。”",
      "dialogue": "「普段みんなOutlookのスケジュールを使っているから、SFAの行動管理カレンダーと同期させてほしいんだよね。」",
      "prompt": "在日历双向同步需求中，SE必须立即下钻的关键“边界与冲突规则”是什么？",
      "options": [
        {
          "label": "A",
          "text": "「両方同期しますので、何も考えずに自由に使っていただければ大丈夫です。」",
          "analysis": "【NG】双向同步如果不定义冲突仲裁与私密过滤，必然导致日程覆盖死循环、会议室重复预订以及私人就医日程泄露。",
          "textWithRuby": "「<ruby>両方<rt>りょうほう</rt></ruby><ruby>同期<rt>どうき</rt></ruby>しますので、<ruby>何<rt>なん</rt></ruby>も<ruby>考え<rt>かんがえ</rt></ruby>ずに<ruby>自由<rt>じゆう</rt></ruby>に<ruby>使っ<rt>つかっ</rt></ruby>ていただければ<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です。」"
        },
        {
          "label": "B",
          "text": "「Outlook連携の精緻化にあたり、3点仕様を詰めさせてください。①同期方向（OutlookからSFAへの片方向か、双方向か）、②【非公開・プライベート予定】の同期除外フィルタリング要件、③両方で同時に同一時間帯が更新された場合の【競合（コンフリクト）解消ルール】（どちらを優先するか）について、いかがいたしましょうか。」",
          "analysis": "【正解】教科书级同步下钻：①单向/双向；②私人敏感日程过滤（隐私合规）；③并发修改时的冲突仲裁规则（Conflict Resolution）。",
          "textWithRuby": "「Outlook<ruby>連携<rt>れんけい</rt></ruby>の<ruby>精緻<rt>せいち</rt></ruby><ruby>化<rt>か</rt></ruby>にあたり、3<ruby>点<rt>てん</rt></ruby><ruby>仕様<rt>しよう</rt></ruby>を<ruby>詰め<rt>つめ</rt></ruby>させてください。①<ruby>同期<rt>どうき</rt></ruby><ruby>方向<rt>ほうこう</rt></ruby>（OutlookからSFAへの<ruby>片<rt>かた</rt></ruby><ruby>方向<rt>ほうこう</rt></ruby>か、<ruby>双<rt>そう</rt></ruby><ruby>方向<rt>ほうこう</rt></ruby>か）、②【<ruby>非<rt>ひ</rt></ruby><ruby>公開<rt>こうかい</rt></ruby>・プライベート<ruby>予定<rt>よてい</rt></ruby>】の<ruby>同期<rt>どうき</rt></ruby><ruby>除外<rt>じょがい</rt></ruby>フィルタリング<ruby>要件<rt>ようけん</rt></ruby>、③<ruby>両方<rt>りょうほう</rt></ruby>で<ruby>同時<rt>どうじ</rt></ruby>に<ruby>同<rt>どう</rt></ruby><ruby>一<rt>いち</rt></ruby><ruby>時間<rt>じかん</rt></ruby><ruby>帯<rt>たい</rt></ruby>が<ruby>更新<rt>こうしん</rt></ruby>された<ruby>場合<rt>ばあい</rt></ruby>の【<ruby>競合<rt>きょうごう</rt></ruby>（コンフリクト）<ruby>解消<rt>かいしょう</rt></ruby>ルール】（どちらを<ruby>優先<rt>ゆうせん</rt></ruby>するか）について、いかがいたしましょうか。」"
        },
        {
          "label": "C",
          "text": "「Outlookは危険ですので今すぐ使用を禁止し、全員SFAのカレンダーだけを使うようにしてください。」",
          "analysis": "【NG】强行要求全公司放弃成熟主流办公工具，脱离实际且阻力极大。",
          "textWithRuby": "「Outlookは<ruby>危険<rt>きけん</rt></ruby>ですので<ruby>今<rt>いま</rt></ruby>すぐ<ruby>使用<rt>しよう</rt></ruby>を<ruby>禁止<rt>きんし</rt></ruby>し、<ruby>全員<rt>ぜんいん</rt></ruby>SFAのカレンダーだけを<ruby>使う<rt>つかう</rt></ruby>ようにしてください。」"
        },
        {
          "label": "D",
          "text": "「同期は月に1回深夜に実施するバッチで十分ですね。」",
          "analysis": "【NG】日历日程变动频繁，月度同步完全丧失日程安排的即时有效性。",
          "textWithRuby": "「<ruby>同期<rt>どうき</rt></ruby>は<ruby>月<rt>つき</rt></ruby>に1<ruby>回<rt>かい</rt></ruby><ruby>深夜<rt>しんや</rt></ruby>に<ruby>実施<rt>じっし</rt></ruby>するバッチで<ruby>十分<rt>じゅうぶん</rt></ruby>ですね。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "外部系统数据同步下钻金三角：『同期方向（単方向/双方向） ✕ 個人プライバシー除外（非公開フラグ） ✕ 競合解決ポリシー（最新勝ち / 片方正）』。",
        "clientSubtext": "销售人员绝不希望自己的私人身体检查、家庭聚餐等非公开日程被同步到全体可见的SFA系统中。敏锐地指出隐私过滤，展现了无微不至的细致。",
        "keyPhrases": [
          {
            "jp": "双方向同期と片方向同期の選択",
            "zh": "双向同步与单向同步的选择权衡",
            "jpWithRuby": "<ruby>双<rt>そう</rt></ruby><ruby>方向<rt>ほうこう</rt></ruby><ruby>同期<rt>どうき</rt></ruby>と<ruby>片<rt>かた</rt></ruby><ruby>方向<rt>ほうこう</rt></ruby><ruby>同期<rt>どうき</rt></ruby>の<ruby>選択<rt>せんたく</rt></ruby>"
          },
          {
            "jp": "非公開予定のマスキング・除外フィルター",
            "zh": "非公开私密日程的掩码与剔除过滤",
            "jpWithRuby": "<ruby>非<rt>ひ</rt></ruby><ruby>公開<rt>こうかい</rt></ruby><ruby>予定<rt>よてい</rt></ruby>のマスキング・<ruby>除外<rt>じょがい</rt></ruby>フィルター"
          },
          {
            "jp": "競合（コンフリクト）解消ポリシー",
            "zh": "并发数据冲突解决仲裁策略",
            "jpWithRuby": "<ruby>競合<rt>きょうごう</rt></ruby>（コンフリクト）<ruby>解消<rt>かいしょう</rt></ruby>ポリシー"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 10 轮（李：外部スケジューラー連携と競合防止策）"
      },
      "dialogueWithRuby": "「<ruby>普段<rt>ふだん</rt></ruby>みんなOutlookのスケジュールを<ruby>使っ<rt>つかっ</rt></ruby>ているから、SFAの<ruby>行動<rt>こうどう</rt></ruby><ruby>管理<rt>かんり</rt></ruby>カレンダーと<ruby>同期<rt>どうき</rt></ruby>させてほしいんだよね。」"
    },
    {
      "id": "q_sco_01",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 1: 预算纳期固定下的范围谈判",
      "sceneId": "scene-1",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長",
      "speakerAvatar": "👨‍💼",
      "context": "客户田中部长列出了30个巨细靡遗的功能清单，并坚持要在今年10月新财年开学期全部一次性上线，但预算和工期极为紧张。",
      "dialogue": "「10月の新年度スタートに全機能が揃っていなければ意味がない。予算も追加は出せないから、このリスト全部10月本番稼働で頼むよ。」",
      "prompt": "面对客户“全功能・死纳期・零增预算”的三重死锁，作为经验丰富的对日IT顾问，如何通过分期交付（Phasing）达成双赢共识？",
      "options": [
        {
          "label": "A",
          "text": "「ご予算も納期も無理ですので、このプロジェクトはお引き受けできません。白紙撤回させてください。」",
          "analysis": "【NG】直接掀桌子弃单，完全丧失商业商务拓展智慧。",
          "textWithRuby": "「ご<ruby>予算<rt>よさん</rt></ruby>も<ruby>納期<rt>のうき</rt></ruby>も<ruby>無理<rt>むり</rt></ruby>ですので、このプロジェクトはお<ruby>引き受け<rt>ひきうけ</rt></ruby>できません。<ruby>白紙<rt>はくし</rt></ruby><ruby>撤回<rt>てっかい</rt></ruby>させてください。」"
        },
        {
          "label": "B",
          "text": "「何とか徹夜して死ぬ気で10月までに全部作りますので、信じて任せてください！」",
          "analysis": "【NG】赌徒式口头承诺，最终必然导致严重质量灾难、Bug满天飞、交付延期甚至被起诉索赔。",
          "textWithRuby": "「<ruby>何<rt>なん</rt></ruby>とか<ruby>徹夜<rt>てつや</rt></ruby>して<ruby>死ぬ<rt>しぬ</rt></ruby><ruby>気<rt>き</rt></ruby>で10<ruby>月<rt>がつ</rt></ruby>までに<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>作り<rt>つくり</rt></ruby>ますので、<ruby>信じ<rt>しんじ</rt></ruby>て<ruby>任せ<rt>まかせ</rt></ruby>てください！」"
        },
        {
          "label": "C",
          "text": "「10月の新年度キックオフという戦略的な納期厳守の重要性、痛切に理解いたしました。そこで納期を死守しつつ品質リスクを回避するため、【機能の優先順位（MoSCoW分析）】に基づき、10月は『商談登録・日報・売上集計のコア業務（Phase 1）』を確実に先行リリースし、高度なAI予測や外部BI連携を『12月のPhase 2』として段階展開するスモールスタートをご提案させていただけないでしょうか。」",
          "analysis": "【正解】顾问式谈判巅峰：肯定10月战略纳期的神圣性 ➜ 引入科学的MoSCoW优先级工具 ➜ 拆分为『Phase 1核心保命业务先行稳妥上线 ＋ Phase 2高级AI渐进式释放』，既守住上线里程碑，又防范交付系统性崩盘。",
          "textWithRuby": "「10<ruby>月<rt>がつ</rt></ruby>の<ruby>新<rt>しん</rt></ruby><ruby>年度<rt>ねんど</rt></ruby>キックオフという<ruby>戦略<rt>せんりゃく</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>納期<rt>のうき</rt></ruby><ruby>厳守<rt>げんしゅ</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>、<ruby>痛切<rt>つうせつ</rt></ruby>に<ruby>理解<rt>りかい</rt></ruby>いたしました。そこで<ruby>納期<rt>のうき</rt></ruby>を<ruby>死守<rt>ししゅ</rt></ruby>しつつ<ruby>品質<rt>ひんしつ</rt></ruby>リスクを<ruby>回避<rt>かいひ</rt></ruby>するため、【<ruby>機能<rt>きのう</rt></ruby>の<ruby>優先<rt>ゆうせん</rt></ruby><ruby>順位<rt>じゅんい</rt></ruby>（MoSCoW<ruby>分析<rt>ぶんせき</rt></ruby>）】に<ruby>基づき<rt>もとづき</rt></ruby>、10<ruby>月<rt>つき</rt></ruby>は『<ruby>商談<rt>しょうだん</rt></ruby><ruby>登録<rt>とうろく</rt></ruby>・<ruby>日報<rt>にっぽう</rt></ruby>・<ruby>売上<rt>うりあげ</rt></ruby><ruby>集計<rt>しゅうけい</rt></ruby>のコア<ruby>業務<rt>ぎょうむ</rt></ruby>（Phase 1）』を<ruby>確実<rt>かくじつ</rt></ruby>に<ruby>先行<rt>せんこう</rt></ruby>リリースし、<ruby>高度<rt>こうど</rt></ruby>なAI<ruby>予測<rt>よそく</rt></ruby>や<ruby>外部<rt>がいぶ</rt></ruby>BI<ruby>連携<rt>れんけい</rt></ruby>を『12<ruby>月<rt>がつ</rt></ruby>のPhase 2』として<ruby>段階<rt>だんかい</rt></ruby><ruby>展開<rt>てんかい</rt></ruby>するスモールスタートをご<ruby>提案<rt>ていあん</rt></ruby>させていただけないでしょうか。」"
        },
        {
          "label": "D",
          "text": "「全部作る代わりに、テスト工程をすべて省略してノーテストで本番リリースしましょう。」",
          "analysis": "【NG】砍掉测试上线等于自寻死路，违背软件工程基本伦理。",
          "textWithRuby": "「<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>作る<rt>つくる</rt></ruby><ruby>代わり<rt>かわり</rt></ruby>に、テスト<ruby>工程<rt>こうてい</rt></ruby>をすべて<ruby>省略<rt>しょうりゃく</rt></ruby>してノーテストで<ruby>本番<rt>ほんばん</rt></ruby>リリースしましょう。」"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "对日谈判经典策略：『納期の厳守（10月稼働）を尊重する代わりに、スコープの段階化（Phasing）を勝ち取る』。把“能不能做”转化为“先上什么、后上什么”。",
        "clientSubtext": "部长在社长面前立了军令状“10月必须有系统跑起来”。只要10月有核心功能可用、能开全员发布会，将次要功能挪到年底是完全可以接受的。",
        "keyPhrases": [
          {
            "jp": "MoSCoW分析による優先度分け（Must / Should / Could / Won't）",
            "zh": "MoSCoW需求优先级科学分类",
            "jpWithRuby": "MoSCoW<ruby>分析<rt>ぶんせき</rt></ruby>による<ruby>優先<rt>ゆうせん</rt></ruby><ruby>度<rt>ど</rt></ruby><ruby>分け<rt>わけ</rt></ruby>（Must / Should / Could / Won't）"
          },
          {
            "jp": "フェーズ分割（Phase 1先行リリース / Phase 2拡張）",
            "zh": "分期交付规划（一期先行投产/二期延展升级）",
            "jpWithRuby": "フェーズ<ruby>分割<rt>ぶんかつ</rt></ruby>（Phase 1<ruby>先行<rt>せんこう</rt></ruby>リリース / Phase 2<ruby>拡張<rt>かくちょう</rt></ruby>）"
          },
          {
            "jp": "スモールスタートでの確実な立ち上げ",
            "zh": "小步快跑稳妥启动，规避系统性风险",
            "jpWithRuby": "スモールスタートでの<ruby>確実<rt>かくじつ</rt></ruby>な<ruby>立ち上げ<rt>たちあげ</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 11 轮（李：フェーズ分割と段階的カットオーバーの合意）"
      },
      "dialogueWithRuby": "「10<ruby>月<rt>がつ</rt></ruby>の<ruby>新<rt>しん</rt></ruby><ruby>年度<rt>ねんど</rt></ruby>スタートに<ruby>全<rt>ぜん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>が<ruby>揃っ<rt>そろっ</rt></ruby>ていなければ<ruby>意味<rt>いみ</rt></ruby>がない。<ruby>予算<rt>よさん</rt></ruby>も<ruby>追加<rt>ついか</rt></ruby>は<ruby>出せ<rt>だせ</rt></ruby>ないから、このリスト<ruby>全部<rt>ぜんぶ</rt></ruby>10<ruby>月<rt>がつ</rt></ruby><ruby>本番<rt>ほんばん</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>で<ruby>頼む<rt>たのむ</rt></ruby>よ。」"
    },
    {
      "id": "q_sco_02",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 11: 需求冻结后的追加变更 (仕様変更手続き)",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "高橋 カスタマーサポート長",
      "speakerRole": "CS部 統括責任者",
      "speakerAvatar": "👩‍💼",
      "context": "在要件定义书已经正式签字盖章（Sign-off）进入开发阶段后，高桥主管突然提出想增加一个针对VIP客户的专属视频客服通道。",
      "dialogue": "「先日のサイン後に役員から要望があってね、VIP顧客向けにリアルタイムのビデオ通話サポート機能も急遽追加したいのよ。」",
      "prompt": "面对签字后的重大范围扩张，SE应当如何规范启动“仕様変更（Change Request）”流程，既保持客户满意度又守住项目底线？",
      "options": [
        {
          "label": "A",
          "text": "「もうサインをもらいましたので、1行たりとも変更は受け付けません。法的に無効です。」",
          "analysis": "【NG】生硬拿合同法条顶撞客户高管，把正常的商业变更诉求变成法律对抗，破坏合作关系。",
          "textWithRuby": "「もうサインをもらいましたので、1<ruby>行<rt>ぎょう</rt></ruby>たりとも<ruby>変更<rt>へんこう</rt></ruby>は<ruby>受け付け<rt>うけつけ</rt></ruby>ません。<ruby>法的<rt>ほうてき</rt></ruby>に<ruby>無効<rt>むこう</rt></ruby>です。」"
        },
        {
          "label": "B",
          "text": "「高橋様、役員様からの注目の高さが伺える素晴らしい機能追加ですね。ビデオ通話はインフラ帯域や追加ライセンスに影響を及ぼすため、プロジェクトのガバナンスに則り【仕様変更依頼票（CR）】を作成いたします。3日以内に『追加開発工数・必要費用・リリース日程への影響度』を算出し、役員会でのご決裁用資料として提示いたしますが、よろしいでしょうか。」",
          "analysis": "【正解】完美标准对日流程：积极肯定客户管理层的关注 ➜ 搬出规范的CR机制 ➜ 承诺3天内给出包含『工时・纳期・费用』的三维影响度评估报告，赋能客户高管向上决裁。",
          "textWithRuby": "「<ruby>高橋<rt>たかはし</rt></ruby><ruby>様<rt>さま</rt></ruby>、<ruby>役員<rt>やくいん</rt></ruby><ruby>様<rt>さま</rt></ruby>からの<ruby>注目<rt>ちゅうもく</rt></ruby>の<ruby>高<rt>たか</rt></ruby>さが<ruby>伺える<rt>うかがえる</rt></ruby><ruby>素晴らしい<rt>すばらしい</rt></ruby><ruby>機能<rt>きのう</rt></ruby><ruby>追加<rt>ついか</rt></ruby>ですね。ビデオ<ruby>通話<rt>つうわ</rt></ruby>はインフラ<ruby>帯域<rt>たいいき</rt></ruby>や<ruby>追加<rt>ついか</rt></ruby>ライセンスに<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>及ぼす<rt>およぼす</rt></ruby>ため、プロジェクトのガバナンスに<ruby>則り<rt>のっとり</rt></ruby>【<ruby>仕様<rt>しよう</rt></ruby><ruby>変更<rt>へんこう</rt></ruby><ruby>依頼<rt>いらい</rt></ruby><ruby>票<rt>ひょう</rt></ruby>（CR）】を<ruby>作成<rt>さくせい</rt></ruby>いたします。3<ruby>日<rt>か</rt></ruby><ruby>以内<rt>いない</rt></ruby>に『<ruby>追加<rt>ついか</rt></ruby><ruby>開発<rt>かいはつ</rt></ruby><ruby>工数<rt>こうすう</rt></ruby>・<ruby>必要<rt>ひつよう</rt></ruby><ruby>費用<rt>ひよう</rt></ruby>・リリース<ruby>日程<rt>にってい</rt></ruby>への<ruby>影響<rt>えいきょう</rt></ruby><ruby>度<rt>ど</rt></ruby>』を<ruby>算出<rt>さんしゅつ</rt></ruby>し、<ruby>役員<rt>やくいん</rt></ruby><ruby>会<rt>かい</rt></ruby>でのご<ruby>決裁<rt>けっさい</rt></ruby><ruby>用<rt>よう</rt></ruby><ruby>資料<rt>しりょう</rt></ruby>として<ruby>提示<rt>ていじ</rt></ruby>いたしますが、よろしいでしょうか。」"
        },
        {
          "label": "C",
          "text": "「わかりました、サイン後でも何でも無料で追加しておきますのでご安心ください。」",
          "analysis": "【NG】毫无原则的免费加活，直接导致项目亏损和延期违约。",
          "textWithRuby": "「わかりました、サイン<ruby>後<rt>ご</rt></ruby>でも<ruby>何<rt>なん</rt></ruby>でも<ruby>無料<rt>むりょう</rt></ruby>で<ruby>追加<rt>ついか</rt></ruby>しておきますのでご<ruby>安心<rt>あんしん</rt></ruby>ください。」"
        },
        {
          "label": "D",
          "text": "「ビデオ通話機能は世の中に需要がありませんので、役員様にやめるよう説得してください。」",
          "analysis": "【NG】教客户去教育自己的上级役员，越俎代庖，极度失礼。",
          "textWithRuby": "「ビデオ<ruby>通話<rt>つうわ</rt></ruby><ruby>機能<rt>きのう</rt></ruby>は<ruby>世の中<rt>よのなか</rt></ruby>に<ruby>需要<rt>じゅよう</rt></ruby>がありませんので、<ruby>役員<rt>やくいん</rt></ruby><ruby>様<rt>さま</rt></ruby>にやめるよう<ruby>説得<rt>せっとく</rt></ruby>してください。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "变更管理（Change Request）核心：『肯定要望価値 ➜ 正式CR票起草 ➜ 影響度分析（工数・費用・納期）提示 ➜ 顧客決裁』。绝不在非正式场合私相授受。",
        "clientSubtext": "高桥也很无奈，这是董事塞过来的硬骨头。她需要的是一份有说服力的数据评估表，拿回去向董事证明“加这个功能需要多花多少钱、晚多久”，帮她卸下压力。",
        "keyPhrases": [
          {
            "jp": "仕様変更依頼票（Change Request）の起票",
            "zh": "提报正式的需求变更申请单",
            "jpWithRuby": "<ruby>仕様<rt>しよう</rt></ruby><ruby>変更<rt>へんこう</rt></ruby><ruby>依頼<rt>いらい</rt></ruby><ruby>票<rt>ひょう</rt></ruby>（Change Request）の<ruby>起票<rt>きひょう</rt></ruby>"
          },
          {
            "jp": "影響度調査（QCD: 品質・費用・納期のトレードオフ）",
            "zh": "影响度评估（质量/成本/交付周期的权衡分析）",
            "jpWithRuby": "<ruby>影響<rt>えいきょう</rt></ruby><ruby>度<rt>ど</rt></ruby><ruby>調査<rt>ちょうさ</rt></ruby>（QCD: <ruby>品質<rt>ひんしつ</rt></ruby>・<ruby>費用<rt>ひよう</rt></ruby>・<ruby>納期<rt>のうき</rt></ruby>のトレードオフ）"
          }
        ],
        "referenceDialogue": "场景 11: 职场诊所（サインオフ後の仕様変更コントロールと正式手続き）"
      },
      "dialogueWithRuby": "「<ruby>先日<rt>せんじつ</rt></ruby>のサイン<ruby>後<rt>ご</rt></ruby>に<ruby>役員<rt>やくいん</rt></ruby>から<ruby>要望<rt>ようぼう</rt></ruby>があってね、VIP<ruby>顧客<rt>こきゃく</rt></ruby><ruby>向け<rt>むけ</rt></ruby>にリアルタイムのビデオ<ruby>通話<rt>つうわ</rt></ruby>サポート<ruby>機能<rt>きのう</rt></ruby>も<ruby>急遽<rt>きゅうきょ</rt></ruby><ruby>追加<rt>ついか</rt></ruby>したいのよ。」"
    },
    {
      "id": "q_sco_03",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 2: 套件标配 vs 过度二次开发 (Customization vs Package)",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情シス課長",
      "speakerAvatar": "🧑‍💻",
      "context": "在引入标准SFA SaaS系统时，各部门提了上百项细碎的表单样式修改，要求系统完全百分之百复刻旧Excel的每一列每一格。",
      "dialogue": "「うちの営業が長年使い慣れたエクセル帳票と1ミリも違わないように、画面レイアウトを徹底的にカスタマイズしてほしいんだ。」",
      "prompt": "面对客户强烈的“过度客制化（過剰カスタマイズ）”倾向，IT顾问应当如何向山田课长谏言，引导其回归标准套件最佳实践（Fit to Standard）？",
      "options": [
        {
          "label": "A",
          "text": "「山田課長のおっしゃる通り、エクセルを1ドット単位で完全再現するフルスクラッチ開発に切り替えましょう。」",
          "analysis": "【NG】盲从客户过度客制化，导致丧失SaaS升级能力，成本剧增5倍。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>のおっしゃる<ruby>通り<rt>とおり</rt></ruby>、エクセルを1ドット<ruby>単位<rt>たんい</rt></ruby>で<ruby>完全<rt>かんぜん</rt></ruby><ruby>再現<rt>さいげん</rt></ruby>するフルスクラッチ<ruby>開発<rt>かいはつ</rt></ruby>に<ruby>切り替え<rt>きりかえ</rt></ruby>ましょう。」"
        },
        {
          "label": "B",
          "text": "「山田課長、現場の使い勝手を守りたいというお気持ちは大変よく理解できます。しかし画面の完全個別改修（アドオン）を重ねすぎますと、①将来のSaaS標準アップデートに追従できなくなるリスク、②保守維持費が毎年倍増するリスクがございます。グローバル推奨の『Fit to Standard（業務をパッケージの標準に合わせる）』を基本軸とし、真に譲れないコア要件10%のみにカスタマイズを絞り込む方針をご検討いただけないでしょうか。」",
          "analysis": "【正解】大师级架构顾问建言：共情现场习惯 ➜ 深刻指出过度Add-on的两大长远致命毒药（无法享受版本升级红利、年间运维费爆炸） ➜ 引导采用『Fit to Standard（以90%套件标配驱动业务变革，仅10%核心差异化做定制）』。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>、<ruby>現場<rt>げんば</rt></ruby>の<ruby>使い<rt>つかい</rt></ruby><ruby>勝手<rt>かって</rt></ruby>を<ruby>守り<rt>まもり</rt></ruby>たいというお<ruby>気持ち<rt>きもち</rt></ruby>は<ruby>大変<rt>たいへん</rt></ruby>よく<ruby>理解<rt>りかい</rt></ruby>できます。しかし<ruby>画面<rt>がめん</rt></ruby>の<ruby>完全<rt>かんぜん</rt></ruby><ruby>個別<rt>こべつ</rt></ruby><ruby>改修<rt>かいしゅう</rt></ruby>（アドオン）を<ruby>重ね<rt>かさね</rt></ruby>すぎますと、①<ruby>将来<rt>しょうらい</rt></ruby>のSaaS<ruby>標準<rt>ひょうじゅん</rt></ruby>アップデートに<ruby>追従<rt>ついじゅう</rt></ruby>できなくなるリスク、②<ruby>保守<rt>ほしゅ</rt></ruby><ruby>維持<rt>いじ</rt></ruby><ruby>費<rt>ひ</rt></ruby>が<ruby>毎年<rt>まいとし</rt></ruby><ruby>倍増<rt>ばいぞう</rt></ruby>するリスクがございます。グローバル<ruby>推奨<rt>すいしょう</rt></ruby>の『Fit to Standard（<ruby>業務<rt>ぎょうむ</rt></ruby>をパッケージの<ruby>標準<rt>ひょうじゅん</rt></ruby>に<ruby>合わせる<rt>あわせる</rt></ruby>）』を<ruby>基本<rt>きほん</rt></ruby><ruby>軸<rt>じく</rt></ruby>とし、<ruby>真<rt>しん</rt></ruby>に<ruby>譲れ<rt>ゆずれ</rt></ruby>ないコア<ruby>要件<rt>ようけん</rt></ruby>10%のみにカスタマイズを<ruby>絞り込む<rt>しぼりこむ</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>をご<ruby>検討<rt>けんとう</rt></ruby>いただけないでしょうか。」"
        },
        {
          "label": "C",
          "text": "「エクセルの真似をするのは時代遅れの愚かな行為ですので、現場の要望はすべて却下してください。」",
          "analysis": "【NG】粗暴蔑视客户原有沉淀，攻击现场人员“愚蠢”，彻底引发对立。",
          "textWithRuby": "「エクセルの<ruby>真似<rt>まね</rt></ruby>をするのは<ruby>時代<rt>じだい</rt></ruby><ruby>遅れ<rt>おくれ</rt></ruby>の<ruby>愚か<rt>おろか</rt></ruby>な<ruby>行為<rt>こうい</rt></ruby>ですので、<ruby>現場<rt>げんば</rt></ruby>の<ruby>要望<rt>ようぼう</rt></ruby>はすべて<ruby>却下<rt>きゃっか</rt></ruby>してください。」"
        },
        {
          "label": "D",
          "text": "「システムを入れずに、今後も永遠にエクセルのまま手作業を続けた方が安いと思います。」",
          "analysis": "【NG】消极嘲讽客户。",
          "textWithRuby": "「システムを<ruby>入れ<rt>いれ</rt></ruby>ずに、<ruby>今後<rt>こんご</rt></ruby>も<ruby>永遠<rt>えいえん</rt></ruby>にエクセルのまま<ruby>手<rt>て</rt></ruby><ruby>作業<rt>さぎょう</rt></ruby>を<ruby>続け<rt>つづけ</rt></ruby>た<ruby>方<rt>ほう</rt></ruby>が<ruby>安い<rt>やすい</rt></ruby>と<ruby>思い<rt>おもい</rt></ruby>ます。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "推动『Fit to Standard（标配适配业务）』原则，向客户阐明『初期改造費』和『長期TCO（保有総コスト）』的利弊，树立具备长远战略眼光的顾问形象。",
        "clientSubtext": "情统课长内心其实也讨厌过多的个性化修改，但他顶不住各事业部部长的压力。你的这套专业说辞，正是他拿到各部门会议上劝退无理要求的“专业武器”。",
        "keyPhrases": [
          {
            "jp": "Fit to Standard（標準パッケージ適合原則）",
            "zh": "契合标准原则（业务向成熟标配靠拢）",
            "jpWithRuby": "Fit to Standard（<ruby>標準<rt>ひょうじゅん</rt></ruby>パッケージ<ruby>適合<rt>てきごう</rt></ruby><ruby>原則<rt>げんそく</rt></ruby>）"
          },
          {
            "jp": "過剰なアドオン開発の抑止",
            "zh": "遏制过度个性化挂件开发",
            "jpWithRuby": "<ruby>過剰<rt>かじょう</rt></ruby>なアドオン<ruby>開発<rt>かいはつ</rt></ruby>の<ruby>抑止<rt>よくし</rt></ruby>"
          },
          {
            "jp": "TCO（総保有コスト）の最小化",
            "zh": "最小化整体长期拥有成本",
            "jpWithRuby": "TCO（<ruby>総<rt>そう</rt></ruby><ruby>保有<rt>ほゆう</rt></ruby>コスト）の<ruby>最小<rt>さいしょう</rt></ruby><ruby>化<rt>か</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 2: 教材核心课文第 9 轮（李：パッケージ標準適合とアドオン開発の線引き）"
      },
      "dialogueWithRuby": "「うちの<ruby>営業<rt>えいぎょう</rt></ruby>が<ruby>長年<rt>ながねん</rt></ruby><ruby>使い<rt>つかい</rt></ruby><ruby>慣れ<rt>なれ</rt></ruby>たエクセル<ruby>帳票<rt>ちょうひょう</rt></ruby>と1ミリも<ruby>違わ<rt>ちがわ</rt></ruby>ないように、<ruby>画面<rt>がめん</rt></ruby>レイアウトを<ruby>徹底<rt>てってい</rt></ruby><ruby>的<rt>てき</rt></ruby>にカスタマイズしてほしいんだ。」"
    },
    {
      "id": "q_sco_04",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 21: 验收准则与完成标准 (DoD / 受入基準)",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "自社PM (自分)",
      "speakerRole": "プロジェクトマネージャー",
      "speakerAvatar": "🧑‍💻",
      "context": "在进入WMS系统受入测试（UAT）前夕，为了防止客户在验收阶段无限挑刺、导致验收期无休止拖延。",
      "dialogue": "（受入テスト工程の開始を来週に控え、テスト完了判定基準の擦り合わせを行うフェーズ）",
      "prompt": "在对日项目管理中，为了牢固锁定验收边界，项目经理最应当在事前与客户白纸黑字合意什么文档？",
      "options": [
        {
          "label": "A",
          "text": "「受入判定基準は特に決めず、顧客の担当者が『もういいよ』と満足してくれるまで延々と修正し続ける約束。」",
          "analysis": "【NG】没有明确验收终点线，项目必然滑向无尽的免费返工深渊。",
          "textWithRuby": "「<ruby>受入<rt>うけいれ</rt></ruby><ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>は<ruby>特に<rt>とくに</rt></ruby><ruby>決め<rt>きめ</rt></ruby>ず、<ruby>顧客<rt>こきゃく</rt></ruby>の<ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>が『もういいよ』と<ruby>満足<rt>まんぞく</rt></ruby>してくれるまで<ruby>延々<rt>えんえん</rt></ruby>と<ruby>修正<rt>しゅうせい</rt></ruby>し<ruby>続ける<rt>つづける</rt></ruby><ruby>約束<rt>やくそく</rt></ruby>。」"
        },
        {
          "label": "B",
          "text": "『受入完了判定基準書（合格クライテリア）』を事前に締結し、「重大欠陥（Severity 1/2）がゼロ件、軽微な表記ゆれ（Severity 3/4）が合計5件以下であり、主要シナリオテストの通過率が100%であること」等の客観的な検収合否条件を合意する。",
          "analysis": "【正解】科学的对日项目管理必修课：在UAT测试前签署『验收合格准则（Acceptance Criteria / DoD）』，用客观量化的Defect严重级别（Severity）和场景通过率作为关单结案标准，封死主观扯皮空间。",
          "textWithRuby": "『<ruby>受入<rt>うけいれ</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby><ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby><ruby>書<rt>しょ</rt></ruby>（<ruby>合格<rt>ごうかく</rt></ruby>クライテリア）』を<ruby>事前<rt>じぜん</rt></ruby>に<ruby>締結<rt>ていけつ</rt></ruby>し、「<ruby>重大<rt>じゅうだい</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>（Severity 1/2）がゼロ<ruby>件<rt>けん</rt></ruby>、<ruby>軽微<rt>けいび</rt></ruby>な<ruby>表記<rt>ひょうき</rt></ruby>ゆれ（Severity 3/4）が<ruby>合計<rt>ごうけい</rt></ruby>5<ruby>件<rt>けん</rt></ruby><ruby>以下<rt>いか</rt></ruby>であり、<ruby>主要<rt>しゅよう</rt></ruby>シナリオテストの<ruby>通過<rt>つうか</rt></ruby><ruby>率<rt>りつ</rt></ruby>が100%であること」<ruby>等<rt>とう</rt></ruby>の<ruby>客観<rt>きゃっかん</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>検収<rt>けんしゅう</rt></ruby><ruby>合否<rt>ごうひ</rt></ruby><ruby>条件<rt>じょうけん</rt></ruby>を<ruby>合意<rt>ごうい</rt></ruby>する。"
        },
        {
          "label": "C",
          "text": "「納品書を送りつければ、法律上10日後に自動検収とみなされるので何もしない。」",
          "analysis": "【NG】钻所谓法律空子搞“自动推定验收”，不仅收不到款，而且彻底断绝与该日企未来的合作可能。",
          "textWithRuby": "「<ruby>納品<rt>のうひん</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>送りつけれ<rt>おくりつけれ</rt></ruby>ば、<ruby>法律<rt>ほうりつ</rt></ruby><ruby>上<rt>じょう</rt></ruby>10<ruby>日<rt>か</rt></ruby><ruby>後<rt>ご</rt></ruby>に<ruby>自動<rt>じどう</rt></ruby><ruby>検収<rt>けんしゅう</rt></ruby>とみなされるので<ruby>何<rt>なん</rt></ruby>もしない。」"
        },
        {
          "label": "D",
          "text": "「不具合が見つかっても、見なかったことにしてサインするよう顧客担当者を接待する。」",
          "analysis": "【NG】严重违反商业伦理与合规操守。",
          "textWithRuby": "「<ruby>不<rt>ふ</rt></ruby><ruby>具合<rt>ぐあい</rt></ruby>が<ruby>見つかっ<rt>みつかっ</rt></ruby>ても、<ruby>見<rt>み</rt></ruby>なかったことにしてサインするよう<ruby>顧客<rt>こきゃく</rt></ruby><ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>を<ruby>接待<rt>せったい</rt></ruby>する。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "终结交付拉锯战的唯一盾牌：『定量的な受入完了基準（DoD: Definition of Done / 合格クライテリア）の事前合意』。按严重等级（Severity）明确合规边界。",
        "clientSubtext": "日本客户并非故意拖延不验收，而是如果事前没有客观验收标准，担当者害怕过早签字承担系统遗留隐患的连带责任。",
        "keyPhrases": [
          {
            "jp": "受入完了判定基準（合格クライテリア）",
            "zh": "验收合格判定基准书（Acceptance Criteria）",
            "jpWithRuby": "<ruby>受入<rt>うけいれ</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby><ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>（<ruby>合格<rt>ごうかく</rt></ruby>クライテリア）"
          },
          {
            "jp": "障害重要度（Severity 1: 致命的 〜 Severity 4: 軽微）",
            "zh": "缺陷严重度分级机制",
            "jpWithRuby": "<ruby>障害<rt>ずは̀んぐ は̀い</rt></ruby><ruby>重要<rt>じゅうよう</rt></ruby><ruby>度<rt>ど</rt></ruby>（Severity 1: <ruby>致命<rt>ちめい</rt></ruby><ruby>的<rt>まと</rt></ruby> 〜 Severity 4: <ruby>軽微<rt>けいび</rt></ruby>）"
          },
          {
            "jp": "検収サインオフの防衛線",
            "zh": "守护最终验收结案签章的防线",
            "jpWithRuby": "<ruby>検収<rt>けんしゅう</rt></ruby>サインオフの<ruby>防衛<rt>ぼうえい</rt></ruby><ruby>線<rt>せん</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 21: 职场诊所（受入検収の泥沼化を防ぐクライテリア設計）"
      },
      "dialogueWithRuby": "（<ruby>受入<rt>うけいれ</rt></ruby>テスト<ruby>工程<rt>こうてい</rt></ruby>の<ruby>開始<rt>かいし</rt></ruby>を<ruby>来週<rt>らいしゅう</rt></ruby>に<ruby>控え<rt>ひかえ</rt></ruby>、テスト<ruby>完了<rt>かんりょう</rt></ruby><ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>の<ruby>擦り合わせ<rt>すりあわせ</rt></ruby>を<ruby>行う<rt>おこなう</rt></ruby>フェーズ）"
    },
    {
      "id": "q_sco_05",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 12: 保守範囲外作業の有償化 (Out-of-scope Operations)",
      "sceneId": "scene-12",
      "difficulty": "高级",
      "speaker": "鈴木 運用保守マネージャー",
      "speakerRole": "情シス 運用担当",
      "speakerAvatar": "🧑‍💻",
      "context": "在签订了月度定额定常运维协议后，铃木经理频繁要求运维团队帮他们临时手写SQL提取各种营销活动统计报表，占用了大量人力。",
      "dialogue": "「ちょっと今度の役員報告で使いたいからさ、この条件でデータベースからデータを引っこ抜いてエクセルで加工してくれない？ 定常保守の契約内だよね？」",
      "prompt": "面对客户将“非定常数据抽取与业务加工”强行归入“日常定额保守”的越界行为，如何得体地划清边界并推进有偿工时结算？",
      "options": [
        {
          "label": "A",
          "text": "「契約外ですのでやりません。自分でSQLを勉強して書いてください。」",
          "analysis": "【NG】生硬回绝并嘲讽客户，情商过低，破坏日常合作气氛。",
          "textWithRuby": "「<ruby>契約<rt>けいやく</rt></ruby><ruby>外<rt>がい</rt></ruby>ですのでやりません。<ruby>自分<rt>じぶん</rt></ruby>でSQLを<ruby>勉強<rt>べんきょう</rt></ruby>して<ruby>書い<rt>かい</rt></ruby>てください。」"
        },
        {
          "label": "B",
          "text": "「鈴木様、役員報告用の重要データとのこと、承知いたしました。念のため現行の【保守運用SLA契約書】の業務範囲を確認させていただきますと、月額定額保守は『システムの死活監視・障害復旧・定型バックアップ』を対象として定義されております。今回の臨時データ抽出・加工は【非定常スポット支援（準委任有償作業）】の枠組みとなります。今月枠のチケット工数を消費して対応するか、別途見積りにて承るか、どちらがご都合よろしいでしょうか。」",
          "analysis": "【正解】有理有力有节的商务话术：先确认任务重要性 ➜ 引用正式SLA合同既定服务边界 ➜ 将诉求定性为非定常支援（有偿工时/消耗每月富余Ticket工时池） ➜ 给出两种结算选择，牢牢守住商业利益。",
          "textWithRuby": "「<ruby>鈴木<rt>すずき</rt></ruby><ruby>様<rt>さま</rt></ruby>、<ruby>役員<rt>やくいん</rt></ruby><ruby>報告<rt>ほうこく</rt></ruby><ruby>用<rt>よう</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby>データとのこと、<ruby>承知<rt>しょうち</rt></ruby>いたしました。<ruby>念<rt>ねん</rt></ruby>のため<ruby>現行<rt>げんこう</rt></ruby>の【<ruby>保守<rt>ほしゅ</rt></ruby><ruby>運用<rt>うんよう</rt></ruby>SLA<ruby>契約<rt>けいやく</rt></ruby><ruby>書<rt>しょ</rt></ruby>】の<ruby>業務<rt>ぎょうむ</rt></ruby><ruby>範囲<rt>はんい</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>させていただきますと、<ruby>月額<rt>げつがく</rt></ruby><ruby>定額<rt>ていがく</rt></ruby><ruby>保守<rt>ほしゅ</rt></ruby>は『システムの<ruby>死活<rt>しかつ</rt></ruby><ruby>監視<rt>かんし</rt></ruby>・<ruby>障害<rt>しょうがい</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby>・<ruby>定型<rt>ていけい</rt></ruby>バックアップ』を<ruby>対象<rt>たいしょう</rt></ruby>として<ruby>定義<rt>ていぎ</rt></ruby>されております。<ruby>今回<rt>こんかい</rt></ruby>の<ruby>臨時<rt>りんじ</rt></ruby>データ<ruby>抽出<rt>ちゅうしゅつ</rt></ruby>・<ruby>加工<rt>かこう</rt></ruby>は【<ruby>非<rt>ひ</rt></ruby><ruby>定常<rt>ていじょう</rt></ruby>スポット<ruby>支援<rt>しえん</rt></ruby>（<ruby>準<rt>じゅん</rt></ruby><ruby>委任<rt>いにん</rt></ruby><ruby>有償<rt>ゆうしょう</rt></ruby><ruby>作業<rt>さぎょう</rt></ruby>）】の<ruby>枠組み<rt>わくぐみ</rt></ruby>となります。<ruby>今月<rt>こんげつ</rt></ruby><ruby>枠<rt>わく</rt></ruby>のチケット<ruby>工数<rt>こうすう</rt></ruby>を<ruby>消費<rt>しょうひ</rt></ruby>して<ruby>対応<rt>たいおう</rt></ruby>するか、<ruby>別途<rt>べっと</rt></ruby><ruby>見積り<rt>みつもり</rt></ruby>にて<ruby>承る<rt>うけたまわる</rt></ruby>か、どちらがご<ruby>都合<rt>つごう</rt></ruby>よろしいでしょうか。」"
        },
        {
          "label": "C",
          "text": "「定常保守の範囲内ですので、喜んで毎晩徹夜して無料で集計いたします！」",
          "analysis": "【NG】无限赔本妥协，助长客户无节制透支乙方资源的坏习惯。",
          "textWithRuby": "「<ruby>定常<rt>ていじょう</rt></ruby><ruby>保守<rt>ほしゅ</rt></ruby>の<ruby>範囲<rt>はんい</rt></ruby><ruby>内<rt>ない</rt></ruby>ですので、<ruby>喜ん<rt>よろこん</rt></ruby>で<ruby>毎晩<rt>まいばん</rt></ruby><ruby>徹夜<rt>てつや</rt></ruby>して<ruby>無料<rt>むりょう</rt></ruby>で<ruby>集計<rt>しゅうけい</rt></ruby>いたします！」"
        },
        {
          "label": "D",
          "text": "「鈴木さんの個人的なお願いとして、内緒でデータベースを直接いじって納品します。」",
          "analysis": "【NG】违规私下操作生产数据库，严重破坏生产审计合规（J-SOX）。",
          "textWithRuby": "「<ruby>鈴木<rt>すずき</rt></ruby>さんの<ruby>個人<rt>こじん</rt></ruby><ruby>的<rt>てき</rt></ruby>なお<ruby>願い<rt>ねがい</rt></ruby>として、<ruby>内緒<rt>ないしょ</rt></ruby>でデータベースを<ruby>直接<rt>ちょくせつ</rt></ruby>いじって<ruby>納品<rt>のうひん</rt></ruby>します。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "运维范围防守法则：『契約範囲（定型監視・障害復旧）の明示 ＋ 非定常作業の定義（スポット工数/チケット消化制） ＋ 選択肢の提示』。",
        "clientSubtext": "客户往往存侥幸心理，能占便宜就占便宜。一旦你拿出白纸黑字的SLA范围并给出合理的工时结算通道，对方一般都会心服口服走正常申请流程。",
        "keyPhrases": [
          {
            "jp": "定常保守と非定常スポット支援の明確な区分",
            "zh": "明确区分日常定常运维与临时按需支持",
            "jpWithRuby": "<ruby>定常<rt>ていじょう</rt></ruby><ruby>保守<rt>ほしゅ</rt></ruby>と<ruby>非<rt>ひ</rt></ruby><ruby>定常<rt>ていじょう</rt></ruby>スポット<ruby>支援<rt>しえん</rt></ruby>の<ruby>明確<rt>めいかく</rt></ruby>な<ruby>区分<rt>くぶん</rt></ruby>"
          },
          {
            "jp": "チケット制・工数チャージ枠の消化",
            "zh": "消耗工单配额/按人月工时单独计费",
            "jpWithRuby": "チケット<ruby>制<rt>せい</rt></ruby>・<ruby>工数<rt>こうすう</rt></ruby>チャージ<ruby>枠<rt>わく</rt></ruby>の<ruby>消化<rt>しょうか</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 12: 教材核心课文第 11 轮（李：保守SLA適用範囲外リクエストの仕分け基準）"
      },
      "dialogueWithRuby": "「ちょっと<ruby>今度<rt>こんど</rt></ruby>の<ruby>役員<rt>やくいん</rt></ruby><ruby>報告<rt>ほうこく</rt></ruby>で<ruby>使い<rt>つかい</rt></ruby>たいからさ、この<ruby>条件<rt>じょうけん</rt></ruby>でデータベースからデータを<ruby>引っこ抜い<rt>ひっこぬい</rt></ruby>てエクセルで<ruby>加工<rt>かこう</rt></ruby>してくれない？ <ruby>定常<rt>ていじょう</rt></ruby><ruby>保守<rt>ほしゅ</rt></ruby>の<ruby>契約<rt>けいやく</rt></ruby><ruby>内<rt>ない</rt></ruby>だよね？」"
    },
    {
      "id": "q_sco_06",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 1: 原型法 (Prototyping) 锁定 UI 范围",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "自社SE (自分)",
      "speakerRole": "UI/UX設計担当",
      "speakerAvatar": "🧑‍💻",
      "context": "为了防止客户在前端开发完看到真实画面时频繁提出“跟我想象的完全不一样”而推倒重来，SE在要件定义阶段应当采取何种工作方法？",
      "dialogue": "（要件定義フェーズにおいて、仕様書（テキスト）だけでは画面イメージの認識ギャップが生じやすい局面）",
      "prompt": "以下哪种做法是锁定前端UI范围、消除认知分歧的国际最佳工程实践？",
      "options": [
        {
          "label": "A",
          "text": "「文字だけの分厚い要件仕様書を500ページ書いて提出し、サインをもらったからもう画面の文句は言わせないようにする。」",
          "analysis": "【NG】纯文字规格书是认知鸿沟的温床，日企高管根本没时间精读500页文字，到最后看到系统依然会掀桌子。",
          "textWithRuby": "「<ruby>文字<rt>もじ</rt></ruby>だけの<ruby>分厚い<rt>ぶあつい</rt></ruby><ruby>要件<rt>ようけん</rt></ruby><ruby>仕様<rt>しよう</rt></ruby><ruby>書<rt>しょ</rt></ruby>を500ページ<ruby>書い<rt>かい</rt></ruby>て<ruby>提出<rt>ていしゅつ</rt></ruby>し、サインをもらったからもう<ruby>画面<rt>がめん</rt></ruby>の<ruby>文句<rt>もんく</rt></ruby>は<ruby>言わ<rt>いわ</rt></ruby>せないようにする。」"
        },
        {
          "label": "B",
          "text": "「Figma等のクリック操作可能な動的モックアップ（プロトタイプ）を要件定義の早い段階で提示し、実際の業務フローに沿って画面遷移や入力フィールを体験いただいた上で、UI仕様書として合意・固定（フリーズ）する。」",
          "analysis": "【正解】极高性价比的工程实践：用可交互的Figma动效原型替代冰冷文本，让客户提早发现盲点，并在原型阶段把UI边界牢牢冻结（Freeze）。",
          "textWithRuby": "「Figma<ruby>等<rt>とう</rt></ruby>のクリック<ruby>操作<rt>そうさ</rt></ruby><ruby>可能<rt>かのう</rt></ruby>な<ruby>動的<rt>どうてき</rt></ruby>モックアップ（プロトタイプ）を<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>の<ruby>早い<rt>はやい</rt></ruby><ruby>段階<rt>だんかい</rt></ruby>で<ruby>提示<rt>ていじ</rt></ruby>し、<ruby>実際<rt>じっさい</rt></ruby>の<ruby>業務<rt>ぎょうむ</rt></ruby>フローに<ruby>沿っ<rt>そっ</rt></ruby>て<ruby>画面<rt>がめん</rt></ruby><ruby>遷移<rt>せんい</rt></ruby>や<ruby>入力<rt>にゅうりょく</rt></ruby>フィールを<ruby>体験<rt>たいけん</rt></ruby>いただいた<ruby>上<rt>うえ</rt></ruby>で、UI<ruby>仕様<rt>しよう</rt></ruby><ruby>書<rt>しょ</rt></ruby>として<ruby>合意<rt>ごうい</rt></ruby>・<ruby>固定<rt>こてい</rt></ruby>（フリーズ）する。」"
        },
        {
          "label": "C",
          "text": "「画面の見た目は開発者のセンスに任せて、納品日まで一切顧客には画面を見せない。」",
          "analysis": "【NG】开盲盒式交付，是软件工程最大的禁忌。",
          "textWithRuby": "「<ruby>画面<rt>がめん</rt></ruby>の<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>は<ruby>開発<rt>かいはつ</rt></ruby><ruby>者<rt>しゃ</rt></ruby>のセンスに<ruby>任せ<rt>まかせ</rt></ruby>て、<ruby>納品<rt>のうひん</rt></ruby><ruby>日<rt>ひ</rt></ruby>まで<ruby>一切<rt>いっさい</rt></ruby><ruby>顧客<rt>こきゃく</rt></ruby>には<ruby>画面<rt>がめん</rt></ruby>を<ruby>見せ<rt>みせ</rt></ruby>ない。」"
        },
        {
          "label": "D",
          "text": "「顧客にHTMLとCSSのコードを直接書いてもらい、そのまま画面に組み込む。」",
          "analysis": "【NG】荒诞脱离现实。",
          "textWithRuby": "「<ruby>顧客<rt>こきゃく</rt></ruby>にHTMLとCSSのコードを<ruby>直接<rt>ちょくせつ</rt></ruby><ruby>書い<rt>かい</rt></ruby>てもらい、そのまま<ruby>画面<rt>がめん</rt></ruby>に<ruby>組み込む<rt>くみこむ</rt></ruby>。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "前端范围锁定利器：『動的プロトタイピング（Figma） ＋ 早期受入ウォークスルー ＋ UIフリーズ合意』。百闻不如一见，极大降低后期返工代价。",
        "clientSubtext": "客户业务人员对抽象的数据库字段没感觉，但一看到可点击的界面，立刻能本能地判断出“这个按钮顺不顺手”。在低成本的原型期解决问题是第一原则。",
        "keyPhrases": [
          {
            "jp": "クリック可能な動的プロトタイプ（モックアップ）",
            "zh": "可点击交互的动态原型（Mockup）",
            "jpWithRuby": "クリック<ruby>可能<rt>かのう</rt></ruby>な<ruby>動的<rt>どうてき</rt></ruby>プロトタイプ（モックアップ）"
          },
          {
            "jp": "UI仕様の早期フリーズ（合意固定）",
            "zh": "早期冻结锁定UI界面交互规格",
            "jpWithRuby": "UI<ruby>仕様<rt>しよう</rt></ruby>の<ruby>早期<rt>そうき</rt></ruby>フリーズ（<ruby>合意<rt>ごうい</rt></ruby><ruby>固定<rt>こてい</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 8 轮（李：プロトタイプを用いた認識合わせ手法）"
      },
      "dialogueWithRuby": "（<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>フェーズにおいて、<ruby>仕様<rt>しよう</rt></ruby><ruby>書<rt>しょ</rt></ruby>（テキスト）だけでは<ruby>画面<rt>がめん</rt></ruby>イメージの<ruby>認識<rt>にんしき</rt></ruby>ギャップが<ruby>生じ<rt>しょうじ</rt></ruby>やすい<ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_sco_07",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 11: 外部系统联调责任分界 (Demarcation Point)",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "情シス課長",
      "speakerAvatar": "🧑‍💻",
      "context": "CS系统需要和客户原有的第三方呼叫中心CTI电话交换机对接，但对方提供商态度消极且经常推诿。",
      "dialogue": "「CTI業者とのAPI連携が遅れているようだけど、李さんのチームでCTI側のプログラムも全部調査して直しておいてくれない？」",
      "prompt": "面对客户越过责任分界线、要求乙方直接修改第三方商业软件代码的要求，SE如何得体地守护责任分界点（Demarcation Point）？",
      "options": [
        {
          "label": "A",
          "text": "「CTI業者が無能なのが悪いので、当方は一切何もしません。契約を切ってください。」",
          "analysis": "【NG】情绪化攻击第三方厂商，并激化矛盾让客户难堪。",
          "textWithRuby": "「CTI<ruby>業者<rt>ぎょうしゃ</rt></ruby>が<ruby>無能<rt>むのう</rt></ruby>なのが<ruby>悪い<rt>わるい</rt></ruby>ので、<ruby>当方<rt>とうほう</rt></ruby>は<ruby>一切<rt>いっさい</rt></ruby><ruby>何<rt>なん</rt></ruby>もしません。<ruby>契約<rt>けいやく</rt></ruby>を<ruby>切っ<rt>きっ</rt></ruby>てください。」"
        },
        {
          "label": "B",
          "text": "「山田課長、連携の遅延によるプロジェクトへの影響、当方でも大変危惧しております。責任分界点（デマケーションポイント）の観点から申し上げますと、サードパーティ製CTIの内部ソース改修は著作権・保守契約上当方では直接手出しいたしかねます。その代わり、当方にて【API疎通確認用のダミーテストスタブ】と【詳細なI/F不整合トレースログ】を作成いたしました。これを根拠として山田課長からCTI業者様へ正式に改修指示を出していただけるよう、技術面から全力で後方支援いたします。」",
          "analysis": "【正解】界限分明且担当十足的典范：严谨申明知识产权与合同责任分界（不可逾界越俎代庖） ➜ 主动拿出测试桩（Mock Stub）和排查日志证据 ➜ 为客户赋能，协助客户向下游厂商施压，既守住底线又展现极高价值。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>、<ruby>連携<rt>れんけい</rt></ruby>の<ruby>遅延<rt>ちえん</rt></ruby>によるプロジェクトへの<ruby>影響<rt>えいきょう</rt></ruby>、<ruby>当方<rt>とうほう</rt></ruby>でも<ruby>大変<rt>たいへん</rt></ruby><ruby>危惧<rt>きぐ</rt></ruby>しております。<ruby>責任<rt>せきにん</rt></ruby><ruby>分界<rt>ぶんかい</rt></ruby><ruby>点<rt>てん</rt></ruby>（デマケーションポイント）の<ruby>観点<rt>かんてん</rt></ruby>から<ruby>申し上げ<rt>もうしあげ</rt></ruby>ますと、サードパーティ<ruby>製<rt>せい</rt></ruby>CTIの<ruby>内部<rt>ないぶ</rt></ruby>ソース<ruby>改修<rt>かいしゅう</rt></ruby>は<ruby>著作<rt>ちょさく</rt></ruby><ruby>権<rt>けん</rt></ruby>・<ruby>保守<rt>ほしゅ</rt></ruby><ruby>契約<rt>けいやく</rt></ruby><ruby>上<rt>じょう</rt></ruby><ruby>当方<rt>とうほう</rt></ruby>では<ruby>直接<rt>ちょくせつ</rt></ruby><ruby>手出し<rt>てだし</rt></ruby>いたしかねます。その<ruby>代わり<rt>かわり</rt></ruby>、<ruby>当方<rt>とうほう</rt></ruby>にて【API<ruby>疎通<rt>そつう</rt></ruby><ruby>確認<rt>かくにん</rt></ruby><ruby>用<rt>よう</rt></ruby>のダミーテストスタブ】と【<ruby>詳細<rt>しょうさい</rt></ruby>なI/F<ruby>不<rt>ふ</rt></ruby><ruby>整合<rt>せいごう</rt></ruby>トレースログ】を<ruby>作成<rt>さくせい</rt></ruby>いたしました。これを<ruby>根拠<rt>こんきょ</rt></ruby>として<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>からCTI<ruby>業者<rt>ぎょうしゃ</rt></ruby><ruby>様<rt>さま</rt></ruby>へ<ruby>正式<rt>せいしき</rt></ruby>に<ruby>改修<rt>かいしゅう</rt></ruby><ruby>指示<rt>しじ</rt></ruby>を<ruby>出し<rt>だし</rt></ruby>ていただけるよう、<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>面<rt>めん</rt></ruby>から<ruby>全力<rt>ぜんりょく</rt></ruby>で<ruby>後方<rt>こうほう</rt></ruby><ruby>支援<rt>しえん</rt></ruby>いたします。」"
        },
        {
          "label": "C",
          "text": "「わかりました、他社製品のリバースエンジニアリングをして勝手にハッキングして直します。」",
          "analysis": "【NG】违法侵权，触犯刑法与商业秘密保护法。",
          "textWithRuby": "「わかりました、<ruby>他社<rt>たしゃ</rt></ruby><ruby>製品<rt>せいひん</rt></ruby>のリバースエンジニアリングをして<ruby>勝手<rt>かって</rt></ruby>にハッキングして<ruby>直し<rt>なおし</rt></ruby>ます。」"
        },
        {
          "label": "D",
          "text": "「CTI連携は諦めて、電話が鳴ったら手作業で受话器を取る運用に変えましょう。」",
          "analysis": "【NG】消极退废，丧失系统集成意义。",
          "textWithRuby": "「CTI<ruby>連携<rt>れんけい</rt></ruby>は<ruby>諦め<rt>あきらめ</rt></ruby>て、<ruby>電話<rt>でんわ</rt></ruby>が<ruby>鳴っ<rt>なっ</rt></ruby>たら<ruby>手<rt>て</rt></ruby><ruby>作業<rt>さぎょう</rt></ruby>で<ruby>受<rt>うけ</rt></ruby><ruby>话器<rt></rt></ruby>を<ruby>取る<rt>とる</rt></ruby><ruby>運用<rt>うんよう</rt></ruby>に<ruby>変え<rt>かえ</rt></ruby>ましょう。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "系统集成责任分水岭：『責任分界点（デマケーション）を死守しつつ、証跡ログとスタブを提供して顧客を支援する』。既保护自己不踩第三方未授权修改的法律地雷，又体现担当。",
        "clientSubtext": "客户情统课长并不是故意为难你，而是他催不动那个积重难返的旧CTI老厂商。你给他提供详实的排错证据链，他就能拿着去狠敲对方桌子。",
        "keyPhrases": [
          {
            "jp": "責任分界点（デマケーションポイント）の遵守",
            "zh": "严格恪守系统集成与合同责任分界面",
            "jpWithRuby": "<ruby>責任<rt>せきにん</rt></ruby><ruby>分界<rt>ぶんかい</rt></ruby><ruby>点<rt>てん</rt></ruby>（デマケーションポイント）の<ruby>遵守<rt>じゅんしゅ</rt></ruby>"
          },
          {
            "jp": "ダミーテストスタブと証跡ログの提示",
            "zh": "提供联调测试桩与不可辩驳的错误日志证据",
            "jpWithRuby": "ダミーテストスタブと<ruby>証跡<rt>しょうせき</rt></ruby>ログの<ruby>提示<rt>ていじ</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 11: CS核心课文第 8 轮（李：他社CTIベンダーとの責任分界表の策定）"
      },
      "dialogueWithRuby": "「CTI<ruby>業者<rt>ぎょうしゃ</rt></ruby>とのAPI<ruby>連携<rt>れんけい</rt></ruby>が<ruby>遅れ<rt>おくれ</rt></ruby>ているようだけど、<ruby>李<rt>り</rt></ruby>さんのチームでCTI<ruby>側<rt>がわ</rt></ruby>のプログラムも<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>調査<rt>ちょうさ</rt></ruby>して<ruby>直し<rt>なおし</rt></ruby>ておいてくれない？」"
    },
    {
      "id": "q_sco_08",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 21: 试点导入 vs 全面切入 (Pilot vs Big Bang)",
      "sceneId": "scene-21",
      "difficulty": "高级",
      "speaker": "松井 センター長",
      "speakerRole": "物流統括センター長",
      "speakerAvatar": "👷‍♂️",
      "context": "客户物流高层为了尽快看到政绩，主张在下个月的一个周末将全国5大物流中心同时一刀切切换到新WMS系统（ビッグバン移行）。",
      "dialogue": "「ダラダラやっても現場が疲れるだけだから、来月末の連休で全国5拠点の倉庫を一斉に新システムに切り替え（ビッグバン）てしまおう！」",
      "prompt": "面对客户高风险的“Big Bang一刀切切换”冲动，作为负责风险管控的IT项目经理，应如何劝导其转向试点过渡（パイロット導入）？",
      "options": [
        {
          "label": "A",
          "text": "「センター長のおっしゃる通り、男らしく一発勝負で全拠点同時に行きましょう！ 万一の時は全員で腹を括りましょう！」",
          "analysis": "【NG】赌徒式盲从！物流系统涉及全社发货，一旦Big Bang上线遇到突发阻断，全国发货停摆，公司将在数天内面临数十亿日元违约罚款和品牌崩溃。",
          "textWithRuby": "「センター<ruby>長<rt>ちょう</rt></ruby>のおっしゃる<ruby>通り<rt>とおり</rt></ruby>、<ruby>男<rt>おとこ</rt></ruby>らしく<ruby>一<rt>いち</rt></ruby><ruby>発<rt>はつ</rt></ruby><ruby>勝負<rt>しょうぶ</rt></ruby>で<ruby>全<rt>ぜん</rt></ruby><ruby>拠点<rt>きょてん</rt></ruby><ruby>同時<rt>どうじ</rt></ruby>に<ruby>行き<rt>いき</rt></ruby>ましょう！ <ruby>万一<rt>まんいち</rt></ruby>の<ruby>時<rt>とき</rt></ruby>は<ruby>全員<rt>ぜんいん</rt></ruby>で<ruby>腹<rt>はら</rt></ruby>を<ruby>括り<rt>くくり</rt></ruby>ましょう！」"
        },
        {
          "label": "B",
          "text": "「迅速な展開を目指されるスピード感は大変心強く存じます。しかしながらWMSの全拠下一斉移行（ビッグバン）は、万が一初期トラブルが発生した際に全国の出荷が同時停止する致命的リスクを伴います。そこで、まずは物量が比較的安定している【地方1拠点をパイロット（先行拠点）】として1ヶ月本番運用し、現場の運用課題やマニュアルの不備を潰し込んだ上で、残り4拠点へ安全に横展開する『段階的ロールアウト』を強く推奨いたします。」",
          "analysis": "【正解】兼备战略远见与风控说服力的方案：赞赏客户的魄力 ➜ 深刻揭示Big Bang并发停运的毁灭性灾难 ➜ 提出『低风险先行试点（パイロット） ＋ SOP与问题收敛 ＋ 矩阵式安全横向展开』的标准成熟落地法。",
          "textWithRuby": "「<ruby>迅速<rt>じんそく</rt></ruby>な<ruby>展開<rt>てんかい</rt></ruby>を<ruby>目指さ<rt>めざさ</rt></ruby>れるスピード<ruby>感<rt>かん</rt></ruby>は<ruby>大変<rt>たいへん</rt></ruby><ruby>心強く<rt>こころづよく</rt></ruby><ruby>存じ<rt>ぞんじ</rt></ruby>ます。しかしながらWMSの<ruby>全<rt>ぜん</rt></ruby><ruby>拠<rt>よんどころ</rt></ruby><ruby>下<rt>した</rt></ruby><ruby>一斉<rt>いっせい</rt></ruby><ruby>移行<rt>いこう</rt></ruby>（ビッグバン）は、<ruby>万が一<rt>まんがいち</rt></ruby><ruby>初期<rt>しょき</rt></ruby>トラブルが<ruby>発生<rt>はっせい</rt></ruby>した<ruby>際<rt>さい</rt></ruby>に<ruby>全国<rt>ぜんこく</rt></ruby>の<ruby>出荷<rt>しゅっか</rt></ruby>が<ruby>同時<rt>どうじ</rt></ruby><ruby>停止<rt>ていし</rt></ruby>する<ruby>致命<rt>ちめい</rt></ruby><ruby>的<rt>てき</rt></ruby>リスクを<ruby>伴い<rt>ともない</rt></ruby>ます。そこで、まずは<ruby>物量<rt>ぶつりょう</rt></ruby>が<ruby>比較<rt>ひかく</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>安定<rt>あんてい</rt></ruby>している【<ruby>地方<rt>ちほう</rt></ruby>1<ruby>拠点<rt>きょてん</rt></ruby>をパイロット（<ruby>先行<rt>せんこう</rt></ruby><ruby>拠点<rt>きょてん</rt></ruby>）】として1<ruby>ヶ月<rt>かげつ</rt></ruby><ruby>本番<rt>ほんばん</rt></ruby><ruby>運用<rt>うんよう</rt></ruby>し、<ruby>現場<rt>げんば</rt></ruby>の<ruby>運用<rt>うんよう</rt></ruby><ruby>課題<rt>かだい</rt></ruby>やマニュアルの<ruby>不備<rt>ふび</rt></ruby>を<ruby>潰し<rt>つぶし</rt></ruby><ruby>込ん<rt>こん</rt></ruby>だ<ruby>上<rt>うえ</rt></ruby>で、<ruby>残り<rt>のこり</rt></ruby>4<ruby>拠点<rt>きょてん</rt></ruby>へ<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>横<rt>よこ</rt></ruby><ruby>展開<rt>てんかい</rt></ruby>する『<ruby>段階<rt>だんかい</rt></ruby><ruby>的<rt>てき</rt></ruby>ロールアウト』を<ruby>強く<rt>つよく</rt></ruby><ruby>推奨<rt>すいしょう</rt></ruby>いたします。」"
        },
        {
          "label": "C",
          "text": "「一斉切り替えに失敗したら当方は責任を取りませんという念書を書いてください。」",
          "analysis": "【NG】在谈判初期就推卸责任并要求客户签署免责声明，极具挑衅性。",
          "textWithRuby": "「<ruby>一斉<rt>いっせい</rt></ruby><ruby>切り替え<rt>きりかえ</rt></ruby>に<ruby>失敗<rt>しっぱい</rt></ruby>したら<ruby>当方<rt>とうほう</rt></ruby>は<ruby>責任<rt>せきにん</rt></ruby>を<ruby>取り<rt>とり</rt></ruby>ませんという<ruby>念書<rt>ねんしょ</rt></ruby>を<ruby>書い<rt>かい</rt></ruby>てください。」"
        },
        {
          "label": "D",
          "text": "「新システムへの切り替えは危険すぎるので、今後10年間は移行自体を凍結しましょう。」",
          "analysis": "【NG】消极虚无，因噎废食。",
          "textWithRuby": "「<ruby>新<rt>しん</rt></ruby>システムへの<ruby>切り替え<rt>きりかえ</rt></ruby>は<ruby>危険<rt>きけん</rt></ruby>すぎるので、<ruby>今後<rt>こんご</rt></ruby>10<ruby>年間<rt>ねんかん</rt></ruby>は<ruby>移行<rt>いこう</rt></ruby><ruby>自体<rt>じたい</rt></ruby>を<ruby>凍結<rt>とうけつ</rt></ruby>しましょう。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "上线策略博弈：『ビッグバン（Big Bang 一斉移行）の単一障害点（SPOF）リスクを説き、パイロット先行 ➜ 横展開（Roll-out）の段階的移行へ誘導する』。",
        "clientSubtext": "中心长想一网打尽是因为害怕“新旧两套系统并行太久现场人员思想混乱”。只要向他保证试点周期明确（如仅1个月）且能沉淀标准化SOP，他会乐于接受稳妥建议。",
        "keyPhrases": [
          {
            "jp": "パイロット拠点（先行実証）によるリスク最小化",
            "zh": "通过首发试点仓库实证将风险降至最低",
            "jpWithRuby": "パイロット<ruby>拠点<rt>きょてん</rt></ruby>（<ruby>先行<rt>せんこう</rt></ruby><ruby>実証<rt>じっしょう</rt></ruby>）によるリスク<ruby>最小<rt>さいしょう</rt></ruby><ruby>化<rt>か</rt></ruby>"
          },
          {
            "jp": "段階的ロールアウト（安全な横展開）",
            "zh": "分阶段多中心横向推广演进策略",
            "jpWithRuby": "<ruby>段階<rt>だんかい</rt></ruby><ruby>的<rt>てき</rt></ruby>ロールアウト（<ruby>安全<rt>あんぜん</rt></ruby>な<ruby>横<rt>よこ</rt></ruby><ruby>展開<rt>てんかい</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 21: WMS短文第 5 篇（パイロット倉庫検証と全国拠点への安全展開計画）"
      },
      "dialogueWithRuby": "「ダラダラやっても<ruby>現場<rt>げんば</rt></ruby>が<ruby>疲れる<rt>つかれる</rt></ruby>だけだから、<ruby>来月<rt>らいげつ</rt></ruby><ruby>末<rt>まつ</rt></ruby>の<ruby>連休<rt>れんきゅう</rt></ruby>で<ruby>全国<rt>ぜんこく</rt></ruby>5<ruby>拠点<rt>きょてん</rt></ruby>の<ruby>倉庫<rt>そうこ</rt></ruby>を<ruby>一斉<rt>いっせい</rt></ruby>に<ruby>新<rt>しん</rt></ruby>システムに<ruby>切り替え<rt>きりかえ</rt></ruby>（ビッグバン）てしまおう！」"
    },
    {
      "id": "q_sco_09",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 2: 报表定制的范围蔓延 (Report Scope Creep)",
      "sceneId": "scene-2",
      "difficulty": "中级",
      "speaker": "営業企画 課長",
      "speakerRole": "営業推進担当",
      "speakerAvatar": "🧑‍💼",
      "context": "在已合意的10张标准SFA报表之外，营业企划课长在验收前夕又陆续甩过来25张各个部门自己画的Excel杂乱统计表，要求全给做出来。",
      "dialogue": "「これも各支社で使っている必須のレポートなんだよね。全部で25種類あるんだけど、全部システムからボタン1つで出力できるようにしてよ。」",
      "prompt": "面对报表数量翻倍爆炸的需求蔓延，SE如何运用“通用自定义报表引擎/BI导出”解决客户痛点并遏制定制范围？",
      "options": [
        {
          "label": "A",
          "text": "「契約では10枚までとなっていますので、残りの25枚は絶対に作りません。」",
          "analysis": "【NG】生硬冷冰冰拒绝，未能解决客户各分公司看数查数的根本业务诉求。",
          "textWithRuby": "「<ruby>契約<rt>けいやく</rt></ruby>では10<ruby>枚<rt>まい</rt></ruby>までとなっていますので、<ruby>残り<rt>のこり</rt></ruby>の25<ruby>枚<rt>まい</rt></ruby>は<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>作り<rt>つくり</rt></ruby>ません。」"
        },
        {
          "label": "B",
          "text": "「25種類の個別帳票を1つずつ画面開発いたしますと、工数と納期が大幅に超過してしまいます。そこで、ユーザー様が画面上で抽出条件・集計軸・表示項目を自在に組み合わせられる【汎用集計・CSVエクスポート機能】を1本提供いたします。これをご活用いただくことで、25種類すべてのレポートが自由自在に出力可能となりますが、この方式はいかがでしょうか。」",
          "analysis": "【正解】化繁为简的四两拨千斤之策：不给25张死格式报表做重复硬编码，而是交付『一套通用的动态自定义查询与自由维度导出引擎』，以1个模块化解25个定制需求，既救了工期又彻底满足客户灵活性。",
          "textWithRuby": "「25<ruby>種類<rt>しゅるい</rt></ruby>の<ruby>個別<rt>こべつ</rt></ruby><ruby>帳票<rt>ちょうひょう</rt></ruby>を1つずつ<ruby>画面<rt>がめん</rt></ruby><ruby>開発<rt>かいはつ</rt></ruby>いたしますと、<ruby>工数<rt>こうすう</rt></ruby>と<ruby>納期<rt>のうき</rt></ruby>が<ruby>大幅<rt>おおはば</rt></ruby>に<ruby>超過<rt>ちょうか</rt></ruby>してしまいます。そこで、ユーザー<ruby>様<rt>さま</rt></ruby>が<ruby>画面<rt>がめん</rt></ruby><ruby>上<rt>じょう</rt></ruby>で<ruby>抽出<rt>ちゅうしゅつ</rt></ruby><ruby>条件<rt>じょうけん</rt></ruby>・<ruby>集計<rt>しゅうけい</rt></ruby><ruby>軸<rt>じく</rt></ruby>・<ruby>表示<rt>ひょうじ</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>を<ruby>自在<rt>じざい</rt></ruby>に<ruby>組み合わせ<rt>くみあわせ</rt></ruby>られる【<ruby>汎用<rt>はんよう</rt></ruby><ruby>集計<rt>しゅうけい</rt></ruby>・CSVエクスポート<ruby>機能<rt>きのう</rt></ruby>】を1<ruby>本<rt>ぽん</rt></ruby><ruby>提供<rt>ていきょう</rt></ruby>いたします。これをご<ruby>活用<rt>かつよう</rt></ruby>いただくことで、25<ruby>種類<rt>しゅるい</rt></ruby>すべてのレポートが<ruby>自由<rt>じゆう</rt></ruby><ruby>自在<rt>じざい</rt></ruby>に<ruby>出力<rt>しゅつりょく</rt></ruby><ruby>可能<rt>かのう</rt></ruby>となりますが、この<ruby>方式<rt>ほうしき</rt></ruby>はいかがでしょうか。」"
        },
        {
          "label": "C",
          "text": "「25種類全部手書きで開発しますので、追加で1000万円請求させていただきます。」",
          "analysis": "【NG】不探讨技术合理性，盲目开天价账单，会直接失去客户信任。",
          "textWithRuby": "「25<ruby>種類<rt>しゅるい</rt></ruby><ruby>全部<rt>ぜんぶ</rt></ruby><ruby>手書き<rt>てがき</rt></ruby>で<ruby>開発<rt>かいはつ</rt></ruby>しますので、<ruby>追加<rt>ついか</rt></ruby>で1000<ruby>万<rt>まん</rt></ruby><ruby>円<rt>えん</rt></ruby><ruby>請求<rt>せいきゅう</rt></ruby>させていただきます。」"
        },
        {
          "label": "D",
          "text": "「支社のレポートなんて本社の経営に関係ないので、全部無視して構いません。」",
          "analysis": "【NG】妄议客户内部管理结构，缺乏对一线分支机构的尊重。",
          "textWithRuby": "「<ruby>支社<rt>ししゃ</rt></ruby>のレポートなんて<ruby>本社<rt>ほんしゃ</rt></ruby>の<ruby>経営<rt>けいえい</rt></ruby>に<ruby>関係<rt>かんけい</rt></ruby>ないので、<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>無視<rt>むし</rt></ruby>して<ruby>構い<rt>かまい</rt></ruby>ません。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "报表膨胀解题思路：『個別帳票の量産（n本）を回避し、1本の汎用抽出・BIエクスポートエンジンへ抽象化統合する』。",
        "clientSubtext": "客户要25张报表不是真心想让你写25套代码，而是因为各个支社看数据的口径各不相同。提供灵活的自由切片导出工具，不仅工期保住了，客户满意度反而更高。",
        "keyPhrases": [
          {
            "jp": "汎用集計・カスタムレポート機能への統合",
            "zh": "整合并入通用动态聚合与自定义报表模块",
            "jpWithRuby": "<ruby>汎用<rt>はんよう</rt></ruby><ruby>集計<rt>しゅうけい</rt></ruby>・カスタムレポート<ruby>機能<rt>きのう</rt></ruby>への<ruby>統合<rt>とうごう</rt></ruby>"
          },
          {
            "jp": "帳票個別開発の工数爆発を抑止",
            "zh": "遏制报表逐一定制导致的开发工时雪崩",
            "jpWithRuby": "<ruby>帳票<rt>ちょうひょう</rt></ruby><ruby>個別<rt>こべつ</rt></ruby><ruby>開発<rt>かいはつ</rt></ruby>の<ruby>工数<rt>こうすう</rt></ruby><ruby>爆発<rt>ばくはつ</rt></ruby>を<ruby>抑止<rt>よくし</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 2: 教材核心课文第 7 轮（李：個別帳票開発から汎用データ抽出への転換提案）"
      },
      "dialogueWithRuby": "「これも<ruby>各<rt>かく</rt></ruby><ruby>支社<rt>ししゃ</rt></ruby>で<ruby>使っ<rt>つかっ</rt></ruby>ている<ruby>必須<rt>ひっす</rt></ruby>のレポートなんだよね。<ruby>全部<rt>ぜんぶ</rt></ruby>で25<ruby>種類<rt>しゅるい</rt></ruby>あるんだけど、<ruby>全部<rt>ぜんぶ</rt></ruby>システムからボタン1つで<ruby>出力<rt>しゅつりょく</rt></ruby>できるようにしてよ。」"
    },
    {
      "id": "q_sco_10",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 1: 项目复盘与未完事项转结 (Pending Items & Phase 2)",
      "sceneId": "scene-1",
      "difficulty": "高级",
      "speaker": "自社PM (自分)",
      "speakerRole": "プロジェクトマネージャー",
      "speakerAvatar": "🧑‍💻",
      "context": "Phase 1顺利上线并进入验收结案阶段，客户在会议上提到还有一些当初讨论过但未纳入本期的小愿望，想确认后续如何处理。",
      "dialogue": "（Phase 1本番稼働後の検収総括ミーティングにおいて、積み残し要望の取り扱いを明確化する局面）",
      "prompt": "在对日项目收尾结案时，如何优雅、系统地处理未入选的遗留课题（積み残し課題），确保客户安心签字？",
      "options": [
        {
          "label": "A",
          "text": "「Phase 1に入らなかった機能はすべて契約終了と同時に抹消破棄されましたので、もう二度と思い出さないでください。」",
          "analysis": "【NG】粗暴将未实现诉求描述为“抹消破弃”，态度极其恶劣，打碎客户后续持续投入的信心。",
          "textWithRuby": "「Phase 1に<ruby>入ら<rt>はいら</rt></ruby>なかった<ruby>機能<rt>きのう</rt></ruby>はすべて<ruby>契約<rt>けいやく</rt></ruby><ruby>終了<rt>しゅうりょう</rt></ruby>と<ruby>同時<rt>どうじ</rt></ruby>に<ruby>抹消<rt>まっしょう</rt></ruby><ruby>破棄<rt>はき</rt></ruby>されましたので、もう<ruby>二<rt>に</rt></ruby><ruby>度<rt>ど</rt></ruby>と<ruby>思い出さ<rt>おもいださ</rt></ruby>ないでください。」"
        },
        {
          "label": "B",
          "text": "『課題・残存要望管理表（Backlog）』として全項目を分類整理した上で、「優先度・想定工数・費用感」を明記した【次期フェーズ（Phase 2）ロードマップ提案書】を提出し、検収完了と同時に次期エンハンスメント開発へシームレスに引き継ぐ。",
          "analysis": "【正解】职业度拉满的闭环操作：将未完成项沉淀为清晰的『Backlog课题资产清单』，并顺水推舟转化为『Phase 2演进路线图方案书』，既确保本期合规检收结案，又锁定了未来的二期增量项目商机！",
          "textWithRuby": "『<ruby>課題<rt>かだい</rt></ruby>・<ruby>残存<rt>ざんぞん</rt></ruby><ruby>要望<rt>ようぼう</rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>表<rt>ひょう</rt></ruby>（Backlog）』として<ruby>全<rt>ぜん</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>を<ruby>分類<rt>ぶんるい</rt></ruby><ruby>整理<rt>せいり</rt></ruby>した<ruby>上<rt>うえ</rt></ruby>で、「<ruby>優先<rt>ゆうせん</rt></ruby><ruby>度<rt>ど</rt></ruby>・<ruby>想定<rt>そうてい</rt></ruby><ruby>工数<rt>こうすう</rt></ruby>・<ruby>費用<rt>ひよう</rt></ruby><ruby>感<rt>かん</rt></ruby>」を<ruby>明記<rt>めいき</rt></ruby>した【<ruby>次期<rt>じき</rt></ruby>フェーズ（Phase 2）ロードマップ<ruby>提案<rt>ていあん</rt></ruby><ruby>書<rt>しょ</rt></ruby>】を<ruby>提出<rt>ていしゅつ</rt></ruby>し、<ruby>検収<rt>けんしゅう</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby>と<ruby>同時<rt>どうじ</rt></ruby>に<ruby>次期<rt>じき</rt></ruby>エンハンスメント<ruby>開発<rt>かいはつ</rt></ruby>へシームレスに<ruby>引き継ぐ<rt>ひきつぐ</rt></ruby>。"
        },
        {
          "label": "C",
          "text": "「残った要望はすべて無償ボランティアで来週中に作って納品します。」",
          "analysis": "【NG】随意赠送免费开发，彻底破坏公司的商业盈利原则。",
          "textWithRuby": "「<ruby>残っ<rt>のこっ</rt></ruby>た<ruby>要望<rt>ようぼう</rt></ruby>はすべて<ruby>無償<rt>むしょう</rt></ruby>ボランティアで<ruby>来週<rt>らいしゅう</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>に<ruby>作っ<rt>つくっ</rt></ruby>て<ruby>納品<rt>のうひん</rt></ruby>します。」"
        },
        {
          "label": "D",
          "text": "「検収書さえもらえれば、残った課題なんてどうでもいいです。」",
          "analysis": "【NG】极端自私短视，断送未来合作机会。",
          "textWithRuby": "「<ruby>検収<rt>けんしゅう</rt></ruby><ruby>書<rt>しょ</rt></ruby>さえもらえれば、<ruby>残っ<rt>のこっ</rt></ruby>た<ruby>課題<rt>かだい</rt></ruby>なんてどうでもいいです。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "项目收官三部曲：『残存課題の見える化（Backlog） ＋ 検収サインオフの防衛 ＋ Phase 2ロードマップによる次期商談の創出』。将交付包袱转化为新的商业订单。",
        "clientSubtext": "客户担当也需要向他的领导汇报“虽然某些次要功能本期没做，但供应商已经做好了详尽的二期路线图”，这让他能够踏实地在验收单上签字。",
        "keyPhrases": [
          {
            "jp": "残存課題管理表（バックログ）の資産化",
            "zh": "将遗留课题清单转化为结构化Backlog资产",
            "jpWithRuby": "<ruby>残存<rt>ざんぞん</rt></ruby><ruby>課題<rt>かだい</rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>表<rt>ひょう</rt></ruby>（バックログ）の<ruby>資産<rt>しさん</rt></ruby><ruby>化<rt>か</rt></ruby>"
          },
          {
            "jp": "次期フェーズ（Phase 2）ロードマップの策定",
            "zh": "制定第二期持续演进升级路线图",
            "jpWithRuby": "<ruby>次期<rt>じき</rt></ruby>フェーズ（Phase 2）ロードマップの<ruby>策定<rt>さくてい</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 1: 职场诊所（プロジェクト終結時の課題引き継ぎと次期提案マナー）"
      },
      "dialogueWithRuby": "（Phase 1<ruby>本番<rt>ほんばん</rt></ruby><ruby>稼働<rt>かどう</rt></ruby><ruby>後<rt>ご</rt></ruby>の<ruby>検収<rt>けんしゅう</rt></ruby><ruby>総括<rt>そうかつ</rt></ruby>ミーティングにおいて、<ruby>積み残し<rt>つみのこし</rt></ruby><ruby>要望<rt>ようぼう</rt></ruby>の<ruby>取り扱い<rt>とりあつかい</rt></ruby>を<ruby>明確<rt>めいかく</rt></ruby><ruby>化<rt>か</rt></ruby>する<ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_01",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "全场景通用: 尊敬语 vs 谦让语 (自他混同NG)",
      "sceneId": "cross",
      "difficulty": "初级",
      "speaker": "自社SE (自分)",
      "speakerRole": "提案担当SE",
      "speakerAvatar": "🧑‍💻",
      "context": "在向客户高层介绍自己公司的社长或项目负责人时，或者提及自己公司的行为时。",
      "dialogue": "（クライアント役員に対して、自社の担当者や社内状況を説明する局面）",
      "prompt": "以下关于“己方与对方动作（自他区分）”的日语敬语使用中，哪一句是完全正确的？",
      "options": [
        {
          "label": "A",
          "text": "「弊社の社長がそのようにおっしゃられました。」",
          "analysis": "【NG致命敬语错误】对自家人使用尊敬语「おっしゃる/おっしゃられる」！在对日商务中，无论自己公司的社长职务多高，对外部客户而言都是“己方（ウチ）”，必须使用谦让语「申しました / 申しておりました」。",
          "textWithRuby": "「<ruby>弊社<rt>へいしゃ</rt></ruby>の<ruby>社長<rt>しゃちょう</rt></ruby>がそのようにおっしゃられました。」"
        },
        {
          "label": "B",
          "text": "「弊社の社長の李も、そのように申しておりました。」",
          "analysis": "【正解】标准的商务典范：将自社社长降格谦称，直接称呼姓氏不加职务（「社長の李」），并正确使用谦让语「申しておりました」。",
          "textWithRuby": "「<ruby>弊社<rt>へいしゃ</rt></ruby>の<ruby>社長<rt>しゃちょう</rt></ruby>の<ruby>李<rt>り</rt></ruby>も、そのように<ruby>申し<rt>もうし</rt></ruby>ておりました。」"
        },
        {
          "label": "C",
          "text": "「お客様からいただいた資料をご拝見いたしました。」",
          "analysis": "【NG二重敬语错误】「拝見する」本身已经是谦让语，前面又加上了美化语「ご」，属于错用二重敬语（「ご拝見」❌ ➜ 「拝見」⭕）。",
          "textWithRuby": "「お<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>からいただいた<ruby>資料<rt>しりょう</rt></ruby>をご<ruby>拝見<rt>はいけん</rt></ruby>いたしました。」"
        },
        {
          "label": "D",
          "text": "「私は明日、御社へいらっしゃいます。」",
          "analysis": "【NG致命错误】对自己（私）的动作使用了对方专用的尊敬语「いらっしゃる」！自己去对方公司必须使用谦让语「伺います / 参ります」。",
          "textWithRuby": "「<ruby>私<rt>わたくし</rt></ruby>は<ruby>明日<rt>あす</rt></ruby>、<ruby>御社<rt>おんしゃ</rt></ruby>へいらっしゃいます。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "商务日语绝对天条：『ウチ（自社・自社員）は徹底して謙譲語（申す・参る・拝見する）で下げ、ソト（顧客・相手方）は尊敬語（おっしゃる・いらっしゃる・ご覧になる）で立てる』。",
        "clientSubtext": "在日企商务谈判桌上，如果听到乙方对着客户称呼自己老板为“李社長がおっしゃいました”，客户会本能觉得该员工毫无商务常识和职业教养。",
        "keyPhrases": [
          {
            "jp": "身内（自社）への敬称排除（社長の〇〇）",
            "zh": "对外部谈及自社领导时直呼其名不带尊称",
            "jpWithRuby": "<ruby>身内<rt>みうち</rt></ruby>（<ruby>自社<rt>じしゃ</rt></ruby>）への<ruby>敬称<rt>けいしょう</rt></ruby><ruby>排除<rt>はいじょ</rt></ruby>（<ruby>社長<rt>しゃちょう</rt></ruby>の〇〇）"
          },
          {
            "jp": "申す（謙譲語） vs おっしゃる（尊敬語）",
            "zh": "自己说用申す，客户说用おっしゃる",
            "jpWithRuby": "<ruby>申す<rt>もうす</rt></ruby>（<ruby>謙譲<rt>けんじょう</rt></ruby><ruby>語<rt>ご</rt></ruby>） vs おっしゃる（<ruby>尊敬<rt>そんけい</rt></ruby><ruby>語<rt>ご</rt></ruby>）"
          }
        ],
        "referenceDialogue": "场景 1: 语法图鉴（ウチとソトの敬語境界線）"
      },
      "dialogueWithRuby": "（クライアント<ruby>役員<rt>やくいん</rt></ruby>に<ruby>対し<rt>たいし</rt></ruby>て、<ruby>自社<rt>じしゃ</rt></ruby>の<ruby>担当<rt>たんとう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>や<ruby>社内<rt>しゃない</rt></ruby><ruby>状況<rt>じょうきょう</rt></ruby>を<ruby>説明<rt>せつめい</rt></ruby>する<ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_02",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 1: 会议开场与缓冲语 (クッション言葉)",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "自社SE (自分)",
      "speakerRole": "ファシリテーター",
      "speakerAvatar": "🧑‍💻",
      "context": "在要件定义会议上，你想请百忙之中的对方高管抽空确认一份关键的业务流程图草案。",
      "dialogue": "（相手先の本部長や課長に対して、重要資料の事前確認をお願いする局面）",
      "prompt": "以下哪种委托确认的日语表达最为典雅得体、深得日本企业文化精髓？",
      "options": [
        {
          "label": "A",
          "text": "「この資料をチェックしてください。」",
          "analysis": "【NG】生硬的命令句型（「〜てください」），对客户和上级使用极其不礼貌。",
          "textWithRuby": "「この<ruby>資料<rt>しりょう</rt></ruby>をチェックしてください。」"
        },
        {
          "label": "B",
          "text": "「ご多忙の折、大変恐縮ではございますが、こちらの業務フロー図の草案をご高覧いただき、ご意見を賜れますと幸甚に存じます。」",
          "analysis": "【正解】最高规格的商务敬语：前置缓冲词「ご多忙の折、大変恐縮ではございますが」 ➜ 尊敬语「ご高覧いただき」 ➜ 谦逊祈请「ご意見を賜れますと幸甚に存じます」，尊崇感与优雅度无懈可击。",
          "textWithRuby": "「ご<ruby>多忙<rt>たぼう</rt></ruby>の<ruby>折<rt>おり</rt></ruby>、<ruby>大変<rt>たいへん</rt></ruby><ruby>恐縮<rt>きょうしゅく</rt></ruby>ではございますが、こちらの<ruby>業務<rt>ぎょうむ</rt></ruby>フロー<ruby>図<rt>ず</rt></ruby>の<ruby>草案<rt>そうあん</rt></ruby>をご<ruby>高覧<rt>こうらん</rt></ruby>いただき、ご<ruby>意見<rt>いけん</rt></ruby>を<ruby>賜れ<rt>たまわれ</rt></ruby>ますと<ruby>幸甚<rt>こうじん</rt></ruby>に<ruby>存じ<rt>ぞんじ</rt></ruby>ます。」"
        },
        {
          "label": "C",
          "text": "「時間があったら見ておいてね。」",
          "analysis": "【NG】朋友间的随口私语，严重失格。",
          "textWithRuby": "「<ruby>時間<rt>じかん</rt></ruby>があったら<ruby>見<rt>み</rt></ruby>ておいてね。」"
        },
        {
          "label": "D",
          "text": "「見ないと後で困りますので、早く確認することを推奨します。」",
          "analysis": "【NG】带有威胁口吻，极度失礼。",
          "textWithRuby": "「<ruby>見<rt>み</rt></ruby>ないと<ruby>後<rt>あと</rt></ruby>で<ruby>困り<rt>こまり</rt></ruby>ますので、<ruby>早く<rt>はやく</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>することを<ruby>推奨<rt>すいしょう</rt></ruby>します。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "请求对方审阅资料的黄金句式：『クッション言葉 ＋ ご高覧（ご覧）いただく ＋ 〜いただけますと幸甚に存じます』。",
        "clientSubtext": "面对高管，使用最高敬度的书面敬语展现的是对对方崇高职位与宝贵时间的至诚敬畏，能在潜移默化中赢得对方的好感与配合。",
        "keyPhrases": [
          {
            "jp": "ご高覧いただく（ご覧になるの最高敬度）",
            "zh": "恭请过目审阅",
            "jpWithRuby": "ご<ruby>高覧<rt>こうらん</rt></ruby>いただく（<ruby>ご覧<rt>ごらん</rt></ruby>になるの<ruby>最高<rt>さいこう</rt></ruby><ruby>敬<rt>けい</rt></ruby><ruby>度<rt>ど</rt></ruby>）"
          },
          {
            "jp": "ご意見を賜れますと幸甚に存じます",
            "zh": "若能蒙赐宝贵意见将不胜欣幸",
            "jpWithRuby": "ご<ruby>意見<rt>いけん</rt></ruby>を<ruby>賜れ<rt>たまわれ</rt></ruby>ますと<ruby>幸甚<rt>こうじん</rt></ruby>に<ruby>存じ<rt>ぞんじ</rt></ruby>ます"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 1 轮（李：冒頭挨拶と資料確認の依頼敬語）"
      },
      "dialogueWithRuby": "（<ruby>相手<rt>あいて</rt></ruby><ruby>先<rt>さき</rt></ruby>の<ruby>本部<rt>ほんぶ</rt></ruby><ruby>長<rt>ちょう</rt></ruby>や<ruby>課長<rt>かちょう</rt></ruby>に<ruby>対し<rt>たいし</rt></ruby>て、<ruby>重要<rt>じゅうよう</rt></ruby><ruby>資料<rt>しりょう</rt></ruby>の<ruby>事前<rt>じぜん</rt></ruby><ruby>確認<rt>かくにん</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>する<ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_03",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 11: 诚恳道歉与危机公关 (謝罪の階層)",
      "sceneId": "scene-11",
      "difficulty": "高级",
      "speaker": "自社PM (自分)",
      "speakerRole": "プロジェクト責任者",
      "speakerAvatar": "🧑‍💻",
      "context": "由于开发团队的一个配置疏漏，导致测试环境中断了2小时，耽误了客户高管的预演演示。作为项目负责人前往致歉并说明对策。",
      "dialogue": "（相手先会議室にて、障害発生の経緯説明と公式な謝罪を行う局面）",
      "prompt": "在面向日企客户的重要道歉场合，以下哪种致歉表述最为庄重沉稳、最具诚意？",
      "options": [
        {
          "label": "A",
          "text": "「ごめんなさい！ 次回から気をつけます！」",
          "analysis": "【NG】小学生级别的随性道歉（「ごめんなさい」），在商业场合使用简直不可思议，会直接引发客户暴怒。",
          "textWithRuby": "「ごめんなさい！ <ruby>次回<rt>じかい</rt></ruby>から<ruby>気<rt>き</rt></ruby>をつけます！」"
        },
        {
          "label": "B",
          "text": "「すいませんでした。でもサーバーの調子も悪かったんですよね。」",
          "analysis": "【NG】口语道歉（「すいません」）加甩锅借口（「〜も悪かったんですよね」），是日企公关灾难教科书。",
          "textWithRuby": "「すいませんでした。でもサーバーの<ruby>調子<rt>ちょうし</rt></ruby>も<ruby>悪かっ<rt>わるかっ</rt></ruby>たんですよね。」"
        },
        {
          "label": "C",
          "text": "「この度は弊社の設定不備により、貴社に多大なるご迷惑とご不便をおかけいたしましたこと、深くお詫び申し上げます。二度と同様の事態を発生させぬよう、再発防止策として設定の二重チェック体制を即日導入いたしました。」",
          "analysis": "【正解】日企危机公关致歉典范：明确指出自社责任（「弊社の設定不備により」） ➜ 最高规格诚恳致歉词（「多大なるご迷惑をおかけいたしましたこと、深くお詫び申し上げます」） ➜ 紧接着给出立竿见影的再发防止策（「即日二重チェック体制導入」），重塑信任。",
          "textWithRuby": "「この<ruby>度<rt>たび</rt></ruby>は<ruby>弊社<rt>へいしゃ</rt></ruby>の<ruby>設定<rt>せってい</rt></ruby><ruby>不備<rt>ふび</rt></ruby>により、<ruby>貴社<rt>きしゃ</rt></ruby>に<ruby>多大<rt>ただい</rt></ruby>なるご<ruby>迷惑<rt>めいわく</rt></ruby>とご<ruby>不便<rt>ふべん</rt></ruby>をおかけいたしましたこと、<ruby>深く<rt>ふかく</rt></ruby>お<ruby>詫び<rt>わび</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。<ruby>二<rt>に</rt></ruby><ruby>度<rt>ど</rt></ruby>と<ruby>同様<rt>どうよう</rt></ruby>の<ruby>事態<rt>じたい</rt></ruby>を<ruby>発生<rt>はっせい</rt></ruby>させぬよう、<ruby>再発<rt>さいはつ</rt></ruby><ruby>防止<rt>ぼうし</rt></ruby><ruby>策<rt>さく</rt></ruby>として<ruby>設定<rt>せってい</rt></ruby>の<ruby>二<rt>に</rt></ruby><ruby>重<rt>じゅう</rt></ruby>チェック<ruby>体制<rt>たいせい</rt></ruby>を<ruby>即日<rt>そくじつ</rt></ruby><ruby>導入<rt>どうにゅう</rt></ruby>いたしました。」"
        },
        {
          "label": "D",
          "text": "「申し訳ありませんが、テスト環境ですからこれくらい普通ですよね。」",
          "analysis": "【NG】极度傲慢与缺乏同理心，等同于火上浇油。",
          "textWithRuby": "「<ruby>申し訳<rt>もうしわけ</rt></ruby>ありませんが、テスト<ruby>環境<rt>かんきょう</rt></ruby>ですからこれくらい<ruby>普通<rt>ふつう</rt></ruby>ですよね。」"
        }
      ],
      "correct": 2,
      "explanation": {
        "strategy": "正规商务致歉四要素：『真摯な謝罪（深くお詫び申し上げます） ＋ 原因の客観的特定 ＋ 影響の極小化 ＋ 再発防止策（即日実施）』。",
        "clientSubtext": "日本人在面对重大过失时，看重的不仅是那句道歉，更是看你有没有端正的自省态度，以及是否把漏洞用制度（再発防止策）彻底封死。",
        "keyPhrases": [
          {
            "jp": "多大なるご迷惑とご不便をおかけいたしましたこと、深くお詫び申し上げます",
            "zh": "对给贵方造成的巨大困扰与不便致以最深刻的歉意",
            "jpWithRuby": "<ruby>多大<rt>ただい</rt></ruby>なるご<ruby>迷惑<rt>めいわく</rt></ruby>とご<ruby>不便<rt>ふべん</rt></ruby>をおかけいたしましたこと、<ruby>深く<rt>ふかく</rt></ruby>お<ruby>詫び<rt>わび</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます"
          },
          {
            "jp": "再発防止策を即日導入する",
            "zh": "即日起全面导入防止再发生对策",
            "jpWithRuby": "<ruby>再発<rt>さいはつ</rt></ruby><ruby>防止<rt>ぼうし</rt></ruby><ruby>策<rt>さく</rt></ruby>を<ruby>即日<rt>そくじつ</rt></ruby><ruby>導入<rt>どうにゅう</rt></ruby>する"
          }
        ],
        "referenceDialogue": "场景 11: 职场诊所（公式謝罪と事故報告書の書き方・言い回し）"
      },
      "dialogueWithRuby": "（<ruby>相手<rt>あいて</rt></ruby><ruby>先<rt>さき</rt></ruby><ruby>会議<rt>かいぎ</rt></ruby><ruby>室<rt>しつ</rt></ruby>にて、<ruby>障害<rt>しょうがい</rt></ruby><ruby>発生<rt>はっせい</rt></ruby>の<ruby>経緯<rt>けいい</rt></ruby><ruby>説明<rt>せつめい</rt></ruby>と<ruby>公式<rt>こうしき</rt></ruby>な<ruby>謝罪<rt>しゃざい</rt></ruby>を<ruby>行う<rt>おこなう</rt></ruby><ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_04",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 2: 委婉拒绝与垫话艺术 (角を立てない断り方)",
      "sceneId": "scene-2",
      "difficulty": "高级",
      "speaker": "自社SE (自分)",
      "speakerRole": "要件交渉SE",
      "speakerAvatar": "🧑‍💻",
      "context": "客户提出希望把明天的交付物提前到今天下班前给，但团队确实无法保质保量赶出来，必须予以婉拒。",
      "dialogue": "「明日の成果物、前倒しして今日の定時までに何とか出せないかな？」",
      "prompt": "如何用日企特有的“委婉垫话（クッション言葉）”不着痕迹地回绝，同时保持极佳的合作氛围？",
      "options": [
        {
          "label": "A",
          "text": "「無理です。今日の定時なんて絶対に間に合いません。」",
          "analysis": "【NG】粗暴直白的暴力拒绝（「無理です」），完全缺乏职场软技能。",
          "textWithRuby": "「<ruby>無理<rt>むり</rt></ruby>です。<ruby>今日<rt>きょう</rt></ruby>の<ruby>定時<rt>ていじ</rt></ruby>なんて<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>間に合い<rt>まにあい</rt></ruby>ません。」"
        },
        {
          "label": "B",
          "text": "「大変心苦しい限りではございますが、品質検証を万全に期すため、本日中のご提出はご要望に沿いかねる状況でございます。何卒ご容赦のほどお願い申し上げます。明日の午前9時一番にて確実にお届けいたします。」",
          "analysis": "【正解】教科书级婉拒金句：前置同理垫话「大変心苦しい限りではございますが」 ➜ 搬出客户最在意的理由「品質検証を万全に期すため」 ➜ 优雅拒绝句型「ご要望に沿いかねる」 ➜ 祈请包涵「何卒ご容赦のほど」 ➜ 承诺次日清晨第一优先送达（明朝一番）。",
          "textWithRuby": "「<ruby>大変<rt>たいへん</rt></ruby><ruby>心苦しい<rt>こころぐるしい</rt></ruby><ruby>限り<rt>かぎり</rt></ruby>ではございますが、<ruby>品質<rt>ひんしつ</rt></ruby><ruby>検証<rt>けんしょう</rt></ruby>を<ruby>万全<rt>ばんぜん</rt></ruby>に<ruby>期す<rt>きす</rt></ruby>ため、<ruby>本日<rt>ほんじつ</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>のご<ruby>提出<rt>ていしゅつ</rt></ruby>はご<ruby>要望<rt>ようぼう</rt></ruby>に<ruby>沿い<rt>そい</rt></ruby>かねる<ruby>状況<rt>じょうきょう</rt></ruby>でございます。<ruby>何卒<rt>なにとぞ</rt></ruby>ご<ruby>容赦<rt>ようしゃ</rt></ruby>のほどお<ruby>願い<rt>ねがい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。<ruby>明日<rt>あす</rt></ruby>の<ruby>午前<rt>ごぜん</rt></ruby>9<ruby>時<rt>じ</rt></ruby><ruby>一番<rt>いちばん</rt></ruby>にて<ruby>確実<rt>かくじつ</rt></ruby>にお<ruby>届け<rt>とどけ</rt></ruby>いたします。」"
        },
        {
          "label": "C",
          "text": "「残業代をいただけるなら出してもいいですよ。」",
          "analysis": "【NG】粗俗地谈钱开条件，失礼至极。",
          "textWithRuby": "「<ruby>残業<rt>ざんぎょう</rt></ruby><ruby>代<rt>だい</rt></ruby>をいただけるなら<ruby>出し<rt>だし</rt></ruby>てもいいですよ。」"
        },
        {
          "label": "D",
          "text": "「嫌です。」",
          "analysis": "【NG】儿戏式的负面言语。",
          "textWithRuby": "「<ruby>嫌<rt>いや</rt></ruby>です。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "拒绝的最高艺术在于『心苦しさを伝えるクッション言葉 ＋ 顧客の利益（品質担保）を理由にする ➜ ご要望に沿いかねる ➜ 次善の納期確約』。",
        "clientSubtext": "客户其实也知道是临时起意加急。只要你的拒绝言辞充满了真诚的遗憾与对品质的坚守，客户不仅不会生气，反而觉得你非常稳重靠谱。",
        "keyPhrases": [
          {
            "jp": "大変心苦しい限りではございますが",
            "zh": "虽然我内心感到万分过意不去/万般无奈",
            "jpWithRuby": "<ruby>大変<rt>たいへん</rt></ruby><ruby>心苦しい<rt>こころぐるしい</rt></ruby><ruby>限り<rt>かぎり</rt></ruby>ではございますが"
          },
          {
            "jp": "ご要望に沿いかねる（ご期待に添えず）",
            "zh": "请恕我方实在难以达到您的预期要求",
            "jpWithRuby": "ご<ruby>要望<rt>ようぼう</rt></ruby>に<ruby>沿い<rt>そい</rt></ruby>かねる（ご<ruby>期待<rt>きたい</rt></ruby>に<ruby>添え<rt>そえ</rt></ruby>ず）"
          }
        ],
        "referenceDialogue": "场景 2: 职场诊所（角を立てずに前倒し要望を断るクッション話法）"
      },
      "dialogueWithRuby": "「<ruby>明日<rt>あす</rt></ruby>の<ruby>成果<rt>せいか</rt></ruby><ruby>物<rt>ぶつ</rt></ruby>、<ruby>前倒し<rt>まえだおし</rt></ruby>して<ruby>今日<rt>きょう</rt></ruby>の<ruby>定時<rt>ていじ</rt></ruby>までに<ruby>何<rt>なん</rt></ruby>とか<ruby>出せ<rt>だせ</rt></ruby>ないかな？」"
    },
    {
      "id": "q_kei_05",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 1: 会议中确认对方真实意图 (認識合わせ)",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "自社SE (自分)",
      "speakerRole": "要件ヒアリング担当",
      "speakerAvatar": "🧑‍💻",
      "context": "客户讲述了一大段复杂的销售佣金计算规则，你想向客户复述并确认自己理解无误。",
      "dialogue": "（顧客からの複雑なインセンティブ計算ロジックの説明を受けた直後の復唱・確認局面）",
      "prompt": "在复述客户需求并请对方确认时，以下哪种日语确认句式最为规范专业？",
      "options": [
        {
          "label": "A",
          "text": "「私の言っていること、合っていますか？ あなたは分かりますか？」",
          "analysis": "【NG致命失礼】反问客户“你听懂了吗（あなたは分かりますか）”，甚至直呼客户为「あなた」，这是日企交际中的严重禁忌！",
          "textWithRuby": "「<ruby>私<rt>わたくし</rt></ruby>の<ruby>言っ<rt>いっ</rt></ruby>ていること、<ruby>合っ<rt>あっ</rt></ruby>ていますか？ あなたは<ruby>分かり<rt>わかり</rt></ruby>ますか？」"
        },
        {
          "label": "B",
          "text": "「ただいま伺いました内容を要約させていただきますと、〜という認識でお間違いないでしょうか。」",
          "analysis": "【正解】标准严谨的日企确认句式：谦让语「伺いました」 ➜ 梳理归纳「要約させていただきますと」 ➜ 极度谦逊的合意确认「〜という認識でお間違いないでしょうか」。",
          "textWithRuby": "「ただいま<ruby>伺い<rt>うかがい</rt></ruby>ました<ruby>内容<rt>ないよう</rt></ruby>を<ruby>要約<rt>ようやく</rt></ruby>させていただきますと、〜という<ruby>認識<rt>にんしき</rt></ruby>でお<ruby>間違い<rt>まちがい</rt></ruby>ないでしょうか。」"
        },
        {
          "label": "C",
          "text": "「あなたの説明は分かりにくいので、もう一回言ってください。」",
          "analysis": "【NG】指责客户讲得不清楚，极度无礼。",
          "textWithRuby": "「あなたの<ruby>説明<rt>せつめい</rt></ruby>は<ruby>分かり<rt>わかり</rt></ruby>にくいので、もう<ruby>一<rt>いち</rt></ruby><ruby>回<rt>かい</rt></ruby><ruby>言っ<rt>いっ</rt></ruby>てください。」"
        },
        {
          "label": "D",
          "text": "「たぶん合っていると思いますので次に行きましょう。」",
          "analysis": "【NG】轻浮敷衍，未完成闭环对齐。",
          "textWithRuby": "「たぶん<ruby>合っ<rt>あっ</rt></ruby>ていると<ruby>思い<rt>おもい</rt></ruby>ますので<ruby>次<rt>つぎ</rt></ruby>に<ruby>行き<rt>いき</rt></ruby>ましょう。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "需求核对的标准确认公式：『要約させていただきますと、〇〇という認識でお間違いないでしょうか（お間違いございませんでしょうか）』。",
        "clientSubtext": "复述并确认不仅是语言礼貌，更是需求工程中防止“理解偏差”的最有效防呆机制。客户听到这句会觉得你极为细致、严密。",
        "keyPhrases": [
          {
            "jp": "〜という認識でお間違いないでしょうか",
            "zh": "请问与贵方的认知是否存在出入？（确认核心用语）",
            "jpWithRuby": "〜という<ruby>認識<rt>にんしき</rt></ruby>でお<ruby>間違い<rt>まちがい</rt></ruby>ないでしょうか"
          },
          {
            "jp": "ただいま伺いました内容を要約しますと",
            "zh": "将方才聆听的内容做一简要归纳总结",
            "jpWithRuby": "ただいま<ruby>伺い<rt>うかがい</rt></ruby>ました<ruby>内容<rt>ないよう</rt></ruby>を<ruby>要約<rt>ようやく</rt></ruby>しますと"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 4 轮（李：要約復唱と認識確認の定型句）"
      },
      "dialogueWithRuby": "（<ruby>顧客<rt>こきゃく</rt></ruby>からの<ruby>複雑<rt>ふくざつ</rt></ruby>なインセンティブ<ruby>計算<rt>けいさん</rt></ruby>ロジックの<ruby>説明<rt>せつめい</rt></ruby>を<ruby>受け<rt>うけ</rt></ruby>た<ruby>直後<rt>ちょくご</rt></ruby>の<ruby>復唱<rt>ふくしょう</rt></ruby>・<ruby>確認<rt>かくにん</rt></ruby><ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_06",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 12: 发送交付物与邮件结语 (メール結びの挨拶)",
      "sceneId": "scene-12",
      "difficulty": "初级",
      "speaker": "自社SE (自分)",
      "speakerRole": "成果物納品担当",
      "speakerAvatar": "🧑‍💻",
      "context": "在通过邮件发送本周的核心需求定义书成果物附件时，正文末尾需要写一段得体的结语。",
      "dialogue": "（要件定義書の初版ドラフトを添付してメール送信する際の結びの文面）",
      "prompt": "以下哪一种邮件末尾结语最符合对日高规格IT商务邮件标准？",
      "options": [
        {
          "label": "A",
          "text": "「じゃあよろしくね！ バイバイ！」",
          "analysis": "【NG】儿戏口语，荒谬。"
        },
        {
          "label": "B",
          "text": "「お手数をおかけいたしますが、ご査収のほど何卒よろしくお願い申し上げます。」",
          "analysis": "【正解】经典商务标准结语：前置客套「お手数をおかけいたしますが」 ➜ 查收专业词「ご査収のほど（请查阅验收附带文件）」 ➜ 庄重致礼「何卒よろしくお願い申し上げます」。",
          "textWithRuby": "「お<ruby>手数<rt>てすう</rt></ruby>をおかけいたしますが、ご<ruby>査収<rt>さしゅう</rt></ruby>のほど<ruby>何卒<rt>なにとぞ</rt></ruby>よろしくお<ruby>願い<rt>ねがい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。」"
        },
        {
          "label": "C",
          "text": "「添付したから早く見て返事ちょうだい。」",
          "analysis": "【NG】极其粗鲁的催促命令。",
          "textWithRuby": "「<ruby>添付<rt>てんぷ</rt></ruby>したから<ruby>早く<rt>はやく</rt></ruby><ruby>見<rt>み</rt></ruby>て<ruby>返事<rt>へんじ</rt></ruby>ちょうだい。」"
        },
        {
          "label": "D",
          "text": "「特に用はないですが、とりあえず送りました。」",
          "analysis": "【NG】毫无专业性的随性发言。",
          "textWithRuby": "「<ruby>特に<rt>とくに</rt></ruby><ruby>用<rt>よう</rt></ruby>はないですが、とりあえず<ruby>送り<rt>おくり</rt></ruby>ました。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "带附件邮件的标准结语词：『ご査収（ごさしゅう）のほどよろしくお願い申し上げます』。若仅为参考资料则用『ご参照』。",
        "clientSubtext": "日企每天流转上百封邮件，规范严整的结语是判定发件人是否具备成熟商业合作资质的潜意识门槛。",
        "keyPhrases": [
          {
            "jp": "ご査収のほどよろしくお願い申し上げます",
            "zh": "敬请查收附件（商务邮件标准套话）",
            "jpWithRuby": "ご<ruby>査収<rt>さしゅう</rt></ruby>のほどよろしくお<ruby>願い<rt>ねがい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます"
          },
          {
            "jp": "お手数をおかけいたしますが",
            "zh": "给您添麻烦了（常驻润滑剂）",
            "jpWithRuby": "お<ruby>手数<rt>てすう</rt></ruby>をおかけいたしますが"
          }
        ],
        "referenceDialogue": "场景 12: 实战邮件模板库（成果物提出時の送付状メール）"
      },
      "dialogueWithRuby": "（<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby><ruby>書<rt>しょ</rt></ruby>の<ruby>初版<rt>しょはん</rt></ruby>ドラフトを<ruby>添付<rt>てんぷ</rt></ruby>してメール<ruby>送信<rt>そうしん</rt></ruby>する<ruby>際<rt>さい</rt></ruby>の<ruby>結び<rt>むすび</rt></ruby>の<ruby>文面<rt>ぶんめん</rt></ruby>）"
    },
    {
      "id": "q_kei_07",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 21: 表达感谢与长期合作意愿",
      "sceneId": "scene-21",
      "difficulty": "中级",
      "speaker": "自社営業責任者",
      "speakerRole": "アカウントエグゼクティブ",
      "speakerAvatar": "👨‍💼",
      "context": "经过为期3天的物流仓库现地调研，松井中心长及全员给予了极其热情的配合。在调研总结会上致谢。",
      "dialogue": "（3日間にわたる現場倉庫ヒアリングの全日程が完了した際の総括感謝スピーチ）",
      "prompt": "以下哪种在正式会议上的答谢致辞最为真挚、高雅且符合日企商务礼法？",
      "options": [
        {
          "label": "A",
          "text": "「皆さんお疲れ様！ 結構役に立ちましたよ、ありがとう！」",
          "analysis": "【NG】「お疲れ様」「役に立ちました」是上对下的居高临下口吻，绝不能对客户使用！对客户必须表达为对方奉献与感谢。",
          "textWithRuby": "「<ruby>皆<rt>みな</rt></ruby>さんお<ruby>疲れ<rt>つかれ</rt></ruby><ruby>様<rt>さま</rt></ruby>！ <ruby>結構<rt>けっこう</rt></ruby><ruby>役<rt>やく</rt></ruby>に<ruby>立ち<rt>たち</rt></ruby>ましたよ、ありがとう！」"
        },
        {
          "label": "B",
          "text": "「センター長をはじめ現場の皆様におかれましては、通常業務でお忙しい中、格段のご高配と多大なるご協力を賜りましたこと、心より厚く御礼申し上げます。」",
          "analysis": "【正解】顶级企业公关答谢辞：抬高全员身份「皆様におかれましては」 ➜ 极尽敬辞「格段のご高配と多大なるご協力を賜りましたこと」 ➜ 最庄重的感谢表达「心より厚く御礼申し上げます」。",
          "textWithRuby": "「センター<ruby>長<rt>ちょう</rt></ruby>をはじめ<ruby>現場<rt>げんば</rt></ruby>の<ruby>皆<rt>みな</rt></ruby><ruby>様<rt>さま</rt></ruby>におかれましては、<ruby>通常<rt>つうじょう</rt></ruby><ruby>業務<rt>ぎょうむ</rt></ruby>でお<ruby>忙しい<rt>いそがしい</rt></ruby><ruby>中<rt>なか</rt></ruby>、<ruby>格段<rt>かくだん</rt></ruby>のご<ruby>高配<rt>こうはい</rt></ruby>と<ruby>多大<rt>ただい</rt></ruby>なるご<ruby>協力<rt>きょうりょく</rt></ruby>を<ruby>賜り<rt>たまわり</rt></ruby>ましたこと、<ruby>心<rt>こころ</rt></ruby>より<ruby>厚く<rt>あつく</rt></ruby><ruby>御<rt>ご</rt></ruby><ruby>礼<rt>れい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます。」"
        },
        {
          "label": "C",
          "text": "「倉庫が寒すぎて風邪をひきそうでしたが、まあ何とかなりました。」",
          "analysis": "【NG】抱怨现场环境恶劣，情商为零。",
          "textWithRuby": "「<ruby>倉庫<rt>そうこ</rt></ruby>が<ruby>寒<rt>さむ</rt></ruby>すぎて<ruby>風邪<rt>かぜ</rt></ruby>をひきそうでしたが、まあ<ruby>何<rt>なん</rt></ruby>とかなりました。」"
        },
        {
          "label": "D",
          "text": "「次はもっと早く終わらせられるように段取りを改善してくださいね。」",
          "analysis": "【NG】教训客户改进流程，极度无礼。",
          "textWithRuby": "「<ruby>次<rt>つぎ</rt></ruby>はもっと<ruby>早く<rt>はやく</rt></ruby><ruby>終わら<rt>おわら</rt></ruby>せられるように<ruby>段取り<rt>だんどり</rt></ruby>を<ruby>改善<rt>かいぜん</rt></ruby>してくださいね。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "重要答谢句式典范：『〇〇におかれましては、多大なるご協力（ご尽力）を賜り、心より厚く御礼申し上げます』。严禁对客户说「お疲れ様でした（这是上级对下级犒劳词）」或「ご苦労様でした（严厉禁语）」。",
        "clientSubtext": "现场人员在调研期间承受了额外打扰，高规格的公开致谢不仅让中心长在下属面前非常有面子，也极大地为后续系统推行打下了深厚的群众基础。",
        "keyPhrases": [
          {
            "jp": "心より厚く御礼申し上げます",
            "zh": "由衷致以最深切的谢意",
            "jpWithRuby": "<ruby>心<rt>こころ</rt></ruby>より<ruby>厚く<rt>あつく</rt></ruby><ruby>御<rt>ご</rt></ruby><ruby>礼<rt>れい</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます"
          },
          {
            "jp": "格段のご高配を賜り",
            "zh": "蒙受贵方非同寻常的关照与鼎力相助",
            "jpWithRuby": "<ruby>格段<rt>かくだん</rt></ruby>のご<ruby>高配<rt>こうはい</rt></ruby>を<ruby>賜り<rt>たまわり</rt></ruby>"
          }
        ],
        "referenceDialogue": "场景 21: WMS核心课文第 11 轮（李：現地ヒアリング完了時の公式感謝挨拶）"
      },
      "dialogueWithRuby": "（3<ruby>日間<rt>かかん</rt></ruby>にわたる<ruby>現場<rt>げんば</rt></ruby><ruby>倉庫<rt>そうこ</rt></ruby>ヒアリングの<ruby>全<rt>ぜん</rt></ruby><ruby>日程<rt>にってい</rt></ruby>が<ruby>完了<rt>かんりょう</rt></ruby>した<ruby>際<rt>さい</rt></ruby>の<ruby>総括<rt>そうかつ</rt></ruby><ruby>感謝<rt>かんしゃ</rt></ruby>スピーチ）"
    },
    {
      "id": "q_kei_08",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 2: 拜访对方公司与初次会面 (訪問マナー)",
      "sceneId": "scene-2",
      "difficulty": "初级",
      "speaker": "自社SE (自分)",
      "speakerRole": "訪問担当SE",
      "speakerAvatar": "🧑‍💻",
      "context": "初次前往位于东京丸之内的客户总部大楼，在1楼总台接待处（受付）说明来意。",
      "dialogue": "（受付の内線電話または総合カウンターにて、訪問の旨を伝える局面）",
      "prompt": "在前台说明来意时，以下哪种日语表述最为标准专业？",
      "options": [
        {
          "label": "A",
          "text": "「私、〇〇社の李だけど、山田課長と14時に会う約束だから呼んでくれる？」",
          "analysis": "【NG】流氓口吻，随意粗俗，前台会直接怀疑你的商务身份。",
          "textWithRuby": "「<ruby>私<rt>わたくし</rt></ruby>、〇〇<ruby>社<rt>しゃ</rt></ruby>の<ruby>李<rt>り</rt></ruby>だけど、<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>と14<ruby>時<rt>じ</rt></ruby>に<ruby>会う<rt>あう</rt></ruby><ruby>約束<rt>やくそく</rt></ruby>だから<ruby>呼ん<rt>よん</rt></ruby>でくれる？」"
        },
        {
          "label": "B",
          "text": "「恐れ入ります。本日14時に情報システム部の山田課長様とお約束をいただいております、〇〇株式会社の李と申します。お取り次ぎをお願いできますでしょうか。」",
          "analysis": "【正解】前台礼仪满分答卷：前置敬语「恐れ入ります」 ➜ 准确约定时间与被访人职务姓名 ➜ 报上自社全称与自己姓名（谦让「申します」） ➜ 委托转接「お取り次ぎをお願いできますでしょうか」。",
          "textWithRuby": "「<ruby>恐れ入り<rt>おそれいり</rt></ruby>ます。<ruby>本日<rt>ほんじつ</rt></ruby>14<ruby>時<rt>じ</rt></ruby>に<ruby>情報<rt>じょうほう</rt></ruby>システム<ruby>部<rt>ぶ</rt></ruby>の<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby><ruby>様<rt>さま</rt></ruby>とお<ruby>約束<rt>やくそく</rt></ruby>をいただいております、〇〇<ruby>株式<rt>かぶしき</rt></ruby><ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>李<rt>り</rt></ruby>と<ruby>申し<rt>もうし</rt></ruby>ます。お<ruby>取り次ぎ<rt>とりつぎ</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>できますでしょうか。」"
        },
        {
          "label": "C",
          "text": "「山田いますか？ 急いでいるので早く通してください。」",
          "analysis": "【NG】把客户课长直呼为「山田」，极其不敬无礼。",
          "textWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby>いますか？ <ruby>急い<rt>いそい</rt></ruby>でいるので<ruby>早く<rt>はやく</rt></ruby><ruby>通し<rt>とおし</rt></ruby>てください。」"
        },
        {
          "label": "D",
          "text": "「遊びに来ました！」",
          "analysis": "【NG】荒谬绝伦。",
          "textWithRuby": "「<ruby>遊び<rt>あそび</rt></ruby>に<ruby>来<rt>き</rt></ruby>ました！」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "前台接待来意通报模板：『〇時に〇〇部の〇〇様とお約束をいただいております、〇〇社の〇〇と申します。お取り次ぎをお願いできますでしょうか』。",
        "clientSubtext": "日企大楼的前台往往有严格的安保与访客登记体系，标准得体的自报家门是顺畅通关的第一步。",
        "keyPhrases": [
          {
            "jp": "お約束をいただいております",
            "zh": "与贵司预约在先",
            "jpWithRuby": "お<ruby>約束<rt>やくそく</rt></ruby>をいただいております"
          },
          {
            "jp": "お取り次ぎをお願いできますでしょうか",
            "zh": "劳烦您帮我转接联络一下好吗",
            "jpWithRuby": "お<ruby>取り次ぎ<rt>とりつぎ</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>できますでしょうか"
          }
        ],
        "referenceDialogue": "场景 2: 职场诊所（日系企業訪問時の受付・入室マナー）"
      },
      "dialogueWithRuby": "（<ruby>受付<rt>うけつけ</rt></ruby>の<ruby>内線<rt>ないせん</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>または<ruby>総合<rt>そうごう</rt></ruby>カウンターにて、<ruby>訪問<rt>ほうもん</rt></ruby>の<ruby>旨<rt>むね</rt></ruby>を<ruby>伝える<rt>つたえる</rt></ruby><ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_09",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 1: 会议发言插话礼仪 (口を挟むときのマナー)",
      "sceneId": "scene-1",
      "difficulty": "中级",
      "speaker": "自社SE (自分)",
      "speakerRole": "参加SE",
      "speakerAvatar": "🧑‍💻",
      "context": "在客户内部几位主管热烈讨论时，你发现关于新系统数据库架构有极为关键的事实需要补充说明，想礼貌插话切入。",
      "dialogue": "（相手方の議論が一区切りしたタイミングで、専門家として発言を切り出す局面）",
      "prompt": "在对方热烈讨论中礼貌切入发言，哪一种“插话起手式”最为绅士且不显冒犯？",
      "options": [
        {
          "label": "A",
          "text": "「ちょっとストップ！ 私の話を聞きなさい！」",
          "analysis": "【NG】命令句强行打断，粗鲁霸道，极其缺乏素养。",
          "textWithRuby": "「ちょっとストップ！ <ruby>私<rt>わたくし</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>を<ruby>聞き<rt>きき</rt></ruby>なさい！」"
        },
        {
          "label": "B",
          "text": "「白熱したご議論の最中、お話し中大変恐縮ではございますが、1点だけシステムアーキテクチャの観点から補足させていただいてもよろしいでしょうか。」",
          "analysis": "【正解】极高情商的会议插话艺术：肯定讨论的投入度「白熱したご議論の最中」 ➜ 诚挚致歉插话「大変恐縮ではございますが」 ➜ 明确发言价值与性质「システムアーキテクチャの観点から補足」 ➜ 谦逊祈请「〜させていただいてもよろしいでしょうか」。",
          "textWithRuby": "「<ruby>白熱<rt>はくねつ</rt></ruby>したご<ruby>議論<rt>ぎろん</rt></ruby>の<ruby>最中<rt>さいちゅう</rt></ruby>、お<ruby>話し<rt>はなし</rt></ruby><ruby>中<rt>ちゅう</rt></ruby><ruby>大変<rt>たいへん</rt></ruby><ruby>恐縮<rt>きょうしゅく</rt></ruby>ではございますが、1<ruby>点<rt>てん</rt></ruby>だけシステムアーキテクチャの<ruby>観点<rt>かんてん</rt></ruby>から<ruby>補足<rt>ほそく</rt></ruby>させていただいてもよろしいでしょうか。」"
        },
        {
          "label": "C",
          "text": "「皆さんの話は全部間違っているので、私が正しいことを教えてあげます。」",
          "analysis": "【NG】直接宣告所有人全错并宣称“我来教你们”，瞬间激怒全场所有人。",
          "textWithRuby": "「<ruby>皆<rt>みな</rt></ruby>さんの<ruby>話<rt>はなし</rt></ruby>は<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>間違っ<rt>まちがっ</rt></ruby>ているので、<ruby>私<rt>わたくし</rt></ruby>が<ruby>正しい<rt>ただしい</rt></ruby>ことを<ruby>教え<rt>おしえ</rt></ruby>てあげます。」"
        },
        {
          "label": "D",
          "text": "「勝手に話を進めないでください。私の意見が先です。」",
          "analysis": "【NG】极其自私无礼的打断。",
          "textWithRuby": "「<ruby>勝手<rt>かって</rt></ruby>に<ruby>話<rt>はなし</rt></ruby>を<ruby>進め<rt>すすめ</rt></ruby>ないでください。<ruby>私<rt>わたくし</rt></ruby>の<ruby>意見<rt>いけん</rt></ruby>が<ruby>先<rt>さき</rt></ruby>です。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "会议插话起手式金句：『お話し中大変恐縮ですが、〇〇の観点から1点だけ補足（ご共有）させていただいてもよろしいでしょうか』。",
        "clientSubtext": "不打断别人讲话是日本商务会议的基本礼仪（傾聴マナー）。但若有关键技术要点，带上垫话礼貌切入，不仅不会被怪罪，反而能彰显专家的控场力。",
        "keyPhrases": [
          {
            "jp": "お話し中大変恐縮ではございますが",
            "zh": "十分抱歉打断您的谈话（万能插话垫话）",
            "jpWithRuby": "お<ruby>話し<rt>はなし</rt></ruby><ruby>中<rt>ちゅう</rt></ruby><ruby>大変<rt>たいへん</rt></ruby><ruby>恐縮<rt>きょうしゅく</rt></ruby>ではございますが"
          },
          {
            "jp": "〜の観点から1点だけ補足させていただきたく",
            "zh": "想从特定角度做一点补充说明",
            "jpWithRuby": "〜の<ruby>観点<rt>かんてん</rt></ruby>から1<ruby>点<rt>てん</rt></ruby>だけ<ruby>補足<rt>ほそく</rt></ruby>させていただきたく"
          }
        ],
        "referenceDialogue": "场景 1: 教材核心课文第 2 轮（李：会議中の発言切り出しマナー）"
      },
      "dialogueWithRuby": "（<ruby>相手<rt>あいて</rt></ruby><ruby>方<rt>かた</rt></ruby>の<ruby>議論<rt>ぎろん</rt></ruby>が<ruby>一<rt>ひと</rt></ruby><ruby>区切り<rt>くぎり</rt></ruby>したタイミングで、<ruby>専門<rt>せんもん</rt></ruby><ruby>家<rt>か</rt></ruby>として<ruby>発言<rt>はつげん</rt></ruby>を<ruby>切り出す<rt>きりだす</rt></ruby><ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_kei_10",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 12: 项目圆满上线贺电与祝辞 (稼働祝辞)",
      "sceneId": "scene-12",
      "difficulty": "高级",
      "speaker": "自社エグゼクティブ",
      "speakerRole": "取締役 副社長",
      "speakerAvatar": "👨‍💼",
      "context": "经过双方长达半年的艰苦奋战，新核心系统终于顺利全线切入生产环境运行（カットオーバー）。在上线祝捷庆功宴上致贺词。",
      "dialogue": "（新システムの無事本番稼働（カットオーバー）を祝う合同祝勝会での挨拶局面）",
      "prompt": "以下哪一种祝辞表达最符合日企顶级商务伙伴间的共赢格调？",
      "options": [
        {
          "label": "A",
          "text": "「やっと終わって解放された！ もう二度とこのプロジェクトはやりたくないね！」",
          "analysis": "【NG】当众发泄怨气，把合作形容为苦役折磨，彻底砸场子。",
          "textWithRuby": "「やっと<ruby>終わっ<rt>おわっ</rt></ruby>て<ruby>解放<rt>かいほう</rt></ruby>された！ もう<ruby>二<rt>に</rt></ruby><ruby>度<rt>ど</rt></ruby>とこのプロジェクトはやりたくないね！」"
        },
        {
          "label": "B",
          "text": "「新システムの無事のカットオーバー、誠におめでとうございます。この日を迎えられましたのも、貴社プロジェクトチームの皆様の不撓不屈のリーダーシップと、両社のワンチームとしての揺るぎない絆の賜物と存じます。本稼働はゴールではなく新たな進化の始まりでございます。今後とも末永くお力添えできますよう、全力で伴走させていただきます。」",
          "analysis": "【正解】荡气回肠的殿堂级贺词：庄重祝贺「無事のカットオーバー誠におめでとうございます」 ➜ 赞扬客户领导力并强调One Team合作羁绊「ワンチームとしての揺るぎない絆の賜物」 ➜ 升华主题“上线不是终点而是新起点” ➜ 表达长期并肩作战决心「全力で伴走させていただきます」。",
          "textWithRuby": "「<ruby>新<rt>しん</rt></ruby>システムの<ruby>無事<rt>ぶじ</rt></ruby>のカットオーバー、<ruby>誠<rt>まこと</rt></ruby>におめでとうございます。この<ruby>日<rt>ひ</rt></ruby>を<ruby>迎え<rt>むかえ</rt></ruby>られましたのも、<ruby>貴社<rt>きしゃ</rt></ruby>プロジェクトチームの<ruby>皆<rt>みな</rt></ruby><ruby>様<rt>さま</rt></ruby>の<ruby>不撓<rt>ふとう</rt></ruby><ruby>不屈<rt>ふくつ</rt></ruby>のリーダーシップと、<ruby>両社<rt>りょうしゃ</rt></ruby>のワンチームとしての<ruby>揺るぎない<rt>ゆるぎない</rt></ruby><ruby>絆<rt>きずな</rt></ruby>の<ruby>賜物<rt>たまもの</rt></ruby>と<ruby>存じ<rt>ぞんじ</rt></ruby>ます。<ruby>本<rt>ほん</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>はゴールではなく<ruby>新た<rt>あらた</rt></ruby>な<ruby>進化<rt>しんか</rt></ruby>の<ruby>始まり<rt>はじまり</rt></ruby>でございます。<ruby>今後<rt>こんご</rt></ruby>とも<ruby>末<rt>すえ</rt></ruby><ruby>永く<rt>ながく</rt></ruby>お<ruby>力添え<rt>ちからぞえ</rt></ruby>できますよう、<ruby>全力<rt>ぜんりょく</rt></ruby>で<ruby>伴走<rt>ばんそう</rt></ruby>させていただきます。」"
        },
        {
          "label": "C",
          "text": "「当社の技術力が圧倒的に高かったから成功したんです。当社を崇拝してください。」",
          "analysis": "【NG】狂妄自大，独揽功劳，极具侮辱性。",
          "textWithRuby": "「<ruby>当社<rt>とうしゃ</rt></ruby>の<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>力<rt>りょく</rt></ruby>が<ruby>圧倒<rt>あっとう</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>高かっ<rt>たかかっ</rt></ruby>たから<ruby>成功<rt>せいこう</rt></ruby>したんです。<ruby>当社<rt>とうしゃ</rt></ruby>を<ruby>崇拝<rt>すうはい</rt></ruby>してください。」"
        },
        {
          "label": "D",
          "text": "「トラブルが何百個もありましたが、ギリギリ誤魔化せてラッキーでした。」",
          "analysis": "【NG】把成功归因于侥幸蒙混过关，当众自爆缺陷，缺乏起码的职业尊严。",
          "textWithRuby": "「トラブルが<ruby>何百<rt>なんびゃく</rt></ruby><ruby>個<rt>こ</rt></ruby>もありましたが、ギリギリ<ruby>誤魔化せ<rt>ごまかせ</rt></ruby>てラッキーでした。」"
        }
      ],
      "correct": 1,
      "explanation": {
        "strategy": "上线贺词四部曲：『祝賀 ＋ 顧客功績とチーム絆の称賛 ＋ ゴールではなく新スタートへの昇華 ＋ 長期伴走（パートナーシップ）の誓い』。",
        "clientSubtext": "日企高管最看重『伴走者（同舟共济的长期事业伙伴）』。这种情怀与格局拉满的致辞，不仅让庆功宴气氛达到高潮，更直接敲定了后续数年运维与二期合作的战略大单。",
        "keyPhrases": [
          {
            "jp": "無事のカットオーバー、誠におめでとうございます",
            "zh": "热烈祝贺新系统顺利投产上线",
            "jpWithRuby": "<ruby>無事<rt>ぶじ</rt></ruby>のカットオーバー、<ruby>誠<rt>まこと</rt></ruby>におめでとうございます"
          },
          {
            "jp": "ワンチームとしての揺るぎない絆の賜物",
            "zh": "正是两家公司如同一体团队般坚不可摧的羁绊结出的硕果",
            "jpWithRuby": "ワンチームとしての<ruby>揺るぎない<rt>ゆるぎない</rt></ruby><ruby>絆<rt>きずな</rt></ruby>の<ruby>賜物<rt>たまもの</rt></ruby>"
          },
          {
            "jp": "全力で伴走させていただきます",
            "zh": "我方将全力以赴为您保驾护航、长期伴跑",
            "jpWithRuby": "<ruby>全力<rt>ぜんりょく</rt></ruby>で<ruby>伴走<rt>ばんそう</rt></ruby>させていただきます"
          }
        ],
        "referenceDialogue": "场景 12: 教材核心课文第 15 轮（李：カットオーバー記念祝辞と長期伴走の約束）"
      },
      "dialogueWithRuby": "（<ruby>新<rt>しん</rt></ruby>システムの<ruby>無事<rt>ぶじ</rt></ruby><ruby>本番<rt>ほんばん</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>（カットオーバー）を<ruby>祝う<rt>いわう</rt></ruby><ruby>合同<rt>ごうどう</rt></ruby><ruby>祝勝<rt>しゅくしょう</rt></ruby><ruby>会<rt>かい</rt></ruby>での<ruby>挨拶<rt>あいさつ</rt></ruby><ruby>局面<rt>きょくめん</rt></ruby>）"
    },
    {
      "id": "q_scene18_01",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 18: 系统通用功能",
      "sceneId": "scene-18",
      "difficulty": "高级",
      "speaker": "佐藤",
      "speakerRole": "情報セキュリティ責任者 (クライアント側)",
      "speakerAvatar": "👩‍💼",
      "context": "在客户服务系统架构评审会上，客户安全负责人佐藤女士要求系统提供审计日志功能，但尚未明确记录深度与存储年限。",
      "dialogue": "「監査ログの実装をお願いしたいのですが、セキュリティ監査上、どのような方針で設計されますか？」",
      "prompt": "作为负责通用功能设计的架构师，以下哪一种回答最能体现生产级合规与技术专业度？",
      "options": [
        {
          "label": "A",
          "text": "サーバーの標準ログにすべて出力されますので、何かあった際はログファイルを検索すれば問題ございません。",
          "analysis": "【NG】典型的业余回答。普通服务器标准日志不仅没有分类与结构化索引，且直接登服务器检索严重违反安全合规要求。",
          "textWithRuby": "サーバーの<ruby>標準<rt>ひょうじゅん</rt></ruby>ログにすべて<ruby>出力<rt>しゅつりょく</rt></ruby>されますので、<ruby>何<rt>なん</rt></ruby>かあった<ruby>際<rt>さい</rt></ruby>はログファイルを<ruby>検索<rt>けんさく</rt></ruby>すれば<ruby>問題<rt>もんだい</rt></ruby>ございません。"
        },
        {
          "label": "B",
          "text": "操作ログとアクセスログの2種類に分けて実装します。いずれも暗号化して2年間保存し、ユーザーIDや日時で検索可能とします。",
          "analysis": "【正解】完美回答！清晰区分「操作」与「访问」双维度，主动满足全量暗号化与2年留存等金融/企业级合规基线，并提供可视化索引维度。",
          "textWithRuby": "<ruby>操作<rt>そうさ</rt></ruby>ログとアクセスログの2<ruby>種類<rt>しゅるい</rt></ruby>に<ruby>分け<rt>わけ</rt></ruby>て<ruby>実装<rt>じっそう</rt></ruby>します。いずれも<ruby>暗号<rt>あんごう</rt></ruby><ruby>化<rt>か</rt></ruby>して2<ruby>年間<rt>ねんかん</rt></ruby><ruby>保存<rt>ほぞん</rt></ruby>し、ユーザーIDや<ruby>日時<rt>にちじ</rt></ruby>で<ruby>検索<rt>けんさく</rt></ruby><ruby>可能<rt>かのう</rt></ruby>とします。"
        },
        {
          "label": "C",
          "text": "ストレージの容量を圧迫しますので、直近1ヶ月分のみ保持し、古いものは自動削除する方針でよろしいでしょうか。",
          "analysis": "【NG】缺乏合规常识。1个月留存无法满足任何正规安全审计标准（日企通常要求至少1-2年），会直接引起安全官强烈质疑。",
          "textWithRuby": "ストレージの<ruby>容量<rt>ようりょう</rt></ruby>を<ruby>圧迫<rt>あっぱく</rt></ruby>しますので、<ruby>直近<rt>ちょっきん</rt></ruby>1<ruby>ヶ月<rt>かげつ</rt></ruby><ruby>分<rt>ぶん</rt></ruby>のみ<ruby>保持<rt>ほじ</rt></ruby>し、<ruby>古い<rt>ふるい</rt></ruby>ものは<ruby>自動<rt>じどう</rt></ruby><ruby>削除<rt>さくじょ</rt></ruby>する<ruby>方針<rt>ほうしん</rt></ruby>でよろしいでしょうか。"
        },
        {
          "label": "D",
          "text": "ログの形式につきましては、開発チームが実装しやすいフォーマットで一任いただけますと幸いです。",
          "analysis": "【NG】以受托方自私立场（开发方便）推诿，完全无视了客户侧合规审计与事后调查检索的核心诉求。",
          "textWithRuby": "ログの<ruby>形式<rt>けいしき</rt></ruby>につきましては、<ruby>開発<rt>かいはつ</rt></ruby>チームが<ruby>実装<rt>じっそう</rt></ruby>しやすいフォーマットで<ruby>一任<rt>いちにん</rt></ruby>いただけますと<ruby>幸い<rt>さいわい</rt></ruby>です。"
        }
      ],
      "dialogueWithRuby": "「<ruby>監査<rt>かんさ</rt></ruby>ログの<ruby>実装<rt>じっそう</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>したいのですが、セキュリティ<ruby>監査<rt>かんさ</rt></ruby><ruby>上<rt>じょう</rt></ruby>、どのような<ruby>方針<rt>ほうしん</rt></ruby>で<ruby>設計<rt>せっけい</rt></ruby>されますか？」",
      "correct": 1,
      "explanation": {
        "strategy": "向日企安全主管汇报审计日志时，必须清晰区分「操作ログ（谁干了什么）」与「アクセスログ（谁何时来过）」两分类，主动锁定「加密存储」「保存2年」及「可视化索引维度」，展现金融/企业级合规基线素养。",
        "clientSubtext": "安全官核心关注合规留痕与事后追溯能力。若回答过于简单或试图自行省略日志，会直接引发客户对系统安全合规性的强烈质疑与不信任。",
        "keyPhrases": [
          {
            "jp": "操作ログとアクセスログの2種類に分けて実装します",
            "zh": "分为操作日志和访问日志两类进行实现",
            "jpWithRuby": "<ruby>操作<rt>そうさ</rt></ruby>ログとアクセスログの2<ruby>種類<rt>しゅるい</rt></ruby>に<ruby>分け<rt>わけ</rt></ruby>て<ruby>実装<rt>じっそう</rt></ruby>します"
          },
          {
            "jp": "いずれも暗号化して2年間保存いたします",
            "zh": "两类日志均加密留存2年",
            "jpWithRuby": "いずれも<ruby>暗号<rt>あんごう</rt></ruby><ruby>化<rt>か</rt></ruby>して2<ruby>年間<rt>ねんかん</rt></ruby><ruby>保存<rt>ほぞん</rt></ruby>いたします"
          }
        ],
        "referenceDialogue": "场景 18: 教材核心课文第 5 轮对话（李：続いて2つ目の監査ログ機能につきまして...）"
      }
    },
    {
      "id": "q_scene18_02",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 18: 系统通用功能",
      "sceneId": "scene-18",
      "difficulty": "中级",
      "speaker": "山田 課長",
      "speakerRole": "IT推進担当課長 (クライアント側)",
      "speakerAvatar": "📊",
      "context": "在讨论异常监控告警机制时，山田课长担心一旦出现突发故障，报警泛滥会造成现场混乱与责任推诿。",
      "dialogue": "「アラートが上がったとしても、誰が初動対応を取るのか曖昧だと、現場が混乱して放置される恐れがありませんか？」",
      "prompt": "作为系统架构师，如何回应才能打消客户对告警响应机制的担忧？",
      "options": [
        {
          "label": "A",
          "text": "関係者全員のメーリングリストに通知が飛びますので、気づいた方がどなたか対応していただければと存じます。",
          "analysis": "【NG】经典的“责任分散”反面教材。全员通知等于没人负责，日企最忌讳责任不清导致的盲目放置。",
          "textWithRuby": "<ruby>関係<rt>かんけい</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>全員<rt>ぜんいん</rt></ruby>のメーリングリストに<ruby>通知<rt>つうち</rt></ruby>が<ruby>飛び<rt>とび</rt></ruby>ますので、<ruby>気づい<rt>きづい</rt></ruby>た<ruby>方<rt>ほう</rt></ruby>がどなたか<ruby>対応<rt>たいおう</rt></ruby>していただければと<ruby>存じ<rt>ぞんじ</rt></ruby>ます。"
        },
        {
          "label": "B",
          "text": "一次通知先を運用チーム、二次を私と山田課長に設定し、重大度に応じたエスカレーションの仕組みを実装します。",
          "analysis": "【正解】完美回答！明确设立一、二级通知梯队，并引入日企极其看重的「エスカレーション（自动升级机制）」，责任严密闭环。",
          "textWithRuby": "<ruby>一<rt>いち</rt></ruby><ruby>次<rt>じ</rt></ruby><ruby>通知<rt>つうち</rt></ruby><ruby>先<rt>さき</rt></ruby>を<ruby>運用<rt>うんよう</rt></ruby>チーム、<ruby>二<rt>に</rt></ruby><ruby>次<rt>じ</rt></ruby>を<ruby>私<rt>わたくし</rt></ruby>と<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>に<ruby>設定<rt>せってい</rt></ruby>し、<ruby>重大<rt>じゅうだい</rt></ruby><ruby>度<rt>ど</rt></ruby>に<ruby>応じ<rt>おうじ</rt></ruby>たエスカレーションの<ruby>仕組み<rt>しくみ</rt></ruby>を<ruby>実装<rt>じっそう</rt></ruby>します。"
        },
        {
          "label": "C",
          "text": "システムのエラー率は極めて低く抑えられますので、アラートが発報する事態そのものがまず発生いたしません。",
          "analysis": "【NG】毫无敬畏之心的主观打包票。任何生产系统都无法避免异常，回避应急机制只会暴露缺乏生产经验。",
          "textWithRuby": "システムのエラー<ruby>率<rt>りつ</rt></ruby>は<ruby>極めて<rt>きわめて</rt></ruby><ruby>低く<rt>ひくく</rt></ruby><ruby>抑え<rt>おさえ</rt></ruby>られますので、アラートが<ruby>発<rt>はつ</rt></ruby><ruby>報<rt>ほう</rt></ruby>する<ruby>事態<rt>じたい</rt></ruby>そのものがまず<ruby>発生<rt>はっせい</rt></ruby>いたしません。"
        },
        {
          "label": "D",
          "text": "アラートの通知設定は複雑ですので、まずはメール送信のみにとどめ、運用開始後に調整いたしましょう。",
          "analysis": "【NG】敷衍退缩。将关键的责任链路推卸到上线之后，无法通过前期的通用功能评审。",
          "textWithRuby": "アラートの<ruby>通知<rt>つうち</rt></ruby><ruby>設定<rt>せってい</rt></ruby>は<ruby>複雑<rt>ふくざつ</rt></ruby>ですので、まずはメール<ruby>送信<rt>そうしん</rt></ruby>のみにとどめ、<ruby>運用<rt>うんよう</rt></ruby><ruby>開始<rt>かいし</rt></ruby><ruby>後<rt>ご</rt></ruby>に<ruby>調整<rt>ちょうせい</rt></ruby>いたしましょう。"
        }
      ],
      "dialogueWithRuby": "「アラートが<ruby>上がっ<rt>あがっ</rt></ruby>たとしても、<ruby>誰<rt>だれ</rt></ruby>が<ruby>初動<rt>しょどう</rt></ruby><ruby>対応<rt>たいおう</rt></ruby>を<ruby>取る<rt>とる</rt></ruby>のか<ruby>曖昧<rt>あいまい</rt></ruby>だと、<ruby>現場<rt>げんば</rt></ruby>が<ruby>混乱<rt>こんらん</rt></ruby>して<ruby>放置<rt>ほうち</rt></ruby>される<ruby>恐れ<rt>おそれ</rt></ruby>がありませんか？」",
      "correct": 1,
      "explanation": {
        "strategy": "面对系统监控范围的探讨，必须展现‘指标量化（5大指标）+ 自动通知 + 多级升级机制’的立体化监控防线，给出具备落地可行性的完整运维方案。",
        "clientSubtext": "客户IT主管害怕系统上线后变成黑盒，出现故障只能靠客户一线投诉才知晓。通过多指标和主动告警升级能极大给予客户安全感。",
        "keyPhrases": [
          {
            "jp": "各種メトリクスを監視し、閾値を超えた場合にアラートを発報します",
            "zh": "监控各项指标并在超过阈值时发出告警",
            "jpWithRuby": "<ruby>各種<rt>かくしゅ</rt></ruby>メトリクスを<ruby>監視<rt>かんし</rt></ruby>し、<ruby>閾値<rt>いきち</rt></ruby>を<ruby>超え<rt>こえ</rt></ruby>た<ruby>場合<rt>ばあい</rt></ruby>にアラートを<ruby>発報<rt>はっぽう</rt></ruby>します"
          },
          {
            "jp": "重大度に応じてエスカレーションする仕組みを実装します",
            "zh": "实现根据故障重大度进行多级升级上报的机制",
            "jpWithRuby": "<ruby>重大<rt>じゅうだい</rt></ruby><ruby>度<rt>ど</rt></ruby>に<ruby>応じ<rt>おうじ</rt></ruby>てエスカレーションする<ruby>仕組み<rt>しくみ</rt></ruby>を<ruby>実装<rt>じっそう</rt></ruby>します"
          }
        ],
        "referenceDialogue": "场景 18: 教材核心课文第 9 轮对话（李：3つ目の異常監視機能につきましてご説明します...）"
      }
    },
    {
      "id": "q_scene19_01",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 19: 综合测试计划",
      "sceneId": "scene-19",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長 (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "在综合测试计划评审中，田中部长认为UAT（验收测试）只需要由业务部门抽查1-2天即可，不必耗费2周。",
      "dialogue": "「開発側で総合テストまでしっかりやってくれるなら、受け入れテストは1〜2日程度サッと確認するだけで十分じゃないですか？」",
      "prompt": "作为负责测试统筹的项目经理，如何得体且专业地向部长阐明UAT的不可替代性并守住2周窗口？",
      "options": [
        {
          "label": "A",
          "text": "契約書にUATは2週間と記載されておりますので、規定通りの日程をお守りいただく必要がございます。",
          "analysis": "【NG】冷硬的合同条款压人，极易激起客户高管反感，完全没有从客户自身业务风险的角度进行疏导。",
          "textWithRuby": "<ruby>契約<rt>けいやく</rt></ruby><ruby>書<rt>しょ</rt></ruby>にUATは2<ruby>週間<rt>しゅうかん</rt></ruby>と<ruby>記載<rt>きさい</rt></ruby>されておりますので、<ruby>規定<rt>きてい</rt></ruby><ruby>通り<rt>とおり</rt></ruby>の<ruby>日程<rt>にってい</rt></ruby>をお<ruby>守り<rt>まもり</rt></ruby>いただく<ruby>必要<rt>ひつよう</rt></ruby>がございます。"
        },
        {
          "label": "B",
          "text": "UATはお客様の実際の業務シナリオに即した最終検証であり、この合格をもって本番リリースの判断となりますので、2週間確保いただくことで業務混乱を未然に防げます。",
          "analysis": "【正解】极其专业！讲明UAT是「業務シナリオに基づく検証」与「本番リリースの判断基準」，点出这是为客户防止上线业务混乱的最后屏障。",
          "textWithRuby": "UATはお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>の<ruby>実際<rt>じっさい</rt></ruby>の<ruby>業務<rt>ぎょうむ</rt></ruby>シナリオに<ruby>即し<rt>そくし</rt></ruby>た<ruby>最終<rt>さいしゅう</rt></ruby><ruby>検証<rt>けんしょう</rt></ruby>であり、この<ruby>合格<rt>ごうかく</rt></ruby>をもって<ruby>本番<rt>ほんばん</rt></ruby>リリースの<ruby>判断<rt>はんだん</rt></ruby>となりますので、2<ruby>週間<rt>しゅうかん</rt></ruby><ruby>確保<rt>かくほ</rt></ruby>いただくことで<ruby>業務<rt>ぎょうむ</rt></ruby><ruby>混乱<rt>こんらん</rt></ruby>を<ruby>未然<rt>みぜん</rt></ruby>に<ruby>防げ<rt>ふせげ</rt></ruby>ます。"
        },
        {
          "label": "C",
          "text": "1〜2日でよろしいのでしたら開発側としては助かりますので、その短縮日程で進めましょう。",
          "analysis": "【NG】不战自溃的失职妥协。一旦未测透就盲目上线导致生产故障，受托方将承担无法推卸的惨重责任。",
          "textWithRuby": "1〜2<ruby>日<rt>か</rt></ruby>でよろしいのでしたら<ruby>開発<rt>かいはつ</rt></ruby><ruby>側<rt>がわ</rt></ruby>としては<ruby>助かり<rt>たすかり</rt></ruby>ますので、その<ruby>短縮<rt>たんしゅく</rt></ruby><ruby>日程<rt>にってい</rt></ruby>で<ruby>進め<rt>すすめ</rt></ruby>ましょう。"
        },
        {
          "label": "D",
          "text": "開発チームの作ったテストケースは技術的な検証に過ぎませんので、品質はまだ全く保証できていません。",
          "analysis": "【NG】自我否定此前的UT/IT/ST成果，不仅严重损害团队信誉，更会引发客户对系统整体质量的恐慌。",
          "textWithRuby": "<ruby>開発<rt>かいはつ</rt></ruby>チームの<ruby>作っ<rt>つくっ</rt></ruby>たテストケースは<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>検証<rt>けんしょう</rt></ruby>に<ruby>過ぎ<rt>すぎ</rt></ruby>ませんので、<ruby>品質<rt>ひんしつ</rt></ruby>はまだ<ruby>全く<rt>まったく</rt></ruby><ruby>保証<rt>ほしょう</rt></ruby>できていません。"
        }
      ],
      "dialogueWithRuby": "「<ruby>開発<rt>かいはつ</rt></ruby><ruby>側<rt>がわ</rt></ruby>で<ruby>総合<rt>そうごう</rt></ruby>テストまでしっかりやってくれるなら、<ruby>受け入れ<rt>うけいれ</rt></ruby>テストは1〜2<ruby>日<rt>か</rt></ruby><ruby>程度<rt>ていど</rt></ruby>サッと<ruby>確認<rt>かくにん</rt></ruby>するだけで<ruby>十分<rt>じゅうぶん</rt></ruby>じゃないですか？」",
      "correct": 1,
      "explanation": {
        "strategy": "阐述整体测试工程计划时，必须遵循‘整体范围总览 ➜ 各阶段分工明确 ➜ 准出基准严格量化’的结构化呈现，让非技术业务领导也能清晰理解测试把关机制。",
        "clientSubtext": "客户部长关心的是交付系统是否可靠，以及何时需要业务一线配合参与UAT。结构化的分工与量化基准能消除领导对项目延期和带病上线的焦虑。",
        "keyPhrases": [
          {
            "jp": "5種類のテストを7週間で段階的に実施いたします",
            "zh": "在7周内阶梯式推进5类测试",
            "jpWithRuby": "5<ruby>種類<rt>しゅるい</rt></ruby>のテストを7<ruby>週間<rt>しゅうかん</rt></ruby>で<ruby>段階<rt>だんかい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>実施<rt>じっし</rt></ruby>いたします"
          },
          {
            "jp": "重大欠陥0件・軽微欠陥の上限を厳格に定めております",
            "zh": "严格设定重大缺陷0件及轻微缺陷上限标准",
            "jpWithRuby": "<ruby>重大<rt>じゅうだい</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>0<ruby>件<rt>けん</rt></ruby>・<ruby>軽微<rt>けいび</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>の<ruby>上限<rt>じょうげん</rt></ruby>を<ruby>厳格<rt>げんかく</rt></ruby>に<ruby>定め<rt>さだめ</rt></ruby>ております"
          }
        ],
        "referenceDialogue": "场景 19: 教材核心课文第 1 轮对话（李：本日は総合テスト計画についてご報告いたします...）"
      }
    },
    {
      "id": "q_scene19_02",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 19: 综合测试计划",
      "sceneId": "scene-19",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "IT推進担当課長 (クライアント側)",
      "speakerAvatar": "📊",
      "context": "在讨论测试合格准出基准（Exit Criteria）时，山田课长询问UAT结束时如果仍残留几个轻微Bug该如何判定是否合格。",
      "dialogue": "「受け入れテスト終了時点で、もし軽微なバグが数件残っていた場合、リリース判定はどうなりますか？」",
      "prompt": "以下哪种答复最符合对日软件工程的成熟质量管理标准？",
      "options": [
        {
          "label": "A",
          "text": "バグが1件でも残っている限り、本番リリースは絶対に承認されません。全件改修まで延期となります。",
          "analysis": "【NG】脱离工程实际的教条主义。在复杂软件交付中，为了几个文本排版小缺陷无限延误上线是极不现实的。",
          "textWithRuby": "バグが1<ruby>件<rt>けん</rt></ruby>でも<ruby>残っ<rt>のこっ</rt></ruby>ている<ruby>限り<rt>かぎり</rt></ruby>、<ruby>本番<rt>ほんばん</rt></ruby>リリースは<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>承認<rt>しょうにん</rt></ruby>されません。<ruby>全件<rt>ぜんけん</rt></ruby><ruby>改修<rt>かいしゅう</rt></ruby>まで<ruby>延期<rt>えんき</rt></ruby>となります。"
        },
        {
          "label": "B",
          "text": "重大欠陥が0件であることに加え、残存する全ての軽微欠陥について運用回避策や次回改修などの対応方針が決定していることを合格基準とします。",
          "analysis": "【正解】教科书级的对日交付准则！区分重大与轻微，重大Bug零容忍，轻微Bug以「全件に対応方針（回避策/下次发版）が決定していること」作为合格门禁。",
          "textWithRuby": "<ruby>重大<rt>じゅうだい</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>が0<ruby>件<rt>けん</rt></ruby>であることに<ruby>加え<rt>くわえ</rt></ruby>、<ruby>残存<rt>ざんぞん</rt></ruby>する<ruby>全て<rt>すべて</rt></ruby>の<ruby>軽微<rt>けいび</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>について<ruby>運用<rt>うんよう</rt></ruby><ruby>回避<rt>かいひ</rt></ruby><ruby>策<rt>さく</rt></ruby>や<ruby>次回<rt>じかい</rt></ruby><ruby>改修<rt>かいしゅう</rt></ruby>などの<ruby>対応<rt>たいおう</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>が<ruby>決定<rt>けってい</rt></ruby>していることを<ruby>合格<rt>ごうかく</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>とします。"
        },
        {
          "label": "C",
          "text": "軽微なものでしたら業務に支障はありませんので、特に記録も残さずそのまま本番リリースして問題ありません。",
          "analysis": "【NG】放任自流。遗留缺陷即使轻微也必须有台账和合意对策，擅自忽略是对生产质量的极度不负责任。",
          "textWithRuby": "<ruby>軽微<rt>けいび</rt></ruby>なものでしたら<ruby>業務<rt>ぎょうむ</rt></ruby>に<ruby>支障<rt>ししょう</rt></ruby>はありませんので、<ruby>特に<rt>とくに</rt></ruby><ruby>記録<rt>きろく</rt></ruby>も<ruby>残さ<rt>のこさ</rt></ruby>ずそのまま<ruby>本番<rt>ほんばん</rt></ruby>リリースして<ruby>問題<rt>もんだい</rt></ruby>ありません。"
        },
        {
          "label": "D",
          "text": "判定基準はお客様にお任せしますので、田中部長のご判断に従う形とさせていただきます。",
          "analysis": "【NG】推卸专业责任。作为受托方PM，必须主动提供经过验证的工程判定标准供客户决策参考。",
          "textWithRuby": "<ruby>判定<rt>はんてい</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>はお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>にお<ruby>任せ<rt>まかせ</rt></ruby>しますので、<ruby>田中<rt>たなか</rt></ruby><ruby>部長<rt>ぶちょう</rt></ruby>のご<ruby>判断<rt>はんだん</rt></ruby>に<ruby>従う<rt>したがう</rt></ruby><ruby>形<rt>かたち</rt></ruby>とさせていただきます。"
        }
      ],
      "dialogueWithRuby": "「<ruby>受け入れ<rt>うけいれ</rt></ruby>テスト<ruby>終了<rt>しゅうりょう</rt></ruby><ruby>時点<rt>じてん</rt></ruby>で、もし<ruby>軽微<rt>けいび</rt></ruby>なバグが<ruby>数<rt>すう</rt></ruby><ruby>件<rt>けん</rt></ruby><ruby>残っ<rt>のこっ</rt></ruby>ていた<ruby>場合<rt>ばあい</rt></ruby>、リリース<ruby>判定<rt>はんてい</rt></ruby>はどうなりますか？」",
      "correct": 1,
      "explanation": {
        "strategy": "向客户阐释测试准出与环境分配时，既要保证技术严密性，又要兼顾协同礼仪。使用「配慮をお願いします」谦和地提出资源需求，同时用零重大缺陷原则保障质量信誉。",
        "clientSubtext": "客户业务负责人最怕测试走过场，上线即崩溃。通过客观严格的量化指标和有预见性的环境协同提醒，树立受托方极其严谨的工程形象。",
        "keyPhrases": [
          {
            "jp": "単体・結合は重大欠陥0件、軽微10件以下と定めております",
            "zh": "单体与结合测试设定为重大缺陷0件、轻微缺陷10件以下",
            "jpWithRuby": "<ruby>単体<rt>たんたい</rt></ruby>・<ruby>結合<rt>けつごう</rt></ruby>は<ruby>重大<rt>じゅうだい</rt></ruby><ruby>欠陥<rt>けっかん</rt></ruby>0<ruby>件<rt>けん</rt></ruby>、<ruby>軽微<rt>けいび</rt></ruby>10<ruby>件<rt>けん</rt></ruby><ruby>以下<rt>いか</rt></ruby>と<ruby>定め<rt>さだめ</rt></ruby>ております"
          },
          {
            "jp": "検証環境の配分にご配慮をお願いいたします",
            "zh": "还请贵司在测试验证环境的分配上予以关照支持",
            "jpWithRuby": "<ruby>検証<rt>けんしょう</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>の<ruby>配分<rt>はいぶん</rt></ruby>にご<ruby>配慮<rt>はいりょ</rt></ruby>をお<ruby>願い<rt>ねがい</rt></ruby>いたします"
          }
        ],
        "referenceDialogue": "场景 19: 教材核心课文第 7 轮对话（李：総合テストと性能テストが並行いたしますので...）"
      }
    },
    {
      "id": "q_scene20_01",
      "category": "pitfall",
      "categoryName": "🚫 避坑防雷",
      "sceneTag": "场景 20: 故障恢复协商",
      "sceneId": "scene-20",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長 (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "客服系统突发线上故障致使大量请求超时，你正在紧急向田中部长通报事态。",
      "dialogue": "「先ほどからシステムが重くて動かないと現場から悲鳴が上がっているぞ！一体何が起きているんだ？！」",
      "prompt": "面对焦急愤怒的客户高层，你汇报事故初动时的第一句话应当如何组织？",
      "options": [
        {
          "label": "A",
          "text": "大変申し訳ございません。本日14時32分より障害が発生しており、現在15時45分の復旧を目指し緊急対応中でございます。",
          "analysis": "【正解】完美的初动通报！先致歉沉淀情绪 ➜ 精确报出发生时间 ➜ 给出预期恢复节点，展现高度负责与掌控力。",
          "textWithRuby": "<ruby>大変<rt>たいへん</rt></ruby><ruby>申し訳<rt>もうしわけ</rt></ruby>ございません。<ruby>本日<rt>ほんじつ</rt></ruby>14<ruby>時<rt>じ</rt></ruby>32<ruby>分<rt>ふん</rt></ruby>より<ruby>障害<rt>しょうがい</rt></ruby>が<ruby>発生<rt>はっせい</rt></ruby>しており、<ruby>現在<rt>げんざい</rt></ruby>15<ruby>時<rt>じ</rt></ruby>45<ruby>分<rt>ぶん</rt></ruby>の<ruby>復旧<rt>ふっきゅう</rt></ruby>を<ruby>目指し<rt>めざし</rt></ruby><ruby>緊急<rt>きんきゅう</rt></ruby><ruby>対応<rt>たいおう</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>でございます。"
        },
        {
          "label": "B",
          "text": "クラウド事業者のサーバー障害の可能性が高いため、インフラ側の復旧をお待ちいただけますでしょうか。",
          "analysis": "【NG】大忌！在尚未确诊前把责任推给外部基础设施，既显得逃避责任，又让客户感到受托方完全失控。",
          "textWithRuby": "クラウド<ruby>事業<rt>じぎょう</rt></ruby><ruby>者<rt>しゃ</rt></ruby>のサーバー<ruby>障害<rt>しょうがい</rt></ruby>の<ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>が<ruby>高い<rt>たかい</rt></ruby>ため、インフラ<ruby>側<rt>がわ</rt></ruby>の<ruby>復旧<rt>ふっきゅう</rt></ruby>をお<ruby>待ち<rt>まち</rt></ruby>いただけますでしょうか。"
        },
        {
          "label": "C",
          "text": "今エンジニアたちに確認させていますので、分かり次第折り返しご連絡いたします。",
          "analysis": "【NG】被动空洞。没有时间、没有现状、没有预期，只会让原本就焦躁的客户更加恐慌愤怒。",
          "textWithRuby": "<ruby>今<rt>いま</rt></ruby>エンジニアたちに<ruby>確認<rt>かくにん</rt></ruby>させていますので、<ruby>分かり<rt>わかり</rt></ruby><ruby>次第<rt>しだい</rt></ruby><ruby>折り返し<rt>おりかえし</rt></ruby>ご<ruby>連絡<rt>れんらく</rt></ruby>いたします。"
        },
        {
          "label": "D",
          "text": "営業部門の使いすぎでサーバーに高負荷がかかったことが原因と考えられます。",
          "analysis": "【NG】触碰大雷！将系统故障反向扣帽子给客户业务部门，会直接引发商务信任危机并导致严重投诉。",
          "textWithRuby": "<ruby>営業<rt>えいぎょう</rt></ruby><ruby>部門<rt>ぶもん</rt></ruby>の<ruby>使い<rt>つかい</rt></ruby>すぎでサーバーに<ruby>高<rt>こう</rt></ruby><ruby>負荷<rt>ふか</rt></ruby>がかかったことが<ruby>原因<rt>げんいん</rt></ruby>と<ruby>考え<rt>かんがえ</rt></ruby>られます。"
        }
      ],
      "dialogueWithRuby": "「<ruby>先ほど<rt>さきほど</rt></ruby>からシステムが<ruby>重く<rt>おもく</rt></ruby>て<ruby>動か<rt>うごか</rt></ruby>ないと<ruby>現場<rt>げんば</rt></ruby>から<ruby>悲鳴<rt>ひめい</rt></ruby>が<ruby>上がっ<rt>あがっ</rt></ruby>ているぞ！<ruby>一体<rt>いったい</rt></ruby><ruby>何<rt>なん</rt></ruby>が<ruby>起き<rt>おき</rt></ruby>ているんだ？！」",
      "correct": 0,
      "explanation": {
        "strategy": "生产故障发生通报时，严守‘诚挚道歉 ➜ 故障事实与范围客观陈述 ➜ 核心资产安全定心丸 ➜ 当前初动处置与后续排期’四大黄金要素，绝不诿过推诿。",
        "clientSubtext": "面对线上故障，客户高层最恐惧的是业务数据损坏或无法追回，以及受托方支吾遮掩。迅速告知‘数据安然无恙’能瞬间稳住客户情绪，为技术排查争取宝贵时间。",
        "keyPhrases": [
          {
            "jp": "多大なるご迷惑をおかけし、深くお詫び申し上げます",
            "zh": "给贵司带来巨大困扰，在此深表最诚挚的歉意",
            "jpWithRuby": "<ruby>多大<rt>ただい</rt></ruby>なるご<ruby>迷惑<rt>めいわく</rt></ruby>をおかけし、<ruby>深く<rt>ふかく</rt></ruby>お<ruby>詫び<rt>わび</rt></ruby><ruby>申し上げ<rt>もうしあげ</rt></ruby>ます"
          },
          {
            "jp": "データベース上のデータの破損や消失は一切ございません",
            "zh": "数据库上的核心数据未发生任何损坏或丢失",
            "jpWithRuby": "データベース<ruby>上<rt>じょう</rt></ruby>のデータの<ruby>破損<rt>はそん</rt></ruby>や<ruby>消失<rt>しょうしつ</rt></ruby>は<ruby>一切<rt>いっさい</rt></ruby>ございません"
          }
        ],
        "referenceDialogue": "场景 20: 教材核心课文第 1 轮对话（李：本日はシステム故障について、ご報告を申し上げます...）"
      }
    },
    {
      "id": "q_scene20_02",
      "category": "objection",
      "categoryName": "🛡️ 异议化解",
      "sceneTag": "场景 20: 故障恢复协商",
      "sceneId": "scene-20",
      "difficulty": "高级",
      "speaker": "山田 課長",
      "speakerRole": "IT推進担当課長 (クライアント側)",
      "speakerAvatar": "📊",
      "context": "连接池枯竭故障经紧急重置已恢复稳定，但问题批处理仍处于停止状态。关于恢复方针，团队在讨论方案。",
      "dialogue": "「現状は安定稼働しているようですが、このまま暫定復旧で今週を乗り切るか、今夜中に恒久修正まで入れるべきか、迷っています。」",
      "prompt": "作为负责受托方技术的李，如何给出最符合客户长期利益与职业水准的建议？",
      "options": [
        {
          "label": "A",
          "text": "おっしゃる通りです。本件の重要性を踏まえますと、本日中に検証を完了させ、恒久対策を適用した上で正式復旧とする方針を推奨いたします。",
          "analysis": "【正解】顶尖顾问建议！既表达高度赞同（おっしゃる通りです），又立足业务重要性力荐今晚彻底根治，避免带病运行引发二次事故。",
          "textWithRuby": "おっしゃる<ruby>通り<rt>とおり</rt></ruby>です。<ruby>本件<rt>ほんけん</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>踏まえ<rt>ふまえ</rt></ruby>ますと、<ruby>本日<rt>ほんじつ</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>に<ruby>検証<rt>けんしょう</rt></ruby>を<ruby>完了<rt>かんりょう</rt></ruby>させ、<ruby>恒久<rt>こうきゅう</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>を<ruby>適用<rt>てきよう</rt></ruby>した<ruby>上<rt>うえ</rt></ruby>で<ruby>正式<rt>せいしき</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby>とする<ruby>方針<rt>ほうしん</rt></ruby>を<ruby>推奨<rt>すいしょう</rt></ruby>いたします。"
        },
        {
          "label": "B",
          "text": "エンジニアが疲弊しておりますので、本日は暫定復旧で打ち切り、来週ゆっくり修正する方が安全です。",
          "analysis": "【NG】站在受托方内部利益与舒适度说话，置客户生产系统的潜在隐患于不顾，极不专业。",
          "textWithRuby": "エンジニアが<ruby>疲弊<rt>ひへい</rt></ruby>しておりますので、<ruby>本日<rt>ほんじつ</rt></ruby>は<ruby>暫定<rt>ざんてい</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby>で<ruby>打ち切り<rt>うちきり</rt></ruby>、<ruby>来週<rt>らいしゅう</rt></ruby>ゆっくり<ruby>修正<rt>しゅうせい</rt></ruby>する<ruby>方<rt>ほう</rt></ruby>が<ruby>安全<rt>あんぜん</rt></ruby>です。"
        },
        {
          "label": "C",
          "text": "どちらの案でも大差ありませんので、課長のご判断にお任せいたします。",
          "analysis": "【NG】放弃专业技术人员的建议职责，做无主见的“应声虫”，无法赢得客户的技术信赖。",
          "textWithRuby": "どちらの<ruby>案<rt>あん</rt></ruby>でも<ruby>大差<rt>たいさ</rt></ruby>ありませんので、<ruby>課長<rt>かちょう</rt></ruby>のご<ruby>判断<rt>はんだん</rt></ruby>にお<ruby>任せ<rt>まかせ</rt></ruby>いたします。"
        },
        {
          "label": "D",
          "text": "バッチ処理を二度と動かさないように仕様変更してしまえば、恒久対策そのものが不要になります。",
          "analysis": "【NG】因噎废食。数据同步批处理是核心业务链路，擅自废止功能是严重的违约行为。",
          "textWithRuby": "バッチ<ruby>処理<rt>しょり</rt></ruby>を<ruby>二<rt>に</rt></ruby><ruby>度<rt>ど</rt></ruby>と<ruby>動かさ<rt>うごかさ</rt></ruby>ないように<ruby>仕様<rt>しよう</rt></ruby><ruby>変更<rt>へんこう</rt></ruby>してしまえば、<ruby>恒久<rt>こうきゅう</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>そのものが<ruby>不要<rt>ふよう</rt></ruby>になります。"
        }
      ],
      "dialogueWithRuby": "「<ruby>現状<rt>げんじょう</rt></ruby>は<ruby>安定<rt>あんてい</rt></ruby><ruby>稼働<rt>かどう</rt></ruby>しているようですが、このまま<ruby>暫定<rt>ざんてい</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby>で<ruby>今週<rt>こんしゅう</rt></ruby>を<ruby>乗り切る<rt>のりきる</rt></ruby>か、<ruby>今夜<rt>こんや</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>に<ruby>恒久<rt>こうきゅう</rt></ruby><ruby>修正<rt>しゅうせい</rt></ruby>まで<ruby>入れる<rt>いれる</rt></ruby>べきか、<ruby>迷っ<rt>まよっ</rt></ruby>ています。」",
      "correct": 0,
      "explanation": {
        "strategy": "故障恢复方案比选时，受托方不能只当传声筒让客户盲目选，而应作为专业顾问，摆明两案利弊后，从长期业务稳定和杜绝再发角度，旗帜鲜明推荐最具防守纵深的恒久方案。",
        "clientSubtext": "客户领导表面上催促尽快恢复，但更害怕刚恢复又再次崩溃而在董事会面前丧失威信。专业顾问给出定调建议，客户就能名正言顺地支持彻底治理。",
        "keyPhrases": [
          {
            "jp": "システムの重要性を踏まえますと、案2の恒久対策完了後復旧を強く推奨いたします",
            "zh": "兼顾系统的重要程度，我强烈推荐采取方案2待永久治理完成后再全面恢复",
            "jpWithRuby": "システムの<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>踏まえ<rt>ふまえ</rt></ruby>ますと、<ruby>案<rt>あん</rt></ruby>2の<ruby>恒久<rt>こうきゅう</rt></ruby><ruby>対策<rt>たいさく</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby><ruby>後<rt>ご</rt></ruby><ruby>復旧<rt>ふっきゅう</rt></ruby>を<ruby>強く<rt>つよく</rt></ruby><ruby>推奨<rt>すいしょう</rt></ruby>いたします"
          },
          {
            "jp": "再発防止を最優先に設計・検証を完遂いたします",
            "zh": "以彻底防止故障复发为最高准则完成设计与压测验证",
            "jpWithRuby": "<ruby>再発<rt>さいはつ</rt></ruby><ruby>防止<rt>ぼうし</rt></ruby>を<ruby>最<rt>さい</rt></ruby><ruby>優先<rt>ゆうせん</rt></ruby>に<ruby>設計<rt>せっけい</rt></ruby>・<ruby>検証<rt>けんしょう</rt></ruby>を<ruby>完遂<rt>かんすい</rt></ruby>いたします"
          }
        ],
        "referenceDialogue": "场景 20: 教材核心课文第 7 轮对话（李：システムの重要性と再発防止を考慮しますと...）"
      }
    },
    {
      "id": "q_scene22_01",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 22: 物流系统确认",
      "sceneId": "scene-22",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長 (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "在物流要件确认会上，田中部长突然提议：“既然能追溯车辆GPS，那能不能顺便做一个面向买家客户的手机查件界面？”",
      "dialogue": "「配送追跡のデータがあるなら、お客様自身が荷物の位置をスマホで見られる画面もついでに追加しておいてくれませんか？」",
      "prompt": "作为受托方负责人，面对客户在确认阶段提出的“顺便做个新功能”的诉求，以下哪种回应最为得体？",
      "options": [
        {
          "label": "A",
          "text": "ついでとおっしゃいますが、外部公開画面は認証やUIも全く別物ですので、そんなに簡単なものではありません。",
          "analysis": "【NG】防卫过当、言语带刺，直接否定客户的用词（「そんな簡単なものではない」），极易激化矛盾打破洽谈氛围。",
          "textWithRuby": "ついでとおっしゃいますが、<ruby>外部<rt>がいぶ</rt></ruby><ruby>公開<rt>こうかい</rt></ruby><ruby>画面<rt>がめん</rt></ruby>は<ruby>認証<rt>にんしょう</rt></ruby>やUIも<ruby>全く<rt>まったく</rt></ruby><ruby>別物<rt>べつもの</rt></ruby>ですので、そんなに<ruby>簡単<rt>かんたん</rt></ruby>なものではありません。"
        },
        {
          "label": "B",
          "text": "ご質問ありがとうございます。技術的に追加は可能です。ただし、外部向けUIとセキュリティ設計で約1人月の工数追加となりますが、いかがでしょうか。",
          "analysis": "【正解】商务谈判的典范！先肯定技术可行性以展现建设性态度，随后立即客观提出对价筹码（1人月工数），把选择权交给客户。",
          "textWithRuby": "ご<ruby>質問<rt>しつもん</rt></ruby>ありがとうございます。<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>追加<rt>ついか</rt></ruby>は<ruby>可能<rt>かのう</rt></ruby>です。ただし、<ruby>外部<rt>がいぶ</rt></ruby><ruby>向け<rt>むけ</rt></ruby>UIとセキュリティ<ruby>設計<rt>せっけい</rt></ruby>で<ruby>約<rt>やく</rt></ruby>1<ruby>人月<rt>にんげつ</rt></ruby>の<ruby>工数<rt>こうすう</rt></ruby><ruby>追加<rt>ついか</rt></ruby>となりますが、いかがでしょうか。"
        },
        {
          "label": "C",
          "text": "部長のご要望ですので喜んで無償で対応させていただきます。任せてください！",
          "analysis": "【NG】极其危险的无原则讨好。无偿增加1人月的外部画面开发，会导致项目严重超支亏损，且容易因赶工引发重大安全漏洞。",
          "textWithRuby": "<ruby>部長<rt>ぶちょう</rt></ruby>のご<ruby>要望<rt>ようぼう</rt></ruby>ですので<ruby>喜ん<rt>よろこん</rt></ruby>で<ruby>無償<rt>むしょう</rt></ruby>で<ruby>対応<rt>たいおう</rt></ruby>させていただきます。<ruby>任せ<rt>まかせ</rt></ruby>てください！"
        },
        {
          "label": "D",
          "text": "先週合意した確認書に記載がございませんので、今回は一切お受けできません。",
          "analysis": "【NG】过于死板生硬。虽然符合合同边界，但缺乏商务弹性，关死了后续追加增量预算的商业机会。",
          "textWithRuby": "<ruby>先週<rt>せんしゅう</rt></ruby><ruby>合意<rt>ごうい</rt></ruby>した<ruby>確認<rt>かくにん</rt></ruby><ruby>書<rt>しょ</rt></ruby>に<ruby>記載<rt>きさい</rt></ruby>がございませんので、<ruby>今回<rt>こんかい</rt></ruby>は<ruby>一切<rt>いっさい</rt></ruby>お<ruby>受け<rt>うけ</rt></ruby>できません。"
        }
      ],
      "dialogueWithRuby": "「<ruby>配送<rt>はいそう</rt></ruby><ruby>追跡<rt>ついせき</rt></ruby>のデータがあるなら、お<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby><ruby>自身<rt>じしん</rt></ruby>が<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>位置<rt>いち</rt></ruby>をスマホで<ruby>見<rt>み</rt></ruby>られる<ruby>画面<rt>がめん</rt></ruby>もついでに<ruby>追加<rt>ついか</rt></ruby>しておいてくれませんか？」",
      "correct": 1,
      "explanation": {
        "strategy": "需求说明时，将技术手段与商业量化价值无缝结合（如GPS数据30秒刷新、派车时间从2小时降至30分钟），体现咨询式方案能力。",
        "clientSubtext": "客户关心的是IT投入能带来何种业务降本增效，而不是生硬的技术名词。用具体时间压缩数据和用户体验提升能迅速赢得客户决策层支持。",
        "keyPhrases": [
          {
            "jp": "GPSデータを活用してリアルタイムに荷物の位置を把握します",
            "zh": "利用GPS数据实时掌握包裹在途物理位置",
            "jpWithRuby": "GPSデータを<ruby>活用<rt>かつよう</rt></ruby>してリアルタイムに<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>位置<rt>いち</rt></ruby>を<ruby>把握<rt>はあく</rt></ruby>します"
          },
          {
            "jp": "配車作業時間を2時間から30分に短縮することを目指します",
            "zh": "旨在将派车作业时间从2小时大幅缩减至30分钟",
            "jpWithRuby": "<ruby>配車<rt>はいしゃ</rt></ruby><ruby>作業<rt>さぎょう</rt></ruby><ruby>時間<rt>じかん</rt></ruby>を2<ruby>時間<rt>じかん</rt></ruby>から30<ruby>分<rt>ふん</rt></ruby>に<ruby>短縮<rt>たんしゅく</rt></ruby>することを<ruby>目指し<rt>めざし</rt></ruby>ます"
          }
        ],
        "referenceDialogue": "场景 22: 教材核心课文第 3 轮对话（李：配送追跡の可視化につきましては...）"
      }
    },
    {
      "id": "q_scene22_02",
      "category": "elicitation",
      "categoryName": "🔍 需求下钻",
      "sceneTag": "场景 22: 物流系统确认",
      "sceneId": "scene-22",
      "difficulty": "中级",
      "speaker": "李",
      "speakerRole": "ソフトウェア設計者 (受託側SE)",
      "speakerAvatar": "👨‍💻",
      "context": "客户田中部长刚刚正式批准了增加1人月工数用于开发“买家荷物追跡画面”。作为SE，你需要在会议纪要和现场对话中锁定范围边界。",
      "dialogue": "「承知しました。では、お客様向け荷物追跡画面を3つ目の要件として追加させていただきます。」",
      "prompt": "在说完这句话之后，为了防止后续需求继续无限蔓延（Scope Creep），最地道的防守收口句是哪一句？",
      "options": [
        {
          "label": "A",
          "text": "他に追加したい機能があれば、今のうちに何でもおっしゃってください。",
          "analysis": "【NG】主动引火烧身。这会促使客户继续发散提出更多未经评估的庞大诉求，导致范围彻底失控。",
          "textWithRuby": "<ruby>他<rt>ほか</rt></ruby>に<ruby>追加<rt>ついか</rt></ruby>したい<ruby>機能<rt>きのう</rt></ruby>があれば、<ruby>今<rt>いま</rt></ruby>のうちに<ruby>何<rt>なん</rt></ruby>でもおっしゃってください。"
        },
        {
          "label": "B",
          "text": "これで今回の要件は計3点となります。これらに基づき分析設計へ進めさせていただきます。",
          "analysis": "【正解】完美的边界锁闭！当场大声确认“要件总数为3点”，建立清晰的基线防火墙，并迅速切入下一工程里程碑。",
          "textWithRuby": "これで<ruby>今回<rt>こんかい</rt></ruby>の<ruby>要件<rt>ようけん</rt></ruby>は<ruby>計<rt>けい</rt></ruby>3<ruby>点<rt>てん</rt></ruby>となります。これらに<ruby>基づき<rt>もとづき</rt></ruby><ruby>分析<rt>ぶんせき</rt></ruby><ruby>設計<rt>せっけい</rt></ruby>へ<ruby>進め<rt>すすめ</rt></ruby>させていただきます。"
        },
        {
          "label": "C",
          "text": "後から機能を追加したくなっても、もう絶対に受け付けられませんのでご承知おきください。",
          "analysis": "【NG】语气极其生硬傲慢，充满威胁意味，完全不符合日企商务礼仪。",
          "textWithRuby": "<ruby>後<rt>あと</rt></ruby>から<ruby>機能<rt>きのう</rt></ruby>を<ruby>追加<rt>ついか</rt></ruby>したくなっても、もう<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>受け付け<rt>うけつけ</rt></ruby>られませんのでご<ruby>承知<rt>しょうち</rt></ruby>おきください。"
        },
        {
          "label": "D",
          "text": "本当に1人月で足りるか不安ですが、まあ何とかやってみます。",
          "analysis": "【NG】缺乏自信且推卸责任，让客户对受托方的估算能力和工程交付产生严重怀疑。",
          "textWithRuby": "<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>1人<rt>1れ́ん</rt></ruby><ruby>月<rt>つき</rt></ruby>で<ruby>足りる<rt>たりる</rt></ruby>か<ruby>不安<rt>ふあん</rt></ruby>ですが、まあ<ruby>何<rt>なん</rt></ruby>とかやってみます。"
        }
      ],
      "dialogueWithRuby": "「<ruby>承知<rt>しょうち</rt></ruby>しました。では、お<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby><ruby>向け<rt>むけ</rt></ruby><ruby>荷物<rt>にもつ</rt></ruby><ruby>追跡<rt>ついせき</rt></ruby><ruby>画面<rt>がめん</rt></ruby>を3つ<ruby>目<rt>め</rt></ruby>の<ruby>要件<rt>ようけん</rt></ruby>として<ruby>追加<rt>ついか</rt></ruby>させていただきます。」",
      "correct": 1,
      "explanation": {
        "strategy": "面对客户延伸提出的定制需求，先热情肯定提问，说明当前定位，再客观给出技术可行性背书，并顺理成章引导客户将其纳入正式需求清单。",
        "clientSubtext": "客户常在调研中灵机一动提出好想法，直接拒绝会打击积极性，盲目答应又会导致范围失控。温和肯定并给出专业可行性建议是顶级SE的素质。",
        "keyPhrases": [
          {
            "jp": "ご質問ありがとうございます。技術的に対応は可能でございます",
            "zh": "非常感谢您的提问，技术层面上完全能够支持实现",
            "jpWithRuby": "ご<ruby>質問<rt>しつもん</rt></ruby>ありがとうございます。<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>対応<rt>たいおう</rt></ruby>は<ruby>可能<rt>かのう</rt></ruby>でございます"
          },
          {
            "jp": "ご希望があれば要件定義に追加いたしますが、いかがでしょうか",
            "zh": "如果贵司有此期望，我们可以直接纳入需求定义中，您看如何？",
            "jpWithRuby": "ご<ruby>希望<rt>きぼう</rt></ruby>があれば<ruby>要件<rt>ようけん</rt></ruby><ruby>定義<rt>ていぎ</rt></ruby>に<ruby>追加<rt>ついか</rt></ruby>いたしますが、いかがでしょうか"
          }
        ],
        "referenceDialogue": "场景 22: 教材核心课文第 7 轮对话（李：ご質問ありがとうございます。お客様向けの画面を別途用意することは技術的に可能です...）"
      }
    },
    {
      "id": "q_scene23_01",
      "category": "scope",
      "categoryName": "📐 范围把控",
      "sceneTag": "场景 23: 物流需求变更",
      "sceneId": "scene-23",
      "difficulty": "高级",
      "speaker": "田中 部長",
      "speakerRole": "営業統括部長 (クライアント側)",
      "speakerAvatar": "👨‍💼",
      "context": "项目研发中途，田中部长要求紧急追加“根据实时路况自动推荐配送路线”的功能，经评估需增加5人周，会造成原定8月末的上线延期至9月末。",
      "dialogue": "「5週間も延びるのか……。しかし8月末のリリース時期を動かすことは会社的にどうしてもできないんだ。」",
      "prompt": "既不能延期上线，又不想彻底得罪客户拒绝该功能，作为项目经理应如何进行“双赢”谈判？",
      "options": [
        {
          "label": "A",
          "text": "8月末を死守されるのでしたら、残業と休日出勤で5週間分を何とかカバーして間に合わせます！",
          "analysis": "【NG】典型的“死亡行军”式承诺。依靠压榨加班往往导致代码质量崩塌，最终不仅延期还会交付充满缺陷的劣质系统。",
          "textWithRuby": "8<ruby>月<rt>がつ</rt></ruby><ruby>末<rt>まつ</rt></ruby>を<ruby>死守<rt>ししゅ</rt></ruby>されるのでしたら、<ruby>残業<rt>ざんぎょう</rt></ruby>と<ruby>休日<rt>きゅうじつ</rt></ruby><ruby>出勤<rt>しゅっきん</rt></ruby>で5<ruby>週間<rt>しゅうかん</rt></ruby><ruby>分<rt>ぶん</rt></ruby>を<ruby>何<rt>なん</rt></ruby>とかカバーして<ruby>間に合わ<rt>まにあわ</rt></ruby>せます！"
        },
        {
          "label": "B",
          "text": "納期が動かせないのであれば、この機能の追加は完全に諦めていただくしかございません。",
          "analysis": "【NG】缺乏建设性的二极管思维，直接切断了客户的期望，极易造成高层关系僵化。",
          "textWithRuby": "<ruby>納期<rt>のうき</rt></ruby>が<ruby>動か<rt>うごか</rt></ruby>せないのであれば、この<ruby>機能<rt>きのう</rt></ruby>の<ruby>追加<rt>ついか</rt></ruby>は<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>諦め<rt>あきらめ</rt></ruby>ていただくしかございません。"
        },
        {
          "label": "C",
          "text": "基本機能をフェーズ1として予定通り8月末にリリースし、本機能をフェーズ2として次回リリースに回す2段階リリースをご提案します。",
          "analysis": "【正解】教科书级的分期交付（Phasing）谈判策略！既守住了客户8月末上线的政治红线，又将新功能锁定在二期，实现多方共赢。",
          "textWithRuby": "<ruby>基本<rt>きほん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>をフェーズ1として<ruby>予定<rt>よてい</rt></ruby><ruby>通り<rt>とおり</rt></ruby>8<ruby>月<rt>がつ</rt></ruby><ruby>末<rt>まつ</rt></ruby>にリリースし、<ruby>本<rt>ほん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>をフェーズ2として<ruby>次回<rt>じかい</rt></ruby>リリースに<ruby>回す<rt>まわす</rt></ruby>2<ruby>段階<rt>だんかい</rt></ruby>リリースをご<ruby>提案<rt>ていあん</rt></ruby>します。"
        },
        {
          "label": "D",
          "text": "では、現在開発中の他の重要機能をいくつか削って、こちらの機能を入れ替える形で進めましょう。",
          "analysis": "【NG】拆东墙补西墙。在未与业务充分梳理优先级前擅自删减已有基础功能，会引发更广泛的业务反弹。",
          "textWithRuby": "では、<ruby>現在<rt>げんざい</rt></ruby><ruby>開発<rt>かいはつ</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>の<ruby>他<rt>ほか</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>機能<rt>きのう</rt></ruby>をいくつか<ruby>削っ<rt>けずっ</rt></ruby>て、こちらの<ruby>機能<rt>きのう</rt></ruby>を<ruby>入れ替える<rt>いれかえる</rt></ruby><ruby>形<rt>かたち</rt></ruby>で<ruby>進め<rt>すすめ</rt></ruby>ましょう。"
        }
      ],
      "dialogueWithRuby": "「5<ruby>週間<rt>しゅうかん</rt></ruby>も<ruby>延びる<rt>のびる</rt></ruby>のか……。しかし8<ruby>月<rt>がつ</rt></ruby><ruby>末<rt>まつ</rt></ruby>のリリース<ruby>時期<rt>じき</rt></ruby>を<ruby>動かす<rt>うごかす</rt></ruby>ことは<ruby>会社<rt>かいしゃ</rt></ruby><ruby>的<rt>てき</rt></ruby>にどうしてもできないんだ。」",
      "correct": 2,
      "explanation": {
        "strategy": "客户临时追加范围（CR）时，切忌正面生硬拒绝，而是先真诚接纳感谢诉求，接着客观摆出波及影响范围（5周工期与模块关联），自然过渡到优先级分期建议。",
        "clientSubtext": "客户高层提出新想法往往是受竞品刺激，希望提升竞争力。受托方既要保护交付死线，又要尊重客户愿景，因此‘分期实现’是最佳平衡点。",
        "keyPhrases": [
          {
            "jp": "ご要望ありがとうございます。影響範囲を精査してご説明します",
            "zh": "感谢您的提议，我会排查影响范围向二位做汇报",
            "jpWithRuby": "ご<ruby>要望<rt>ようぼう</rt></ruby>ありがとうございます。<ruby>影響<rt>えいきょう</rt></ruby><ruby>範囲<rt>はんい</rt></ruby>を<ruby>精査<rt>せいさ</rt></ruby>してご<ruby>説明<rt>せつめい</rt></ruby>します"
          },
          {
            "jp": "全量追加した場合は納期遅延の恐れがございます",
            "zh": "如果全量一次性塞入，恐怕存在工期延误的风险",
            "jpWithRuby": "<ruby>全量<rt>ぜんりょう</rt></ruby><ruby>追加<rt>ついか</rt></ruby>した<ruby>場合<rt>ばあい</rt></ruby>は<ruby>納期<rt>のうき</rt></ruby><ruby>遅延<rt>ちえん</rt></ruby>の<ruby>恐れ<rt>おそれ</rt></ruby>がございます"
          }
        ],
        "referenceDialogue": "场景 23: 教材核心课文第 2 轮对话（李：ご要望ありがとうございます。交通状況に基づき最適な配送ルートを推奨する機能ですね...）"
      }
    },
    {
      "id": "q_scene23_02",
      "category": "keigo",
      "categoryName": "👔 高阶敬语",
      "sceneTag": "场景 23: 物流需求变更",
      "sceneId": "scene-23",
      "difficulty": "中级",
      "speaker": "山田 課長",
      "speakerRole": "IT推進担当課長 (クライアント側)",
      "speakerAvatar": "📊",
      "context": "客户方最终全盘采纳了将功能拆分为Phase 1和Phase 2的建议。你作为SE，需要向客户承诺本周内提交更新后的计划书。",
      "dialogue": "「山田課長も賛成してくれたし、その2段階に分ける方針で進めよう。計画書の修正はどうなる？」",
      "prompt": "以下哪一种商务敬语承诺在表达坚定执行力的同时最为地道？",
      "options": [
        {
          "label": "A",
          "text": "ありがとうございます。変更内容を反映した計画書を週内に提出します。よろしくお願いいたします。",
          "analysis": "【正解】极为得体自然的商务承诺！致谢 ➜ 明确将决议反映至计划书 ➜ 锁定「週内」具体期限，言简意赅，雷厉风行。",
          "textWithRuby": "ありがとうございます。<ruby>変更<rt>へんこう</rt></ruby><ruby>内容<rt>ないよう</rt></ruby>を<ruby>反映<rt>はんえい</rt></ruby>した<ruby>計画<rt>けいかく</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>週内<rt>しゅうない</rt></ruby>に<ruby>提出<rt>ていしゅつ</rt></ruby>します。よろしくお<ruby>願い<rt>ねがい</rt></ruby>いたします。"
        },
        {
          "label": "B",
          "text": "了解しました。手が空いた時にでも計画書を直しておきますので、来月あたりにご確認ください。",
          "analysis": "【NG】下级对上级禁忌使用「了解しました」，且「手が空いた時に」「来月あたり」态度极其怠惰轻浮。",
          "textWithRuby": "<ruby>了解<rt>りょうかい</rt></ruby>しました。<ruby>手<rt>て</rt></ruby>が<ruby>空い<rt>あい</rt></ruby>た<ruby>時<rt>とき</rt></ruby>にでも<ruby>計画<rt>けいかく</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>直し<rt>なおし</rt></ruby>ておきますので、<ruby>来月<rt>らいげつ</rt></ruby>あたりにご<ruby>確認<rt>かくにん</rt></ruby>ください。"
        },
        {
          "label": "C",
          "text": "部長のご要望で変更になったのですから、計画書の作成はお客様側でお願いできますでしょうか。",
          "analysis": "【NG】把受托方的文档工作反向甩锅给客户高管，属于严重的职场失礼行为。",
          "textWithRuby": "<ruby>部長<rt>ぶちょう</rt></ruby>のご<ruby>要望<rt>ようぼう</rt></ruby>で<ruby>変更<rt>へんこう</rt></ruby>になったのですから、<ruby>計画<rt>けいかく</rt></ruby><ruby>書<rt>しょ</rt></ruby>の<ruby>作成<rt>さくせい</rt></ruby>はお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby><ruby>側<rt>がわ</rt></ruby>でお<ruby>願い<rt>ねがい</rt></ruby>できますでしょうか。"
        },
        {
          "label": "D",
          "text": "口頭で合意できましたので、わざわざ計画書を修正する必要はないかと存じます。",
          "analysis": "【NG】日企严禁“口头契约”。不更新文档等于没有契约约束，后续一定会发生严重的结算与审计纠纷。",
          "textWithRuby": "<ruby>口頭<rt>こうとう</rt></ruby>で<ruby>合意<rt>ごうい</rt></ruby>できましたので、わざわざ<ruby>計画<rt>けいかく</rt></ruby><ruby>書<rt>しょ</rt></ruby>を<ruby>修正<rt>しゅうせい</rt></ruby>する<ruby>必要<rt>ひつよう</rt></ruby>はないかと<ruby>存じ<rt>ぞんじ</rt></ruby>ます。"
        }
      ],
      "dialogueWithRuby": "「<ruby>山田<rt>やまだ</rt></ruby><ruby>課長<rt>かちょう</rt></ruby>も<ruby>賛成<rt>さんせい</rt></ruby>してくれたし、その2<ruby>段階<rt>だんかい</rt></ruby>に<ruby>分ける<rt>わける</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>で<ruby>進めよう<rt>すすめよう</rt></ruby>。<ruby>計画<rt>けいかく</rt></ruby><ruby>書<rt>しょ</rt></ruby>の<ruby>修正<rt>しゅうせい</rt></ruby>はどうなる？」",
      "correct": 0,
      "explanation": {
        "strategy": "在交付大限不可动摇的前提下，运用‘两阶段分步走（フェーズ分割）’策略化解冲突：核心基础功能保住首期上线，高阶算法顺延二期迭代，既守住信誉又交付价值。",
        "clientSubtext": "客户部长既要对董事会交代‘8月底按时上线’，又想拿到新功能向业务表功。分期上线方案完美满足了领导的所有政治与业务诉求。",
        "keyPhrases": [
          {
            "jp": "機能をフェーズ分割し、基本機能を8月末、高度機能を9月末にリリースする方針をご提案します",
            "zh": "建议将功能拆分，8月底发布基础功能，9月底上线高阶功能",
            "jpWithRuby": "<ruby>機能<rt>きのう</rt></ruby>をフェーズ<ruby>分割<rt>ぶんかつ</rt></ruby>し、<ruby>基本<rt>きほん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を8<ruby>月末<rt>がつまつ</rt></ruby>、<ruby>高度<rt>こうど</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を9<ruby>月末<rt>がつまつ</rt></ruby>にリリースする<ruby>方針<rt>ほうしん</rt></ruby>をご<ruby>提案<rt>ていあん</rt></ruby>します"
          },
          {
            "jp": "この方針であれば納期を死守しつつ新機能を段階的に導入できます",
            "zh": "按该方针既能死守交付大限，又能实现新功能的阶梯式平稳引入",
            "jpWithRuby": "この<ruby>方針<rt>ほうしん</rt></ruby>であれば<ruby>納期<rt>のうき</rt></ruby>を<ruby>死守<rt>ししゅ</rt></ruby>しつつ<ruby>新<rt>しん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を<ruby>段階<rt>だんかい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>導入<rt>どうにゅう</rt></ruby>できます"
          }
        ],
        "referenceDialogue": "场景 23: 教材核心课文第 8 轮对话（李：そこで、優先度の調整をご提案します。フェーズ1とフェーズ2に分割する方針はいかがでしょうか...）"
      }
    }
  ]
};


export default BATTLE_QUIZ_DATA;
