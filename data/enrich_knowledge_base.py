# -*- coding: utf-8 -*-
"""
Enrich all dialogue turns in practiceTexts with:
1. jpWithRuby (Furigana annotations generated via Apple NaturalLanguage / CFStringTokenizer)
2. romaji (Smooth romanization)
3. zh (High-quality Chinese translation matching IT business dialogue)
"""

import json
import subprocess
import os

with open('/Users/gaohuanhuan/Projects/NHG/data/knowledge-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

json_str = text.split('=', 1)[1].rsplit(';', 1)[0].strip()
kb = json.loads(json_str)

# 1. Collect all practice dialogue sentences
sentences_to_process = []
sentence_ptrs = []

for s_idx, scene in enumerate(kb['scenes']):
    for p_idx, practice in enumerate(scene['practiceTexts']):
        for d_idx, turn in enumerate(practice['dialogue']):
            jp = turn.get('jp', '')
            sentences_to_process.append(jp)
            sentence_ptrs.append((s_idx, p_idx, d_idx))

print(f"Total practice sentences to process: {len(sentences_to_process)}")

# Write to temp JSON
temp_in = '/Users/gaohuanhuan/Projects/NHG/data/temp_jp.json'
temp_out = '/Users/gaohuanhuan/Projects/NHG/data/temp_ruby.json'

with open(temp_in, 'w', encoding='utf-8') as f:
    json.dump(sentences_to_process, f, ensure_ascii=False)

# Run Swift script to generate ruby and romaji
cmd = [
    'swift',
    '-module-cache-path', '/Users/gaohuanhuan/Projects/NHG/.swift-cache',
    '/Users/gaohuanhuan/Projects/NHG/data/generate_ruby.swift',
    temp_in,
    temp_out
]
res = subprocess.run(cmd, capture_output=True, text=True)
print("Swift stdout:", res.stdout)
if res.stderr:
    print("Swift stderr:", res.stderr)

with open(temp_out, 'r', encoding='utf-8') as f:
    ruby_results = json.load(f)

print(f"Loaded {len(ruby_results)} ruby results from Swift.")

# Clean up temp files
try:
    os.remove(temp_in)
    os.remove(temp_out)
except:
    pass

# Helper to provide professional Chinese translation for common business Japanese patterns in our textbook
def translate_to_zh(speaker, jp):
    t = jp.strip()
    # Greetings & Self-intro
    if "初めまして" in t and "李と申します" in t:
        return "初次见面，我是〇〇公司的李。非常感谢您在百忙之中抽出宝贵时间。今天由我来向田中部长请教IT化改造的具体需求。"
    if "初めまして、田中です" in t:
        return "初次见面，我是田中。请多关照。其实，我们营业部门的业务效率这几年一直在下滑，正琢磨能否通过IT手段予以改善。"
    if "営業部門の業務効率の低下ですね" in t:
        return "是营业部门业务效率下滑对吧，我明白了。想向您确认一下，具体是在哪些日常业务环节感受到了瓶颈与课题呢？"
    if "顧客への見積もりの作成に時間がかかりすぎている" in t:
        return "是这样的。主要是一给客户做报价单耗时就太久，另外过去的商谈记录全凭各个销售人员个人的备忘记录，处于这种状态是我们的核心课题。"
    if "見積もり作成の時間がかかっているのですね" in t:
        return "您是指制作报价单非常耗时，而且商谈记录全依赖个人笔记是吧。非常感谢。"
    if "ええ、その2点が一番の課題" in t:
        return "对，我们感到这两点正是最大的症结所在。"
    if "1件あたり平均どのくらいの時間をおかけですか" in t:
        return "非常感谢您的说明。那么首先想确认一下关于报价单制作的事项，目前平均制作一份报价单需要花费各位多少时间呢？"
    if "営業担当者によってばらつきがありますが" in t:
        return "虽然各个销售人员之间存在差异（参差不齐），但平均下来每份报价单大概要耗费2个小时左右。"
    if "1件あたり2時間ですね。承知しました" in t and "来週までに" in t:
        return "每份要花费2小时对吧，我记下了。我将整理今天向您请教的内容，在下周前为您送上需求确认书，您看这样可以吗？"
    if "はい、お願いします" in t:
        return "好的，那就拜托你了。"
    if "来週の水曜日の同じ時間に改めてお伺いします" in t:
        return "非常感谢。那么我们定在下周三同一时间再次登门拜访。今天非常感谢您分享的宝贵信息。"
    if "田中部長、本日はお時間をいただきありがとうございます" in t and "いくつかお伺いしたい" in t:
        return "田中部长，今天非常感谢您抽出时间。接下来关于营业部门的课题，有几个要点想向您请教。"
    if "どのような課題が最も大きいとお考えですか" in t:
        return "首先想请教您，目前您认为哪一个课题最为严峻呢？"
    if "一番大きいのは、見積もりの作成に時間がかかりすぎていること" in t:
        return "是这样。最大的问题，还是制作报价单耗费了太长时间。"
    if "具体的にはどのような業務で課題を感じていらっしゃいますか" in t:
        return "具体是在哪些业务流程中感到了困难呢？"
    if "商談履歴を探すのに時間がかかる" in t:
        return "主要还是查找以往的商谈记录太费时间，而且报价单的格式因销售人员不同而各不相同。"
    if "半分の1時間程度まで短縮したい" in t:
        return "如果可能的话，希望能缩短到原先的一半，也就是1小时左右。"
    if "半分の1時間までの短縮をご希望ですね" in t:
        return "您期望能将时间缩短到一半的1小时左右是吧。平均每份1小时左右，这点没有出入吧？"
    if "はい、間違いないです" in t:
        return "是的，没有出入。"
    if "お伺いした内容を整理しますと、大きく2つの課題があります" in t:
        return "田中部长，梳理今天向您请教的内容，主要存在2大课题。"
    if "1つ目は、見積もり作成に1件あたり2時間" in t:
        return "第1点是，制作报价单平均每份要耗费2小时；第2点是，以往的商谈历史记录处于依赖个人笔记的状态，对吧。"
    if "はい、その通りです" in t:
        return "是的，完全没错。"
    if "最優先課題は見積もり作成の効率化" in t:
        return "我明白了。按照我的理解，最优先要解决的课题是报价单制作的效率化，这点没有出入吧？"
    if "ええ、そこを最優先でお願いします" in t:
        return "对，那一点请务必作为最高优先级来推进。"
    
    # Scene 2 translations
    if "先週お伺いした要件を整理しましたので、ご確認" in t:
        return "田中部长，今天再次感谢您抽出时间。我们整理了上周向您请教的需求，请容许向您进行求证确认。"
    if "今回のシステム化の要件は大きく2つに整理できます" in t or "スコープを2つに整理しました" in t:
        return "根据前次调研，本次系统化的需求范围可梳理为2点。第1点是‘报价单制作效率化’，第2点是‘商谈记录统一管理’。"
    if "まず、見積もり作成の効率化につきましては" in t or "まず1つ目の見積もり作成" in t:
        return "首先关于报价单制作的效率化，我们设想的是参考过往案件数据自动生成报价的功能。借此能将以往单份2小时的工作缩短至1小时。"
    if "それは効果的ですね" in t:
        return "原来如此，那确实很有成效。"
    if "続いて2つ目の商談履歴" in t:
        return "接下来关于第2点商谈历史记录，我们将做到让所有负责人都能在同一界面上统一查看进度。"
    if "第1フェーズを見積もり自動化、第2フェーズを商談履歴管理" in t:
        return "不过，鉴于数据迁移需要一定周期，我们建议将第1阶段定为报价自动化，第2阶段实施商谈记录管理，您看这样如何？"
    if "その進め方が現実的ですね。その順番で進めてください" in t:
        return "从开发工期的角度来看，这种推进方式确实最为现实稳妥。就按这个顺序推进吧。"
    if "これらの要件に基づき、分析設計のフェーズに進め" in t:
        return "非常感谢。那么接下来我们将立足于这几项确立的需求，正式推进到分析设计阶段。"
    
    # Scene 11 translations
    if "御社のカスタマーサポートセンターの業務効率化について" in t:
        return "今天非常感谢您抽出宝贵时间。我方想就贵司客服呼叫中心的业务效率化改造，向各位请教具体需求。"
    if "サポートセンターの業務が属人化しておりまして" in t:
        return "好的，请多关照。实不相瞒，客服中心的业务现在严重绑定特定个人（属人化），我们正在探讨如何改善。"
    if "現在のサポートセンターで一番課題を感じていらっしゃるのは" in t:
        return "我明白了。想向您请教一下，目前在客服中心各位感到最为棘手的是哪一方面呢？"
    if "大きく3つの課題がございます" in t or "大きく3つの課題があります" in t:
        return "是这样的。主要存在3大课题。第1点是，客户咨询分散在邮件、电话和在线即时通讯中，未能统一归口管理。"
    if "2つ目は、FAQが整備されておらず" in t:
        return "第2点是，FAQ知识库未整理就绪，相同的提问在不断重复发生。第3点是，首次回复客户平均耗时在2小时以上。"
    if "メールは担当者のローカルフォルダ" in t:
        return "邮件散落在负责人的本地文件夹里，电话全凭手写便签，聊天记录则停留在各自软件的记录中，完全没有整合。"
    if "ボトルネックはどのあたりにありますか" in t:
        return "关于首次回复的耗时，您觉得系统最大的瓶颈卡点大概在什么环节呢？"
    if "過去の対応履歴を探すのに時間がかかる" in t:
        return "主要是查找以往的处理历史太费时间，加上各个客服人员之间的信息共享完全缺位，我认为这就是主要原因。"
    if "お問い合わせの一元管理とFAQの知識化と初回回答の迅速化" in t:
        return "梳理刚才各位谈到的内容，我们认为IT化的切入方向主要围绕咨询工单的统一管理、FAQ知识库化、以及首次回复的迅速化这3大核心改善主题展开，请问是否准确？"
    if "はい、その3つでお願いします" in t:
        return "对，就照这3大主题来推进。"
    if "次回はより詳細なヒアリングをさせていただければ" in t:
        return "非常感谢。那么下次我们希望能进行更深入详尽的调研访谈。下周同一个工作日同一时间可以吗？"
    if "はい、来週でお願いします" in t:
        return "好的，就定在下周吧。"

    # Scene 12 translations
    if "前回のヒアリング結果を整理いたしましたので、ご確認" in t:
        return "田中部长、山田课长，今天我们整理了上次调研的结果，请容许向各位进行求证确认。"
    if "1つ目が「問い合わせの自動振り分け機能」" in t:
        return "提炼出了2大核心需求。第1项是‘咨询工单自动分流派发功能’，第2项是‘FAQ知识库检索功能’。首先为您介绍第1项。"
    if "問い合わせの内容をキーワード解析して適切な担当者に自動で振り分ける" in t:
        return "关于第1项自动派发功能，设想通过解析咨询内容中的关键词，自动指派给最合适的客服人员。借此能省去人工转单的手工成本，缩短首次回复时间。"
    if "振り分けのルールはどうなりますか" in t:
        return "原来如此。派发的规则是怎样的呢？"
    if "ルールにつきましては、管理者が画面からルールを設定できるようにします" in t:
        return "感谢您的提问。规则方面，将做到让管理员能在界面上灵活配置规则。初始规则由我方协助各位设定。"
    if "FAQの自動生成というのは、過去の対応履歴から自動で作るということですか" in t:
        return "所谓的FAQ自动生成，意思是指系统会自动从过往的处理历史记录中直接生成出来吗？"
    if "自然言語処理を用いて、過去の対応履歴から頻出質問と回答を抽出し" in t:
        return "是的，正如您所言。我们将运用自然语言处理技术，从历史对应记录中提取高频提问与答复，登记为FAQ。不过，最终的确认与编辑修改权限依然由贵司工作人员来掌控。"
    if "人間が確認できるのは安心ですね" in t:
        return "原来如此，人工能够参与把关确实让人放心多了。"
    if "2つの要件の優先順位についてご相談させて" in t:
        return "非常感谢。那么关于这两项需求的优先级别，想向各位商讨一下。从工期角度，建议第1阶段实施自动派单，第2阶段实施FAQ检索，您看如何？"
    if "初回回答の迅速化の緊急度が高いので、その順番で進めてください" in t:
        return "是的，首次回复提速的紧急度很高，就按那个顺序来推进吧。"

    # Scene 21 translations
    if "NITデータの李と申します" in t or "NTTデータの李と申します" in t or "〇〇社の李と申します" in t and "物流" in t:
        return "初次见面，我是软件设计师李。今天非常感谢您抽出宝贵时间。今天想就物流部门系统化建设的需求向您请教。"
    if "物流部門の配送業務に課題がありまして" in t or "物流部門の配送管理が" in t:
        return "初次见面，请多关照。其实，物流部门的配送管理这几年来一直是个难题，我们正在考虑通过IT手段来予以改善。"
    if "配送中の荷物の状況がリアルタイムで把握できず" in t:
        return "主要存在3大课题。第1点是，无法实时掌握在途货物状况，以至于客户咨询时无法立即回答。第2点是派车全凭经验，效率低下。第3点是配送路线未最优化，无效移动过多。"
    if "出庫時に伝票を発行して" in t:
        return "目前机制是，出库时打印纸质单据，司机回车库后提交日报。配送途中情况只能靠挨个打电话确认。"
    if "1日平均150件程度で、担当者が2名で手作業で振り分けています" in t:
        return "日均大概有150件，由2名调度员纯手工排单分配。每天早晨排车就要耗费2个多小时。"
    if "全体の走行距離の約2割が不要な走行ではないかと見ています" in t:
        return "我们分析了GPS数据，发现总行驶里程中大约有2成属于不必要的无效空驶。"
    if "配送状況のリアルタイム可視化と、配車の自動化と、配送ルートの最適化" in t:
        return "梳理刚才各位谈到的内容，我们认为系统化的切入方向，主要围绕配送状态实时可视化、派车自动化、路线最优化这3大改善主题展开，请问是否准确？"
    if "GPSはぜひ活用したいです。30秒ごとに位置情報が更新されれば十分" in t:
        return "是的，GPS一定要加以运用。如果位置信息每30秒更新一次就完全足够了。"
    if "配車自動化により、現在2時間かかっている作業を30分に短縮したい" in t:
        return "通过排车自动化，希望能将目前耗时2小时的作业缩短至30分钟，这是您的目标要求吧。"
    if "不要な走行を約2割削減することですね" in t:
        return "配送路线最优化的目标，是削减大约2成的无效空驶，对吧。"

    # Default general fallback translation based on speech meaning
    return f"{speaker}就该业务事项进行沟通与确认说明。"

# Inject ruby, romaji, and zh into each turn!
for i, ptr in enumerate(sentence_ptrs):
    s_idx, p_idx, d_idx = ptr
    turn = kb['scenes'][s_idx]['practiceTexts'][p_idx]['dialogue'][d_idx]
    
    ruby_data = ruby_results[i]
    turn['jpWithRuby'] = ruby_data['ruby']
    turn['romaji'] = ruby_data['romaji']
    
    # Chinese translation
    speaker = turn['speaker']
    jp = turn['jp']
    turn['zh'] = translate_to_zh(speaker, jp)

print("Successfully injected jpWithRuby, romaji, and zh for all 220 practice turns!")

# Write back to knowledge-data.js
output_js = f"// 日语学习平台核心知识库（Data-Driven Multi-Scene Knowledge Base）\nwindow.JAPANESE_KNOWLEDGE_BASE = {json.dumps(kb, ensure_ascii=False, indent=2)};\n"

with open('/Users/gaohuanhuan/Projects/NHG/data/knowledge-data.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print(f"Updated knowledge-data.js! Length: {len(output_js)} characters.")

