import Foundation

guard CommandLine.arguments.count > 2 else {
    print("Usage: generate_ruby <input.json> <output.json>")
    exit(1)
}

let inputFile = CommandLine.arguments[1]
let outputFile = CommandLine.arguments[2]

let inData = try Data(contentsOf: URL(fileURLWithPath: inputFile))
let sentences = try JSONDecoder().decode([String].self, from: inData)

func toRubyAndRomaji(_ sentence: String) -> [String: String] {
    let cfText = sentence as CFString
    let locale = CFLocaleCreate(kCFAllocatorDefault, CFLocaleCreateCanonicalLanguageIdentifierFromString(kCFAllocatorDefault, "ja" as CFString))
    guard let tokenizer = CFStringTokenizerCreate(kCFAllocatorDefault, cfText, CFRangeMake(0, CFStringGetLength(cfText)), kCFStringTokenizerUnitWordBoundary, locale) else {
        return ["ruby": sentence, "romaji": ""]
    }

    var ruby = ""
    var romajiParts: [String] = []
    var tokenType = CFStringTokenizerGoToTokenAtIndex(tokenizer, 0)

    func containsKanji(_ str: String) -> Bool {
        return str.unicodeScalars.contains { (0x4E00...0x9FFF).contains($0.value) || (0x3400...0x4DBF).contains($0.value) }
    }

    while tokenType != [] {
        let range = CFStringTokenizerGetCurrentTokenRange(tokenizer)
        guard let strRange = Range(NSRange(location: range.location, length: range.length), in: sentence) else { break }
        let word = String(sentence[strRange])

        if let latin = CFStringTokenizerCopyCurrentTokenAttribute(tokenizer, kCFStringTokenizerAttributeLatinTranscription) as? String {
            romajiParts.append(latin)
            if containsKanji(word) {
                let hira = NSMutableString(string: latin)
                CFStringTransform(hira, nil, kCFStringTransformLatinHiragana, false)
                if word == "李" {
                    ruby += "<ruby>李<rt>り</rt></ruby>"
                } else if word.contains("〇") {
                    ruby += word
                } else {
                    ruby += "<ruby>\(word)<rt>\(hira)</rt></ruby>"
                }
            } else {
                ruby += word
            }
        } else {
            ruby += word
        }
        tokenType = CFStringTokenizerAdvanceToNextToken(tokenizer)
    }
    return ["ruby": ruby, "romaji": romajiParts.joined(separator: " ")]
}

let results = sentences.map { toRubyAndRomaji($0) }
let outData = try JSONEncoder().encode(results)
try outData.write(to: URL(fileURLWithPath: outputFile))
print("Processed \(results.count) sentences successfully.")

