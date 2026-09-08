# -*- coding: utf-8 -*-
"""
Generate comprehensive data-driven knowledge base for Scenes 1, 2, 11, 12, 21.
Combines authentic textbook dialogues + 5 practice passages per scene,
ignoring low-quality textbook notes and providing rich, customized,
intelligent Japanese learning modules.
"""

import json
import os

scenes_data = [
    # ==================== SCENE 1 ====================
    {
        "id": "scene-1",
        "sceneNumber": 1,
        "badge": "SFA需求调研",
        "title": "场景 1：営業支援システム（SFA）客戸需求调研",
        "theme": "客户初次会面 · 业务现状听取 · 营业效率痛点初步整理",
        "domain": "需求定义领域（SFA 商业流程）",
        "background": "受托方软件设计师李与客户方决策者田中部长、IT负责人山田课长进行首次会议。深入听取营业部门业务现状，挖掘报价单制作工时长、商谈履历依赖个人笔记、信息无法共享等业务痛点。",
        "participants": [
            {"name": "李（り）", "role": "软件设计师 / 受托方SE", "avatar": "👨‍💻"},
            {"name": "田中部長（たなかぶちょう）", "role": "客户方决策者（营业总负责人）", "avatar": "👔"},
            {"name": "山田課長（やまだかちょう）", "role": "客户方IT/业务负责人", "avatar": "📊"}
        ],
        "textbookText": {
            "title": "教材核心课文：営業部門IT化ニーズの初回ヒアリング",
            "audioText": "初めまして、〇〇社の李と申します。本日はお忙しい中、お時間をいただき誠にありがとうございます。ソフトウェア設計を担当しています。本日は田中部長のIT化のご要件について伺わせていただきます。初めまして、田中です。よろしくお願いします。営業部門の業務効率の低下ですね。承知しました。具体的にどのような業務で課題を感じていらっしゃいますか。そうですね。顧客への見積もりの作成に時間がかかりすぎているのと、過去の商談履歴が各営業担当者の個人のメモに頼っている状態なのが課題です。見積もり作成の時間と、商談履歴の一元化ですね。ありがとうございます。現在見積もりの作成には平均的にどのくらいの時間をおかけですか。営業担当者によってばらつきがありますが、平均して1件あたり2時間程度かかっています。1件あたり2時間ですね。承知しました。では、もしシステム化した場合、どの程度の時間短縮をご期待でしょうか。できれば半分の1時間程度まで短縮したいですね。半分の1时间ですね。ありがとうございます。本日お伺いした内容を整理し、来週までに要件の確認書をお持ちしますが、よろしいですか。はい、お願いします。ありがとうございます。では、来週の水曜日の同じ時間に改めてお伺いします。本日は貴重なお話をありがとうございました。",
            "dialogue": [
                {
                    "speaker": "李",
                    "jpWithRuby": "初めまして、〇〇<ruby>社<rt>しゃ</rt></ruby>の<ruby>李<rt>り</rt></ruby>と<ruby>申<rt>もう</rt></ruby>します。本日はお<ruby>忙<rt>いそが</rt></ruby>しい<ruby>中<rt>なか</rt></ruby>、お<ruby>時間<rt>じかん</rt></ruby>をいただき<ruby>誠<rt>まこと</rt></ruby>にありがとうございます。ソフトウェア<ruby>設計<rt>せっけい</rt></ruby>を<ruby>担当<rt>たんとう</rt></ruby>しています。本日は田中部長のIT<ruby>化<rt>か</rt></ruby>のご<ruby>要件<rt>ようけん</rt></ruby>について<ruby>伺<rt>うかが</rt></ruby>わせていただきます。",
                    "romaji": "Hajimemashite, OO-sha no Ri to mōshimasu. Honjitsu wa oisogashii naka, ojikan o itadaki makoto ni arigatō gozaimasu. Sofutowea sekkei o tantō shite imasu. Honjitsu wa Tanaka-buchō no aitī-ka no goyōken ni tsuite ukagawasete itadakimasu.",
                    "zh": "初次见面，我是〇〇公司的李。非常感谢您在百忙之中抽出宝贵时间。我负责软件设计工作。今天由我来向田中部长请教营业部门IT化改造的具体需求。",
                    "keyNote": "【职场初次见面模板】名乗り（〜と申します）＋ 感謝（お忙しい中お時間をいただき）＋ 目的提示（〜について伺わせていただきます）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "初めまして、田中です。よろしくお願いします。うちの<ruby>営業部門<rt>えいぎょうぶもん</rt></ruby>の<ruby>業務効率<rt>ぎょうむこうりつ</rt></ruby>の<ruby>低下<rt>ていか</rt></ruby>がここ<ruby>数年<rt>すうねん</rt></ruby><ruby>課題<rt>かだい</rt></ruby>になっておりまして、何とかITで<ruby>改善<rt>かいぜん</rt></ruby>できないかと<ruby>考<rt>かんが</rt></ruby>えています。",
                    "romaji": "Hajimemashite, Tanaka desu. Yoroshiku onegai shimasu. Uchi no eigyō bumon no gyōmu kōritsu no teika ga koko sūnen kadai ni natte orimashite, nantoka aitī de kaizen dekinai ka to kangaete imasu.",
                    "zh": "初次见面，我是田中。请多关照。这几年我们营业部门的业务效率有所下滑，一直是个老大难问题，正考虑能否通过IT手段来予以改善。",
                    "keyNote": "【痛点抛出】うちの〜（我方部门谦逊说法）＋ 〜が課題になっておりまして（客观叙述）。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>営業部門<rt>えいぎょうぶもん</rt></ruby>の<ruby>業務効率<rt>ぎょうむこうりつ</rt></ruby>の<ruby>低下<rt>ていか</rt></ruby>ですね。<ruby>承知<rt>しょうち</rt></ruby>しました。<ruby>確認<rt>かくにん</rt></ruby>したいのですが、<ruby>具体的<rt>ぐたいてき</rt></ruby>にどのような<ruby>業務<rt>ぎょうむ</rt></ruby>で<ruby>課題<rt>かだい</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じていらっしゃいますか。",
                    "romaji": "Eigyō bumon no gyōmu kōritsu no teika desu ne. Shōchi shimashita. Kakunin shitai no desu ga, gutaiteki ni dono yō na gyōmu de kadai o kanjite irasshaimasu ka.",
                    "zh": "是营业部门业务效率下滑对吧，我明白了。想向您求证一下，具体是在哪些日常业务环节感受到了瓶颈与课题呢？",
                    "keyNote": "【复述确认＋开放式深挖】相手の発言の復唱（〜ですね）＋ 承知しました ＋ どのような業務で〜ていらっしゃいますか（尊敬语开放提问）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "そうですね。<ruby>顧客<rt>こきゃく</rt></ruby>への<ruby>見積<rt>みつ</rt></ruby>もりの<ruby>作成<rt>さくせい</rt></ruby>に<ruby>時間<rt>じかん</rt></ruby>がかかりすぎているのと、<ruby>過去<rt>かこ</rt></ruby>の<ruby>商談履歴<rt>しょうだんりれき</rt></ruby>が<ruby>各<rt>かく</rt></ruby><ruby>営業担当者<rt>えいぎょうたんとうしゃ</rt></ruby>の<ruby>個人<rt>こじん</rt></ruby>のメモに<ruby>頼<rt>たよ</rt></ruby>っている<ruby>状態<rt>じょうたい</rt></ruby>なのが<ruby>課題<rt>かだい</rt></ruby>です。",
                    "romaji": "Sō desu ne. Kokyaku e no mitsumori no sakusei ni jikan ga kakarisugite iru no to, kako no shōdan rireki ga kaku eigyō tantōsha no kojin no memo ni tayotte iru jōtai na no ga kadai desu.",
                    "zh": "是这样的。主要是一给客户做报价单耗时就太久，另外过去与客户的商谈历史记录全都依仗各个销售人员个人的笔记本记录，处于这种状态是我们的核心课题。",
                    "keyNote": "【双重痛点并列】〜のと（并列）＋ 〜に頼っている状態（属人化依赖）＋ なのが課題です。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>見積<rt>みつ</rt></ruby>もり<ruby>作成<rt>さくせい</rt></ruby>の<ruby>時間<rt>じかん</rt></ruby>と、<ruby>商談履歴<rt>しょうだんりれき</rt></ruby>の<ruby>一元化<rt>いちげんか</rt></ruby>ですね。ありがとうございます。もう<ruby>一<rt>ひと</rt></ruby>つ<ruby>確認<rt>かくにん</rt></ruby>したいのですが、<ruby>現在<rt>げんざい</rt></ruby><ruby>見積<rt>みつ</rt></ruby>もりの<ruby>作成<rt>さくせい</rt></ruby>には<ruby>平均的<rt>へいきんてき</rt></ruby>にどのくらいの<ruby>時間<rt>じかん</rt></ruby>をおかけですか。",
                    "romaji": "Mitsumori sakusei no jikan to, shōdan rireki no ichigen-ka desu ne. Arigatō gozaimasu. Mō hitotsu kakunin shitai no desu ga, genzai mitsumori no sakusei ni wa heikinteki ni dono kurai no jikan o okake desu ka.",
                    "zh": "您指的是报价单制作耗时，以及商谈历史记录的集中统一管理对吧。非常感谢。我还想确认一点，目前制作一份报价单，平均需要花费各位多少时间呢？",
                    "keyNote": "【定量化提问】どのくらいの時間をおかけですか（お＋动词连用形＋ですか，极具教养的尊敬问法）。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "<ruby>営業担当者<rt>えいぎょうたんとうしゃ</rt></ruby>によってばらつきがありますが、<ruby>平均<rt>へいきん</rt></ruby>して1<ruby>件<rt>けん</rt></ruby>あたり2<ruby>時間程度<rt>じかんていど</rt></ruby>かかっています。",
                    "romaji": "Eigyō tantōsha ni yotte baratsuki ga arimasu ga, heikin shite ikken atari ni-jikan teido kakatte imasu.",
                    "zh": "虽然各销售代表之间存在差异（参差不齐），但平均下来每份报价单大概要耗费2个小时左右。",
                    "keyNote": "【业务客观描述】〜によってばらつきがある（因人而异/参差不齐）＋ 1件あたり2時間（基准单位あたりの接续）。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "1<ruby>件<rt>けん</rt></ruby>あたり2<ruby>時間<rt>じかん</rt></ruby>ですね。<ruby>承知<rt>しょうち</rt></ruby>しました。では、もしシステム<ruby>化<rt>か</rt></ruby>した<ruby>場合<rt>ばあい</rt></ruby>、どの<ruby>程度<rt>ていど</rt></ruby>の<ruby>時間短縮<rt>じかんたんしゅく</rt></ruby>をご<ruby>期待<rt>きたい</rt></ruby>でしょうか。",
                    "romaji": "Ikken atari ni-jikan desu ne. Shōchi shimashita. Dewa, moshi shisutemu-ka shita baai, dono teido no jikan tanshyuku o gokitai deshō ka.",
                    "zh": "1件要花费2小时对吧，我记下了。那么如果实现系统化上线，您期望能缩短到多长时间呢？",
                    "keyNote": "【目标探询】ご期待でしょうか（ご＋名詞＋でしょうか 委婉询问预期目标）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "できれば<ruby>半分<rt>はんぶん</rt></ruby>の1<ruby>時間程度<rt>じかんていど</rt></ruby>まで<ruby>短縮<rt>たんしゅく</rt></ruby>したいですね。",
                    "romaji": "Dekireba hanbun no ichi-jikan teido made tanshyuku shitai desu ne.",
                    "zh": "如果可能的话，希望能缩短到原先的一半，也就是1小时左右。",
                    "keyNote": "【明确KPI目标】できれば半分の〜程度まで短縮したい。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>半分<rt>はんぶん</rt></ruby>の1<ruby>時間<rt>じかん</rt></ruby>ですね。ありがとうございます。本日お<ruby>伺<rt>うかが</rt></ruby>いした<ruby>内容<rt>ないよう</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>し、<ruby>来週<rt>らいしゅう</rt></ruby>までに<ruby>要件<rt>ようけん</rt></ruby>の<ruby>確認書<rt>かくにんしょ</rt></ruby>をお<ruby>持<rt>も</rt></ruby>ちしますが、よろしいですか。",
                    "romaji": "Hanbun no ichi-jikan desu ne. Arigatō gozaimasu. Honjitsu o-ukagai shita naiyō o seiri shi, raishū made ni yōken no kakuninsho o omochi shimasu ga, yoroshii desu ka.",
                    "zh": "也就是缩短一半至1小时是吧。非常感谢。我将梳理今天向您请教的内容，在下周前为您送上需求确认书初稿，您看这样可以吗？",
                    "keyNote": "【下次行动承诺】お持ちしますが、よろしいですか（お＋连用形＋します 自谦承揽）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "はい、お<ruby>願<rt>ねが</rt></ruby>いします。",
                    "romaji": "Hai, onegai shimasu.",
                    "zh": "好的，那就拜托你了。",
                    "keyNote": "【客户同意】はい、お願いします。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "ありがとうございます。では、<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>水曜日<rt>すいようび</rt></ruby>の<ruby>同<rt>おな</rt></ruby>じお<ruby>時間<rt>じかん</rt></ruby>に<ruby>改<rt>あらた</rt></ruby>めてお<ruby>伺<rt>うかが</rt></ruby>いします。本日は<ruby>貴重<rt>きちょう</rt></ruby>なお<ruby>話<rt>はなし</rt></ruby>をありがとうございました。",
                    "romaji": "Arigatō gozaimasu. Dewa, raishū no suiyōbi no onaji ojikan ni aratamete o-ukagai shimasu. Honjitsu wa kichō na ohanashi o arigatō gozaimashita.",
                    "zh": "非常感谢。那么我们定在下周三同一时间再次登门拜访。今天非常感谢您分享的宝贵信息。",
                    "keyNote": "【闭环锁定日程】来週の水曜日の同じ時間に改めてお伺いします（确定具体下次商谈时间）。"
                }
            ],
            "tokens": [
                {"surface": "伺わせていただきます", "reading": "うかがわせていただきます", "pos": "使役谦让", "meaning": "请允许我向您请教/聆听（最高敬语）", "isKey": True},
                {"surface": "ばらつきがある", "reading": "ばらつきがある", "pos": "惯用短语", "meaning": "存在参差不齐、离散差异", "isKey": True},
                {"surface": "1件あたり", "reading": "いっけんあたり", "pos": "接尾词短语", "meaning": "每1件/平均每件", "isKey": True},
                {"surface": "頼っている", "reading": "たよっている", "pos": "动词存续", "meaning": "依赖着、凭着个人经验", "isKey": True},
                {"surface": "一元化", "reading": "いちげんか", "pos": "IT/管理词汇", "meaning": "集中化、统一化管理", "isKey": True},
                {"surface": "改めてお伺いします", "reading": "あらためておうかがいします", "pos": "商务寒暄", "meaning": "再次改日登门拜访", "isKey": True}
            ]
        },
        "practiceTexts": [
            {
                "pNum": 1,
                "title": "短文 1：首次会议 · 基础业务应答与短句展开",
                "objective": "杜绝单字「はい」式敷衍，运用「完整句」承接客户需求",
                "dialogue": [
                    {"speaker": "李", "jp": "本日はお時間をいただきまして、ありがとうございます。営業部門のシステム化についてお伺いします。", "zh": "非常感谢您今天抽出时间。今天向您请教关于营业部门系统化改造的具体设想。"},
                    {"speaker": "田中部長", "jp": "よろしくお願いします。実は、営業担当者の見積もり作成に時間がかかりすぎているのが一番の課題です。", "zh": "请多关照。其实，销售人员制作报价单耗费太多时间，是我们眼下最头疼的问题。"},
                    {"speaker": "李", "jp": "見積もり作成のお時間ですね。承知しました。具体的にはどのような作業に時間がかかっていますか。", "zh": "您指的是制作报价单的时间对吧。我明白了。具体是在哪一步骤作业上最耗费时间呢？"},
                    {"speaker": "山田課長", "jp": "過去の商談履歴や価格表を複数のエクセルから手作業で探すのに手間取っています。", "zh": "需要手动翻找好几个不同的Excel去核对以往商谈记录和价格表，在这一步极费周折。"},
                    {"speaker": "李", "jp": "複数のエクセルから手作業で探す状態ですね。情報の分散が原因と考えられますね。", "zh": "是从多份Excel里纯人工查找的状态对吧。看来信息分散正是症结所在。"}
                ]
            },
            {
                "pNum": 2,
                "title": "短文 2：敬语自我介绍与完整句回答",
                "objective": "掌握软件工程师商务初见的名乗、谦让表达与完整复述",
                "dialogue": [
                    {"speaker": "李", "jp": "初めまして、〇〇社の李と申します。システムアーキテクトを担当しております。", "zh": "初次见面，我是〇〇公司的李。担任系统架构师职务。"},
                    {"speaker": "田中部長", "jp": "田中です。営業支援システム（SFA）の刷新を検討しており、ご相談したく存じます。", "zh": "我是田中。我们正在考虑重构营业支援系统（SFA），特地向您咨询。"},
                    {"speaker": "李", "jp": "SFAの刷新のご検討ですね。ありがとうございます。ご期待のゴールを伺ってもよろしいでしょうか。", "zh": "您在考虑重构SFA是吧，非常感谢。能否向您请教一下贵司期望达成的终极目标呢？"},
                    {"speaker": "田中部長", "jp": "属人的な営業から脱却し、チーム全体で商談の進捗を見える化することです。", "zh": "摆脱过于依赖个人的推销模式，让整个团队都能将商谈进展实现可视化。"}
                ]
            },
            {
                "pNum": 3,
                "title": "短文 3：开放式与封闭式提问的灵活运用",
                "objective": "先用开放式提问找痛点，再用封闭式提问锁定定量指标",
                "dialogue": [
                    {"speaker": "李", "jp": "現在、業務効率の面で最もボトルネックを感じていらっしゃるのはどちらでしょうか。（开放式）", "zh": "目前在业务效率方面，您感到最严重的瓶颈卡点是在哪一处呢？（开放式提问）"},
                    {"speaker": "山田課長", "jp": "やはり、外出先から商談報告が入力できず、帰社後にまとめて入力している点ですね。", "zh": "主要还是在外面没法直接录入商谈报告，必须等回公司后统一录入这一条。"},
                    {"speaker": "李", "jp": "外出先からのスマートフォンやタブレットでの入力機能が必要ということでよろしいですか。（封闭式）", "zh": "也就是说，在外面使用手机或平板直接录入的功能是必不可少的，对吗？（封闭式确认）"},
                    {"speaker": "山田課長", "jp": "はい、その通りです。それが必須要件になります。", "zh": "是的，完全没错。这会是一项核心必选需求。"}
                ]
            },
            {
                "pNum": 4,
                "title": "短文 4：确认句的多种模式与工数定量化",
                "objective": "熟练运用「〜あたり」「〜程度」「〜ということで間違いないでしょうか」确认量化指标",
                "dialogue": [
                    {"speaker": "李", "jp": "確認したいのですが、1人の担当者が1日に作成する見積もり件数はどのくらいでしょうか。", "zh": "我想求证一下，一名销售人员一天大概要制作多少份报价单呢？"},
                    {"speaker": "山田課長", "jp": "繁忙期ですと、1人あたり1日5件程度作成します。", "zh": "在销售旺季的话，每人每天大概要做5份左右。"},
                    {"speaker": "李", "jp": "1件2時間としますと、1日10時間が見積もりに割かれている計算になりますね。", "zh": "按1份需要2小时计算，相当于一天有10个小时都花在了做报价单上是吧。"},
                    {"speaker": "田中部長", "jp": "そうなんです。だから本来の顧客提案に時間を割けないのが実情です。", "zh": "正是这样。所以实情是大家根本没法把时间投入到原本至关重要的客户提案上去。"}
                ]
            },
            {
                "pNum": 5,
                "title": "短文 5：首次调研全景综合演练",
                "objective": "从寒暄、痛点听取、目标设定到下次提案预约的完整商务闭环",
                "dialogue": [
                    {"speaker": "李", "jp": "本日の内容を整理しますと、見積もり作成時間の半減と商談履歴の一元化が主目的ですね。", "zh": "梳理今天的内容，缩减一半做报价单的时间以及统一管理商谈记录是两大核心目标，对吗？"},
                    {"speaker": "田中部長", "jp": "はい、その2点を最優先でお願いしたいです。", "zh": "对，希望最优先解决这两点。"},
                    {"speaker": "李", "jp": "承知いたしました。来週水曜日の14時に、SFAシステム化の全体構想案をお持ちします。", "zh": "我明白了。下周三下午14点，我们将携带SFA系统化整体架构构想方案再次拜访。"},
                    {"speaker": "田中部長", "jp": "分かりました。楽しみにしています。", "zh": "好的，非常期待。"}
                ]
            }
        ],
        "grammarPoints": [
            {
                "id": "s1-g1",
                "badge": "商务核心",
                "title": "〜伺わせていただきます（最高级谦让意向）",
                "level": "N3 - 商务高级",
                "formula": "伺う（聞く/訪ねる的谦让语） ＋ させて（使役形） ＋ いただきます（受惠/恭敬）",
                "concept": "在对日软件开发首次客户会议中，极高频使用的商务敬语。表达“请容许我向您请教/听取意见”。比普通的「伺います」更加客气，体现出完全尊重对方的商务修养。",
                "rules": [
                    {"type": "形态构成", "rule": "伺う ＋ させて ＋ いただく", "examples": [{"jp": "ご要件について伺わせていただきます", "desc": "请允许我向您请教具体需求"}]},
                    {"type": "同类替换", "rule": "ご説明させていただきます（请允许我为您做说明）", "examples": [{"jp": "概要をご説明させていただきます", "desc": "请允许我向您介绍概要"}]}
                ],
                "businessExamples": [
                    {"jp": "本日は新システムの運用イメージについて伺わせていただきます。", "zh": "今天想向您请教新系统的运行设想。", "audio": "本日は新システムの運用イメージについて伺わせていただきます。"}
                ]
            },
            {
                "id": "s1-g2",
                "badge": "IT量化",
                "title": "〜あたり（基准单位与指标计算）",
                "level": "N3 核心",
                "formula": "数量词 / 名词 ＋ あたり",
                "concept": "在IT需求分析和工数估算中不可或缺的接尾表达。相当于中文的“平均每……、按每……计算”。",
                "rules": [
                    {"type": "业务统计", "rule": "1件あたり2時間（每1件平均耗时2小时）", "examples": [{"jp": "1件あたり2時間かかっています", "desc": "原句中用于说明单据耗时"}]},
                    {"type": "人员平均", "rule": "1人あたり1日5件", "examples": [{"jp": "担当者1人あたり5件処理する", "desc": "每位负责人处理5件"}]}
                ],
                "businessExamples": [
                    {"jp": "データ移行作業は、1テーブルあたり約3時間を要する見込みです。", "zh": "数据迁移作业预计每个数据表耗时约3小时。", "audio": "データ移行作業は、1テーブルあたり約3時間を要する見込みです。"}
                ]
            }
        ],
        "businessClinic": {
            "title": "职场实战诊所：SFA首次调研问询技巧",
            "comparisons": [
                {
                    "point": "1. 询问客户有什么需求",
                    "casual": "どんな機能が欲しいですか。（太直接像店员）",
                    "pro": "具体的にどのような業務で課題を感じていらっしゃいますか。（站在业务痛点角度切入）"
                },
                {
                    "point": "2. 确认耗费时长",
                    "casual": "見積もりは何時間かかりますか。",
                    "pro": "現在見積もりの作成には平均的にどのくらいの時間をおかけですか。（用おかけですか极具教养）"
                }
            ],
            "template": "「〇〇の課題ですね。承知しました。具体的にどのような業務で〜ていらっしゃいますか。」"
        },
        "vocabulary": [
            {"kanji": "見積もり", "reading": "みつもり", "romaji": "mitsumori", "level": "N3/商务", "pos": "名词", "zh": "报价、估价单", "phrase": "見積もりを作成する（制作报价单）", "audio": "見積もり。見積もりを作成する。"},
            {"kanji": "商談履歴", "reading": "しょうだんりれき", "romaji": "shōdan rireki", "level": "商务IT", "pos": "名词", "zh": "商谈履历、客户洽谈历史", "phrase": "商談履歴を一元管理する（统一管理商谈记录）", "audio": "商談履歴。商談履歴を一元管理する。"},
            {"kanji": "ばらつき", "reading": "ばらつき", "romaji": "baratsuki", "level": "N2/商务", "pos": "名词", "zh": "离散度、参差不齐、差异", "phrase": "担当者によってばらつきがある（因人而异存在差距）", "audio": "ばらつき。担当者によってばらつきがある。"},
            {"kanji": "一元化", "reading": "いちげんか", "romaji": "ichigenka", "level": "商务IT", "pos": "名・他サ", "zh": "集中化、统一化管理", "phrase": "顧客情報を一元化する（集中整合客户信息）", "audio": "一元化。顧客情報を一元化する。"}
        ],
        "quizzes": [
            {
                "id": "s1-q1",
                "question": "在首次面谈向客户询问其面临的困扰时，下列哪句最符合软件需求分析师的敬业与敬语水准？",
                "options": [
                    "A. どんな業務で困っていますか。",
                    "B. 具体的にどのような業務で課題を感じていらっしゃいますか。",
                    "C. どこが悪いか教えてください。",
                    "D. どんなシステムが欲しいですか。"
                ],
                "correct": 1,
                "explanation": "【答案是 B】用「どのような業務で課題を感じていらっしゃいますか」既精准切入业务流程，又使用「ていらっしゃる」表达了对客户决策者的最高尊敬。A太口语；C有质问口吻；D是不合格的菜鸟提问方式。"
            },
            {
                "id": "s1-q2",
                "question": "「1件＿＿2時間程度かかっています。」横线上填入哪个助词/接尾词表示“平均每1件”的基准？",
                "options": ["A. にて", "B. あたり", "C. くらい", "D. ほど"],
                "correct": 1,
                "explanation": "【答案是 B】「あたり」接在数量词后，表示“平均每……”。「1件あたり2時間」即每件2小时。"
            }
        ]
    },

    # ==================== SCENE 2 ====================
    {
        "id": "scene-2",
        "sceneNumber": 2,
        "badge": "SFA需求确认",
        "title": "场景 2：営業支援システム（SFA）需求确认与共识形成",
        "theme": "调研结果复盘 · 阶段划分（Phase 1/2） · 方案提案与共识确认",
        "domain": "需求定义领域（范围划定与阶段规划）",
        "background": "在初次调研的基础上，李将需求梳理成两大模块（报价单自动化与商谈统一管理），并从工期与落地难度出发，向田中部长提议进行分期（フェーズ分け）实施，成功与客户达成共识。",
        "participants": [
            {"name": "李（り）", "role": "软件设计师", "avatar": "👨‍💻"},
            {"name": "田中部長（たなかぶちょう）", "role": "客户方决策者", "avatar": "👔"}
        ],
        "textbookText": {
            "title": "教材核心课文：SFA要件定義の合意形成とフェーズ分け提案",
            "audioText": "田中部長、本日もお時間をいただきありがとうございます。先週お伺いした要件を整理しましたので、ご確認させていただきます。お願いします。先週のヒアリング結果に基づき、今回のシステム化のスコープを2つに整理しました。1つ目は「見積もり作成の自動化」、2つ目は「商談履歴の一元管理」です。まず1つ目の見積もり作成につきましては、過去の案件データを参照して自動で見積もりを生成する機能を想定しています。これにより、1件あたり2時間かかっていた作業を1時間に短縮できると考えています。なるほど、それは効果的ですね。ありがとうございます。続いて2つ目の商談履歴につきましては、担当者全員が共通の画面で進捗を確認できるようにします。ただし、データ移行には一定の期間を要するため、第1フェーズを見積もり自動化、第2フェーズを商談履歴管理とすることをご提案したいのですが、いかがでしょうか。開発期間の観点からも、その進め方が現実的ですね。その順番で進めてください。ありがとうございます。それでは、これらの要件に基づき、分析設計のフェーズに進めます。",
            "dialogue": [
                {
                    "speaker": "李",
                    "jpWithRuby": "田中部長、本日もお<ruby>時間<rt>じかん</rt></ruby>をいただきありがとうございます。<ruby>先週<rt>せんしゅう</rt></ruby>お<ruby>伺<rt>うかが</rt></ruby>いした<ruby>要件<rt>ようけん</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>しましたので、ご<ruby>確認<rt>かくにん</rt></ruby>させていただきます。",
                    "romaji": "Tanaka-buchō, honjitsu mo ojikan o itadaki arigatō gozaimasu. Senshū o-ukagai shita yōken o seiri shimashita node, gokakunin sasete itadakimasu.",
                    "zh": "田中部长，今天再次感谢您抽出时间。我们整理了上周向您请教的需求，请容许我向您进行确认。",
                    "keyNote": "【开场共识导入】先週お伺いした要件を整理しましたので、ご確認ください。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "お<ruby>願<rt>ねが</rt></ruby>いします。",
                    "romaji": "Onegai shimasu.",
                    "zh": "好的，请讲。",
                    "keyNote": "【客户聆听】お願いします。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>先週<rt>せんしゅう</rt></ruby>のヒアリング<ruby>結果<rt>けっか</rt></ruby>に<ruby>基<rt>もと</rt></ruby>づき、<ruby>今回<rt>こんかい</rt></ruby>のシステム<ruby>化<rt>か</rt></ruby>のスコープを2つに<ruby>整理<rt>せいり</rt></ruby>しました。1つ<ruby>目<rt>め</rt></ruby>は「<ruby>見積<rt>みつ</rt></ruby>もり<ruby>作成<rt>さくせい</rt></ruby>の<ruby>自動化<rt>じどうか</rt></ruby>」、2つ<ruby>目<rt>め</rt></ruby>は「<ruby>商談履歴<rt>しょうだんりれき</rt></ruby>の<ruby>一元管理<rt>いちげんかんり</rt></ruby>」です。",
                    "romaji": "Senshū no hiaringu kekka ni motozuki, konkai no shisutemu-ka no sukōpu o futatsu ni seiri shimashita. Hitotsume wa 'mitsumori sakusei no jidō-ka', futatsume wa 'shōdan rireki no ichigen kanri' desu.",
                    "zh": "根据上周的调研结果，我们将本次系统化的范围梳理为2大项。第1点是“报价单制作自动化”，第2点是“商谈记录集中统一管理”。",
                    "keyNote": "【范围界定】〜に基づき（根据/立足于）＋ スコープを2つに整理しました（锁定范围）。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "まず1つ<ruby>目<rt>め</rt></ruby>の<ruby>見積<rt>みつ</rt></ruby>もり<ruby>作成<rt>さくせい</rt></ruby>につきましては、<ruby>過去<rt>かこ</rt></ruby>の<ruby>案件<rt>あんけん</rt></ruby>データを<ruby>参照<rt>さんしょう</rt></ruby>して<ruby>自動<rt>じどう</rt></ruby>で<ruby>見積<rt>みつ</rt></ruby>もりを<ruby>生成<rt>せいせい</rt></ruby>する<ruby>機能<rt>きのう</rt></ruby>を<ruby>想定<rt>そうてい</rt></ruby>しています。これにより、1<ruby>件<rt>けん</rt></ruby>あたり2<ruby>時間<rt>じかん</rt></ruby>かかっていた<ruby>作業<rt>さぎょう</rt></ruby>を1<ruby>時間<rt>じかん</rt></ruby>に<ruby>短縮<rt>たんしゅく</rt></ruby>できると<ruby>考<rt>かんが</rt></ruby>えています。",
                    "romaji": "Mazu hitotsume no mitsumori sakusei ni tsukimashite wa, kako no anken dēta o sanshō shite jidō de mitsumori o seisei suru kinō o sōtei shite imasu. Kore ni yori, ikken atari ni-jikan kakatte ita sagyō o ichi-jikan ni tanshyuku dekiru to kangaete imasu.",
                    "zh": "首先关于第1点报价单制作，我们设想的是参考过往案件数据自动生成报价的功能。借助此功能，我们认为能够将以往单件2小时的工作缩短至1小时。",
                    "keyNote": "【功能与成效联动】〜を想定しています（架构设想）＋ これにより〜できると考えています（因果效益）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "なるほど、それは<ruby>効果的<rt>こうかてき</rt></ruby>ですね。",
                    "romaji": "Naruhodo, sore wa kōkateki desu ne.",
                    "zh": "原来如此，这确实很有成效。",
                    "keyNote": "【客户肯定】なるほど、それは効果的ですね。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "ありがとうございます。<ruby>続<rt>つづ</rt></ruby>いて2つ<ruby>目<rt>め</rt></ruby>の<ruby>商談履歴<rt>しょうだんりれき</rt></ruby>につきましては、<ruby>担当者全員<rt>たんとうしゃぜんいん</rt></ruby>が<ruby>共通<rt>きょうつう</rt></ruby>の<ruby>画面<rt>がめん</rt></ruby>で<ruby>進捗<rt>しんちょく</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>できるようにします。ただし、データ<ruby>移行<rt>いこう</rt></ruby>には<ruby>一定<rt>いってい</rt></ruby>の<ruby>期間<rt>きかん</rt></ruby>を<ruby>要<rt>よう</rt></ruby>するため、<ruby>第<rt>だい</rt></ruby>1フェーズを<ruby>見積<rt>みつ</rt></ruby>もり<ruby>自動化<rt>じどうか</rt></ruby>、<ruby>第<rt>だい</rt></ruby>2フェーズを<ruby>商談履歴管理<rt>しょうだんりれきかんり</rt></ruby>とすることをご<ruby>提案<rt>ていあん</rt></ruby>したいのですが、いかがでしょうか。",
                    "romaji": "Arigatō gozaimasu. Tsuzuite futatsume no shōdan rireki ni tsukimashite wa, tantōsha zen'in ga kyōtsū no gamen de shinchoku o kakunin dekiru yō ni shimasu. Tadashi, dēta ikō ni wa ittei no kikan o yōsuru tame, dai-ichi fēzu o mitsumori jidōka, dai-ni fēzu o shōdan rireki kanri to suru koto o goteian shitai no desu ga, ikaga deshō ka.",
                    "zh": "非常感谢。接下来关于第2点商谈历史，我们将做到让所有负责人都能在同一画面上确认进展。但是，鉴于数据迁移需要一定周期，我们建议将第1阶段定为报价自动化，第2阶段实施商谈记录管理，您看这样如何？",
                    "keyNote": "【实施分期策略提案】ただし〜（转折限定）＋ 第1フェーズを〜、第2フェーズを〜とすることをご提案したいのですが、いかがでしょうか。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "<ruby>開発期間<rt>かいはつきかん</rt></ruby>の<ruby>観点<rt>かんてん</rt></ruby>からも、その<ruby>進<rt>すす</rt></ruby>め<ruby>方<rt>かた</rt></ruby>が<ruby>現実的<rt>げんじつてき</rt></ruby>ですね。その<ruby>順番<rt>じゅんばん</rt></ruby>で<ruby>進<rt>すす</rt></ruby>めてください。",
                    "romaji": "Kaihatsu kikan no kanten kara mo, sono susumekata ga genjitsuteki desu ne. Sono junban de susumete kudasai.",
                    "zh": "从开发工期的角度来看，这种推进方式确实最为务实现实。就按这个顺序推进吧。",
                    "keyNote": "【客户采纳决策】〜の観点からも、現実的ですね。その順番で進めてください。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "ありがとうございます。それでは、これらの<ruby>要件<rt>ようけん</rt></ruby>に<ruby>基<rt>もと</rt></ruby>づき、<ruby>分析設計<rt>ぶんせきせっけい</rt></ruby>のフェーズに<ruby>進<rt>すす</rt></ruby>めます。",
                    "romaji": "Arigatō gozaimasu. Sorede wa, korera no yōken ni motozuki, bunseki sekkei no fēzu ni susumemasu.",
                    "zh": "非常感谢。那么接下来我们将立足于这几项确立的需求，正式进入分析设计阶段。",
                    "keyNote": "【阶段推进交付】要件に基づき、分析設計のフェーズに進めます。"
                }
            ],
            "tokens": [
                {"surface": "〜に基づき", "reading": "にもとづき", "pos": "复合助词", "meaning": "基于、立足于……（书面客观）", "isKey": True},
                {"surface": "スコープ", "reading": "スコープ", "pos": "外来IT语", "meaning": "范围（Scope）", "isKey": True},
                {"surface": "想定しています", "reading": "そうていしています", "pos": "动词短语", "meaning": "预设、规划设计着……", "isKey": True},
                {"surface": "期間を要する", "reading": "きかんをようする", "pos": "惯用短语", "meaning": "需要耗费时间/周期", "isKey": True},
                {"surface": "第1フェーズ", "reading": "だいいちフェーズ", "pos": "工程术语", "meaning": "第一阶段（Phase 1）", "isKey": True}
            ]
        },
        "practiceTexts": [
            {"pNum": 1, "title": "短文 1：复句说明确认事项", "objective": "用复句将前因后果、限制条件与技术方案有机串联", "dialogue": [
                {"speaker": "李", "jp": "前回のヒアリングを踏まえ、見積もり自動化の要件を整理いたしました。", "zh": "结合上次的调研，我们梳理了报价自动化的各项需求。"},
                {"speaker": "田中部長", "jp": "具体的にはどのような画面構成になりますか。", "zh": "具体会是一个怎样的界面构架呢？"},
                {"speaker": "李", "jp": "過去の類似案件を選択することで、自動的に品目と単価が反映される構成を想定しております。", "zh": "我们设想的结构是，通过选择过往类似案件，系统自动调取并填入品目与单价。"}
            ]},
            {"pNum": 2, "title": "短文 2：多句连接与顺逆接表达", "objective": "掌握「これにより」「ただし」「したがって」在方案推演中的运用", "dialogue": [
                {"speaker": "李", "jp": "これにより入力ミスを防止できますが、例外的な値引きには承認フローが必要となります。", "zh": "借此虽能防止输错，但在发生特例打折时，则需要走审批流。"},
                {"speaker": "田中部長", "jp": "その通りですね。値引きのガバナンスも効かせたいところでした。", "zh": "完全正确。我们也正想强化一下打折折扣的合规治理。"}
            ]},
            {"pNum": 3, "title": "短文 3：共识形成场景的高阶敬语运用", "objective": "使用「ご相談させていただきたく」「ご提案したいのですが」委婉征得同意", "dialogue": [
                {"speaker": "李", "jp": "納期を厳守するため、リリースを2回に分けることをご相談させていただけますでしょうか。", "zh": "为了严守交付工期，能否向您商讨一下将版本分两次发布的方案呢？"},
                {"speaker": "田中部長", "jp": "品質担保のためなら、その方針で構いません。", "zh": "如果为了确保质量，按那个方针完全没有问题。"}
            ]},
            {"pNum": 4, "title": "短文 4：确认事项逻辑排列与共识确认", "objective": "从重要度、紧急度、工期三个维度引导客户确认方案", "dialogue": [
                {"speaker": "李", "jp": "緊急度の高い見積もり作成を優先し、商談履歴を第2フェーズとする順序で合意いただけますでしょうか。", "zh": "优先解决紧急度更高的报价单制作，商谈记录列入第二阶段，关于这个次序能否征得您的首肯？"},
                {"speaker": "田中部長", "jp": "はい、その優先順位で進めることに同意します。", "zh": "好的，我同意按照这个优先顺序来推进。"}
            ]},
            {"pNum": 5, "title": "短文 5：完整需求确认与共识形成演练", "objective": "要件定义阶段最后一步：形成文字记录并双方确认签字", "dialogue": [
                {"speaker": "李", "jp": "合意いただきました要件を『要件定義書』としてまとめ、来週初頭にご提出いたします。", "zh": "我们将把双方达成共识的需求汇总成《需求定义书》，于下周初正式提交给您。"},
                {"speaker": "田中部長", "jp": "了解しました。社内でも回覧して承認を進めておきます。", "zh": "明白了。我也会在公司内部流转推进内部审批。"}
            ]}
        ],
        "grammarPoints": [
            {
                "id": "s2-g1",
                "badge": "方案立足",
                "title": "〜に基づき / 〜に基づいて（以……为基准/根据）",
                "level": "JLPT N2 核心",
                "formula": "名词 ＋ に基づき / に基づいて",
                "concept": "表示以某种事实、调研数据、法律契约或前次会议纪要作为推演行动的根基依据。在对日需求定义和设计文档中出现频率极高。「に基づき」是连用形中顿，极为正式严谨。",
                "rules": [
                    {"type": "书面中顿", "rule": "〜に基づき、〜", "examples": [{"jp": "前回のヒアリングに基づき、要件を整理しました", "desc": "基于前次的调研梳理了需求"}]},
                    {"type": "修饰名词", "rule": "〜に基づいた ＋ 名词", "examples": [{"jp": "データに基づいた意思決定", "desc": "基于数据的科学决策"}]}
                ],
                "businessExamples": [
                    {"jp": "基本合意に基づき、次フェーズの工数見積もりを算出いたしました。", "zh": "依据基本共识，我们测算出了下一阶段的工时报价。", "audio": "基本合意に基づき、次フェーズの工数見積もりを算出いたしました。"}
                ]
            },
            {
                "id": "s2-g2",
                "badge": "因果效益",
                "title": "これにより、〜（借此、由此）",
                "level": "N3 - 商务论述",
                "formula": "文首 ＋ これにより、〜（动词可能态/结果）",
                "concept": "日本IT提案书与口头汇报中使用率最高的逻辑连接词。用来引出某个功能上线后，能够为客户带来的具体经济效益、时间缩减或质量提升。",
                "rules": [
                    {"type": "因果链结构", "rule": "【系统功能】＋ これにより ＋ 【成效目标】", "examples": [{"jp": "自動化します。これにより、作業時間を半減できます。", "desc": "实现自动化。借此能将作业耗时缩减一半。"}]}
                ],
                "businessExamples": [
                    {"jp": "シングルサインオンを導入します。これにより、パスワード再発行の手間を9割削減できます。", "zh": "引入单点登录（SSO）。借此可以将重置密码的运维负担削减90%。", "audio": "シングルサインオンを導入します。これにより、パスワード再発行の手間を9割削減できます。"}
                ]
            }
        ],
        "businessClinic": {
            "title": "职场实战诊所：如何向日本客户提议分期上线（フェーズ分け）？",
            "comparisons": [
                {
                    "point": "分期建议口吻",
                    "casual": "時間が足りないので、2回に分けて作ります。（推卸责任感，给人实力不足的印象）",
                    "pro": "開発期間および品質担保の観点から、第1フェーズを〇〇、第2フェーズを〇〇とすることをご提案したいのですが、いかがでしょうか。（站在客户利益与质量把控的高维角度）"
                }
            ],
            "template": "「〇〇の観点からも、第1フェーズを〜、第2フェーズを〜とすることをご提案したいのですが、いかがでしょうか。」"
        },
        "vocabulary": [
            {"kanji": "スコープ", "reading": "スコープ", "romaji": "sukōpu", "level": "IT专业", "pos": "名词", "zh": "工程范围（Project Scope）", "phrase": "システム化のスコープを画定する（划定系统化的实施范围）", "audio": "スコープ。システム化のスコープを画定する。"},
            {"kanji": "フェーズ", "reading": "フェーズ", "romaji": "fēzu", "level": "IT专业", "pos": "名词", "zh": "阶段（Phase）", "phrase": "第1フェーズに分割する（拆分为第一期实施）", "audio": "フェーズ。第1フェーズに分割する。"},
            {"kanji": "想定", "reading": "そうてい", "romaji": "sōtei", "level": "N2/商务", "pos": "名・他サ", "zh": "设想、预想、预先规划", "phrase": "自動生成機能を想定しています（预设规划了自动生成功能）", "audio": "想定。自動生成機能を想定しています。"},
            {"kanji": "進捗", "reading": "しんちょく", "romaji": "shinchoku", "level": "N2/商务", "pos": "名・自サ", "zh": "进展、进度", "phrase": "リアルタイムで進捗を確認する（实时确认进展）", "audio": "進捗。リアルタイムで進捗を確認する。"}
        ],
        "quizzes": [
            {
                "id": "s2-q1",
                "question": "向客户提议分阶段实施时，哪种表达最为专业且具有说服力？",
                "options": [
                    "A. 面倒なので2回に分けたいです。",
                    "B. 開発期間とリスク軽減の観点から、2つのフェーズに分けることをご提案します。",
                    "C. 1回で全部作るのは無理です。",
                    "D. 後でまた作ります。"
                ],
                "correct": 1,
                "explanation": "【答案是 B】运用「〜の観点から、〜をご提案します」既立足于专业风险控制，又给对方极高商业信赖感。"
            }
        ]
    },

    # ==================== SCENE 11 ====================
    {
        "id": "scene-11",
        "sceneNumber": 11,
        "badge": "客服系统调研",
        "title": "场景 11：客户支持系统需求调研",
        "theme": "客户支持中心现状听取 · 工单分散与FAQ缺失 · 首次响应超时痛点",
        "domain": "需求定义领域（客服工单与知识库体系）",
        "background": "客户服务呼叫中心面临客服业务严重“属人化”、客户来电与邮件分散于各个个人电脑中、没有统一知识库且首次回复平均超过2小时的严重痛点。李深入挖掘其三大核心瓶颈。",
        "participants": [
            {"name": "李（り）", "role": "软件设计师", "avatar": "👨‍💻"},
            {"name": "田中部長（たなかぶちょう）", "role": "客户方决策者", "avatar": "👔"},
            {"name": "山田課長（やまだかちょう）", "role": "客户支持中心主管", "avatar": "🎧"}
        ],
        "textbookText": {
            "title": "教材核心课文：カスタマーサポートセンターの課題ヒアリング",
            "audioText": "本日はお時間をいただきまして、ありがとうございます。御社のカスタマーサポートセンターの業務効率化について、ご要望を伺わせていただきたく、お時間をいただきました。はい、よろしくお願いします。実は、サポートセンターの業務が属人化しておりまして、改善を検討しているところでした。承知しました。確認したいのですが、現在のサポートセンターで一番課題を感じていらっしゃるのはどのような点でしょうか。そうですね。大きく3つの課題があります。1つ目は、お客様からの問い合わせがメールと電話とチャットに分散しており、一元管理できていないことです。2つ目は、FAQが整備されておらず、同じ質問が繰り返されていることです。3つ目は、初回回答までの時間が平均2時間以上かかっていることです。なるほど、3つの課題ですね。ありがとうございます。まず1つ目の問い合わせの分散についてですが、現在はどのように管理していらっしゃいますか。メールは担当者のローカルフォルダ、電話は手書きのメモ、チャットは各ツールの履歴という感じで、全く統合されていません。そういう状況ですね。2つ目のFAQについてですが、現在FAQのようなものはあるのでしょうか。簡単なものはあるのですが、更新されておらず、検索性も良くない状態です。承知しました。3つ目の初回回答時間についてですが、ボトルネックはどのあたりにありますか。過去の対応履歴を探すのに時間がかかるのと、担当者間の情報共有ができていないのが原因だと思っています。ありがとうございます。ここまでのお話を整理すると、IT化の方向性として、問い合わせの一元管理とFAQの知識化と初回回答の迅速化の3つが主な改善テーマと認識していますが、よろしいですか。はい、その3つでお願いします。ありがとうございます。では、次回はより詳細なヒアリングをさせていただければと思います。",
            "dialogue": [
                {
                    "speaker": "李",
                    "jpWithRuby": "本日はお<ruby>時間<rt>じかん</rt></ruby>をいただきまして、ありがとうございます。<ruby>御社<rt>おんしゃ</rt></ruby>のカスタマーサポートセンターの<ruby>業務効率化<rt>ぎょうむこうりつか</rt></ruby>について、ご<ruby>要望<rt>ようぼう</rt></ruby>を<ruby>伺<rt>うかが</rt></ruby>わせていただきたく、お<ruby>時間<rt>じかん</rt></ruby>をいただきました。",
                    "romaji": "Honjitsu wa ojikan o itadakimashite, arigatō gozaimasu. Onsha no kasutamā sapōto sentā no gyōmu kōritsu-ka ni tsuite, goyōbō o ukagawasete itadakitaku, ojikan o itadakimashita.",
                    "zh": "非常感谢您今天抽出宝贵时间。今天登门，是想就贵司客户服务支持中心的业务效率化改造，向各位聆听具体需求。",
                    "keyNote": "【会议主题直奔核心】〜についてご要望を伺わせていただきたく（委婉而郑重的意向）。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "はい、よろしくお願いします。実は、サポートセンターの<ruby>業務<rt>ぎょうむ</rt></ruby>が<ruby>属人化<rt>ぞくじんか</rt></ruby>しておりまして、<ruby>改善<rt>かいぜん</rt></ruby>を<ruby>検討<rt>けんとう</rt></ruby>しているところでした。",
                    "romaji": "Hai, yoroshiku onegai shimasu. Jitsu wa, sapōto sentā no gyōmu ga zokujin-ka shite orimashite, kaizen o kentō shite iru tokoro deshita.",
                    "zh": "好的，请多关照。实不相瞒，客服中心的业务现在严重依赖特定个人（属人化），我们正琢磨着如何改进。",
                    "keyNote": "【行业痛点词】属人化（ぞくじんか，没有制度化/标准化，个人离职业务就瘫痪）。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "そうですね。大きく3つの<ruby>課題<rt>かだい</rt></ruby>があります。1つ<ruby>目<rt>め</rt></ruby>は、お<ruby>客様<rt>きゃくさま</rt></ruby>からの<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせがメールと<ruby>電話<rt>でんわ</rt></ruby>とチャットに<ruby>分散<rt>ぶんさん</rt></ruby>しており、<ruby>一元管理<rt>いちげんかんり</rt></ruby>できていない<mark class=\"hl-koto\">ことです</mark>。2つ<ruby>目<rt>め</rt></ruby>は、FAQが<ruby>整備<rt>せいび</rt></ruby>されてお<mark class=\"hl-zu\">らず</mark>、<ruby>同<rt>おな</rt></ruby>じ<ruby>質問<rt>しつもん</rt></ruby>が<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>されている<mark class=\"hl-koto\">ことです</mark>。3つ<ruby>目<rt>め</rt></ruby>は、<ruby>初回回答<rt>しょかいかいとう</rt></ruby>までの<ruby>時間<rt>じかん</rt></ruby>が<ruby>平均<rt>へいきん</rt></ruby>2<ruby>時間以上<rt>じかんいじょう</rt></ruby>かかっている<mark class=\"hl-koto\">ことです</mark>。",
                    "romaji": "Sō desu ne. Ōkiku mittsu no kadai ga arimasu. Hitotsume wa, okyakusama kara no toiawase ga mēru to denwa to chatto ni bunsan shite ori, ichigen kanri dekite inai koto desu. Futatsume wa, FAQ ga seibi sarete orazu, onaji shitsumon ga kurikaesarete iru koto desu. Mittsume wa, shokai kaitō made no jikan ga heikin ni-jikan ijō kakatte iru koto desu.",
                    "zh": "是的。主要存在3大课题。第1点是，客户的咨询分散在邮件、电话和在线即时通讯各处，没能做到统一归口管理。第2点是，FAQ知识库未整理就绪，同样的提问在不断机械重复。第3点是，首次回复客户平均需要耗费2小时以上。",
                    "keyNote": "【再次印证黄金句型！】1つ目は〜ことです＋2つ目は〜ておらず〜ことです＋3つ目は〜ことです。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "メールは<ruby>担当者<rt>たんとうしゃ</rt></ruby>のローカルフォルダ、<ruby>電話<rt>でんわ</rt></ruby>は<ruby>手書<rt>てが</rt></ruby>きのメモ、チャットは<ruby>各<rt>かく</rt></ruby>ツールの<ruby>履歴<rt>りれき</rt></ruby>という<ruby>感<rt>かん</rt></ruby>じで、<ruby>全<rt>まった</rt></ruby>く<ruby>統合<rt>とうごう</rt></ruby>されていません。FAQも<ruby>更新<rt>こうしん</rt></ruby>されてお<mark class=\"hl-zu\">らず</mark>、<ruby>検索性<rt>けんさくせい</rt></ruby>も<ruby>良<rt>よ</rt></ruby>くない<ruby>状態<rt>じょうたい</rt></ruby>です。",
                    "romaji": "Mēru wa tantōsha no rōkaru foruda, denwa wa tegaki no memo, chatto wa kaku tsūru no rireki to iu kanji de, mattaku tōgō sarete imasen. FAQ mo kōshin sarete orazu, kensakusei mo yokunai jōtai desu.",
                    "zh": "邮件散落在负责人的本地文件夹里，电话全凭手写便签，聊天记录则停留在各自软件的历史中，完全没有整合。FAQ也是久未更新，检索起来非常不方便。",
                    "keyNote": "【真实IT现状白描】更新されておらず（书面否定中顿）＋ 検索性が良くない状態。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>初回回答時間<rt>しょかいかいとうじかん</rt></ruby>についてですが、ボトルネックはどのあたりにありますか。",
                    "romaji": "Shokai kaitō jikan ni tsuite desu ga, botorunekku wa dono atari ni arimasu ka.",
                    "zh": "关于首次回复的时间，您觉得系统最大的瓶颈卡点大概在什么环节呢？",
                    "keyNote": "【IT架构师专业提问】ボトルネックはどのあたりにありますか。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "<ruby>過去<rt>かこ</rt></ruby>の<ruby>対応履歴<rt>たいおうりれき</rt></ruby>を<ruby>探<rt>さが</rt></ruby>すのに<ruby>時間<rt>じかん</rt></ruby>がかかるのと、<ruby>担当者間<rt>たんとうしゃかん</rt></ruby>の<ruby>情報共有<rt>じょうほうきょうゆう</rt></ruby>ができていないのが<ruby>原因<rt>げんいん</rt></ruby>だと<ruby>思<rt>おも</rt></ruby>っています。",
                    "romaji": "Kako no taiō rireki o sagasu no ni jikan ga kakaru no to, tantōshakan no jōhō kyōyū ga dekite inai no ga gen'in da to omotte imasu.",
                    "zh": "主要是查找过往的处理记录太费时间，加上各个客服人员之间的信息共享完全缺位，我认为这两点是主要原因。",
                    "keyNote": "【原因剖析】〜を探すのに時間がかかるのと、情報共有ができていないのが原因。"
                }
            ],
            "tokens": [
                {"surface": "属人化", "reading": "ぞくじんか", "pos": "管理IT名词", "meaning": "业务个人化、缺乏标准化体制", "isKey": True},
                {"surface": "一元管理", "reading": "いちげんかんり", "pos": "IT术语", "meaning": "统一归口管理、统一中台化", "isKey": True},
                {"surface": "整備されておらず", "reading": "せいびされておらず", "pos": "否定中顿", "meaning": "尚未整理完善（书面庄重）", "isKey": True},
                {"surface": "ボトルネック", "reading": "ボトルネック", "pos": "管理IT外来语", "meaning": "瓶颈（Bottleneck）", "isKey": True},
                {"surface": "初回回答", "reading": "しょかいかいとう", "pos": "客服指标", "meaning": "首次响应（First Response Time）", "isKey": True}
            ]
        },
        "practiceTexts": [
            {"pNum": 1, "title": "短文 1：首次调研：寒暄→现状听取→初步整理", "objective": "听取工单渠道分散现状，记录邮件、电话、聊天三类来源", "dialogue": [
                {"speaker": "李", "jp": "カスタマーサポートの問い合わせ窓口は、現在いくつございますか。", "zh": "请问目前客户支持的咨询接待窗口一共有几个呢？"},
                {"speaker": "山田課長", "jp": "WEBフォーム、メール、電話の3つがありますが、それぞれ別々に管理されています。", "zh": "有网页表单、邮件、电话3个，但都是各自独立分开管理的。"}
            ]},
            {"pNum": 2, "title": "短文 2：课题复述与结构化整理", "objective": "将零散抱怨归类为「渠道分散」「知识库缺失」「响应缓慢」3大主题", "dialogue": [
                {"speaker": "李", "jp": "お話をまとめますと、問い合わせの一元管理、FAQのナレッジ化、初回回答の短縮ですね。", "zh": "综合您所讲的，核心就是工单集中管理、FAQ知识库化，以及缩短首次回复耗时对吧。"},
                {"speaker": "田中部長", "jp": "その通りです。まさにその3点が我が社の喫緊の課題です。", "zh": "完全没错，正是这3点是我们公司的当务之急。"}
            ]},
            {"pNum": 3, "title": "短文 3：深入提问与瓶颈挖掘", "objective": "追问为什么会发生FAQ更新滞后与查找困难", "dialogue": [
                {"speaker": "李", "jp": "FAQが更新されない一番の障壁は何だとお考えでしょうか。", "zh": "您认为导致FAQ无法及时更新的最大障碍是什么呢？"},
                {"speaker": "山田課長", "jp": "日々の対応に追われ、ナレッジとしてまとめる専任者がいない点です。", "zh": "大家都被每天日常的对应搞得焦头烂额，没有专人负责沉淀知识库。"}
            ]},
            {"pNum": 4, "title": "短文 4：调研收尾与共识约定", "objective": "约定下次针对工单系统选型进行深入方案研讨", "dialogue": [
                {"speaker": "李", "jp": "本日の内容を踏まえ、クラウド型問い合わせ管理のモデル案を次回お持ちします。", "zh": "基于今天的内容，下次我们将携带云端工单集中管理的模型方案前来拜访。"},
                {"speaker": "田中部長", "jp": "ぜひお願いします。楽しみに待っています。", "zh": "务必拜托了，我们期待着。"}
            ]},
            {"pNum": 5, "title": "短文 5：呼叫中心全流程综合复习", "objective": "演练从首次接洽到锁定3大改善主题的全套话术", "dialogue": [
                {"speaker": "李", "jp": "一元管理により、回答漏れや二重対応のミスもゼロにできる構想です。", "zh": "通过集中统一管理，我们的构想是彻底根除遗漏回答或重复对应的失误。"},
                {"speaker": "山田課長", "jp": "それは現場としても大変助かります。", "zh": "那对于一线作业人员来说真是帮了大忙了。"}
            ]}
        ],
        "grammarPoints": [
            {
                "id": "s11-g1",
                "badge": "否定中顿",
                "title": "〜されておらず（被动态＋おらず否定中顿）",
                "level": "JLPT N2 核心",
                "formula": "动词未然形 ＋ れる/られる（被动） ＋ ておらず（否定中顿）",
                "concept": "原句中「更新されておらず、検索性も良くない」「整備されておらず」是极其纯正的书面公文表达。相当于日常口语中的「更新されていなくて」。在正式商务会议中，用于陈述某项制度或功能尚未就绪。",
                "rules": [
                    {"type": "形态解析", "rule": "更新する → 更新される → 更新されておる → 更新されておらず", "examples": [{"jp": "FAQが更新されておらず", "desc": "FAQ未被更新"}]}
                ],
                "businessExamples": [
                    {"jp": "セキュリティ規程が周知徹底されておらず、早急な対策が必要です。", "zh": "安全规章尚未宣贯到位，需要尽快采取对策。", "audio": "セキュリティ規程が周知徹底されておらず、早急な対策が必要です。"}
                ]
            }
        ],
        "businessClinic": {
            "title": "职场实战诊所：如何用IT词汇描述客服中心的混乱现状？",
            "comparisons": [
                {
                    "point": "描述管理混乱",
                    "casual": "あちこちバラバラで困っています。（口语大白话，不严谨）",
                    "pro": "問い合わせが各チャネルに分散しており、一元管理できていない状態です。（专业中台化表述）"
                }
            ],
            "template": "「〜が分散しており、一元管理できていないことが課題です。」"
        },
        "vocabulary": [
            {"kanji": "属人化", "reading": "ぞくじんか", "romaji": "zokujinka", "level": "管理IT", "pos": "名・自サ", "zh": "属人化、业务绑定特定个人", "phrase": "業務の属人化を解消する（消除业务过度依赖个人的弊端）", "audio": "属人化。業務の属人化を解消する。"},
            {"kanji": "ボトルネック", "reading": "ボトルネック", "romaji": "botorunekku", "level": "IT外来语", "pos": "名词", "zh": "瓶颈、最大症结", "phrase": "プロセスのボトルネックを特定する（查明流程中的核心瓶颈）", "audio": "ボトルネック。プロセスのボトルネックを特定する。"},
            {"kanji": "分散", "reading": "ぶんさん", "romaji": "bunsan", "level": "N2/商务", "pos": "名・自他サ", "zh": "分散、不集中", "phrase": "情報が各ツールに分散している（信息散落在各个工具中）", "audio": "分散。情報が各ツールに分散している。"},
            {"kanji": "検索性", "reading": "けんさくせい", "romaji": "kensakusei", "level": "IT专业", "pos": "名词", "zh": "可检索性、查找便利度", "phrase": "検索性を向上させる（提升信息检索的便捷度）", "audio": "検索性。検索性を向上させる。"}
        ],
        "quizzes": [
            {
                "id": "s11-q1",
                "question": "「FAQが整備されて＿＿、同じ質問が繰り返されている。」横线上填入哪项最符合书面严谨语感？",
                "options": ["A. おらず", "B. なくて", "C. ないで", "D. ず"],
                "correct": 0,
                "explanation": "【答案是 A】原句接在「整備されて」后，必须使用「〜ておらず」（相当于口语〜ていなくて），显得客观庄重。"
            }
        ]
    },

    # ==================== SCENE 12 ====================
    {
        "id": "scene-12",
        "sceneNumber": 12,
        "badge": "客服系统确认",
        "title": "场景 12：客户支持系统需求确认与共识形成",
        "theme": "调研结果复盘 · 自动派单与FAQ知识库 · 人机结合与分阶段实施",
        "domain": "需求定义领域（AI/NLP 辅助与流程自动化）",
        "background": "针对客服中心工单分散与效率低下的问题，李提出了“基于关键词解析的自动派单”与“基于NLP的历史工单自动沉淀FAQ”两大功能，并承诺保留人工兜底确认机制，成功达成优先级与工期共识。",
        "participants": [
            {"name": "李（り）", "role": "软件设计师", "avatar": "👨‍💻"},
            {"name": "田中部長（たなかぶちょう）", "role": "客户方决策者", "avatar": "👔"},
            {"name": "山田課長（やまだかちょう）", "role": "客户支持中心主管", "avatar": "🎧"}
        ],
        "textbookText": {
            "title": "教材核心课文：自動振り分けとFAQ自動生成機能の要件合意",
            "audioText": "田中部長、山田課長、本日は前回のヒアリング結果を整理しましたので、ご確認させていただきます。お願いします。前回のヒアリングから、2つの大きな要件を整理しました。1つ目が「問い合わせの自動振り分け機能」、2つ目が「FAQナレッジベースの検索機能」です。まず1つ目についてご説明します。はい、お願いします。1つ目の自動振り分け機能につきまして、問い合わせの内容をキーワード解析して適切な担当者に自動で振り分ける機能を想定しています。これにより、現在の振り分け作業の手間を削減し、初回回答までの時間を短縮できると考えています。なるほど。振り分けのルールはどうなりますか。ご質問ありがとうございます。ルールにつきましては、管理者が画面からルールを設定できるようにします。初期ルールにつきましては、弊社側で設定させていただきます。分かりました。1つ目の要件は分かりました。ありがとうございます。続いて2つ目のFAQナレッジベースの検索機能につきましてご説明します。過去の対応履歴からFAQを自動生成し、キーワード検索で即座に参照できる機能です。これにより、同じ質問への回答時間を大幅に短縮できます。FAQの自動生成というのは、過去の対応履歴から自動で作るということですか。はい、その通りです。自然言語処理を用いて、過去の対応履歴から頻出質問と回答を抽出し、FAQとして登録します。ただし、最終的な確認・編集は御社の担当者の方が行えるようにします。なるほど、人間が確認できるのは安心ですね。ありがとうございます。それでは、2つの要件の優先順位についてご相談させてください。開発期間の観点から、1つ目の自動振り分け機能を第1フェーズ、2つ目のFAQ検索機能を第2フェーズとすることをご提案しますが、いかがでしょうか。そうですね、初回回答の迅速化の緊急度が高いので、その順番で進めてください。承知しました。では、本日の内容で要件定義書を整理し、来週までにお送りします。",
            "dialogue": [
                {
                    "speaker": "李",
                    "jpWithRuby": "田中部長、山田課長、本日は<ruby>前回<rt>ぜんかい</rt></ruby>のヒアリング<ruby>結果<rt>けっか</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>しましたので、ご<ruby>確認<rt>かくにん</rt></ruby>させていただきます。2つの<ruby>大<rt>おお</rt></ruby>きな<ruby>要件<rt>ようけん</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>しました。1つ<ruby>目<rt>め</rt></ruby>が「<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせの<ruby>自動振<rt>じどうふ</rt></ruby>り<ruby>分<rt>わ</rt></ruby>け<ruby>機能<rt>きのう</rt></ruby>」、2つ<ruby>目<rt>め</rt></ruby>が「FAQナレッジベースの<ruby>検索機能<rt>けんさくきのう</rt></ruby>」です。",
                    "romaji": "Tanaka-buchō, Yamada-kachō, honjitsu wa zenkai no hiaringu kekka o seiri shimashita node, gokakunin sasete itadakimasu. Futatsu no ōkina yōken o seiri shimashita. Hitotsume ga 'toiawase no jidō furiwake kinō', futatsume ga 'FAQ narejjibēsu no kensaku kinō' desu.",
                    "zh": "田中部长、山田课长，今天我们整理了上次的调研结果，请容许向各位进行求证确认。我们提炼了2大核心需求。第1项是“咨询工单自动分流派发功能”，第2项是“FAQ知识库检索功能”。",
                    "keyNote": "【提炼明确功能名】1つ目が「〇〇機能」、2つ目が「〇〇機能」です。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "1つ<ruby>目<rt>め</rt></ruby>の<ruby>自動振<rt>じどうふ</rt></ruby>り<ruby>分<rt>わ</rt></ruby>け<ruby>機能<rt>きのう</rt></ruby>につきまして、<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせの<ruby>内容<rt>ないよう</rt></ruby>をキーワード<ruby>解析<rt>かいせき</rt></ruby>して<ruby>適切<rt>てきせつ</rt></ruby>な<ruby>担当者<rt>たんとうしゃ</rt></ruby>に<ruby>自動<rt>じどう</rt></ruby>で<ruby>振<rt>ふ</rt></ruby>り<ruby>分<rt>わ</rt></ruby>ける<ruby>機能<rt>きのう</rt></ruby>を<ruby>想定<rt>そうてい</rt></ruby>しています。これにより、<ruby>現在<rt>げんざい</rt></ruby>の<ruby>振<rt>ふ</rt></ruby>り<ruby>分<rt>わ</rt></ruby>け<ruby>作業<rt>さぎょう</rt></ruby>の<ruby>手間<rt>てま</rt></ruby>を<ruby>削減<rt>さくげん</rt></ruby>し、<ruby>初回回答<rt>しょかいかいとう</rt></ruby>までの<ruby>時間<rt>じかん</rt></ruby>を<ruby>短縮<rt>たんしゅく</rt></ruby>できると<ruby>考<rt>かんが</rt></ruby>えています。",
                    "romaji": "Hitotsume no jidō furiwake kinō ni tsukimashite, toiawase no naiyō o kīwādo kaiseki shite tekisetsu na tantōsha ni jidō de furiwakeru kinō o sōtei shite imasu. Kore ni yori, genzai no furiwake sagyō no tema o sakugen shi, shokai kaitō made no jikan o tanshyuku dekiru to kangaete imasu.",
                    "zh": "关于第1项自动派单功能，我们设想通过解析咨询内容中的关键词，自动分派给最合适的客服人员。借此能够省去目前人工转单的手工成本，从而缩短客户首次得到回复的时间。",
                    "keyNote": "【效果推导逻辑】〜を想定しています。これにより、〜を削減し、〜を短縮できると考えています。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "FAQの<ruby>自動生成<rt>じどうせいせい</rt></ruby>というのは、<ruby>過去<rt>かこ</rt></ruby>の<ruby>対応履歴<rt>たいおうりれき</rt></ruby>から<ruby>自動<rt>じどう</rt></ruby>で<ruby>作<rt>つく</rt></ruby>るという<mark class=\"hl-koto\">ことですか</mark>。",
                    "romaji": "FAQ no jidō seisei to iu no wa, kako no taiō rireki kara jidō de tsukuru to iu koto desu ka.",
                    "zh": "所谓的FAQ自动生成，意思是指系统会自动从过往的处理历史记录中直接生成出来吗？",
                    "keyNote": "【定义与核实专用句型】〜というのは、〜ということですか（双重确认神句）。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "はい、その<ruby>通<rt>とお</rt></ruby>りです。<ruby>自然言語処理<rt>しぜんげんごしょり</rt></ruby>を<ruby>用<rt>もち</rt></ruby>いて、<ruby>過去<rt>かこ</rt></ruby>の<ruby>対応履歴<rt>たいおうりれき</rt></ruby>から<ruby>頻出質問<rt>ひんしゅつしつもん</rt></ruby>と<ruby>回答<rt>かいとう</rt></ruby>を<ruby>抽出<rt>ちゅうしゅつ</rt></ruby>し、FAQとして<ruby>登録<rt>とうろく</rt></ruby>します。ただし、<ruby>最終的<rt>さいしゅうてき</rt></ruby>な<ruby>確認<rt>かくにん</rt></ruby>・<ruby>編集<rt>へんしゅう</rt></ruby>は<ruby>御社<rt>おんしゃ</rt></ruby>の<ruby>担当者<rt>たんとうしゃ</rt></ruby>の<ruby>方<rt>かた</rt></ruby>が<ruby>行<rt>おこな</rt></ruby>えるようにします。",
                    "romaji": "Hai, sono tōri desu. Shizen gengo shori o mochiite, kako no taiō rireki kara hinshutsu shitsumon to kaitō o chūshutsu shi, FAQ to shite tōroku shimasu. Tadashi, saishūteki na kakunin henshū wa onsha no tantōsha no kata ga okonaeru yō ni shimasu.",
                    "zh": "是的，正如您所言。我们将运用自然语言处理（NLP）技术，从历史对应记录中提取高频提问与答复，登记为FAQ。不过，最终的确认与编辑修改权限依然由贵司工作人员来掌控。",
                    "keyNote": "【人机协同（AI+Human-in-the-loop）消除客户顾虑】ただし、最終的な確認は御社の担当者が行えるようにします。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "なるほど、<ruby>人間<rt>にんげん</rt></ruby>が<ruby>確認<rt>かくにん</rt></ruby>できるのは<ruby>安心<rt>あんしん</rt></ruby>ですね。その<ruby>順番<rt>じゅんばん</rt></ruby>で<ruby>進<rt>すす</rt></ruby>めてください。",
                    "romaji": "Naruhodo, ningen ga kakunin dekiru no wa anshin desu ne. Sono junban de susumete kudasai.",
                    "zh": "原来如此，人工能够参与把关确实让人放心多了。就照这个顺序推进吧。",
                    "keyNote": "【消除顾虑后达成共识】人間が確認できるのは安心ですね。"
                }
            ],
            "tokens": [
                {"surface": "振り分け", "reading": "ふりわけ", "pos": "名词", "meaning": "分流、派单、指派分发", "isKey": True},
                {"surface": "〜というのは、〜ということですか", "reading": "というのは、ということですか", "pos": "确认句型", "meaning": "所谓的……是指……这回事吗？", "isKey": True},
                {"surface": "自然言語処理", "reading": "しぜんげんごしょり", "pos": "技术名词", "meaning": "自然语言处理（NLP）", "isKey": True},
                {"surface": "頻出質問", "reading": "ひんしゅつしつもん", "pos": "名词", "meaning": "高频常见问题（FAQ）", "isKey": True}
            ]
        },
        "practiceTexts": [
            {"pNum": 1, "title": "短文 1：调研结果整理与需求1确认：工单自动派单", "objective": "陈述基于关键词解析匹配技能组（Skill-based Routing）的自动化机制", "dialogue": [
                {"speaker": "李", "jp": "問い合わせの本文に含まれるキーワードから、担当部署を自動判定する仕組みです。", "zh": "这是根据咨询正文中包含的关键词，自动判定负责部门的机制。"},
                {"speaker": "山田課長", "jp": "誤判定された場合の修正は手動で可能ですか。", "zh": "万一发生误判，支持人工手动修正吗？"},
                {"speaker": "李", "jp": "はい、画面上のワンクリックで別の担当者へ再割り当てが可能です。", "zh": "支持的，在界面上一键即可重新指派给其他同事。"}
            ]},
            {"pNum": 2, "title": "短文 2：需求2确认：FAQ知识库检索功能", "objective": "讲解利用全文检索和相似度算法对一线客服的赋能", "dialogue": [
                {"speaker": "李", "jp": "オペレーターが問い合わせ対応中に、類似の過去回答が画面横にサジェストされます。", "zh": "客服在应对客户时，相似的过往答复会自动推荐在屏幕侧边。"},
                {"speaker": "山田課長", "jp": "それがあれば新人オペレーターでも迷わずに素早く回答できますね。", "zh": "有了那个，就算是刚入职的新手客服也能毫不犹豫地迅速回答了。"}
            ]},
            {"pNum": 3, "title": "短文 3：优先级协商与分期推进方案", "objective": "运用「緊急度が高い〜」「開発期間の観点から〜」促成决策", "dialogue": [
                {"speaker": "李", "jp": "自動振り分けを先にリリースし、FAQはデータが蓄積されてから第2フェーズとするのが合理的です。", "zh": "先上线自动分流，而FAQ则等数据积累一定规模后再在二期上线，这是最合理的。"},
                {"speaker": "田中部長", "jp": "おっしゃる通りです。実データがないとFAQも学習できませんからね。", "zh": "正如您所言。没有真实数据沉淀，FAQ也没法做模型训练。"}
            ]},
            {"pNum": 4, "title": "短文 4：共识确认与要件定义书签署承诺", "objective": "确立下周正式提交要件定义书（SOW/SRS）", "dialogue": [
                {"speaker": "李", "jp": "本日の合意内容を反映した要件定義書のドラフトを来週月曜日にお送りします。", "zh": "我们将在下周一为您发送体现今天共识内容的需求定义书草案。"},
                {"speaker": "田中部長", "jp": "受領後、社内で確認し速やかにフィードバックいたします。", "zh": "收到后，我们会在公司内部审核并及时给您反馈。"}
            ]},
            {"pNum": 5, "title": "短文 5：需求确认全流程综合演练", "objective": "演练要件从技术推演到商业共识签字的全套对白", "dialogue": [
                {"speaker": "李", "jp": "本日の2つの要件で、御社のサポート業務のDX化の土台が整うと確信しております。", "zh": "我们坚信，通过今天的两项核心需求，贵司客户支持业务的DX数字化转型基石将彻底奠定。"},
                {"speaker": "田中部長", "jp": "心強いですね。引き続きパートナーとしてよろしくお願いします。", "zh": "真让人备感踏实。今后也请作为我们信赖的合作伙伴多多关照。"}
            ]}
        ],
        "grammarPoints": [
            {
                "id": "s12-g1",
                "badge": "求证核实",
                "title": "〜というのは、〜ということですか（双重求证确认神句）",
                "level": "N2 - 架构师核心",
                "formula": "概念/名词 ＋ というのは、〜普通形 ＋ ということですか",
                "concept": "在技术方案讨论与需求访谈中，客户或设计者用来向对方彻底求证“是不是这个意思”。前半句「〜というのは」提示待定义的名词，后半句「〜ということですか」用「こと」名词化收束求证事实。",
                "rules": [
                    {"type": "结构模型", "rule": "Aというのは、Bということですか（所谓的A，是指B这件事吗？）", "examples": [{"jp": "自動生成というのは、過去履歴から自動で作るということですか", "desc": "原句山田课长的经典提问"}]}
                ],
                "businessExamples": [
                    {"jp": "クラウド化というのは、オンプレミスのサーバーを全廃するということですか。", "zh": "所谓的上云，是指彻底废除本地物理服务器的意思吗？", "audio": "クラウド化というのは、オンプレミスのサーバーを全廃するということですか。"}
                ]
            }
        ],
        "businessClinic": {
            "title": "职场实战诊所：给日本客户讲解AI/自动算法时的大忌",
            "comparisons": [
                {
                    "point": "讲解算法介入",
                    "casual": "AIが勝手に全部作ってくれますから安心してください。（大忌！日本客户最害怕失控）",
                    "pro": "自然言語処理により自動生成しますが、最終的な確認・編集は必ず御社のご担当者が行えるようにします。（人机结合，给予完全把控权）"
                }
            ],
            "template": "「〜を自動化しますが、最終的な確認・制御は御社の担当者が行えるようにします。」"
        },
        "vocabulary": [
            {"kanji": "自然言語処理", "reading": "しぜんげんごしょり", "romaji": "shizen gengo shori", "level": "IT前沿", "pos": "名词", "zh": "自然语言处理（NLP）", "phrase": "自然言語処理技術を応用する（应用自然语言处理技术）", "audio": "自然言語処理。自然言語処理技術を応用する。"},
            {"kanji": "振り分け", "reading": "ふりわけ", "pos": "名・他サ", "reading": "ふりわけ", "romaji": "furiwake", "level": "商务IT", "zh": "工单分派、派发指派", "phrase": "問い合わせを自動で振り分ける（自动分派工单）", "audio": "振り分け。問い合わせを自動で振り分ける。"},
            {"kanji": "抽出", "reading": "ちゅうしゅつ", "romaji": "chūshutsu", "level": "N1/IT", "pos": "名・他サ", "zh": "提取、抽取（数据/特征）", "phrase": "過去履歴から頻出パターンを抽出する（从历史记录提取高频模式）", "audio": "抽出。過去履歴から頻出パターンを抽出する。"}
        ],
        "quizzes": [
            {
                "id": "s12-q1",
                "question": "当你想向对方彻底核实某个概念的具体含义时，使用哪个句型最为地道精准？",
                "options": [
                    "A. 〇〇は、何ですか。",
                    "B. 〇〇というのは、〜ということですか。",
                    "C. 〇〇の意味が分かりません。",
                    "D. 〇〇を説明してください。"
                ],
                "correct": 1,
                "explanation": "【答案是 B】「〜というのは、〜ということですか」是日本职场和技术研讨中公认最优雅、最严密的求证定义句型。"
            }
        ]
    },

    # ==================== SCENE 21 ====================
    {
        "id": "scene-21",
        "sceneNumber": 21,
        "badge": "物流DX调研",
        "title": "场景 21：物流配送管理系统需求调研",
        "theme": "配送状态不透明 · 人工经验排车低效 · 路线缺乏优化与空驶率高",
        "domain": "需求定义领域（物流与供应链数字化转型）",
        "background": "客户方物流部门长期面临配送途中货物状态无法实时掌握、派车全凭老师傅经验手工调度、配送路线未最优化导致2成空驶等三大瓶颈。田中部长的经典回答在此场景中诞生！",
        "participants": [
            {"name": "李（り）", "role": "软件设计师 / 受托方SE", "avatar": "👨‍💻"},
            {"name": "田中部長（たなかぶちょう）", "role": "客户方决策者（物流部主管）", "avatar": "👔"},
            {"name": "山田課長（やまだかちょう）", "role": "客户方物流调度主管", "avatar": "🚛"}
        ],
        "textbookText": {
            "title": "教材核心课文：物流部門の配送管理現状と3大課題のヒアリング",
            "audioText": "初めまして、〇〇社の李と申します。本日はお忙しい中、お時間をいただき誠にありがとうございます。ソフトウェア設計を担当しています。本日は田中部長の物流システム化のご要件について伺わせていただきます。初めまして、田中です。よろしくお願いします。うちの物流部門の配送管理がここ数年課題になっておりまして、何とかITで改善できないかと考えています。物流部門の配送管理の課題ですね。承知しました。確認したいのですが、具体的にどのような業務で課題を感じていらっしゃいますか。そうですね。大きく3つの課題があります。1つ目は、配送中の荷物の状況がリアルタイムで把握できず、お客様からの問い合わせにすぐ答えられないことです。2つ目は、配車作業が担当者の経験に頼っており、効率が悪いことです。3つ目は、配送ルートの最適化ができておらず、無駄な移動が多いことです。3つの課題ですね。ありがとうございます。まず1つ目の配送状況の把握についてですが、現在はどのように管理していらっしゃいますか。現在は、出庫時に伝票を発行して、ドライバーが帰庫後に報告書を提出する仕組みです。配送中の状況は電話で確認するしかありません。そういう状況ですね。2つ目の配車作業についてですが、1日にどのくらいの件数を処理していらっしゃいますか。1日平均150件程度で、担当者が2名で手作業で振り分けています。朝の配車に毎日2時間以上かかっています。毎日2時間以上ですね。承知しました。3つ目の配送ルートについてですが、現状の無駄な移動をどの程度とお考えですか。GPSデータを分析したところ、全体の走行距離の約2割が不要な走行ではないかと見ています。ありがとうございます。ここまでのお話を整理すると、システム化の方向性として、配送状況のリアルタイム可視化と、配車の自動化と、配送ルートの最適化の3つが主な改善テーマと認識していますが、よろしいですか。はい、その3つでお願いします。ありがとうございます。では、本日お伺いした内容を整理し、来週までに要件の確認書をお持ちします。",
            "dialogue": [
                {
                    "speaker": "李",
                    "jpWithRuby": "初めまして、〇〇<ruby>社<rt>しゃ</rt></ruby>の<ruby>李<rt>り</rt></ruby>と<ruby>申<rt>もう</rt></ruby>します。本日はお<ruby>忙<rt>いそが</rt></ruby>しい<ruby>中<rt>なか</rt></ruby>、お<ruby>時間<rt>じかん</rt></ruby>をいただき<ruby>誠<rt>まこと</rt></ruby>にありがとうございます。ソフトウェア<ruby>設計<rt>せっけい</rt></ruby>を<ruby>担当<rt>たんとう</rt></ruby>しています。本日は田中部長の<ruby>物流<rt>ぶつりゅう</rt></ruby>システム<ruby>化<rt>か</rt></ruby>のご<ruby>要件<rt>ようけん</rt></ruby>について<ruby>伺<rt>うかが</rt></ruby>わせていただきます。",
                    "romaji": "Hajimemashite, OO-sha no Ri to mōshimasu. Honjitsu wa oisogashii naka, ojikan o itadaki makoto ni arigatō gozaimasu. Sofutowea sekkei o tantō shite imasu. Honjitsu wa Tanaka-buchō no butsuryū shisutemu-ka no goyōken ni tsuite ukagawasete itadakimasu.",
                    "zh": "初次见面，我是〇〇公司的李。非常感谢您百忙之中抽出时间。我负责软件设计工作。今天由我来向田中部长请教物流系统化建设的具体需求。",
                    "keyNote": "【标准开场寒暄】初次见面的自我介绍与主题陈述。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "初めまして、田中です。よろしくお願いします。うちの<ruby>物流部門<rt>ぶつりゅうぶもん</rt></ruby>の<ruby>配送管理<rt>はいそうかんり</rt></ruby>がここ<ruby>数年<rt>すうねん</rt></ruby><ruby>課題<rt>かだい</rt></ruby>になっておりまして、何とかITで<ruby>改善<rt>かいぜん</rt></ruby>できないかと<ruby>考<rt>かんが</rt></ruby>えています。",
                    "romaji": "Hajimemashite, Tanaka desu. Yoroshiku onegai shimasu. Uchi no butsuryū bumon no haisō kanri ga koko sūnen kadai ni natte orimashite, nantoka aitī de kaizen dekinai ka to kangaete imasu.",
                    "zh": "初次见面，我是田中。请多关照。我们物流部门的配送管理这几年来一直是个大难题，正在琢磨能否通过IT手段予以改善。",
                    "keyNote": "【客户现状导入】配送管理が課題になっておりまして。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "<ruby>物流部門<rt>ぶつりゅうぶもん</rt></ruby>の<ruby>配送管理<rt>はいそうかんり</rt></ruby>の<ruby>課題<rt>かだい</rt></ruby>ですね。<ruby>承知<rt>しょうち</rt></ruby>しました。<ruby>確認<rt>かくにん</rt></ruby>したいのですが、<ruby>具体的<rt>ぐたいてき</rt></ruby>にどのような<ruby>業務<rt>ぎょうむ</rt></ruby>で<ruby>課題<rt>かだい</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じていらっしゃいますか。",
                    "romaji": "Butsuryū bumon no haisō kanri no kadai desu ne. Shōchi shimashita. Kakunin shitai no desu ga, gutaiteki ni dono yō na gyōmu de kadai o kanjite irasshaimasu ka.",
                    "zh": "是物流部门配送管理方面的课题对吧，我明白了。想向您请教一下，具体是在哪些日常业务环节感受到了瓶颈呢？",
                    "keyNote": "【深度追问】具体的にどのような業務で〜ていらっしゃいますか。"
                },
                {
                    "speaker": "田中部長",
                    "jpWithRuby": "そうですね。大きく3つの<ruby>課題<rt>かだい</rt></ruby>があります。1つ<ruby>目<rt>め</rt></ruby>は、<ruby>配送中<rt>はいそうちゅう</rt></ruby>の<ruby>荷物<rt>にもつ</rt></ruby>の<ruby>状況<rt>じょうきょう</rt></ruby>がリアルタイムで<ruby>把握<rt>はあく</rt></ruby>でき<mark class=\"hl-zu\">ず</mark>、お<ruby>客様<rt>きゃくさま</rt></ruby>からの<ruby>問<rt>と</rt></ruby>い<ruby>合<rt>あ</rt></ruby>わせにすぐ<ruby>答<rt>こた</rt></ruby>えられない<mark class=\"hl-koto\">ことです</mark>。2つ<ruby>目<rt>め</rt></ruby>は、<ruby>配車作業<rt>はいしゃさぎょう</rt></ruby>が<ruby>担当者<rt>たんとうしゃ</rt></ruby>の<ruby>経験<rt>けいけん</rt></ruby>に<ruby>頼<rt>たよ</rt></ruby>っており、<ruby>効率<rt>こうりつ</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>い<mark class=\"hl-koto\">ことです</mark>。3つ<ruby>目<rt>め</rt></ruby>は、<ruby>配送<rt>はいそう</rt></ruby>ルートの<ruby>最適化<rt>さいてきか</rt></ruby>ができてお<mark class=\"hl-zu\">らず</mark>、<ruby>無駄<rt>むだ</rt></ruby>な<ruby>移動<rt>いどう</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い<mark class=\"hl-koto\">ことです</mark>。",
                    "romaji": "Sō desu ne. Ōkiku mittsu no kadai ga arimasu. Hitotsume wa, haisōchū no nimotsu no jōkyō ga riarutaimu de haaku dekizu, okyakusama kara no toiawase ni sugu kotaerarenai koto desu. Futatsume wa, haisha sagyō ga tantōsha no keiken ni tayotte ori, kōritsu ga warui koto desu. Mittsume wa, haisō rūto no saiteki-ka ga dekite orazu, muda na idō ga ōi koto desu.",
                    "zh": "是这样的。主要存在3大课题。第1点是，无法实时掌握配送中货物的状况，以至于客户前来垂询时无法立刻给出答复。第2点是，车辆调度排车全凭负责人的个人经验，整体效率低下。第3点是，配送路线未能实现最优化，存在很多不必要的无效空驶路线。",
                    "keyNote": "【本课全剧灵魂核心原句！】全句包含「〜ず」「〜こと（です）」「〜ておらず」，是商务三段式汇报最高典范。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "<ruby>現在<rt>げんざい</rt></ruby>は、<ruby>出庫時<rt>しゅっこじ</rt></ruby>に<ruby>伝票<rt>でんぴょう</rt></ruby>を<ruby>発行<rt>はっこう</rt></ruby>して、ドライバーが<ruby>帰庫後<rt>きここ</rt></ruby>に<ruby>報告書<rt>ほうこくしょ</rt></ruby>を<ruby>提出<rt>ていしゅつ</rt></ruby>する<ruby>仕組<rt>しく</rt></ruby>みです。<ruby>配送中<rt>はいそうちゅう</rt></ruby>の<ruby>状況<rt>じょうきょう</rt></ruby>は<ruby>電話<rt>でんわ</rt></ruby>で<ruby>確認<rt>かくにん</rt></ruby>するしかありません。",
                    "romaji": "Genzai wa, shukkoji ni denpyō o hakkō shite, doraibā ga kikogo ni hōkokusho o teishutsu suru shikumi desu. Haisōchū no jōkyō wa denwa de kakunin suru shika arimasen.",
                    "zh": "目前我们的机制是，出库时打印纸质单据，司机回车库后再提交纸质日报。在途中的情况只能靠挨个打电话确认。",
                    "keyNote": "【无可奈何的单一手段】〜するしかありません（除了……别无他法）。"
                },
                {
                    "speaker": "山田課長",
                    "jpWithRuby": "1<ruby>日平均<rt>にちへいきん</rt></ruby> 150<ruby>件程度<rt>けんていど</rt></ruby>で、<ruby>担当者<rt>たんとうしゃ</rt></ruby>が2<ruby>名<rt>めい</rt></ruby>で<ruby>手作業<rt>てさぎょう</rt></ruby>で<ruby>振<rt>ふ</rt></ruby>り<ruby>分<rt>わ</rt></ruby>けています。<ruby>朝<rt>あさ</rt></ruby>の<ruby>配車<rt>はいしゃ</rt></ruby>に<ruby>毎日<rt>まいにち</rt></ruby>2<ruby>時間以上<rt>じかんいじょう</rt></ruby>かかっています。GPSデータを<ruby>分析<rt>ぶんせき</rt></ruby>したところ、<ruby>全体<rt>ぜんたい</rt></ruby>の<ruby>走行距離<rt>そうこうきょり</rt></ruby>の<ruby>約<rt>やく</rt></ruby>2<ruby>割<rt>わり</rt></ruby>が<ruby>不要<rt>ふよう</rt></ruby>な<ruby>走行<rt>そうこう</rt></ruby>ではないかと<ruby>見<rt>み</rt></ruby>ています。",
                    "romaji": "Ichinichi heikin hyaku-gojū ken teido de, tantōsha ga nimei de tesagyō de furiwakete imasu. Asa no haisha ni mainichi ni-jikan ijō kakatte imasu. GPS dēta o bunseki shita tokoro, zentai no sōkō kyori no yaku ni-wari ga fuyō na sōkō dewa nai ka to mite imasu.",
                    "zh": "日均大概有150件货物，由2名调度员纯手工排单分派。每天早晨排车就要耗去2个多小时。我们分析了GPS数据，发现总行驶里程中大约有2成属于不必要的无效空驶。",
                    "keyNote": "【数据说话】〜ではないかと見ています（推测分析，客观而审慎）。"
                },
                {
                    "speaker": "李",
                    "jpWithRuby": "ありがとうございます。ここまでのお<ruby>話<rt>はなし</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>すると、システム<ruby>化<rt>か</rt></ruby>の<ruby>方向性<rt>ほうこうせい</rt></ruby>として、<ruby>配送状況<rt>はいそうじょうきょう</rt></ruby>のリアルタイム<ruby>可視化<rt>かしか</rt></ruby>と、<ruby>配車<rt>はいしゃ</rt></ruby>の<ruby>自動化<rt>じどうか</rt></ruby>と、<ruby>配送<rt>はいそう</rt></ruby>ルートの<ruby>最適化<rt>さいてきか</rt></ruby>の3つが<ruby>主<rt>おも</rt></ruby>な<ruby>改善<rt>かいぜん</rt></ruby>テーマと<ruby>認識<rt>にんしき</rt></ruby>していますが、よろしいですか。",
                    "romaji": "Arigatō gozaimasu. Koko made no ohanashi o seiri suru to, shisutemu-ka no hōkōsei to shite, haisō jōkyō no riarutaimu kashika to, haisha no jidōka to, haisō rūto no saitekika no mittsu ga omo na kaizen tēma to ninshiki shite imasu ga, yoroshii desu ka.",
                    "zh": "非常感谢。梳理刚才各位谈到的内容，我们认为系统化的切入方向，主要围绕“在途配送状态的实时可视化”、“车辆调度自动化”以及“配送路线最优化”这3大核心改善主题展开，请问是否准确无误呢？",
                    "keyNote": "【结构化收束求证】〜の3つが主な改善テーマと認識していますが、よろしいですか。"
                }
            ],
            "tokens": [
                {"surface": "できず", "reading": "できず", "pos": "否定中顿", "meaning": "没能做到……（书面客观）", "isKey": True},
                {"surface": "ことです", "reading": "ことです", "pos": "形式名词", "meaning": "……这件事（主谓呼应）", "isKey": True},
                {"surface": "できておらず", "reading": "できておらず", "pos": "自谦否定中顿", "meaning": "尚未做好……的状态", "isKey": True},
                {"surface": "配車", "reading": "はいしゃ", "pos": "物流行业术语", "meaning": "车辆调度、派车", "isKey": True},
                {"surface": "可視化", "reading": "かしか", "pos": "DX核心词", "meaning": "可视化、透视透明化", "isKey": True},
                {"surface": "〜ではないかと見ています", "reading": "ではないかとみています", "pos": "推测判断", "meaning": "分析认为可能是……", "isKey": True}
            ]
        },
        "practiceTexts": [
            {"pNum": 1, "title": "短文 1：首次调研：寒暄→物流业务现状→3大瓶颈听取", "objective": "掌握物流中心首次碰头的现状摸底与课题初步探寻", "dialogue": [
                {"speaker": "李", "jp": "物流部門で最も改善を急ぎたいポイントはどちらでしょうか。", "zh": "请问目前物流部门最亟待改善的节点是哪里呢？"},
                {"speaker": "山田課長", "jp": "荷主からの『荷物は今どこか』という電話への対応に追われている現状です。", "zh": "我们整天都在疲于应付货主‘货现在到哪了’的查单电话。"}
            ]},
            {"pNum": 2, "title": "短文 2：课题复述与结构化整理：确立3大改善主题", "objective": "归纳“配送实时跟踪”、“自动派车算法”、“路径动态优化”三大方向", "dialogue": [
                {"speaker": "李", "jp": "3つの課題を伺いました。第1にリアルタイム追跡、第2に配車自動化、第3にルート最適化ですね。", "zh": "我聆听了这3大课题。第1是实时追踪，第2是自动排车，第3是路线最优对吧。"},
                {"speaker": "田中部長", "jp": "そうです。その3本柱で間違いありません。", "zh": "对，正是这三大支柱，完全没有错。"}
            ]},
            {"pNum": 3, "title": "短文 3：开放封闭提问结合：深入挖掘GPS与派车算法", "objective": "探求GPS数据刷新频率（30秒级）以及排单约束参数（载重、路线、送达窗口）", "dialogue": [
                {"speaker": "李", "jp": "GPSによる位置情報の取得間隔は、30秒程度を想定してよろしいでしょうか。", "zh": "关于GPS位置信息的抓取间隔，我们预设在30秒左右可以吗？"},
                {"speaker": "山田課長", "jp": "はい、30秒間隔であれば十分リアルタイム性を確保できます。", "zh": "可以，30秒的间隔完全足够保障实时性了。"}
            ]},
            {"pNum": 4, "title": "短文 4：定量化指标确认：2小时缩减至30分与空驶削减2成", "objective": "将定性目标转化为可量化验收的系统KPI指标", "dialogue": [
                {"speaker": "李", "jp": "配車作業を現在の2時間から30分へ、不要走行を2割削減を開発目標として合意いただけますか。", "zh": "将排车作业由现行的2小时压缩至30分钟，并将无效空驶削减2成作为开发验收目标，您赞成吗？"},
                {"speaker": "田中部長", "jp": "はい、その数値を達成できれば投資対効果としても大成功です。", "zh": "赞成，如果能达成这个数值指标，从ROI投资回报率来说就是巨大的成功。"}
            ]},
            {"pNum": 5, "title": "短文 5：从寒暄到需求确认的完整物流DX调研闭环", "objective": "演练从首次寒暄到下次系统化方针提案约定的完整流程", "dialogue": [
                {"speaker": "李", "jp": "次回は、配送管理クラウドと車載スマホアプリを連携させた具体案をご提示いたします。", "zh": "下一次，我们将向您演示打通物流云端调度中台与司机车载手机App的具体落地实现案。"},
                {"speaker": "田中部長", "jp": "わかりました。来週のプレゼンを期待しています。", "zh": "好的，非常期待下周你们的提案展示。"}
            ]}
        ],
        "grammarPoints": [
            {
                "id": "s21-g1",
                "badge": "经典重点",
                "title": "〜ず（否定中頓・書面語否定）",
                "level": "JLPT N3 / N2 核心",
                "formula": "动词未然形 ＋ ず（相当于 〜ないで / 〜なくて）",
                "concept": "源自古日语否定助动词「ぬ/ず」的连用形，在现代商务与书面报告中专司【否定中顿】。比口语的「〜なくて」显得冷静、客观，紧凑严密。",
                "rules": [
                    {"type": "一段动词", "rule": "去掉る ＋ ず", "examples": [{"jp": "把握できる → 把握できず", "desc": "（原句）无法掌握"}]},
                    {"type": "サ变特殊", "rule": "する → せず", "examples": [{"jp": "最適化する → 最適化せず", "desc": "不进行最优化"}]},
                    {"type": "高阶延伸", "rule": "〜ている → 〜ておる → 〜ておらず", "examples": [{"jp": "最適化ができておらず", "desc": "（原句第3点）未处于做好最优化的状态"}]}
                ],
                "businessExamples": [
                    {"jp": "原因が特定できず、復旧に時間を要しております。", "zh": "因未能查明原因，系统恢复尚需时日。", "audio": "原因が特定できず、復旧に時間を要しております。"}
                ]
            },
            {
                "id": "s21-g2",
                "badge": "主谓一致",
                "title": "〜こと（です）（形式名詞・名詞節化・主述の照応）",
                "level": "N4 / N3 / 商务逻辑",
                "formula": "用言连体形 ＋ こと（です）",
                "concept": "将整句话打包封装成名词短语。句首如果有「1つ目は…/課題は…」，句末必须对齐收束为「〜ことです」，是日本商务三段式汇报严密逻辑的语法基石。",
                "rules": [
                    {"type": "主述照应", "rule": "1つ目は（主语名词）……〜ことです（谓语名词句）", "examples": [{"jp": "1つ目は、把握できず、すぐ答えられないことです。", "desc": "原句完美主谓一致"}]}
                ],
                "businessExamples": [
                    {"jp": "最大の課題は、セキュリティ対策が徹底されていないことです。", "zh": "最大的课题，是安全对策尚未贯彻到位。", "audio": "最大の課題は、セキュリティ対策が徹底されていないことです。"}
                ]
            }
        ],
        "businessClinic": {
            "title": "职场实战诊所：及格口语 vs 田中部长的顶级汇报",
            "comparisons": [
                {
                    "point": "1. 否定中顿",
                    "casual": "把握できなくて、答えられません。（散漫小抱怨）",
                    "pro": "把握できず、すぐ答えられないことです。（客观沉稳的大将之风）"
                },
                {
                    "point": "2. 状态中顿",
                    "casual": "できていなくて、移動が多いです。（学生口语感）",
                    "pro": "できておらず、無駄な移動が多いことです。（典雅严密的书面语感）"
                }
            ],
            "template": "「大きく3つの課題があります。1つ目は〜ことです。2つ目は〜ことです。3つ目は〜ことです。」"
        },
        "vocabulary": [
            {"kanji": "把握", "reading": "はあく", "romaji": "haaku", "level": "N2", "pos": "名・他サ", "zh": "掌握、实时了解", "phrase": "状況をリアルタイムで把握する", "audio": "把握。状況をリアルタイムで把握する。"},
            {"kanji": "配車", "reading": "はいしゃ", "romaji": "haisha", "level": "物流专业", "pos": "名・他サ", "zh": "派车、车辆调度", "phrase": "配車作業を自動化する", "audio": "配車。配車作業を自動化する。"},
            {"kanji": "最適化", "reading": "さいてきか", "romaji": "saitekika", "level": "N1/IT", "pos": "名・他サ", "zh": "最优化、优化配置", "phrase": "配送ルートの最適化", "audio": "最適化。配送ルートの最適化。"},
            {"kanji": "無駄", "reading": "むだ", "romaji": "muda", "level": "N3", "pos": "形動", "zh": "徒劳、浪费、无效", "phrase": "無駄な移動を削減する", "audio": "無駄。無駄な移動を削減する。"}
        ],
        "quizzes": [
            {
                "id": "s21-q1",
                "question": "在田中部长的原句「荷物の状況がリアルタイムで把握でき＿＿、お客様からの問い合わせに…」，填入哪项最符合正式商务语体？",
                "options": ["A. 把握できず", "B. 把握できなくて", "C. 把握できないで", "D. 把握できなければ"],
                "correct": 0,
                "explanation": "【答案是 A】「〜ず」专用于正式书面中顿，展现客观冷静的业务现状陈述。"
            },
            {
                "id": "s21-q2",
                "question": "句首为「1つ目は、…」时，句末为什么必须以「〜ことです」收束？",
                "options": [
                    "A. 纯粹为了凑字数",
                    "B. 为了实现「主述の照応（主谓一致）」，将动词句打包为名词短语与句首名词主题对齐",
                    "C. 表示强烈命令语气",
                    "D. 是关西方言特有口吻"
                ],
                "correct": 1,
                "explanation": "【答案是 B】句首是名词性主题「1つ目は」，句末必须对齐为名词句「〜ことです」，这是商务日语中至关重要的逻辑语法呼应。"
            }
        ]
    }
]

full_obj = {
    "metadata": {
        "title": "对日软件需求定义与分析设计场景智能研习平台",
        "lastUpdated": "2026-09-08",
        "activeSceneIds": ["scene-1", "scene-2", "scene-11", "scene-12", "scene-21"],
        "totalScenes": 5
    },
    "scenes": scenes_data
}

output_js = f"// 日语学习平台核心知识库（Data-Driven Multi-Scene Knowledge Base）\nwindow.JAPANESE_KNOWLEDGE_BASE = {json.dumps(full_obj, ensure_ascii=False, indent=2)};\n"

with open('/Users/gaohuanhuan/Projects/NHG/data/knowledge-data.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print(f"Generated knowledge-data.js successfully! Length: {len(output_js)} characters.")
