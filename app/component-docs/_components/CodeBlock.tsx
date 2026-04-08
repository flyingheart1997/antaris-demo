"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

type Token = { type: "keyword" | "string" | "comment" | "tag" | "prop" | "number" | "plain"; value: string }

/**
 * Single-pass tokenizer — avoids regex-on-regex corruption.
 * Processes the source string from left to right, picking the longest match.
 */
function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  const KEYWORDS = new Set([
    "import", "export", "from", "default", "function", "const", "let", "var",
    "return", "if", "else", "for", "while", "class", "extends", "interface",
    "type", "async", "await", "new", "typeof", "void", "null", "undefined",
    "true", "false", "as", "of", "in", "break", "continue", "switch", "case",
  ])

  function peek(offset = 0) { return code[i + offset] }
  function rest() { return code.slice(i) }
  function isWordChar(ch: string) { return /\w/.test(ch) }

  while (i < code.length) {
    const ch = code[i]

    // ── Line comment
    if (ch === "/" && peek(1) === "/") {
      const end = code.indexOf("\n", i)
      const val = end === -1 ? code.slice(i) : code.slice(i, end)
      tokens.push({ type: "comment", value: val })
      i += val.length
      continue
    }

    // ── Block comment
    if (ch === "/" && peek(1) === "*") {
      const end = code.indexOf("*/", i + 2)
      const val = end === -1 ? code.slice(i) : code.slice(i, end + 2)
      tokens.push({ type: "comment", value: val })
      i += val.length
      continue
    }

    // ── Template literal
    if (ch === "`") {
      let j = i + 1
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++ // skip escape
        j++
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // ── String (single or double quote)
    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < code.length && code[j] !== ch) {
        if (code[j] === "\\") j++
        j++
      }
      tokens.push({ type: "string", value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // ── JSX/HTML opening/closing tag name: <Foo  </Foo  />
    if (ch === "<" && (peek(1) === "/" || /[A-Za-z]/.test(peek(1) ?? ""))) {
      // Emit '<' or '</' as a plain token first
      const slash = peek(1) === "/" ? 1 : 0
      tokens.push({ type: "plain", value: code.slice(i, i + 1 + slash) })
      i += 1 + slash
      // Read tag name
      let j = i
      while (j < code.length && isWordChar(code[j])) j++
      if (j > i) {
        tokens.push({ type: "tag", value: code.slice(i, j) })
        i = j
      }
      continue
    }

    // ── Numbers
    if (/\d/.test(ch) && (i === 0 || !isWordChar(code[i - 1]))) {
      let j = i
      while (j < code.length && /[\d.]/.test(code[j])) j++
      tokens.push({ type: "number", value: code.slice(i, j) })
      i = j
      continue
    }

    // ── Identifiers / keywords
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i
      while (j < code.length && isWordChar(code[j])) j++
      const word = code.slice(i, j)

      // Check if this word is a JSX prop (followed by =)
      // Only color as prop if not a keyword
      if (!KEYWORDS.has(word) && code[j] === "=" && code[j + 1] !== "=") {
        tokens.push({ type: "prop", value: word })
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word })
      } else {
        tokens.push({ type: "plain", value: word })
      }
      i = j
      continue
    }

    // ── Default: emit character as plain
    tokens.push({ type: "plain", value: ch })
    i++
  }

  return tokens
}

const TOKEN_CLASSES: Record<Token["type"], string> = {
  keyword: "text-red-9 font-medium",
  string: "text-blue-10",
  comment: "text-text-disabled/40 italic",
  tag: "text-text-primary font-semibold",
  prop: "text-blue-8",
  number: "text-yellow-10",
  plain: "text-text-secondary",
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const tokens = React.useMemo(() => tokenize(code), [code])

  // Group tokens into lines for line numbers
  const lines = React.useMemo(() => {
    const res: Token[][] = [[]]
    let currentLine = 0
    for (const tok of tokens) {
      if (tok.value.includes("\n")) {
        const parts = tok.value.split("\n")
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            res[currentLine].push({ ...tok, value: parts[i] })
          }
          if (i < parts.length - 1) {
            currentLine++
            res[currentLine] = []
          }
        }
      } else {
        res[currentLine].push(tok)
      }
    }
    return res
  }, [tokens])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group/code relative rounded-3xl bg-[#0d0d0d] border border-stroke-primary overflow-hidden shadow-2xl", className)}>
      {/* ── Subtle Floating Controls ── */}
      <div className="absolute top-20 right-20 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleCopy}
          className={cn(
            "p-10 rounded-xl bg-white/5 hover:bg-white/10 border border-stroke-primary text-white/40 hover:text-white transition-all shadow-lg backdrop-blur-sm",
            copied && "bg-green-alpha-3 text-green-11 border-green-alpha-2 opacity-100"
          )}
          title="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      {/* ── Line-based Code Area ── */}
      <div className="relative overflow-x-auto selection:bg-white/10">
        <pre className="p-32 text-[14px] leading-[1.7] font-code min-w-0" style={{ tabSize: 2 }}>
          <code className="grid grid-cols-1">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-24 group-hover/line:bg-white/[0.02] -mx-32 px-32 transition-colors group/line min-h-[1.7em]">
                {/* Minimalist Line Numbers */}
                <span className="select-none text-right w-24 text-white/15 font-mono text-[12px] pt-1 leading-[1.7]">
                  {i + 1}
                </span>

                {/* Tokens */}
                <span className="flex-1 whitespace-pre">
                  {line.length === 0 ? "\u00A0" : line.map((tok, j) => {
                    const cls = TOKEN_CLASSES[tok.type]
                    // Special case for Image 2 keyword color (Pinkish-red)
                    const finalCls = tok.value === "import" || tok.value === "from" || tok.value === "export" || tok.value === "const" || tok.value === "function" || tok.value === "return"
                      ? "text-red-9 font-medium"
                      : cls

                    return finalCls
                      ? <span key={j} className={finalCls}>{tok.value}</span>
                      : <span>{tok.value}</span>
                  })}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* ── Absolute Bottom Gradient Overlay ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0d0d0d] to-transparent pointer-events-none opacity-40" />
    </div>
  )
}
